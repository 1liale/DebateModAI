import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { TypographyLarge } from "./Typography"

interface BannerProps {
  children: React.ReactNode
  className?: string
}

export function Banner({ children, className }: BannerProps) {
  return (
    <Card 
      className={cn(
        "w-full bg-muted/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="p-2">
        <TypographyLarge className="text-muted-foreground text-center">
          {children}
        </TypographyLarge>
      </div>
    </Card>
  )
} 