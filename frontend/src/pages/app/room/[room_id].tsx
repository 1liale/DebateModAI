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
import { Track, DisconnectReason } from 'livekit-client';
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { LinkButton } from "@/components/base/Buttons";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRoom } from '@/contexts/RoomContext';
import { TypographyLarge } from '@/components/base/Typography';
import { Banner } from "@/components/base/Banner";

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Add ChatMessage type
type ChatMessage = {
  id: string;
  username: string;
  text: string;
  timestamp: number;
};

function ChatPanel({ roomId, username }: { roomId: string; username: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const chatRef = ref(database, `chats/${roomId}`);
    
    // Listen for new messages
    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const message = snapshot.val();
      setMessages(prev => [...prev, { ...message, id: snapshot.key }]);
    });

    return () => {
      // Cleanup subscription
      unsubscribe();
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatRef = ref(database, `chats/${roomId}`);
    await push(chatRef, {
      username,
      text: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage('');
  };

  return (
    <div className="w-80 h-full flex flex-col bg-background border-l border-border">
      <div className="p-4 border-b border-border">
        <TypographyLarge className="font-semibold text-foreground">Chat</TypographyLarge>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "mb-4 max-w-[80%] rounded-lg p-2",
              message.username === username 
                ? "ml-auto bg-primary text-primary-foreground" 
                : "bg-[hsl(var(--chat-bg))] text-foreground"
            )}
          >
            <div className="text-sm font-medium">{message.username}</div>
            <div className="text-sm">{message.text}</div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t border-border flex gap-2 bg-[hsl(var(--chat-input))]">
        <Input
          className="bg-background/50 border-border/50 text-foreground"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}

function VideoConference() {
  const [trackReady, setTrackReady] = useState(false);
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { 
      onlySubscribed: false,
      updateOnlyOn: ['subscribed', 'unsubscribed'],
    },
  );

  useEffect(() => {
    // Add a small delay to ensure proper track initialization
    const timer = setTimeout(() => {
      setTrackReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setTrackReady(false);
    };
  }, []);

  if (!trackReady) {
    return <div className="flex items-center justify-center h-full">
      <Spinner className="w-8 h-8" />
    </div>;
  }

  return (
    <GridLayout 
      tracks={tracks} 
      style={{ height: 'calc(100% - var(--lk-control-bar-height))' }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

export default function RoomPage() {
  const router = useRouter();
  const { setActiveRoom, setActiveUsername } = useRoom();
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

      setActiveRoom(room_id as string);
      setActiveUsername(username as string);

      return () => clearTimeout(timeoutId);
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

  if (!room_id || !username) {
    return null;
  }

  if (token === '') {
    return (
      <div className="flex-1 flex bg-background p-4 md:p-8">
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
        <ChatPanel roomId={room_id as string} username={username as string} />
      </div>
    </LiveKitRoom>
  );
}
