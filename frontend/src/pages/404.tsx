import { PrimaryButton } from "@/components/base/Buttons";
import Link from "next/link";
import BackgroundIllustration from "@/components/custom/BackgroundIllustration";
import { Header } from "@/components/layout/Header";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-hidden">
      <BackgroundIllustration />
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-gray-300">
            Access Denied
          </h2>
          <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
            It seems you don't have permission to access this page. Please sign in to continue.
          </p>
          <Link href="/">
            <PrimaryButton>
              Return Home
            </PrimaryButton>
          </Link>
        </div>
      </main>
      <footer className="border-t border-gray-800/20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2024 DebateModAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 