import { ReactNode, useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { firebase_auth } from '@/config/firebase';
import { createUser } from '@/server/resolver/user';
import { useAuth, useUser } from '@clerk/nextjs';
import { signInWithCustomToken } from 'firebase/auth';

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

export function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
  const { isLoading, error } = useFirebaseAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error) {
    console.error('Firebase Authentication Error:', error);
    // You might want to show a more user-friendly error message
    return null;
  }

  return <>{children}</>;
}
// Try not to touch this; should be correctly configured
export const useFirebaseAuth = () => {
    const { getToken } = useAuth();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const initializeAuth = async () => {
        if (!user) {
          setIsLoading(false);
          return;
        }
  
        try {
          // Get Firebase token from Clerk
          const token = await getToken({ template: 'integration_firebase' });
          
          if (!token) {
            throw new Error('No Firebase token received from Clerk');
          }
  
          // Sign in to Firebase and get auth result
          const userCredential = await signInWithCustomToken(firebase_auth, token);
 
          // Check if metadata indicates this is a first-time sign in
          const metadata = userCredential.user.metadata;
          const isNewUser = metadata.creationTime === metadata.lastSignInTime;
  
          // If this is a new user, create their profile in Firestore
          if (isNewUser) {
            await createUser(userCredential.user.uid, {
              displayName: user.fullName || user.username || '',
              email: user.primaryEmailAddress?.emailAddress || '',
              photoURL: user.imageUrl,
            });
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to initialize Firebase auth'));
          console.error('Firebase auth error:', err);
        } finally {
          setIsLoading(false);
        }
      };
  
      initializeAuth();
    }, [user, getToken]);
  
    return { isLoading, error };
  } 
