import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import DotGrid from "@/public/images/dot-grid.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export default function BackgroundIllustration() {
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
    </div>
  );
} 