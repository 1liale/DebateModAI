import { Calendar as ReactCalendar } from "react-calendar";
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

// Course Progress Cards
const CourseCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <Card className="bg-[#EEF4FF] dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-all">
      <CardContent className="pt-6">
        <div className="rounded-full w-12 h-12 bg-white dark:bg-blue-800/30 flex items-center justify-center mb-4">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Debate Fundamentals</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm">24 lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">99 students</span>
          </div>
        </div>
        <div className="w-full bg-blue-100 dark:bg-blue-800/30 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: "75%" }}
          />
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400">75% Complete</p>
      </CardContent>
    </Card>

    <Card className="bg-[#FFF4ED] dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 hover:shadow-lg transition-all">
      <CardContent className="pt-6">
        <div className="rounded-full w-12 h-12 bg-white dark:bg-orange-800/30 flex items-center justify-center mb-4">
          <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Advanced Argumentation</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm">32 lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">67 students</span>
          </div>
        </div>
        <div className="w-full bg-orange-100 dark:bg-orange-800/30 rounded-full h-2.5 mb-2">
          <div
            className="bg-orange-500 h-2.5 rounded-full"
            style={{ width: "45%" }}
          />
        </div>
        <p className="text-sm text-orange-600 dark:text-orange-400">
          45% Complete
        </p>
      </CardContent>
    </Card>

    <Card className="bg-[#EDFFF4] dark:bg-green-900/20 border border-green-100 dark:border-green-800 hover:shadow-lg transition-all">
      <CardContent className="pt-6">
        <div className="rounded-full w-12 h-12 bg-white dark:bg-green-800/30 flex items-center justify-center mb-4">
          <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Competition Prep</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm">18 lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">45 students</span>
          </div>
        </div>
        <div className="w-full bg-green-100 dark:bg-green-800/30 rounded-full h-2.5 mb-2">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: "20%" }}
          />
        </div>
        <p className="text-sm text-green-600 dark:text-green-400">
          20% Complete
        </p>
      </CardContent>
    </Card>
  </div>
);

// Stats Overview
const StatsOverview = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <Card className="bg-purple-50/50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">On Track</span>
        </div>
        <div className="text-2xl font-bold">215</div>
        <div className="text-xs text-muted-foreground">Active last 3 days</div>
      </CardContent>
    </Card>

    <Card className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Hours Practiced</span>
        </div>
        <div className="text-2xl font-bold">48.5</div>
        <div className="text-xs text-muted-foreground">This month</div>
      </CardContent>
    </Card>

    <Card className="bg-orange-50/50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-medium">Win Rate</span>
        </div>
        <div className="text-2xl font-bold">67%</div>
        <div className="text-xs text-muted-foreground">Last 20 debates</div>
      </CardContent>
    </Card>

    <Card className="bg-green-50/50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
          <Trophy className="h-4 w-4" />
          <span className="text-sm font-medium">Tournaments</span>
        </div>
        <div className="text-2xl font-bold">3</div>
        <div className="text-xs text-muted-foreground">Upcoming events</div>
      </CardContent>
    </Card>
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

          <div className="relative px-4">
            <Carousel
              opts={{
                align: "start"
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {topics.trending.map((topic, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-40 w-full">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{topic.title}</h4>
                        <Badge variant="secondary" className="mb-2">
                          {topic.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {topic.engagement}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {topics.trending.length > 3 && (
                <>
                  <CarouselPrevious className="hidden md:flex ml-3 w-8 h-8" />
                  <CarouselNext className="hidden md:flex mr-3 w-8 h-8" />
                </>
              )}
            </Carousel>
          </div>
        </CardContent>
      </Card>

      {/* Favorite Topics */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Favorites</h3>
          </div>

          <div className="relative px-4">
            <Carousel
              opts={{
                align: "start"
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {topics.favorites.map((topic, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-40 w-full">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{topic.title}</h4>
                        <Badge variant="secondary" className="mb-2">
                          {topic.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {topic.engagement}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {topics.favorites.length > 3 && (
                <>
                  <CarouselPrevious className="hidden md:flex ml-3 w-8 h-8" />
                  <CarouselNext className="hidden md:flex mr-3 w-8 h-8" />
                </>
              )}
            </Carousel>
          </div>
        </CardContent>
      </Card>

      {/* Controversial Topics */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Controversial</h3>
          </div>

          <div className="relative px-4">
            <Carousel
              opts={{
                align: "start"
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {topics.controversial.map((topic, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-40 w-full">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{topic.title}</h4>
                        <Badge variant="secondary" className="mb-2">
                          {topic.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {topic.engagement}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {topics.controversial.length > 3 && (
                <>
                  <CarouselPrevious className="hidden md:flex ml-3 w-8 h-8" />
                  <CarouselNext className="hidden md:flex mr-3 w-8 h-8" />
                </>
              )}
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Updated Calendar Component
const Calendar = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <style jsx global>{`
          .react-calendar {
            width: 100%;
            background-color: #fff;
            color: #222;
            border-radius: 8px;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.125em;
          }
          .react-calendar__navigation button {
            color: #6f48eb;
            min-width: 44px;
            background: none;
            font-size: 16px;
            margin-top: 8px;
          }
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #f8f8fa;
          }
          .react-calendar__navigation button[disabled] {
            background-color: #f0f0f0;
          }
          abbr[title] {
            text-decoration: none;
          }
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background: #f8f8fa;
            color: #6f48eb;
            border-radius: 6px;
          }
          .react-calendar__tile--now {
            background: #6f48eb33;
            border-radius: 6px;
            font-weight: bold;
            color: #6f48eb;
          }
          .react-calendar__tile--now:enabled:hover,
          .react-calendar__tile--now:enabled:focus {
            background: #6f48eb33;
            border-radius: 6px;
            font-weight: bold;
            color: #6f48eb;
          }
          .react-calendar__tile--active {
            background: #6f48eb;
            border-radius: 6px;
            font-weight: bold;
            color: white;
          }
          .react-calendar__tile--active:enabled:hover,
          .react-calendar__tile--active:enabled:focus {
            background: #6f48eb;
            color: white;
          }
          .react-calendar--selectRange .react-calendar__tile--hover {
            background-color: #f8f8fa;
          }
          .react-calendar__tile--range {
            background: #f8f8fa;
            color: #6f48eb;
            border-radius: 0;
          }
          .react-calendar__tile--rangeStart {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            background: #6f48eb;
            color: white;
          }
          .react-calendar__tile--rangeEnd {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            background: #6f48eb;
            color: white;
          }
        `}</style>
        <ReactCalendar
          className="border-none"
          view="month"
          onClickDay={(value) => {
            // Handle date selection
            console.log(value);
          }}
        />
      </CardContent>
    </Card>
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
