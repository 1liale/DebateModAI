import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import BackgroundIllustration from "@/components/custom/BackgroundIllustration";

export const Header = () => (
  <header className="border-b-2 border-gray-600/20 bg-gray-950/70 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Gavel className="h-6 w-6 text-indigo-500" />
        <span className="text-xl font-semibold">DebateModAI</span>
      </Link>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <div className="flex items-center space-x-2">
          <Button
            size="lg"
            variant="outline"
            className="border border-gray-700 bg-transparent hover:border-gray-800/50"
          >
            <SignInButton />
          </Button>
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <SignUpButton>Register</SignUpButton>
          </Button>
        </div>
      </SignedOut>
    </div>
  </header>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-hidden">
      <BackgroundIllustration multiple />
      <Header />
      <main className="flex-grow">
        <section className="flex items-center justify-center text-center relative min-h-[80vh]">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Practice Debate with Confidence
            </h1>
            <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
              Elevate your debate skills with our AI-powered platform - practice
              anytime, anywhere, and receive instant feedback to become a better
              debater.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border border-gray-700 bg-transparent hover:border-gray-800/50"
              >
                Start Your Debate Journey Today!
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800/20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2024 DebateModAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
