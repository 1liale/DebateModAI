import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { firebase_auth } from '@/config/firebase';
import { getUser } from '@/server/resolver/user';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const router = useRouter();
  
  // TODO: not ideal solution BUT works for now
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, async (user) => {
      if (!user) {
        return;
      }

      try {
        const userData = await getUser(user.uid);
        if (!userData?.onboardingComplete) {
          router.replace('/onboarding');
        } else {
          router.replace('/app/dashboard');
        }
      } catch (error) {
        console.error('Error checking user onboarding status:', error);
        router.replace('/onboarding');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
