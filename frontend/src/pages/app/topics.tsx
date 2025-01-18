import { useState } from "react";
import { TypographyH1, TypographyH2, TypographyLarge, TypographyMuted } from "@/components/base/Typography";
import { Card } from "@/components/ui/card";
import { SecondaryButton, PrimaryButton } from "@/components/base/Buttons";
import { Button } from "@/components/ui/button"
import { TopicCard } from "@/components/base/Cards";
import { ChevronDown, RefreshCcw, Image as ImageIcon, Paperclip, Send, User, Mail, MessageSquare, AlignLeft, UserRoundPen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";

// Example prompt suggestions - these could come from an API
const initialPrompts = [
  {
    title: "Should AI be regulated by governments?",
    icon: <User className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Is social media doing more harm than good to society?",
    icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Should higher education be free for all citizens?",
    icon: <AlignLeft className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Is space exploration worth the investment?",
    icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />,
  },
];

export default function TopicsPage() {
  const { user } = useUser();
  const [prompts, setPrompts] = useState(initialPrompts);
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  const refreshPrompts = () => {
    // In a real app, this would fetch new prompts from an API
    const shuffled = [...initialPrompts].sort(() => Math.random() - 0.5);
    setPrompts(shuffled);
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Search Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto space-y-7">
          {/* Gradient Title */}
          <div className="text-center space-y-4">
            <TypographyH1 className="bg-gradient-to-r from-gray-800 to-purple-400 dark:from-purple-800 dark:to-blue-500/80 text-transparent bg-clip-text">
              Hi there, {user?.firstName || "Debater"}
            </TypographyH1>
            <TypographyH2 className="bg-gradient-to-r from-gray-800 to-purple-400 dark:from-purple-800 dark:to-blue-500/80 text-transparent bg-clip-text">
              What would you like to debate?
            </TypographyH2>
            <TypographyMuted className="text-base">
            Choose from popular debate topics below or generate your own topic
            </TypographyMuted>
          </div>

          {/* Prompt Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prompts.map((prompt, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors group"
                onClick={() => setUserInput(prompt.title)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-start">
                    {prompt.icon}
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {prompt.title}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshPrompts}
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4 text-muted-foreground" />
              <TypographyMuted>Refresh Prompts</TypographyMuted>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={refreshPrompts}
              className="gap-2"
            >
              <UserRoundPen className="h-4 w-4 text-muted-foreground" />
              <TypographyMuted>Build your own topic!</TypographyMuted>
            </Button>
          </div>

          {/* Input Area */}
          <Card className="p-4">
            <div className="space-y-4">
              <textarea
                placeholder="Ask whatever you want...."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full min-h-[100px] p-2 bg-transparent focus:ring-0 resize-none text-md placeholder:text-muted-foreground/60"
              />
              <div className="flex items-center px-2 justify-between">
                
                <TypographyMuted>
                  {userInput.length}/1000
                </TypographyMuted>
                
      
                <Button size="sm" disabled={!userInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Community Topics Section */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Community Topics</h3>
              <p className="text-muted-foreground">
                Explore topics from the community
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAllTopics(prev => !prev)}
            >
              {showAllTopics ? "Show Less" : "Show More"}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                showAllTopics ? "rotate-180" : ""
              }`} />
            </Button>
          </div>

          {/* Topics grid remains the same */}
          <AnimatePresence>
            {/* ... existing topics grid code ... */}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
} 