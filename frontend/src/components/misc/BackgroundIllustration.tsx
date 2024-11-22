import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface BackgroundIllustrationProps {
  multiple?: boolean;
}

export default function BackgroundIllustration({ multiple = false }: BackgroundIllustrationProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null;

  // Don't render opacity classes until mounted to avoid hydration mismatch
  const opacityClass = mounted ? (theme === 'dark' ? 'opacity-100' : 'opacity-40') : 'opacity-40';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/4 ${opacityClass}`}
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={Illustration}
          width={846}
          height={594}
          priority
          alt="Page illustration"
        />
      </div>
      {multiple && (
        <>
          <div
            className={`pointer-events-none absolute left-1/2 top-[400px] -mt-20 -translate-x-full blur-2xl`}
            aria-hidden="true"
          >
            <div className={`w-[760px] h-[668px] rounded-full ${
              theme === 'light' ? 'bg-blue-50/30 dark:bg-blue-900/20' : 'bg-gray-800/30'
            }`} />
          </div>
          <div
            className={`pointer-events-none absolute left-1/2 top-[440px] -translate-x-1/3 blur-2xl`}
            aria-hidden="true"
          >
            <div className={`w-[760px] h-[668px] rounded-full ${
              theme === 'light' ? 'bg-indigo-50/30 dark:bg-indigo-900/20' : 'bg-indigo-900/20'
            }`} />
          </div>
        </>
      )}
    </div>
  );
} 