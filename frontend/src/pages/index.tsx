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
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import {  MessageSquare, BarChart2, Layout, Clock } from "lucide-react";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();
  
  return (
    <section
      id="hero"
      className="flex items-center justify-center text-center relative min-h-screen md:pt-48"
    >
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <TypographyH1 className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
            Debate with Confidence
          </TypographyH1>
          <TypographyLead className="max-w-2xl mx-auto text-base md:text-xl lg:text-2xl">
            Elevate your debate skills with our AI-powered platform - practice
            anytime, anywhere, and receive instant feedback!
          </TypographyLead>
        </div>
        <div className="flex gap-4 justify-center">
          <SignedOut>
            <SignUpButton>
              <PrimaryButton className="px-6 py-4 text-base">
                Start Debating Today!
              </PrimaryButton>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <PrimaryButton 
              className="px-6 py-4 text-base"
              onClick={() => router.push("/app")}
            >
              Start Debating Today!
            </PrimaryButton>
          </SignedIn>
        </div>
        <Image
          src="https://media.istockphoto.com/id/1939002953/vector/businessman-silhouette-podium-debate.jpg?s=612x612&w=0&k=20&c=PTP0lCVifYdt3EliC0w5v58mDIi76csz-YFpN9K5yas="
          alt="Debate illustration"
          width={512}
          height={512}
          className="max-w-2xl w-full h-auto rounded-xl border border-gray-200 dark:border-gray-800 mt-6"
          priority
        />
      </div>
    </section>
  );
};

export const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="h-screen flex items-center justify-center py-12"
  >
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-3">
          How it works
        </Badge>
        <TypographyH2 className="mb-3 border-none text-2xl md:text-3xl lg:text-4xl">
          With us, debating is easy
        </TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl">
          Personalized learning that adapts to your debating style
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
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
  <section
    id="benefits"
    className="h-screen flex items-center py-8 dark:bg-gray-900/30 bg-gray-200/25"
  >
    <div className="container max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-2">
          Benefits
        </Badge>
        <TypographyH2 className="mb-2 border-none text-2xl md:text-3xl lg:text-4xl">
          Your all-purpose debate training app
        </TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
          Powerful features designed to transform your debate skills
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <BenefitCard
          icon={<MessageSquare className="h-5 w-5" />}
          title="Real-time feedback"
          description="Get instant analysis of your arguments, rhetoric, and delivery to improve your debating skills."
        />
        <BenefitCard
          icon={<BarChart2 className="h-5 w-5" />}
          title="Comprehensive analytics"
          description="Track your progress over time with detailed performance metrics and improvement suggestions."
        />
        <BenefitCard
          icon={<Layout className="h-5 w-5" />}
          title="Multiple formats"
          description="Practice in various debate styles including British Parliamentary, Lincoln-Douglas, and more."
        />
        <BenefitCard
          icon={<Clock className="h-5 w-5" />}
          title="24/7 availability"
          description="Practice whenever you want, with no scheduling constraints or partner requirements."
        />
      </div>
    </div>
  </section>
);

export const SocialProofSection = () => {
  return (
    <section id="testimonials" className="min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">
            Testimonials
          </Badge>
          <TypographyH2 className="mb-3 border-none text-2xl md:text-3xl lg:text-4xl">
            Don't take our word for it
          </TypographyH2>
          <TypographyLead className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl">
            Our users are our best ambassadors - discover why we're the top
            choice for debate practice
          </TypographyLead>
        </div>

        <div className="aspect-video max-w-3xl mx-auto mb-12">
          <YoutubeEmbed videoId="1TSkkxu8on0" />
        </div>

        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <TypographyH3 className="text-xl md:text-2xl">
              Trusted by Coaches and Students
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
