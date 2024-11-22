import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';

export default function Page() {
  const [token, setToken] = useState('');
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [showPrejoin, setShowPrejoin] = useState(true);
  
  // Skip token fetching logic until user completes prejoin
  useEffect(() => {
    if (roomId && username && !showPrejoin) {
      (async () => {
        try {
          const resp = await fetch(`/api/get-participant-token?room=${roomId}&username=${username}`);
          const data = await resp.json();
          setToken(data.token);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [roomId, username, showPrejoin]);

  if (showPrejoin) {
    return <PrejoinScreen 
      onJoin={(room: string, name: string) => {
        setRoomId(room);
        setUsername(name);
        setShowPrejoin(false);
      }} 
    />;
  }

  if (token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}

function PrejoinScreen({ onJoin }: { onJoin: (room: string, name: string) => void }) {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Join Meeting</h1>
        
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex space-x-4">
          <button
            onClick={() => setVideoEnabled(!videoEnabled)}
            className={`p-2 rounded ${videoEnabled ? 'bg-blue-500' : 'bg-gray-500'}`}
          >
            {videoEnabled ? 'Camera On' : 'Camera Off'}
          </button>
          
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded ${audioEnabled ? 'bg-blue-500' : 'bg-gray-500'}`}
          >
            {audioEnabled ? 'Mic On' : 'Mic Off'}
          </button>
        </div>

        <button
          onClick={() => {
            if (roomId && username) {
              onJoin(roomId, username);
            }
          }}
          disabled={!roomId || !username}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}