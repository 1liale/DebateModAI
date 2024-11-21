import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import { useTheme } from "next-themes";

interface BackgroundIllustrationProps {
  multiple?: boolean;
}

export default function BackgroundIllustration({ multiple = false }: BackgroundIllustrationProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/4 ${
          isDark ? 'opacity-100' : 'opacity-40'
        }`}
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
              isDark 
                ? 'bg-gray-800/30' 
                : 'bg-blue-50/30 dark:bg-blue-900/20'
            }`} />
          </div>
          <div
            className={`pointer-events-none absolute left-1/2 top-[440px] -translate-x-1/3 blur-2xl`}
            aria-hidden="true"
          >
            <div className={`w-[760px] h-[668px] rounded-full ${
              isDark 
                ? 'bg-indigo-900/20' 
                : 'bg-indigo-50/30 dark:bg-indigo-900/20'
            }`} />
          </div>
        </>
      )}
    </div>
  );
} 