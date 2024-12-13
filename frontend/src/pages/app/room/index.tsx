"use client";

import "@livekit/components-styles";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  AvatarFallback,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Video, VideoOff, Mic, MicOff } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !router.isReady) {
    return (
      <main className="flex-1 flex">
        <div className="flex w-full h-[calc(100vh-100px)] bg-background p-4 md:p-8">
          <div className="flex-[2]" />
          <div className="flex-1" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex">
      <PrejoinScreen
        onJoin={(room: string, name: string) => {
          router.push(`/app/room/${room}?username=${encodeURIComponent(name)}`);
        }}
      />
    </main>
  );
}

const PrejoinScreen = ({
  onJoin,
}: {
  onJoin: (room: string, name: string) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<{
    audioInputs: MediaDeviceInfo[];
    videoInputs: MediaDeviceInfo[];
  }>({ audioInputs: [], videoInputs: [] });
  const [selectedAudioInput, setSelectedAudioInput] = useState();
  const [selectedVideoInput, setSelectedVideoInput] = useState();
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load devices and previously selected devices
  useEffect(() => {
    if (!mounted) return;

    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices({
          audioInputs: devices.filter(d => d.kind === 'audioinput'),
          videoInputs: devices.filter(d => d.kind === 'videoinput'),
        });

        // Load saved preferences
        const savedAudioInput = localStorage.getItem('preferredAudioInput');
        const savedVideoInput = localStorage.getItem('preferredVideoInput');
        if (savedAudioInput) setSelectedAudioInput(savedAudioInput);
        if (savedVideoInput) setSelectedVideoInput(savedVideoInput);
      } catch (err) {
        console.error("Error loading devices:", err);
      }
    };
    loadDevices();
  }, [mounted]);

  // Request camera/mic permissions on mount
  useEffect(() => {
    if (!mounted) return;

    const getMedia = async () => {
      try {
        if (videoStream) {
          videoStream.getTracks().forEach((track) => track.stop());
        }

        const constraints = {
          video: selectedVideoInput ? { deviceId: selectedVideoInput } : true,
          audio: selectedAudioInput ? { deviceId: selectedAudioInput } : true,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setVideoStream(stream);

        // Save preferences
        if (selectedAudioInput) localStorage.setItem('preferredAudioInput', selectedAudioInput);
        if (selectedVideoInput) localStorage.setItem('preferredVideoInput', selectedVideoInput);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setVideoEnabled(false);
        setAudioEnabled(false);
      }
    };
    getMedia();

    // Cleanup
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mounted, selectedAudioInput, selectedVideoInput]);

  // Handle video stream changes
  useEffect(() => {
    if (videoRef.current && videoStream && videoEnabled) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream, videoEnabled]);

  // Add this effect after the video stream effect
  useEffect(() => {
    if (!videoStream || !audioEnabled) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAudioLevel(0);
      return;
    }

    // Initialize audio context and analyzer
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    // Get audio track and connect to analyzer
    const audioTrack = videoStream.getAudioTracks()[0];
    if (audioTrack) {
      const source = audioContextRef.current.createMediaStreamSource(videoStream);
      source.connect(analyserRef.current);

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

      // Animation function to update audio levels
      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);
        
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };

      updateAudioLevel();
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [videoStream, audioEnabled]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex w-full h-[calc(100vh-100px)] bg-background p-4 md:p-8">
        <div className="flex-[2]" />
        <div className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-[calc(100vh-100px)] bg-background p-4 md:p-8 overflow-hidden">
      {/* Left column - Video preview */}
      <div className="flex-[2] flex items-center justify-center p-4">
        <div className="flex-1">
          <div 
            className={cn(
              "relative aspect-video bg-gray-950 rounded-lg overflow-hidden",
              "transition-shadow duration-250",
              audioLevel > 20 && "shadow-[0_0_30px_rgba(59,130,246,0.7)]",
              audioLevel > 40 && "shadow-[0_0_40px_rgba(59,130,246,0.8)]",
              audioLevel > 60 && "shadow-[0_0_50px_rgba(59,130,246,0.9)]"
            )}
            style={{
              borderColor: audioEnabled ? `rgba(59,130,246,${Math.min(audioLevel / 128, 1)})` : 'transparent',
              borderWidth: '4px',
              borderStyle: 'solid'
            }}
          >
            {videoStream && videoEnabled ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-4xl">
                    {username ? username[0].toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            {/* Camera/Mic controls overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "bg-background/80 backdrop-blur-sm",
                  !videoEnabled && "bg-destructive hover:bg-destructive/90"
                )}
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4" />
                )}
              </Button>


              {/* Device selection dropdown buttons */}
              <Select value={selectedVideoInput} onValueChange={setSelectedVideoInput}>
                <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select camera" />
                </SelectTrigger>
                <SelectContent>
                  {devices.videoInputs.map((device) => (
                    <SelectItem 
                      key={device.deviceId} 
                      value={device.deviceId || 'default-camera'}
                    >
                      {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "bg-background/80 backdrop-blur-sm",
                  !audioEnabled && "bg-destructive hover:bg-destructive/90"
                )}
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>

              <Select value={selectedAudioInput} onValueChange={setSelectedAudioInput}>
                <SelectTrigger className="w-[180px] bg-background/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select microphone" />
                </SelectTrigger>
                <SelectContent>
                  {devices.audioInputs.map((device) => (
                    <SelectItem 
                      key={device.deviceId} 
                      value={device.deviceId || 'default-mic'}
                    >
                      {device.label || `Mic ${device.deviceId.slice(0, 5)}...`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          
        </div>
      </div>

      {/* Right column - Join form */}
      <div className="flex-1 flex items-center p-8 md:p-12">
        <div className="w-full space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Room Details</h2>
            <p className="text-lg text-muted-foreground">
              Enter your details to join the room
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="roomId" className="text-lg">Room ID</Label>
              <Input
                id="roomId"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="username" className="text-lg">Your Name</Label>
              <Input
                id="username"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-lg py-6"
              />
            </div>

            <Button
              className="w-full text-lg py-6"
              onClick={() => {
                if (roomId && username) {
                  onJoin(roomId, username);
                }
              }}
              disabled={!roomId || !username}
            >
              Join Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
