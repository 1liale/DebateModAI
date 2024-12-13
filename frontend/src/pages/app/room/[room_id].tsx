import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { LinkButton } from "@/components/base/Buttons";

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100% - var(--lk-control-bar-height))' }}>
      <ParticipantTile />
    </GridLayout>
  );
}

export default function RoomPage() {
  const router = useRouter();
  const { room_id, username } = router.query;
  const [token, setToken] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (room_id && username) {
      const timeoutId = setTimeout(() => {
        if (!token) {
          setShowError(true);
        }
      }, 2000);

      (async () => {
        try {
          const resp = await fetch(`/api/get-participant-token?room=${room_id}&username=${username}`);
          if (!resp.ok) {
            throw new Error('Failed to get token');
          }
          const data = await resp.json();
          setToken(data.token);
        } catch (e) {
          console.error(e);
          setShowError(true);
        }
      })();

      return () => clearTimeout(timeoutId);
    }
  }, [room_id, username]);

  if (!room_id || !username) {
    return null;
  }

  if (token === '') {
    return (
      <div className="flex w-full h-[calc(100vh-100px)] bg-background p-4 md:p-8">
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="w-8 h-8" />
        </div>
        
        <Dialog open={showError} onOpenChange={setShowError}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unable to join room</DialogTitle>
            </DialogHeader>
            <p>There was an error joining the room. Please try again.</p>
            <DialogFooter>
              <LinkButton href="/app/room">
                Back to Join Page
              </LinkButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100%', width: '100%' }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
}
