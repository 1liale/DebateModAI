import {
  ref,
  push,
  get,
  query,
  limitToLast,
  set,
  serverTimestamp,
} from "firebase/database";
import {
  realtime_db as realtimeDb,
  firebase_auth as auth,
} from "@/config/firebase";

export type ChatMessage = {
  id?: string;
  user_id?: string;
  username: string;
  text: string;
  timestamp: any;
};

type MessageInput = {
  username: string;
  text: string;
};

export async function sendMessage(
  conversationId: string,
  message: MessageInput
) {
  console.log("sending chat message", message)

  try {
    // Get references
    const messagesRef = ref(realtimeDb, `messages/${conversationId}`);
    const newMessageRef = push(messagesRef);

    const currentUser = await auth.currentUser;

    // Message data with server timestamp
    const messageData: ChatMessage = {
      user_id: currentUser?.uid,
      username: message.username,
      text: message.text,
      timestamp: serverTimestamp()
    };

    console.log("messageData", messageData)

    // Write message
    await set(newMessageRef, messageData);

    return { 
      id: newMessageRef.key, 
      ...messageData,
    };

  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}

export async function getMessages(conversationId: string, limit: number = 50) {
  try {
    const messagesRef = ref(realtimeDb, `messages/${conversationId}`);
    const messagesQuery = query(
      messagesRef,
      limitToLast(limit)
    );

    const snapshot = await get(messagesQuery);

    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }

    console.log("No messages found");
    return [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

export async function deleteAllMessages(conversationId: string) {
  try {
    const messagesRef = ref(realtimeDb, `messages/${conversationId}`);
    await set(messagesRef, null); // Setting to null removes the node in Firebase
    return true;
  } catch (error) {
    console.error("Error deleting messages:", error);
    throw new Error("Failed to delete messages");
  }
}
