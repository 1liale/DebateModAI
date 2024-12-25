import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import DotGrid from "@/public/images/dot-grid.png";
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

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid pattern for light theme */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `url(${DotGrid.src})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto'
          }}
        />
      )}
      
      {/* Original illustration for dark theme */}
      {theme === 'dark' && (
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/4 opacity-100"
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
      )}

      {multiple && theme === 'dark' && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-[400px] -mt-20 -translate-x-full blur-2xl"
            aria-hidden="true"
          >
            <div className="w-[760px] h-[668px] rounded-full bg-gray-800/30" />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-[440px] -translate-x-1/3 blur-2xl"
            aria-hidden="true"
          >
            <div className="w-[760px] h-[668px] rounded-full bg-indigo-900/20" />
          </div>
        </>
      )}
    </div>
  );
} 