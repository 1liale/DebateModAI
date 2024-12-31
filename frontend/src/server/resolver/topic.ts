import { 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { firestore_db as db } from '@/config/firebase';

export type TopicInput = {
  title: string;
  description: string;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  createdBy: string;
  tags?: string[];
};

export async function createTopic(data: TopicInput) {
  const topicRef = doc(collection(db, 'topics'));
  const topicData = {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  
  await setDoc(topicRef, topicData);
  return { id: topicRef.id, ...topicData };
}

export async function getTrendingTopics(limit_count: number = 10) {
  const topicsQuery = query(
    collection(db, 'topics'),
    orderBy('debateCount', 'desc'),
    limit(limit_count)
  );
  
  const snapshot = await getDocs(topicsQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getTopicsByCategory(category: string) {
  const topicsQuery = query(
    collection(db, 'topics'),
    where('category', '==', category)
  );
  const snapshot = await getDocs(topicsQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getTopicsByDifficulty(difficulty: string) {
  const topicsQuery = query(
    collection(db, 'topics'),
    where('difficulty', '==', difficulty)
  );
  const snapshot = await getDocs(topicsQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getTopic(topicId: string): Promise<DocumentData | null> {
  const docSnap = await getDoc(doc(db, 'topics', topicId));
  return docSnap.exists() ? { id: topicId, ...docSnap.data() } : null;
}

export async function incrementTopicDebateCount(topicId: string) {
  const topicRef = doc(db, 'topics', topicId);
  const docSnap = await getDoc(topicRef);
  
  if (!docSnap.exists()) {
    throw new Error('Topic not found');
  }

  const currentCount = docSnap.data().debateCount || 0;
  await setDoc(topicRef, { 
    debateCount: currentCount + 1,
    updatedAt: Timestamp.now()
  }, { merge: true });
}
