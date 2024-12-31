import { useEffect, useState } from "react";
import { TypographyLarge } from "@/components/base/Typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  senderId: string;
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
    // Initial load of messages
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?conversationId=${roomId}`);
        const data = await response.json();
        console.log("DATA", data);
        if (data) {
          const messageArray = Object.entries(data).map(([id, msg]: [string, any]) => ({
            id,
            ...msg,
          }));
          setMessages(messageArray);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]);
      }
    };

    loadMessages();
  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/chat/messages?conversationId=${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: username,
          text: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
              message.senderId === username
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-[hsl(var(--chat-bg))] text-foreground"
            )}
          >
            <div className="text-sm font-medium">{message.senderId}</div>
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
