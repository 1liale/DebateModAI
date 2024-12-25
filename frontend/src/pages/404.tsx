import { PrimaryButton } from "@/components/base/Buttons";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-6 text-gray-600 dark:text-gray-300">
            Access Denied / Page Not Found
          </h2>
          <p className="text-xl mb-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            This page doesn't exist or you don't have permission to access it. Please sign in or check the URL.
          </p>
          <PrimaryButton>
            <Link href="/">
              Return Home
            </Link>
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
} 