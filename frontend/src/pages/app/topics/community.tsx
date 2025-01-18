import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { TypographyH1, TypographyH2, TypographyMuted } from "@/components/base/Typography";
import { TopicCard } from "@/components/base/Cards";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserRoundPen } from "lucide-react";
import Fuse from 'fuse.js';

// Example community topics data structure
const communityTopics = [
  {
    id: "1",
    title: "Universal Basic Income Implementation",
    category: "Economics",
    engagement: "324 debates",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e",
  },
  {
    id: "2",
    title: "Artificial Intelligence Regulation",
    category: "Technology",
    engagement: "156 debates",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  // Add more topics...
];

interface CreateTopicFormData {
  title: string;
  description: string;
  category: string;
  roomIds: string[];
  slug: string;
}

export default function Page() {
  const { user } = useUser();
  const [topics, setTopics] = useState(communityTopics);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateTopicFormData>({
    title: "",
    description: "",
    category: "",
    roomIds: [""],
    slug: "",
  });

  // Initialize Fuse instance
  const fuse = new Fuse(topics, {
    keys: ['title', 'category'],
    threshold: 0.3,
    includeScore: true
  });

  // Get filtered topics based on search query
  const filteredTopics = searchQuery
    ? fuse.search(searchQuery).map(result => result.item)
    : topics;

  const handleAddRoomId = () => {
    setFormData(prev => ({
      ...prev,
      roomIds: [...prev.roomIds, ""]
    }));
  };

  const handleRoomIdChange = (index: number, value: string) => {
    const newRoomIds = [...formData.roomIds];
    newRoomIds[index] = value;
    setFormData(prev => ({
      ...prev,
      roomIds: newRoomIds
    }));
  };

  const handleCreateTopic = async () => {
    // Here you would typically make an API call to create the topic
    const newTopic = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      engagement: "0 debates",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", // Default image
    };

    setTopics(prev => [...prev, newTopic]);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      roomIds: [""],
      slug: "",
    });
  };

  return (
    <div className="h-full w-full">
      <section className="h-full flex flex-col px-6 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto w-full space-y-7">
          {/* Header */}
          <div className="text-center space-y-4">
            <TypographyH1 className="bg-gradient-to-r from-gray-800 to-purple-400 dark:from-purple-800 dark:to-blue-500/80 text-transparent bg-clip-text">
              Community Topics
            </TypographyH1>
            <TypographyMuted className="text-base">
              Explore and contribute to our growing collection of debate topics
            </TypographyMuted>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto w-full">
            <Input
              type="text"
              placeholder="Search topics by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                title={topic.title}
                category={topic.category}
                engagement={topic.engagement}
                image={topic.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}