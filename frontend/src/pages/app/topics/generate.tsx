import { useState } from "react";
import { TypographyH1, TypographyH2, TypographyMuted, TypographyP } from "@/components/base/Typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCcw, Send, UserRoundPen, HelpCircle, Flame, Sword, GraduationCap, LandPlot } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TopicFormData {
  title: string;
  description: string;
  metadata: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  roomIds: string[];
  slug: string;
}

// Example prompt suggestions - these could come from an API
const initialPrompts = [
  {
    title: "Should AI replace human workers?",
    category: "Trending",
    icon: <Flame className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Should gene editing be allowed in humans?",
    category: "Controversial",
    icon: <Sword className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Should school uniforms be mandatory?",
    category: "Entry Level",
    icon: <GraduationCap className="h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Should voting be mandatory?",
    category: "Politics",
    icon: <LandPlot className="h-5 w-5 text-muted-foreground" />,
  },
];

const topicPools = {
  trending: [
    "Should AI replace human workers?",
    "Is cryptocurrency the future of money?",
    "Should social media platforms be broken up?",
    "Is remote work here to stay?",
  ],
  controversial: [
    "Should gene editing be allowed in humans?",
    "Should billionaires exist?",
    "Is nuclear energy the solution to climate change?",
    "Should vaccines be mandatory?",
  ],
  entryLevel: [
    "Should school uniforms be mandatory?",
    "Should homework be abolished?",
    "Are video games good for children?",
    "Should junk food be banned in schools?",
  ],
  political: [
    "Should voting be mandatory?",
    "Should the voting age be lowered?",
    "Should term limits exist for all political offices?",
    "Should lobbying be banned?",
  ],
};

export default function Page() {
  const { user } = useUser();
  const [prompts, setPrompts] = useState(initialPrompts);
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TopicFormData>({
    title: "",
    description: "",
    metadata: "",
    difficulty: "Beginner",
    category: "",
    roomIds: [],
    slug: "",
  });

  const clearFormData = () => {
    setFormData({
      title: "",
      description: "",
      metadata: "User Generated",
      difficulty: "Beginner",
      category: "",
      roomIds: [],
      slug: "",
    });
  }

  const handleCreateTopic = async () => {
    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const response = await fetch('/api/topics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug,
          createdBy: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create topic');
      }
      clearFormData()
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  

  const handleSubmitPrompt = async () => {
    try {
      setIsGenerating(true);
      
      const response = await fetch('/api/generate-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate topic');
      }
  
      const data = await response.json();
      
      // Parse the AI response and map it to our TopicFormData structure
      const topicData: TopicFormData = {
        ...data,
        roomIds: [],
      };
  
      setFormData(topicData);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error generating topic:', error);
      // You might want to show an error toast here
    } finally {
      setIsGenerating(false);
    }
  };

  const refreshPrompts = () => {
    const newPrompts = [
      {
        title: topicPools.trending[Math.floor(Math.random() * topicPools.trending.length)],
        category: "Trending",
        icon: initialPrompts[0].icon,
      },
      {
        title: topicPools.controversial[Math.floor(Math.random() * topicPools.controversial.length)],
        category: "Controversial",
        icon: initialPrompts[1].icon,
      },
      {
        title: topicPools.entryLevel[Math.floor(Math.random() * topicPools.entryLevel.length)],
        category: "Entry Level",
        icon: initialPrompts[2].icon,
      },
      {
        title: topicPools.political[Math.floor(Math.random() * topicPools.political.length)],
        category: "Political",
        icon: initialPrompts[3].icon,
      },
    ];
    setPrompts(newPrompts);
  };

  return (
    <div className="h-full w-full">
      {/* Search Section */}
      <section className="h-full flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-background to-muted/20">
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
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors group"
                onClick={() => setUserInput(prompt.title)}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {prompt.icon}
                    <TypographyMuted>{prompt.category}</TypographyMuted>
                  </div>
                  <TypographyP className="text-muted-foreground group-hover:text-primary transition-colors">
                    {prompt.title}
                  </TypographyP>
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
              onClick={() => { clearFormData(); setIsDialogOpen(true) }}
              className="gap-2"
            >
              <UserRoundPen className="h-4 w-4 text-muted-foreground" />
              <TypographyMuted>Build your own topic!</TypographyMuted>
            </Button>
          </div>

          {/* Input Area */}
          <Card className="p-4">
            <div className="space-y-4">
              <Textarea
                placeholder="Let our AI help you build a topic..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[100px] resize-none text-md placeholder:text-muted-foreground/60"
              />
              <div className="flex items-center justify-between">
                <TypographyMuted>
                    {userInput.length}/1000
                  </TypographyMuted>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1">
                  <TooltipProvider>
                      <Tooltip >
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="left" className="mt-2">
                          Generate up to 5 daily topics for free!
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TypographyMuted>
                      Prompts Left: 5 / 5
                    </TypographyMuted>
                    
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!userInput.trim() || isGenerating} 
                    onClick={handleSubmitPrompt}
                  >
                    {isGenerating ? (
                      <RefreshCcw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Topic</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a clear, concise title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="resize-none"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide a detailed description of the debate topic"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select a category</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Environment">Environment</option>
                <option value="Economics">Economics</option>
                <option value="Social Issues">Social Issues</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="International Relations">International Relations</option>
                <option value="Science">Science</option>
                <option value="Ethics">Ethics</option>
                <option value="Law">Law</option>
                <option value="Culture">Culture</option>
                <option value="Media">Media</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  difficulty: e.target.value as TopicFormData['difficulty']
                }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="metadata">Metadata (optional)</Label>
              <Input
                id="metadata"
                value={formData.metadata}
                onChange={(e) => setFormData(prev => ({ ...prev, metadata: e.target.value }))}
                placeholder="e.g., User Generated, Community, Research Paper"
              />
            </div>
            <Button 
              onClick={handleCreateTopic}
              disabled={!formData.title || !formData.description || !formData.category || !formData.difficulty}
            >
              Create Topic
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}