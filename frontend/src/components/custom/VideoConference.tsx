import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { ChatNotes } from "./ChatNotes";

interface VideoConferenceProps {
  roomId: string;
  onLeaveRoom: () => void;
}

type PeerId = string | null;

interface PeerConnection {
  peerId: PeerId;
  peer: Peer.Instance;
  stream: MediaStream;
}

interface ViewProps {
  localStream: MediaStream | null;
  peers: PeerConnection[];
  activeSpeaker: string | null;
  setIsExpanded: (expanded: boolean) => void;
}

const NormalView = ({
  localStream,
  peers,
  activeSpeaker,
  setIsExpanded,
}: ViewProps) => {
  return (
    // Normal view with active speaker and preview
    <>
      <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
        <video
          autoPlay
          playsInline
          muted={activeSpeaker === "local"}
          className="w-full h-full object-cover"
          ref={(ref) => {
            if (ref) {
              if (activeSpeaker === "local") {
                ref.srcObject = localStream;
              } else {
                const peerStream = peers.find(
                  (p) => p.peerId === activeSpeaker
                )?.stream;
                if (peerStream) ref.srcObject = peerStream;
              }
            }
          }}
        />
        <div className="absolute bottom-4 left-4 text-white">
          {activeSpeaker === "local" ? "You" : `Peer ${activeSpeaker}`}
        </div>
      </div>

      {/* Preview video in bottom right */}
      <div
        className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500"
        onClick={() => setIsExpanded(true)}
      >
        <video
          autoPlay
          playsInline
          muted={activeSpeaker !== "local"}
          className="w-full h-full object-cover"
          ref={(ref) => {
            if (ref) {
              if (activeSpeaker === "local") {
                const peerStream = peers[0]?.stream;
                if (peerStream) ref.srcObject = peerStream;
              } else {
                ref.srcObject = localStream;
              }
            }
          }}
        />
        <div className="absolute bottom-2 left-2 text-white text-sm">
          {activeSpeaker === "local" ? `Peer ${peers[0]?.peerId}` : "You"}
        </div>
      </div>
    </>
  );
};

const ExpandedView = ({
  localStream,
  peers,
  activeSpeaker,
  setIsExpanded,
}: ViewProps) => {
  return (
    <div className="h-full flex gap-4">
      {/* Active speaker video */}
      <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
        <video
          ref={activeSpeaker === "local" ? localStream : null}
          autoPlay
          muted={activeSpeaker === "local"}
          playsInline
          className="w-full h-full object-cover"
          {...(activeSpeaker !== "local" && {
            ref: (ref) => {
              if (ref) {
                const stream = peers.find(
                  (p) => p.peerId === activeSpeaker
                )?.stream;
                if (stream) {
                  ref.srcObject = stream;
                }
              }
            },
          })}
        />
        <div className="absolute bottom-4 left-4 text-white">
          {activeSpeaker === "local" ? "You" : "Speaker"}
        </div>
      </div>

      {/* Scrollable list of other participants */}
      <div className="w-64 h-full overflow-y-auto space-y-4 px-1">
        {/* All videos (local + peers) except active speaker */}
        {[{ peerId: "local", stream: localStream }, ...peers]
          .filter((peer) => peer.peerId !== activeSpeaker)
          .map(({ peerId, stream }) => (
            <div
              key={peerId}
              className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video cursor-pointer hover:ring-2 hover:ring-blue-500"
              onClick={() => setIsExpanded(false)}
            >
              <video
                autoPlay
                playsInline
                muted={peerId === "local"}
                className="w-full h-full object-cover"
                ref={(ref) => {
                  if (ref) {
                    ref.srcObject = stream;
                  }
                }}
              />
              <div className="absolute bottom-2 left-2 text-white text-sm">
                {peerId === "local" ? "You" : "Peer"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export const VideoConference = ({ roomId, onLeaveRoom }: VideoConferenceProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Move permission states inside the component
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Add state for active speaker
  const [activeSpeaker, setActiveSpeaker] = useState<PeerId>(null);

  // Add state for expanded view
  const [isExpanded, setIsExpanded] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<PeerConnection[]>([
    {
      peerId: "1",
      peer: new Peer({ initiator: true, trickle: false }) as Peer.Instance,
      stream: new MediaStream(),
    },
  ]);

  console.log("peers", peers);
  console.log("activeSpeaker", activeSpeaker);
  console.log("localStream", localStream);
  console.log("localVideoRef", localVideoRef.current);

  useEffect(() => {
    // Request permissions first
    const requestPermissions = async () => {
      try {
        // Request both video and audio permissions
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setPermissionGranted(true);
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setPermissionError(
          err instanceof Error
            ? err.message
            : "Failed to access camera and microphone"
        );
      }
    };

    requestPermissions();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      peers.forEach(({ peer }) => peer.destroy());
    };
  }, []);

  const handleSendMessage = (message: string) => {
    // Implement send message logic
    console.log("Sending message:", message);
  };

  const handleNotesChange = (notes: string) => {
    // Implement notes saving logic
    console.log("Saving notes:", notes);
  };

  return (
    <div className="fixed inset-0 bg-black flex">
      <div className="w-2/3 h-full p-4">
        {!permissionGranted ? (
          <div className="h-full flex items-center justify-center bg-gray-800 rounded-lg">
            {permissionError ? (
              <div className="text-center text-red-500 p-4">
                <p className="mb-2">Error: {permissionError}</p>
                <p className="text-sm">
                  Please ensure you have granted camera and microphone
                  permissions
                </p>
              </div>
            ) : (
              <div className="text-white">
                <p>Requesting camera and microphone access...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full relative">
            {!isExpanded ? (
              <NormalView
                localStream={localStream}
                peers={peers}
                activeSpeaker={activeSpeaker}
                setIsExpanded={setIsExpanded}
              />
            ) : (
              <ExpandedView
                localStream={localStream}
                peers={peers}
                activeSpeaker={activeSpeaker}
                setIsExpanded={setIsExpanded}
              />
            )}
          </div>
        )}
      </div>

      {/* Chat/Notes section */}
      <div className="w-1/3 h-full">
        <ChatNotes
          onSendMessage={handleSendMessage}
          onNotesChange={handleNotesChange}
        />
      </div>
    </div>
  );
};
