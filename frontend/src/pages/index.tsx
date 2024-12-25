import { PrimaryButton } from "@/components/base/Buttons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { StepCard, BenefitCard, BaseCard } from "@/components/base/Cards";
import {
  TypographyH1,
  TypographyH2,
  TypographyLarge,
  TypographyLead,
} from "@/components/base/Typography";
import { YoutubeEmbed } from "@/components/misc/YoutubeEmbed";

export const HeroSection = () => (
  <section className="flex items-center justify-center text-center relative h-[calc(100vh-120px)]">
    <div className="container mx-auto px-4">
      <TypographyH1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
        Debate with Confidence
      </TypographyH1>
      <TypographyLead className="mb-12 max-w-2xl mx-auto">
        Elevate your debate skills with our AI-powered platform - practice
        anytime, anywhere, and receive instant feedback to become a better
        debater.
      </TypographyLead>
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
        <TypographyH2 className="mb-4 border-none">With us, debating is easy</TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto">
          Effortless debate practice for individuals, powerful solutions for debate clubs and institutions.
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <StepCard
          stepNumber="01"
          title="Choose your topic"
          description="Select from our curated list of debate topics or input your own custom motion."
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
  <section className="py-24 dark:bg-gray-900/30 bg-gray-200/30">
    <div className="container max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          Benefits
        </Badge>
        <TypographyH2 className="mb-4 border-none">Your all-purpose debate training app</TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto">
          Discover our advanced features. Unlimited practice for individuals.
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <BenefitCard
          title="Real-time feedback"
          description="Get instant analysis of your arguments, rhetoric, and delivery to improve your debating skills."
        />
        <BenefitCard
          title="Comprehensive analytics"
          description="Track your progress over time with detailed performance metrics and improvement suggestions."
        />
        <BenefitCard
          title="Multiple formats"
          description="Practice in various debate styles including British Parliamentary, Lincoln-Douglas, and more."
        />
        <BenefitCard
          title="24/7 availability"
          description="Practice whenever you want, with no scheduling constraints or partner requirements."
        />
      </div>
    </div>
  </section>
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
export const SocialProofSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          Testimonials
        </Badge>
        <TypographyH2 className="mb-4 border-none">Don't take our word for it</TypographyH2>
        <TypographyLead className="max-w-2xl mx-auto">
          Our users are our best ambassadors. Discover why we're the top choice for debate practice.
        </TypographyLead>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-video">
          <YoutubeEmbed videoId="your-video-id" />
        </div>

        <div className="grid gap-8">
          {testimonials.map((testimonial, index) => (
            <BaseCard
              key={index}
              variant="muted"
              header={<TypographyLarge className="mb-6">{testimonial.quote}</TypographyLarge>}
              footer={
                <div className="flex items-center gap-4 px-8 pb-8">
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
              }
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

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
