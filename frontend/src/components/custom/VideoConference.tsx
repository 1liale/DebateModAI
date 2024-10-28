import { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import { ChatNotes } from './ChatNotes'

interface VideoConferenceProps {
  roomId: string
  onLeaveRoom: () => void
}

interface PeerConnection {
  peerId: string
  peer: Peer.Instance
  stream: MediaStream
}

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
}

export function VideoConference({ roomId, onLeaveRoom }: VideoConferenceProps) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [peers, setPeers] = useState<PeerConnection[]>([
    {
      peerId: '1',
      peer: new Peer({ initiator: true, trickle: false }) as Peer.Instance,
      stream: new MediaStream()
    },
    // {
    //   peerId: '2', 
    //   peer: new Peer({ initiator: false, trickle: false }) as Peer.Instance,
    //   stream: new MediaStream()
    // },
    // {
    //   peerId: '3', 
    //   peer: new Peer({ initiator: false, trickle: false }) as Peer.Instance,
    //   stream: new MediaStream()
    // },
    // {
    //   peerId: '4', 
    //   peer: new Peer({ initiator: false, trickle: false }) as Peer.Instance,
    //   stream: new MediaStream()
    // }
  ])
  const localVideoRef = useRef<HTMLVideoElement>(null)

  // Add new state for active speaker
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null)

  // Add state for expanded view
  const [isExpanded, setIsExpanded] = useState(false)

  console.log("peers", peers)
  console.log("activeSpeaker", activeSpeaker)
  console.log("localStream", localStream)
  console.log("localVideoRef", localVideoRef.current)

  useEffect(() => {
    // Get local video stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream)
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
        
        // Here you would implement WebSocket connection to signal server
        // and handle peer connections
      })
      .catch((err) => console.error('Error accessing media devices:', err))

    return () => {
      localStream?.getTracks().forEach(track => track.stop())
      peers.forEach(({ peer }) => peer.destroy())
    }
  }, [])

  const handleSendMessage = (message: string) => {
    // Implement send message logic
    console.log('Sending message:', message)
  }

  const handleNotesChange = (notes: string) => {
    // Implement notes saving logic
    console.log('Saving notes:', notes)
  }

  return (
    <div className="fixed inset-0 bg-black flex">
      {/* Video section - takes up 2/3 of the width */}
      <div className="w-2/3 h-full p-4">
        {peers.length === 0 ? (
          // Single video layout when no peers
          <div className="h-full relative bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">You</div>
          </div>
        ) : (
          <div className="h-full relative">
            {!isExpanded ? (
              // Normal view with active speaker and preview
              <>
                {/* Main active speaker video */}
                <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    playsInline
                    muted={activeSpeaker === 'local'}
                    className="w-full h-full object-cover"
                    ref={(ref) => {
                      if (ref) {
                        if (activeSpeaker === 'local') {
                          ref.srcObject = localStream;
                        } else {
                          const peerStream = peers.find(p => p.peerId === activeSpeaker)?.stream;
                          if (peerStream) ref.srcObject = peerStream;
                        }
                      }
                    }}
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    {activeSpeaker === 'local' ? 'You' : `Peer ${activeSpeaker}`}
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
                    muted={activeSpeaker !== 'local'}
                    className="w-full h-full object-cover"
                    ref={(ref) => {
                      if (ref) {
                        if (activeSpeaker === 'local') {
                          const peerStream = peers[0]?.stream;
                          if (peerStream) ref.srcObject = peerStream;
                        } else {
                          ref.srcObject = localStream;
                        }
                      }
                    }}
                  />
                  <div className="absolute bottom-2 left-2 text-white text-sm">
                    {activeSpeaker === 'local' ? `Peer ${peers[0]?.peerId}` : 'You'}
                  </div>
                </div>
              </>
            ) : (
              // Expanded view with active speaker on left and scrollable list on right
              <div className="h-full flex gap-4">
                {/* Active speaker video */}
                <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={activeSpeaker === 'local' ? localStream : null}
                    autoPlay
                    muted={activeSpeaker === 'local'}
                    playsInline
                    className="w-full h-full object-cover"
                    {...(activeSpeaker !== 'local' && {
                      ref: (ref) => {
                        if (ref) {
                          const stream = peers.find(p => p.peerId === activeSpeaker)?.stream;
                          if (stream) {
                            ref.srcObject = stream;
                          }
                        }
                      }
                    })}
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    {activeSpeaker === 'local' ? 'You' : 'Speaker'}
                  </div>
                </div>

                {/* Scrollable list of other participants */}
                <div className="w-64 h-full overflow-y-auto space-y-4 px-1">
                  {/* All videos (local + peers) except active speaker */}
                  {[
                    { peerId: 'local', stream: localStream },
                    ...peers
                  ]
                    .filter(peer => peer.peerId !== activeSpeaker)
                    .map(({ peerId, stream }) => (
                      <div
                        key={peerId}
                        className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video cursor-pointer hover:ring-2 hover:ring-blue-500"
                        onClick={() => setActiveSpeaker(peerId)}
                      >
                        <video
                          autoPlay
                          playsInline
                          muted={peerId === 'local'}
                          className="w-full h-full object-cover"
                          ref={(ref) => {
                            if (ref) {
                              ref.srcObject = stream;
                            }
                          }}
                        />
                        <div className="absolute bottom-2 left-2 text-white text-sm">
                          {peerId === 'local' ? 'You' : 'Peer'}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat/Notes section remains unchanged */}
      <div className="w-1/3 h-full">
        <ChatNotes 
          onSendMessage={handleSendMessage}
          onNotesChange={handleNotesChange}
        />
      </div>
    </div>
  )
}
