import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {  PrimaryButton } from "@/components/base/Buttons";
import { useRoom } from '@/components/providers/RoomProvider';
import { Banner } from "@/components/base/Banner";
import { Chat } from "@/components/room/Chat";
import { VideoConference } from '@/components/room/VideoConference';
import { TypographyP } from '@/components/base/Typography';

const Page = () => {
  const router = useRouter();
  const { setActiveRoom, setActiveUsername } = useRoom();
  const { room_id, username } = router.query;
  const [token, setToken] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        // First get the participant token
        const tokenResp = await fetch(`/api/livekit/get-token?room=${room_id}&username=${username}`);
        const result = await tokenResp.json();
        if (!tokenResp.ok) {
          throw new Error(result.error);
        }
        setToken(result.token);      
      } catch (e) {
        setError((e as Error).message);
        setOpen(true);
      }
    };

    if (room_id && username) {
      setActiveRoom(room_id as string);
      setActiveUsername(username as string);
      getToken();
    }
  }, [room_id, username]);

  const handleDisconnect = async () => {
    try {
      // Clear room context
      setActiveRoom(null);
      setActiveUsername(null);
      
      // Redirect to room page
      await router.push('/app/room');
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  };

  // Exception handling
  if (!token || error) {
    return (
      <div className="flex-1 flex bg-background p-4 md:p-8">
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="w-8 h-8" /> {error}
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unable to join room</DialogTitle>
            </DialogHeader>
            <TypographyP>There was an error joining the room: {error}</TypographyP>
            <DialogFooter>
              <PrimaryButton onClick={handleDisconnect}>
                Back to Join Page
              </PrimaryButton>
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
      onDisconnected={handleDisconnect}
      className="light:bg-background dark:bg-background"
      connect={true}
      connectOptions={{
        autoSubscribe: true
      }}
    >
      <div className="flex h-full max-h-screen overflow-hidden">
        <div className="flex-1 bg-background flex flex-col min-h-0">
          <div className="p-2 flex-shrink-0">
            <Banner>
            THB social media has done more harm than good to the development of youth in the country.
            </Banner>
          </div>
          
          <div className="flex-1 relative min-h-0">
            <VideoConference />
            <RoomAudioRenderer />
            <ControlBar />
          </div>
        </div>
        <Chat roomId={room_id as string} username={username as string} />
      </div>
    </LiveKitRoom>
  );
}

export default Page;