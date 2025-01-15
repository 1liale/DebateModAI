import { useEffect, useState } from "react";
import { TypographyLarge } from "@/components/base/Typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getMessages, sendMessage } from "@/server/resolver/chat";
import { ref, query, orderByChild, onValue, off } from "firebase/database";
import { realtime_db as realtimeDb, firebase_auth as auth } from "@/config/firebase";
import { ChatCard } from "@/components/base/Cards";

type ChatMessage = {
  id: string;
  user_id: string;
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
    // Set up real-time listener
    const messagesRef = ref(realtimeDb, `messages/${roomId}`);
    const messagesQuery = query(messagesRef, orderByChild("timestamp"));
    
    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const messages: ChatMessage[] = [];
        snapshot.forEach((childSnapshot) => {
          messages.push({
            id: childSnapshot.key!,
            ...childSnapshot.val()
          });
        });
        setMessages(messages);
      }
    });

    // Cleanup listener on unmount
    return () => {
      off(messagesQuery);
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await sendMessage(roomId, {
        username: username,
        text: newMessage.trim(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border">
        <TypographyLarge className="font-semibold text-foreground">
          Chat
        </TypographyLarge>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <ChatCard
            key={message.id}
            message={message}
            isOwnMessage={message.username === username}
          />
        ))}
      </ScrollArea>

      <div className="p-4 border-t border-border flex gap-2 bg-[hsl(var(--chat-input))]">
        <Input
          className="bg-background/50 border-border/50 text-foreground"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};
