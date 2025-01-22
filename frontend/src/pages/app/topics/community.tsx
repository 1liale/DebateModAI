import { useState } from "react";
import { TypographyH1, TypographyMuted } from "@/components/base/Typography";
import { TopicCard } from "@/components/base/Cards";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";
import { Topic } from "@/lib/types/topic";
import { communityTopics } from "@/lib/constants/topics_test";

export default function Page() {
  const [topics] = useState<Topic[]>(communityTopics);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize Fuse instance
  const fuse = new Fuse(topics, {
    keys: ["title", "category"],
    threshold: 0.3,
    includeScore: true,
  });

  // Get filtered topics based on search query
  const filteredTopics = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : topics;

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
                topic={topic}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
