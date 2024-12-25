import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import {
  Flame,
  Trophy,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar } from "@/components/base/Calendar";
import { CourseCard, StatCard, TopicCard } from "@/components/base/Cards";
import Image from "next/image";
import { PrimaryCarousel } from "@/components/base/Carousel";

// Course Progress Cards
const CourseCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <CourseCard
      title="Debate Fundamentals"
      lessons={24}
      students={99}
      progress={75}
      icon={BookOpen}
      colorScheme="blue"
    />
    <CourseCard
      title="Advanced Argumentation"
      lessons={32}
      students={67}
      progress={45}
      icon={Flame}
      colorScheme="orange"
    />
    <CourseCard
      title="Competition Prep"
      lessons={18}
      students={45}
      progress={20}
      icon={Trophy}
      colorScheme="green"
    />
  </div>
);

// Stats Overview
const StatsOverview = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <StatCard
      title="On Track"
      value={215}
      subtitle="Active last 3 days"
      icon={TrendingUp}
      colorScheme="purple"
    />
    <StatCard
      title="Hours Practiced"
      value={48.5}
      subtitle="This month"
      icon={Clock}
      colorScheme="blue"
    />
    <StatCard
      title="Win Rate"
      value="67%"
      subtitle="Last 20 debates"
      icon={Flame}
      colorScheme="orange"
    />
    <StatCard
      title="Tournaments"
      value={3}
      subtitle="Upcoming events"
      icon={Trophy}
      colorScheme="green"
    />
  </div>
);

// Debate Topics Carousel
const DebateTopicsCarousel = () => {
  const topics = {
    trending: [
      {
        title: "AI Regulation",
        engagement: "2.3k debates",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      },
      {
        title: "TEST",
        engagement: "2.1k debates",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      },
      {
        title: "Universal Basic Income",
        engagement: "1.8k debates",
        category: "Economics",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e",
      },
      {
        title: "Space Colonization",
        engagement: "1.5k debates",
        category: "Science",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2",
      },
    ],
    favorites: [
      {
        title: "Climate Change Solutions",
        engagement: "Saved by 1.2k",
        category: "Environment",
        image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51",
      },
      {
        title: "Digital Privacy Rights",
        engagement: "Saved by 980",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
      },
      {
        title: "Education Reform",
        engagement: "Saved by 850",
        category: "Education",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      },
    ],
    controversial: [
      {
        title: "Social Media Impact",
        engagement: "50/50 split",
        category: "Society",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0",
      },
      {
        title: "Genetic Engineering",
        engagement: "51/49 split",
        category: "Ethics",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      },
      {
        title: "Cryptocurrency Future",
        engagement: "48/52 split",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
      },
    ],
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Trending Topics */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Trending</h3>
          </div>
          <PrimaryCarousel itemCount={topics.trending.length}>
            {topics.trending.map((topic, index) => (
              <TopicCard key={index} {...topic} />
            ))}
          </PrimaryCarousel>
        </CardContent>
      </Card>

      {/* Favorite Topics */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Favorites</h3>
          </div>
          <PrimaryCarousel itemCount={topics.favorites.length}>
            {topics.favorites.map((topic, index) => (
              <TopicCard key={index} {...topic} />
            ))}
          </PrimaryCarousel>
        </CardContent>
      </Card>

      {/* Controversial Topics */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Controversial</h3>
          </div>
          <PrimaryCarousel itemCount={topics.controversial.length}>
            {topics.controversial.map((topic, index) => (
              <TopicCard key={index} {...topic} />
            ))}
          </PrimaryCarousel>
        </CardContent>
      </Card>
    </div>
  );
};

// Updated Calendar Component
<Calendar />

// Upcoming Debates
const UpcomingDebates = () => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Debates</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          {
            title: "Climate Change Policy",
            time: "3:00 PM - 5:00 PM",
            date: "Today",
          },
          {
            title: "AI Ethics in Healthcare",
            time: "2:00 PM - 4:00 PM",
            date: "Tomorrow",
          },
        ].map((debate, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
          >
            <div>
              <h4 className="font-medium">{debate.title}</h4>
              <p className="text-sm text-muted-foreground">{debate.time}</p>
            </div>
            <Badge>{debate.date}</Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-2 mb-8">
        <TypographyH2>
          Welcome back, {user?.firstName || "Debater"}!
        </TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Track your journey to debate mastery
        </TypographyLarge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <CourseCards />
          <StatsOverview />
          <DebateTopicsCarousel />
        </div>
        <div className="space-y-6">
          <Calendar />
          <UpcomingDebates />
        </div>
      </div>
    </div>
  );
}
