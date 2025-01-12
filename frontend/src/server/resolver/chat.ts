import {
  doc,
  setDoc,
  collection,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  push,
  get,
  query,
  orderByChild,
  limitToLast,
  set,
  serverTimestamp,
  onDisconnect,
} from "firebase/database";
import {
  firestore_db as db,
  firebase_auth as auth,
  realtime_db as realtimeDb,
} from "@/config/firebase";

type ConversationInput = {
  participants: string[];
  topicId?: string;
};

type MessageInput = {
  senderId: string;
  text: string;
  type?: "text" | "image" | "file";
};

export async function createConversation(data: ConversationInput) {
  const conversationRef = doc(collection(db, "conversations"));
  const conversationData = {
    ...data,
    createdAt: Timestamp.now(),
    lastMessageAt: Timestamp.now(),
    lastMessagePreview: "",
  };

  await setDoc(conversationRef, conversationData);
  
  // Create RTDB reference for messages
  const chatRef = ref(realtimeDb, `messages/${conversationRef.id}`);
  await set(chatRef, {
    metadata: {
      createdAt: serverTimestamp(),
      participants: data.participants
    }
  });

  return { id: conversationRef.id, ...conversationData };
}

export async function sendMessage(
  conversationId: string,
  message: MessageInput
) {
  try {
    // Get references
    const messagesRef = ref(realtimeDb, `messages/${conversationId}/chat`);
    const newMessageRef = push(messagesRef);

    // Message data with server timestamp
    const messageData = {
      senderId: message.senderId,
      text: message.text,
      type: message.type || "text",
      timestamp: serverTimestamp(),
      status: "sent"
    };

    // Write message
    await set(newMessageRef, messageData);

    // Update conversation metadata
    await updateConversationLastMessage(
      conversationId,
      message.text.substring(0, 100)
    );

    // Handle offline cleanup
    onDisconnect(newMessageRef).remove();

    return { 
      id: newMessageRef.key, 
      ...messageData,
      timestamp: Date.now() // Client timestamp for immediate UI update
    };

  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}

export async function getMessages(conversationId: string, limit: number = 50) {
  try {
    const messagesRef = ref(realtimeDb, `messages/${conversationId}/chat`);
    const messagesQuery = query(
      messagesRef,
      orderByChild("timestamp"),
      limitToLast(limit)
    );

    const snapshot = await get(messagesQuery);
    
    if (!snapshot.exists()) {
      return [];
    }

    // Convert to array and add IDs
    const messages: any[] = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    return messages;

  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

async function updateConversationLastMessage(
  conversationId: string,
  lastMessagePreview: string
) {
  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessageAt: Timestamp.now(),
    lastMessagePreview,
  });
}
