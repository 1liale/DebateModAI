import Image from "next/image";
import Illustration from "@/public/images/page-illustration.svg";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";

interface BackgroundIllustrationProps {
  multiple?: boolean;
}

export default function BackgroundIllustration({ multiple = false }: BackgroundIllustrationProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/4"
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
            className="pointer-events-none absolute left-1/2 top-[400px] -mt-20 -translate-x-full opacity-50 blur-2xl"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={BlurredShapeGray}
              width={760}
              height={668}
              alt="Blurred shape"
            />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-[440px] -translate-x-1/3 blur-2xl"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={BlurredShape}
              width={760}
              height={668}
              alt="Blurred shape"
            />
          </div>
        </>
      )}
    </div>
  );
} 