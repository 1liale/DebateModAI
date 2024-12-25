import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
// Base color configurations
export const cardColors = {
  blue: {
    background: "bg-[#EEF4FF] dark:bg-blue-900/20",
    border: "border-blue-100 dark:border-blue-800",
    icon: {
      background: "bg-white dark:bg-blue-800/30",
      color: "text-blue-600 dark:text-blue-400",
    },
    progress: {
      background: "bg-blue-100 dark:bg-blue-800/30",
      fill: "bg-blue-500",
      text: "text-blue-600 dark:text-blue-400",
    },
  },
  orange: {
    background: "bg-[#FFF4ED] dark:bg-orange-900/20",
    border: "border-orange-100 dark:border-orange-800",
    icon: {
      background: "bg-white dark:bg-orange-800/30",
      color: "text-orange-600 dark:text-orange-400",
    },
    progress: {
      background: "bg-orange-100 dark:bg-orange-800/30",
      fill: "bg-orange-500",
      text: "text-orange-600 dark:text-orange-400",
    },
  },
  green: {
    background: "bg-[#EDFFF4] dark:bg-green-900/20",
    border: "border-green-100 dark:border-green-800",
    icon: {
      background: "bg-white dark:bg-green-800/30",
      color: "text-green-600 dark:text-green-400",
    },
    progress: {
      background: "bg-green-100 dark:bg-green-800/30",
      fill: "bg-green-500",
      text: "text-green-600 dark:text-green-400",
    },
  },
  purple: {
    background: "bg-purple-50/50 dark:bg-purple-900/20",
    border: "border-purple-100 dark:border-purple-800",
    icon: {
      color: "text-purple-600 dark:text-purple-400",
    },
  },
};

// Course Card Component
interface CourseCardProps {
  title: string;
  lessons: number;
  students: number;
  progress: number;
  icon: LucideIcon;
  colorScheme: keyof typeof cardColors;
}

export function CourseCard({
  title,
  lessons,
  students,
  progress,
  icon: Icon,
  colorScheme,
}: CourseCardProps) {
  const colors = cardColors[colorScheme];

  return (
    <Card
      className={cn(
        colors.background,
        colors.border,
        "hover:shadow-lg transition-all"
      )}
    >
      <CardContent className="pt-6">
        <div
          className={cn(
            "rounded-full w-12 h-12 flex items-center justify-center mb-4",
            colors.icon.background
          )}
        >
          <Icon className={cn("h-6 w-6", colors.icon.color)} />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span className="text-sm">{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span className="text-sm">{students} students</span>
          </div>
        </div>
        <div
          className={cn(
            "w-full rounded-full h-2.5 mb-2",
            colors.progress.background
          )}
        >
          <div
            className={cn("h-2.5 rounded-full", colors.progress.fill)}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={cn("text-sm", colors.progress.text)}>
          {progress}% Complete
        </p>
      </CardContent>
    </Card>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  colorScheme: keyof typeof cardColors;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme,
}: StatCardProps) {
  const colors = cardColors[colorScheme];

  return (
    <Card className={cn(colors.background, colors.border, "shadow-sm")}>
      <CardContent className="p-4">
        <div className={cn("flex items-center gap-2 mb-1", colors.icon.color)}>
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  );
}

// Topic Card Component
interface TopicCardProps {
  title: string;
  category: string;
  engagement: string;
  image: string;
}

export function TopicCard({
  title,
  category,
  engagement,
  image,
}: TopicCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">{title}</h4>
        <Badge variant="secondary" className="mb-2">
          {category}
        </Badge>
        <p className="text-sm text-muted-foreground">{engagement}</p>
      </CardContent>
    </Card>
  );
}

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  variant?: 'default' | 'muted'
}

export function BaseCard({ 
  title,
  description,
  icon,
  header,
  footer,
  variant = 'default',
  className,
  children,
  ...props 
}: BaseCardProps) {
  return (
    <Card 
      className={cn(
        "border border-gray-200 dark:border-gray-800",
        variant === 'muted' && "bg-gray-50/50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-all duration-200",
        className
      )} 
      {...props}
    >
      {(title || icon || header) && (
        <CardHeader className="space-y-1">
          {header || (
            <CardTitle className="flex items-center gap-3">
              {icon && <span className="text-primary">{icon}</span>}
              {title && <span className="text-xl font-semibold">{title}</span>}
            </CardTitle>
          )}
        </CardHeader>
      )}
      <CardContent>
        {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
        {children}
      </CardContent>
      {footer && <div className="border-t border-gray-100 dark:border-gray-800">{footer}</div>}
    </Card>
  )
}

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function StepCard({
  stepNumber,
  title,
  description,
  className,
  ...props
}: StepCardProps) {
  return (
    <BaseCard
      variant="muted"
      header={
        <div className="space-y-4">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            Step {stepNumber}
          </span>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </div>
      }
      className={cn(
        "hover:translate-y-[-4px] transition-all duration-200",
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </BaseCard>
  )
}

export function BenefitCard({
  title,
  description,
  className,
  ...props
}: BaseCardProps) {
  return (
    <BaseCard
      variant="muted"
      header={
        <div className="space-y-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            {/* You can add an icon here */}
            <div className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </div>
      }
      className={cn(
        "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200",
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </BaseCard>
  )
}
