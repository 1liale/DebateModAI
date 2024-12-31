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
} from "firebase/database";
import {
  firestore_db as db,
  firebase_auth,
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
  return { id: conversationRef.id, ...conversationData };
}

export async function sendMessage(
  conversationId: string,
  message: MessageInput
) {
  const chatRef = ref(realtimeDb, `chats/${conversationId}`);
  const newMessageRef = push(chatRef);

  const messageData = {
    ...message,
    timestamp: Date.now(),
  };

  await setDoc(newMessageRef, messageData);
  await updateConversationLastMessage(
    conversationId,
    message.text.substring(0, 100)
  );

  return { id: newMessageRef.key, ...messageData };
}

export async function getMessages(conversationId: string, limit: number = 50) {
  const currentUser = firebase_auth.currentUser;
  console.log("CURRENT USER", currentUser);

  const chatRef = ref(realtimeDb, `chats/${conversationId}`);
  const messagesQuery = query(
    chatRef,
    orderByChild("timestamp"),
    limitToLast(limit)
  );
  const snapshot = await get(messagesQuery);
  return snapshot.exists() ? snapshot.val() : null;
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
