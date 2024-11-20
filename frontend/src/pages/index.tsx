import BackgroundIllustration from "@/components/custom/BackgroundIllustration";
import { Header } from "@/components/layout/Header";
import { PrimaryButton } from "@/components/base/Buttons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const HeroSection = () => (
  <section className="flex items-center justify-center text-center relative h-[calc(100vh-120px)]">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Debate with Confidence
      </h1>
      <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
        Elevate your debate skills with our AI-powered platform - practice
        anytime, anywhere, and receive instant feedback to become a better
        debater.
      </p>
      <div className="flex gap-4 justify-center">
        <PrimaryButton>Start Your Debate Journey Today!</PrimaryButton>
      </div>
    </div>
  </section>
);

export const HowItWorksSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          How it works
        </Badge>
        <h2 className="text-4xl font-bold mb-4">With us, debating is easy</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Effortless debate practice for individuals, powerful solutions for debate clubs and institutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900/50 rounded-xl p-8">
          <div className="text-gray-400 mb-4">01</div>
          <h3 className="text-xl font-semibold mb-4">Choose your topic</h3>
          <p className="text-gray-400">
            Select from our curated list of debate topics or input your own custom motion.
          </p>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-8">
          <div className="text-gray-400 mb-4">02</div>
          <h3 className="text-xl font-semibold mb-4">Set your preferences</h3>
          <p className="text-gray-400">
            Choose your debate format, speaking time, and difficulty level.
          </p>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-8">
          <div className="text-gray-400 mb-4">03</div>
          <h3 className="text-xl font-semibold mb-4">Start debating</h3>
          <p className="text-gray-400">
            Begin your debate session with our AI opponent and receive real-time feedback.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const BenefitsSection = () => (
  <section className="py-24 bg-gray-900/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          Benefits
        </Badge>
        <h2 className="text-4xl font-bold mb-4">Your all-purpose debate training app</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover our advanced features. Unlimited practice for individuals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Real-time feedback</h3>
          <p className="text-gray-400 mb-6">
            Get instant analysis of your arguments, rhetoric, and delivery to improve your debating skills.
          </p>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Comprehensive analytics</h3>
          <p className="text-gray-400 mb-6">
            Track your progress over time with detailed performance metrics and improvement suggestions.
          </p>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Multiple formats</h3>
          <p className="text-gray-400 mb-6">
            Practice in various debate styles including British Parliamentary, Lincoln-Douglas, and more.
          </p>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">24/7 availability</h3>
          <p className="text-gray-400 mb-6">
            Practice whenever you want, with no scheduling constraints or partner requirements.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const SocialProofSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          Testimonials
        </Badge>
        <h2 className="text-4xl font-bold mb-4">Don't take our word for it</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Our users are our best ambassadors. Discover why we're the top choice for debate practice.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-video">
          <YoutubeEmbed videoId="your-video-id" />
        </div>

        <div className="grid gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900/50 rounded-xl p-8">
              <p className="text-xl mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const YoutubeEmbed = ({ videoId }: { videoId: string }) => (
  <div className="relative pb-[56.25%] h-0">
    <iframe
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

const testimonials = [
  {
    quote: "This AI debate platform has transformed how I practice. It's incredibly effective!",
    name: "Sarah Johnson",
    title: "National Debate Champion",
    avatar: "/avatars/sarah.jpg"
  },
  {
    quote: "The real-time feedback has helped me improve faster than traditional practice methods.",
    name: "Michael Chen",
    title: "Debate Team Coach",
    avatar: "/avatars/michael.jpg"
  }
];

export const Footer = () => (
  <footer className="fixed bottom-0 w-full border-gray-800/20 py-4 backdrop-blur-sm">
    <div className="container mx-auto px-4 text-center text-sm text-gray-500">
      © 2024 DebateModAI. All rights reserved.
    </div>
  </footer>
);

export default function Page() {
  return (
    <>
      <BackgroundIllustration multiple />
      <div className="min-h-screen pt-[80px] pb-[40px]">
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <BenefitsSection />
          <SocialProofSection />
        </main>
      </div>
      <Footer />
    </>
  );
}
