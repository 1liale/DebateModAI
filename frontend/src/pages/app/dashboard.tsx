import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypographyH1 } from "@/components/base/Typography";
import {
  Flame,
  Trophy,
  Clock,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Calendar } from "@/components/base/Calendar";
import { CourseCard, StatCard, TopicCard } from "@/components/base/Cards";
import { PrimaryCarousel } from "@/components/base/Carousel";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { dashboardTopics as topics } from "@/lib/constants/topics_test"; // TODO: replace with actual topics data

// Course Progress Cards
const CourseCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <CourseCard
      title="Competition Prep"
      lessons={18}
      students={45}
      progress={20}
      icon={Trophy}
      colorScheme="green"
    />
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
            {topics.trending.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
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
            {topics.favorites.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
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
            {topics.controversial.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </PrimaryCarousel>
        </CardContent>
      </Card>
    </div>
  );
};

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
  const { isLoaded } = useUser();
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="space-y-2 mb-8">
        <TypographyH1 className="bg-gradient-to-r from-gray-800 to-purple-400 dark:from-purple-800 dark:to-blue-500/80 text-transparent bg-clip-text">
          Dashboard
        </TypographyH1>
        
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <CourseCards />
          <StatsOverview />
          <DebateTopicsCarousel />
        </div>
        <div className="space-y-6 w-full md:w-[340px] flex-shrink-0">
          <Calendar date={date} setDate={setDate} />
          <UpcomingDebates />
        </div>
      </div>
    </div>
  );
}
