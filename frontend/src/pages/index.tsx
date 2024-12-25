import { PrimaryButton } from "@/components/base/Buttons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { StepCard, BenefitCard } from "@/components/base/Cards";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyH3,
} from "@/components/base/Typography";
import { YoutubeEmbed } from "@/components/misc/YoutubeEmbed";
import { SignUpButton } from "@clerk/nextjs";
import { MessageSquare, BarChart2, Layout, Clock } from "lucide-react";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";

export const HeroSection = () => (
  <section id="hero" className="flex items-center justify-center text-center relative min-h-screen md:pt-48">
    <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-16 md:gap-20">
      <div className="flex flex-col gap-8 pt-12">
        <TypographyH1 className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent text-3xl md:text-7xl">
          Debate with Confidence
        </TypographyH1>
        <TypographyLead className="max-w-3xl mx-auto text-lg md:text-3xl">
          Elevate your debate skills with our AI-powered platform - practice
          anytime, anywhere, and receive instant feedback!
        </TypographyLead>
      </div>
      <div className="flex gap-4 justify-center">
        <PrimaryButton className="px-8 py-6 text-lg">
          <SignUpButton fallbackRedirectUrl="/app">
            Start Debating Today!
          </SignUpButton>
        </PrimaryButton>
      </div>
      <Image
        src="https://media.istockphoto.com/id/1939002953/vector/businessman-silhouette-podium-debate.jpg?s=612x612&w=0&k=20&c=PTP0lCVifYdt3EliC0w5v58mDIi76csz-YFpN9K5yas="
        alt="Debate illustration"
        width={612}
        height={612}
        className="max-w-3xl w-full h-auto rounded-2xl border-2 border-gray-200 dark:border-gray-800 mt-8"
        priority
      />
    </div>
  </section>
);

export const HowItWorksSection = () => (
  <section id="how-it-works" className="min-h-screen flex items-center py-24">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          How it works
        </Badge>
        <TypographyH2 className="mb-4 border-none text-3xl md:text-5xl">
          With us, debating is easy
        </TypographyH2>
        <TypographyLead className="max-w-3xl mx-auto text-xl md:text-2xl">
          Personalized learning that adapts to your debating style
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <StepCard
          stepNumber="01"
          title="Choose your topic"
          description="Select from our curated list of debate topics or generate your own custom motion."
        />
        <StepCard
          stepNumber="02"
          title="Set your preferences"
          description="Choose your debate format, speaking time, and difficulty level."
        />
        <StepCard
          stepNumber="03"
          title="Start debating"
          description="Begin your debate session with our AI opponent and receive real-time feedback."
        />
      </div>
    </div>
  </section>
);

export const BenefitsSection = () => (
  <section id="benefits" className="min-h-screen flex items-center py-24 dark:bg-gray-900/30 bg-gray-300/20">
    <div className="container max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          Benefits
        </Badge>
        <TypographyH2 className="mb-4 border-none text-3xl md:text-5xl">
          Your all-purpose debate training app
        </TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto text-xl md:text-2xl">
         Powerful features designed to transform your debate skills
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <BenefitCard
          icon={<MessageSquare />}
          title="Real-time feedback"
          description="Get instant analysis of your arguments, rhetoric, and delivery to improve your debating skills."
        />
        <BenefitCard
          icon={<BarChart2 />}
          title="Comprehensive analytics"
          description="Track your progress over time with detailed performance metrics and improvement suggestions."
        />
        <BenefitCard
          icon={<Layout />}
          title="Multiple formats"
          description="Practice in various debate styles including British Parliamentary, Lincoln-Douglas, and more."
        />
        <BenefitCard
          icon={<Clock />}
          title="24/7 availability"
          description="Practice whenever you want, with no scheduling constraints or partner requirements."
        />
      </div>
    </div>
  </section>
);

export const SocialProofSection = () => {
  return (
    <section id="testimonials" className="min-h-screen flex items-center py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <TypographyH2 className="mb-4 border-none text-3xl md:text-5xl">
            Don't take our word for it
          </TypographyH2>
          <TypographyLead className="max-w-2xl mx-auto text-xl md:text-2xl">
            Our users are our best ambassadors - discover why we're the top choice
            for debate practice
          </TypographyLead>
        </div>

        <div className="aspect-video max-w-4xl mx-auto mb-16">
          <YoutubeEmbed videoId="1TSkkxu8on0" />
        </div>

        <div className="w-full max-w-8xl mx-auto px-6">
          <div className="text-center mb-8">
            <TypographyH3 className="text-2xl md:text-3xl">
              Trusted by Coaches and Participants
            </TypographyH3>
          </div>
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SocialProofSection />
    </>
  );
}
