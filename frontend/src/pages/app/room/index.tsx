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
  SelectValue
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Video, VideoOff, Mic, MicOff } from "lucide-react";
import { useRoom } from '@/components/providers/RoomProvider';
import { useToast } from "@/hooks/use-toast";
import { PrimaryButton, SecondaryButton } from "@/components/base/Buttons";
import { 
  TypographyH2, 
  TypographyLead 
} from "@/components/base/Typography";

// Interfaces
interface DeviceState {
  audioInputs: MediaDeviceInfo[];
  videoInputs: MediaDeviceInfo[];
}

interface PrejoinScreenProps {
  onJoin: (room: string, name: string) => void;
}

interface ControlOverlaysProps {
  videoEnabled: boolean;
  setVideoEnabled: (enabled: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  devices: DeviceState;
  selectedVideoInput?: string;
  setSelectedVideoInput: (deviceId: string) => void;
  selectedAudioInput?: string;
  setSelectedAudioInput: (deviceId: string) => void;
}

interface RoomDetailsFormProps {
  roomId: string;
  username: string;
  setRoomId: (value: string) => void;
  setUsername: (value: string) => void;
  onJoin: (roomId: string, username: string) => void;
}

enum FormMode {
  SELECT,
  SELF_PRACTICE,
  JOIN_EXISTING
}

type FormView = {
  mode: FormMode;
  setMode: (mode: FormMode) => void;
}

const PrejoinScreen: React.FC<PrejoinScreenProps> = ({ onJoin }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<DeviceState>({ 
    audioInputs: [], 
    videoInputs: [] 
  });
  const [selectedAudioInput, setSelectedAudioInput] = useState<string>();
  const [selectedVideoInput, setSelectedVideoInput] = useState<string>();
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  const cleanupMediaStreams = () => {
    // Stop video stream
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
      setVideoStream(null);
    }

    // Stop video element's stream
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices({
          audioInputs: devices.filter((d) => d.kind === "audioinput"),
          videoInputs: devices.filter((d) => d.kind === "videoinput"),
        });

        const savedAudioInput = localStorage.getItem("preferredAudioInput");
        const savedVideoInput = localStorage.getItem("preferredVideoInput");
        if (savedAudioInput) setSelectedAudioInput(savedAudioInput);
        if (savedVideoInput) setSelectedVideoInput(savedVideoInput);
      } catch (err) {
        console.error("Error loading devices:", err);
      }
    };
    loadDevices();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const getMedia = async () => {
      try {
        // Clean up existing streams first
        cleanupMediaStreams();

        const constraints = {
          video: selectedVideoInput ? { deviceId: selectedVideoInput } : true,
          audio: selectedAudioInput ? { deviceId: selectedAudioInput } : true,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setVideoStream(stream);

        if (selectedAudioInput)
          localStorage.setItem("preferredAudioInput", selectedAudioInput);
        if (selectedVideoInput)
          localStorage.setItem("preferredVideoInput", selectedVideoInput);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setVideoEnabled(false);
        setAudioEnabled(false);
      }
    };
    getMedia();

    return () => {
      cleanupMediaStreams();
    };
  }, [mounted, selectedAudioInput, selectedVideoInput]);

  useEffect(() => {
    if (videoRef.current && videoStream && videoEnabled) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream, videoEnabled]);

  useEffect(() => {
    if (!videoStream || !audioEnabled) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAudioLevel(0);
      return;
    }

    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    const audioTrack = videoStream.getAudioTracks()[0];
    if (audioTrack) {
      const source = audioContextRef.current.createMediaStreamSource(videoStream);
      source.connect(analyserRef.current);

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

      const updateAudioLevel = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average);

        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };

      updateAudioLevel();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [videoStream, audioEnabled]);

  if (!mounted) {
    return (
      <div className="flex w-full h-[calc(100vh-100px)] bg-background p-4 md:p-8">
        <div className="flex-[2]" />
        <div className="flex-1" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-100px)] bg-background p-4 md:p-8 overflow-hidden">
      <div className="flex-1 md:flex-[2] flex items-center justify-center p-2 md:p-4">
        <div className="w-full max-w-3xl mx-auto">
          <div
            className={cn(
              "relative aspect-video bg-gray-950 rounded-lg overflow-hidden",
              "transition-shadow duration-250",
              audioLevel > 20 && "shadow-[0_0_30px_rgba(59,130,246,0.7)]",
              audioLevel > 40 && "shadow-[0_0_40px_rgba(59,130,246,0.8)]",
              audioLevel > 60 && "shadow-[0_0_50px_rgba(59,130,246,0.9)]"
            )}
            style={{
              borderColor: audioEnabled
                ? `rgba(59,130,246,${Math.min(audioLevel / 64, 1)})`
                : "transparent",
              borderWidth: "2px",
              borderStyle: "solid",
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

            <ControlOverlays
              videoEnabled={videoEnabled}
              setVideoEnabled={setVideoEnabled}
              audioEnabled={audioEnabled}
              setAudioEnabled={setAudioEnabled}
              devices={devices}
              selectedVideoInput={selectedVideoInput}
              setSelectedVideoInput={setSelectedVideoInput}
              selectedAudioInput={selectedAudioInput}
              setSelectedAudioInput={setSelectedAudioInput}
            />
          </div>
        </div>
      </div>

      <RoomDetailsForm
        roomId={roomId}
        username={username}
        setRoomId={setRoomId}
        setUsername={setUsername}
        onJoin={onJoin}
      />
    </div>
  );
};

const ControlOverlays: React.FC<ControlOverlaysProps> = ({
  videoEnabled,
  setVideoEnabled,
  audioEnabled,
  setAudioEnabled,
  devices,
  selectedVideoInput,
  setSelectedVideoInput,
  selectedAudioInput,
  setSelectedAudioInput,
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-wrap gap-2 justify-center w-full max-w-[90%] px-2">
      <div className="flex gap-2">
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

        <Select value={selectedVideoInput} onValueChange={setSelectedVideoInput}>
          <SelectTrigger className="w-[140px] md:w-[180px] bg-background/80 backdrop-blur-sm">
            <SelectValue placeholder="Select camera" />
          </SelectTrigger>
          <SelectContent>
            {devices.videoInputs.map((device) => (
              <SelectItem
                key={device.deviceId}
                value={device.deviceId || "default-camera"}
              >
                {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
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
          <SelectTrigger className="w-[140px] md:w-[180px] bg-background/80 backdrop-blur-sm">
            <SelectValue placeholder="Select microphone" />
          </SelectTrigger>
          <SelectContent>
            {devices.audioInputs.map((device) => (
              <SelectItem
                key={device.deviceId}
                value={device.deviceId || "default-mic"}
              >
                {device.label || `Mic ${device.deviceId.slice(0, 5)}...`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({
  roomId,
  username,
  setRoomId,
  setUsername,
  onJoin,
}) => {
  const [mode, setMode] = useState<FormMode>(FormMode.SELECT);
  const [topic, setTopic] = useState<string>("");
  const { toast } = useToast();

  const handleJoinRoom = async () => {
    if (mode === FormMode.JOIN_EXISTING) {
      try {
        const response = await fetch('/api/livekit/room-setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId,
            username,
          }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        onJoin(roomId, username);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Room not found or username already taken",
        });
      }
    } else {
      // Self-practice mode
      const practiceRoomId = `practice-${Date.now()}`;
      try {
        await fetch('/api/livekit/room-setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: practiceRoomId,
            topic: { motion: topic, "against-motion": "No motion" }
          }),
        });

        onJoin(practiceRoomId, username);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create practice room",
        });
      }
    }
  };

  if (mode === FormMode.SELECT) {
    return (
      <div className="flex-1 flex items-center p-8 md:p-12">
        <div className="w-full space-y-8">
          <div className="space-y-2">
            <TypographyH2>Choose Your Mode</TypographyH2>
            <TypographyLead>
              Join an existing debate room or practice by yourself 😎
            </TypographyLead>
          </div>

          <div className="space-y-6">
            
            <PrimaryButton
              className="w-full text-lg py-6"
              variant="outline"
              onClick={() => setMode(FormMode.JOIN_EXISTING)}
            >
              Join Existing Debate
            </PrimaryButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <SecondaryButton
              className="w-full text-lg py-6"
              variant="outline"
              onClick={() => setMode(FormMode.SELF_PRACTICE)}
            >
              Self Practice
            </SecondaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center p-8 md:p-10">
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <TypographyH2>
            {mode === FormMode.SELF_PRACTICE 
              ? "Practice With AI" 
              : "Join Ongoing Debate"}
          </TypographyH2>
          <TypographyLead>
            {mode === FormMode.SELF_PRACTICE 
              ? "Defeat our AI agent to prove your worth"
              : "Debate your peers with AI feedback"}
          </TypographyLead>
        </div>

        <div className="space-y-6">
          {mode === FormMode.SELF_PRACTICE ? (
            <>
              <div className="space-y-3">
                  <Label htmlFor="topic" className="text-lg">
                    Debate Topic
                  </Label>
                  <Input
                    id="topic"
                    placeholder="Enter debate topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-lg py-6"
                  />
                </div>
              <div className="space-y-3">
                <Label htmlFor="username" className="text-lg">
                  Your Name
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-lg py-6"
                />
              </div>
              
            </>
          ) : (
            <>
              <div className="space-y-3">
                <Label htmlFor="roomId" className="text-lg">
                  Room ID
                </Label>
                <Input
                  id="roomId"
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="username" className="text-lg">
                  Your Name
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-lg py-6"
                />
              </div>
            </>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 text-lg py-6"
              onClick={() => setMode(FormMode.SELECT)}
            >
              Back
            </Button>
            <Button
              className="flex-1 text-lg py-6"
              onClick={handleJoinRoom}
              disabled={
                mode === FormMode.SELF_PRACTICE
                  ? !username || !topic
                  : !roomId || !username
              }
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { activeRoom, activeUsername, setActiveRoom, setActiveUsername } = useRoom();

  useEffect(() => {
    setMounted(true);

    // Only set up cleanup if not in an active room
    if (!activeRoom) {
      const handleRouteChange = () => {
        const videoElements = document.querySelectorAll('video');
        videoElements.forEach(videoElement => {
          if (videoElement.srcObject) {
            (videoElement.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
          }
        });
      };

      router.events.on('routeChangeStart', handleRouteChange);
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
        handleRouteChange();
      };
    }
  }, [router, activeRoom]);

  useEffect(() => {
    // If user has an active room, redirect them there
    if (mounted && activeRoom && activeUsername) {
      router.push(`/app/room/${activeRoom}`);
    }
  }, [mounted, activeRoom, activeUsername, router]);

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
          setActiveRoom(room);
          setActiveUsername(name);
          router.push(`/app/room/${room}`);
        }}
      />
    </main>
  );
};

export default Page;