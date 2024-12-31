import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { updateUser } from "@/server/resolver/user";
import { TypographyH2, TypographyLead } from "@/components/base/Typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/components/misc/ThemeWidget";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SegmentedProgressBar } from "@/components/base/Progress";

const onboardingSteps = [
  {
    id: "welcome",
    title: "Welcome to DebateModAI",
    description: "We're excited to help you enhance your debate skills and knowledge. Let's get started by personalizing your experience.",
  },
  {
    id: "role",
    title: "What brings you here?",
    description: "Tell us about your role in debate.",
  },
  {
    id: "experience",
    title: "Your Debate Experience",
    description: "Help us tailor the experience to your level.",
  },
  {
    id: "topics",
    title: "Preferences",
    description: "Tell us about topics that interests you!",
  },
];

const topicOptions = [
  "Politics",
  "Technology",
  "Environment",
  "Economics",
  "Social Issues",
  "Education",
  "Healthcare",
  "International Relations",
  "Science",
  "Ethics",
  "Law",
  "Culture",
  "Media",
  "Philosophy",
  "Sports",
  "Business"
];

const totalSteps = onboardingSteps.length;

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topics: [] as string[],
  });
  const [showAllTopics, setShowAllTopics] = useState(false);

  const handleNext = async () => {
    if (currentStep === onboardingSteps.length - 1) {
      if (user) {
        await updateUser(user.id, {
          ...formData,
          onboardingCompleted: true,
        });
        router.push("/app/dashboard");
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Header */}
      <div className="fixed top-0 w-full backdrop-blur-sm bg-background/90 border-b-[1.5px] border-border/90 py-2 px-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 flex min-h-screen">
        {/* Left Column - Form */}
        <div className="w-1/2 p-8">
          <div className="max-w-md mx-auto gap-6 flex flex-col">
            <SegmentedProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            
            <div>
              <TypographyH2 className="text-3xl font-semibold mb-2">
                {onboardingSteps[currentStep].title}
              </TypographyH2>
              <TypographyLead className="text-muted-foreground text-lg">
                {onboardingSteps[currentStep].description}
              </TypographyLead>
            </div>

            <div className="flex flex-col gap-4">
              {currentStep === 0 && (
                <div className="flex flex-col gap-4">
                  <TypographyLead className="text-muted-foreground text-lg">
                    DebateModAI is your personal debate companion, designed to help you develop and refine your debating skills. Whether you're just starting out or looking to enhance your expertise, we're here to support your journey.
                  </TypographyLead>
                  <Button
                    onClick={handleNext}
                    className="w-full mt-8"
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {currentStep === 1 && (
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learner">Learner</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {currentStep === 2 && (
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, experience: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col gap-4">
                  <div className={`grid grid-cols-2 gap-3 ${showAllTopics ? 'max-h-[300px] overflow-y-auto pr-2' : ''}`}>
                    {(showAllTopics ? topicOptions : topicOptions.slice(0, 8)).map((topic) => (
                      <Button
                        key={topic}
                        variant="outline"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            topics: prev.topics.includes(topic)
                              ? prev.topics.filter((t) => t !== topic)
                              : prev.topics.length < 3
                              ? [...prev.topics, topic]
                              : prev.topics,
                          }))
                        }
                        className={`h-auto py-4 transition-all ${
                          formData.topics.includes(topic)
                            ? 'border-[1.5px] ring-offset-background' +
                              (['ring-red-500 border-red-500',
                                'ring-orange-500 border-orange-500',
                                'ring-yellow-500 border-yellow-500',
                                'ring-green-500 border-green-500',
                                'ring-blue-500 border-blue-500',
                                'ring-indigo-500 border-indigo-500',
                                'ring-purple-500 border-purple-500',
                              ][Math.floor(Math.random() * 7)])
                            : ''
                        }`}
                        disabled={!formData.topics.includes(topic) && formData.topics.length >= 3}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                  {/* Topic list expansion/collapse button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowAllTopics(prev => !prev)}
                    className="mt-2 w-full"
                  >
                    {showAllTopics ? (
                      <>Show Less <ChevronDown className="h-4 w-4 ml-2 rotate-180 transition-transform" /></>
                    ) : (
                      <>Show More <ChevronDown className="h-4 w-4 ml-2 transition-transform" /></>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Select up to 3 topics that interest you
                  </p>
                </div>
              )}

              {currentStep !== 0 && (
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !formData.role) ||
                      (currentStep === 2 && !formData.experience) ||
                      (currentStep === 3 && formData.topics.length === 0)
                    }
                  >
                    {currentStep === onboardingSteps.length - 1 ? "Complete" : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Image Card */}
        <div className="w-1/2 p-8">
          <Card className="h-full relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3"
              alt="Debate illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 p-8 flex items-end">
              <div className="text-white">
                <h2 className="text-3xl font-semibold mb-3">Welcome to DebateModAI</h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  Your journey to becoming a better debater starts here
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 