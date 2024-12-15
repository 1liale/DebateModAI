import { Calendar as ReactCalendar } from 'react-calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyLarge } from "@/components/base/Typography";
import { Flame, Trophy, Clock, TrendingUp, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";

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
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "75%" }} />
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
          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "45%" }} />
        </div>
        <p className="text-sm text-orange-600 dark:text-orange-400">45% Complete</p>
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
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "20%" }} />
        </div>
        <p className="text-sm text-green-600 dark:text-green-400">20% Complete</p>
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

// Hours Spent Chart
const HoursSpentChart = () => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Hours Spent</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Implement chart here */}
      <div className="h-[300px]">
        {/* Chart placeholder */}
      </div>
    </CardContent>
  </Card>
);

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
        <TypographyH2>Welcome back, {user?.firstName || "Debater"}!</TypographyH2>
        <TypographyLarge className="text-muted-foreground">
          Track your journey to mastering debate
        </TypographyLarge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <CourseCards />
          <StatsOverview />
          <HoursSpentChart />
        </div>
        <div className="space-y-6">
          <Calendar />
          <UpcomingDebates />
        </div>
      </div>
    </div>
  );
}
