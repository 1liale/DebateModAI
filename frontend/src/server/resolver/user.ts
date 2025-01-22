import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { firestore_db as db } from '@/config/firebase';
import { User } from '@/lib/types/user';

type UserInput = {
  displayName: string;
  email: string;
  role?: 'instructor' | 'learner';
  photoURL?: string;
  experience?: 'beginner' | 'intermediate' | 'advanced';
  language?: string;
  timezone?: string;
  location?: string;
  bio?: string;
};

export async function createUser(userId: string, userData: UserInput) {
  try {
    const userDoc = {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    await setDoc(doc(db, 'users', userId), userDoc);
    console.log("Created user in Firestore", userDoc);
    return userDoc;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUser(userId: string): Promise<User | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      ...data,
      id: userId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as User;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser(userId: string, data: Partial<DocumentData>) {
  try {
    const userRef = doc(db, 'users', userId);
    const updates = {
      ...data,
      updatedAt: Timestamp.now()
    };
    await updateDoc(userRef, updates);
    return updates;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
} 