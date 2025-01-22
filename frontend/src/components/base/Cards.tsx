import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from '@/lib/utils/date';
import { TypographyH3, TypographyMuted, TypographySmall } from "@/components/base/Typography";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessage } from '@/server/resolver/chat';
import { User } from '@/lib/types/user';
import { Topic } from '@/lib/types/topic';

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
      background: "bg-white dark:bg-purple-800/30",
      color: "text-purple-600 dark:text-purple-400",
    },
    progress: {
      background: "bg-purple-100 dark:bg-purple-800/30",
      fill: "bg-purple-500",
      text: "text-purple-600 dark:text-purple-400",
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
    <BaseCard
      className={cn(
        colors.background,
        colors.border,
        "hover:shadow-lg transition-all"
      )}
    >
      <CardContent className="pt-4">
        <div
          className={cn(
            "rounded-full w-10 h-10 flex items-center justify-center mb-3",
            colors.icon.background
          )}
        >
          <Icon className={cn("h-5 w-5", colors.icon.color)} />
        </div>
        <h3 className="font-semibold text-base mb-2">{title}</h3>
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
    </BaseCard>
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
    <BaseCard className={cn(colors.background, colors.border, "shadow-sm")}>
      <CardContent className="p-3">
        <div className={cn("flex items-center gap-2 mb-1", colors.icon.color)}>
          <Icon className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{title}</span>
        </div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-[0.7rem] text-muted-foreground">{subtitle}</div>
      </CardContent>
    </BaseCard>
  );
}

// Topic Card Component
interface TopicCardProps {
  topic: Partial<Topic>;
}

export function TopicCard({
  topic
}: TopicCardProps) {
  const { title, description, category, image, engagement } = topic;
  return (
    <BaseCard className="overflow-hidden hover:shadow-lg transition-all">
      {image && (
        <div className="relative h-32 w-full">
          <Image
            src={image}
            alt={title || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardContent className="p-3">
        <h4 className="font-semibold text-sm mb-2">{title}</h4>
        <div className="flex gap-2 mb-2">
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
        {engagement && (
          <p className="text-sm text-muted-foreground">{engagement}</p>
        )}
      </CardContent>
    </BaseCard>
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
        "border border-gray-200 dark:border-gray-800 bg-background/50",
        variant === 'muted' && "bg-gray-50/50 dark:bg-gray-900/50 rounded-xl hover:shadow-md transition-all duration-200",
        className
      )} 
      {...props}
    >
      {(title || icon || header) && (
        <CardHeader className="space-y-1 p-3">
          {header || (
            <CardTitle className="flex items-center gap-3">
              {icon && <span className="text-primary">{icon}</span>}
              {title && <span className="text-lg font-semibold">{title}</span>}
            </CardTitle>
          )}
        </CardHeader>
      )}
      <CardContent className="p-3">
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
        <div className="space-y-3">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            Step {stepNumber}
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
      }
      className={cn(
        "hover:translate-y-[-4px] transition-all duration-200",
        className
      )}
      {...props}
    >
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </BaseCard>
  )
}

export function BenefitCard({
  icon,
  title,
  description,
  className,
  ...props
}: BaseCardProps) {
  return (
    <BaseCard
      variant="muted"
      header={
        <div className="space-y-2">
          <div className="h-10 w-10 rounded-lg dark:bg-primary/10 bg-purple-100 flex items-center justify-center">
            <div className="w-5 h-5 dark:text-purple-600">{icon}</div>
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
      }
      className={cn(
        "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200",
        className
      )}
      {...props}
    >
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </BaseCard>
  )
}

interface BlogCardProps {
  title: string;
  description: string;
  publishedAt: string;
  imageUrl: string;
  href: string;
  variant?: 'vertical' | 'horizontal';
  author?: {
    name: string;
    avatar?: string;
  };
}

export function BlogCard({
  title,
  description,
  publishedAt,
  imageUrl,
  href,
  variant = 'vertical',
  author,
}: BlogCardProps) {
  return (
    <Link href={href}>
      <BaseCard className="border-[1.5px] group overflow-hidden border-background dark:border-background dark:shadow-none shadow-none hover:shadow-lg dark:hover:border-gray-50/50 dark:border-gray-50/10 transition-all">
        <CardContent className={cn(
          "p-2 bg-background h-full",
          variant === 'horizontal' && "flex gap-4"
        )}>
          {imageUrl && (
            <div className={cn(
              "relative overflow-hidden rounded-lg shrink-0",
              variant === 'vertical' ? "aspect-[4/3] w-full mb-4" : "aspect-square w-24"
            )}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes={variant === 'vertical' 
                  ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  : "112px"
                }
              />
            </div>
          )}
          <div className={cn(
            "flex flex-col",
            variant === 'horizontal' && "flex-1 justify-center"
          )}>
            <TypographyH3 className="mb-2">{title}</TypographyH3>
            <TypographyMuted className="mb-4 line-clamp-2">
              {description}
            </TypographyMuted>
            <div className="flex items-center gap-2 mt-auto">
              {author ? (
                <>
                  <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                      <AvatarImage src={author?.avatar} alt={author.name} />
                      <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <TypographySmall className="text-muted-foreground">
                      {author.name}
                    </TypographySmall>
                  </div>
                </>
              ) : (
                <TypographySmall className="text-muted-foreground">
                  AI Generated
                </TypographySmall>
              )}
              <TypographyMuted className="text-xs">•</TypographyMuted>
              <TypographySmall className="text-muted-foreground">
                {formatDate(publishedAt)}
              </TypographySmall>
            </div>
          </div>
        </CardContent>
      </BaseCard>
    </Link>
  );
}

interface ChatCardProps {
  message: ChatMessage; 
  isOwnMessage: boolean;
}

export function ChatCard({ message, isOwnMessage }: ChatCardProps) {
  return (
    <BaseCard
      className={cn(
        "mb-4 max-w-[75%] shadow-sm rounded-lg",
        isOwnMessage ? (
          "ml-auto bg-primary"
        ) : (
          "bg-card border-border/50 dark:bg-card/50"
        )
      )}
    >
      <CardContent className="p-2">
        <TypographySmall className="font-medium mb-1">
          {message.username}
        </TypographySmall>
        <TypographyMuted>
          {message.text}
        </TypographyMuted>
      </CardContent>
    </BaseCard>
  );
}

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
    return (
        <BaseCard className="p-6 flex flex-col items-center">
            <Avatar className="h-16 w-16 mb-4">
                <AvatarImage src={user.photoUrl} alt={user.name} />
                <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 space-y-2">
                <Badge variant={user.role === 'instructor' ? 'secondary' : 'default'}>
                    {user.role.toUpperCase()}
                </Badge>
                <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                    {user.status.toUpperCase()}
                </Badge>
            </div>
        </BaseCard>
    );
}
