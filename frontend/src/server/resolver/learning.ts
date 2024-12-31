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
  deleteDoc
} from 'firebase/firestore';
import { 
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { firestore_db, cloud_storage } from '@/config/firebase';

export type LearningContentInput = {
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'article' | 'markdown';
  tags?: string[];
  createdBy: string;
  content?: string; // Markdown content or external URL
  file?: File;     // For uploaded files
};

export async function createLearningContent(data: LearningContentInput) {
  const contentRef = doc(collection(firestore_db, 'learningContents'));
  let resourceURL = data.content; // Use content as URL if it's an external resource

  // Handle file upload if present
  if (data.file) {
    const fileRef = ref(cloud_storage, `learning-content/${contentRef.id}/${data.file.name}`);
    await uploadBytes(fileRef, data.file);
    resourceURL = await getDownloadURL(fileRef);
  }

  const contentData = {
    title: data.title,
    description: data.description,
    type: data.type,
    tags: data.tags || [],
    createdBy: data.createdBy,
    resourceURL,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };

  await setDoc(contentRef, contentData);
  return { id: contentRef.id, ...contentData };
}

export async function getLearningContent(contentId: string) {
  const docSnap = await getDoc(doc(firestore_db, 'learningContents', contentId));
  return docSnap.exists() ? { id: contentId, ...docSnap.data() } : null;
}

export async function getLearningContentsByType(type: string, limit_count: number = 10) {
  const contentQuery = query(
    collection(firestore_db, 'learningContents'),
    where('type', '==', type),
    orderBy('createdAt', 'desc'),
    limit(limit_count)
  );
  
  const snapshot = await getDocs(contentQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getLearningContentsByTags(tags: string[]) {
  const contentQuery = query(
    collection(firestore_db, 'learningContents'),
    where('tags', 'array-contains-any', tags)
  );
  
  const snapshot = await getDocs(contentQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateLearningContent(
  contentId: string, 
  data: Partial<LearningContentInput>
) {
  const contentRef = doc(firestore_db, 'learningContents', contentId);
  const updates: any = {
    ...data,
    updatedAt: Timestamp.now()
  };

  // Handle file update if present
  if (data.file) {
    const fileRef = ref(cloud_storage, `learning-content/${contentId}/${data.file.name}`);
    await uploadBytes(fileRef, data.file);
    updates.resourceURL = await getDownloadURL(fileRef);
  }

  await setDoc(contentRef, updates, { merge: true });
  return { id: contentId, ...updates };
}

export async function deleteLearningContent(contentId: string) {
  const contentRef = doc(firestore_db, 'learningContents', contentId);
  const docSnap = await getDoc(contentRef);

  if (!docSnap.exists()) {
    throw new Error('Content not found');
  }

  // Delete associated file from storage if it exists
  const data = docSnap.data();
  if (data.resourceURL && data.resourceURL.includes('firebase')) {
    const fileRef = ref(cloud_storage, data.resourceURL);
    await deleteObject(fileRef);
  }

  await deleteDoc(contentRef);
  return { id: contentId, deleted: true };
}
