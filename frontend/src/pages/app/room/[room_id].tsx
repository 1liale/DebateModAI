import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {  PrimaryButton } from "@/components/base/Buttons";
import { useRoom } from '@/components/providers/RoomProvider';
import { Banner } from "@/components/base/Banner";
import { VideoConference } from '@/components/room/VideoConference';
import { TypographyP } from '@/components/base/Typography';
import { Chat } from '@/components/room/Chat';
import { SimpleVoiceAssistant } from '@/components/room/SimpleVoiceAssistant';
import { firestore_db as db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Page = () => {
  const router = useRouter();
  const { activeRoom, activeUsername, setActiveRoom, setActiveUsername } = useRoom();
  const { room_id } = router.query as { room_id: string };
  const [token, setToken] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      // Ensure we have both room_id and username from context
      if (!room_id || !activeUsername) {
        setError("Missing room ID or username");
        setOpen(true);
        return;
      }

      try {
        const topicDoc = await getDoc(doc(db, 'topics', room_id));
        const currentTopic = topicDoc.exists() ? topicDoc.data() : null;
        
        setTopic(currentTopic?.motion || "");
        
        const tokenResp = await fetch('/api/livekit/room-setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: room_id,
            username: activeUsername,
            topic: currentTopic
          }),
        });
        
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

    if (room_id) {
      setActiveRoom(room_id as string);
      getToken();
    }
  }, [room_id, activeUsername]);

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
              {topic}
            </Banner>
          </div>
          
          <div className="flex-1 relative min-h-0">
            <SimpleVoiceAssistant />
            <VideoConference />
            <RoomAudioRenderer />
            <ControlBar/>
          </div>
        </div>
        <div className="w-80 h-full border-l border-border">
          <Chat roomId={room_id as string} username={activeUsername as string} />
        </div>
        
      </div>
    </LiveKitRoom>
  );
}

export default Page;