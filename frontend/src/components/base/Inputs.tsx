import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ComponentProps } from "react"

type InputProps = ComponentProps<typeof Input>

export const PrimaryInput = ({ className, ...props }: InputProps) => {
  return (
    <Input
      className={cn(
        "bg-background/50 border-border/50 focus-visible:ring-brand/50",
        className
      )}
      {...props}
    />
  )
} 