import { initializeApp } from "firebase/app";
import { getDatabase, onChildAdded, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { TypographyLarge } from "@/components/base/Typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export const Chat = ({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatRef = ref(database, `chats/${roomId}`);

    // Listen for new messages
    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const message = snapshot.val();
      setMessages((prev) => [...prev, { ...message, id: snapshot.key }]);
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

    setNewMessage("");
  };

  return (
    <div className="w-80 h-full flex flex-col bg-background border-l border-border">
      <div className="p-4 border-b border-border">
        <TypographyLarge className="font-semibold text-foreground">
          Chat
        </TypographyLarge>
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};
