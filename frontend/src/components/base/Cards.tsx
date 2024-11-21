import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

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
        variant === 'muted' && "rounded-xl",
        className
      )} 
      {...props}
    >
      {(title || icon || header) && (
        <CardHeader>
          {header || (
            <CardTitle className="flex items-center space-x-2">
              {icon}
              {title && <span>{title}</span>}
            </CardTitle>
          )}
        </CardHeader>
      )}
      <CardContent>
        {description && <p className="text-muted-foreground">{description}</p>}
        {children}
      </CardContent>
      {footer}
    </Card>
  )
}

// Feature card component
export function FeatureCard({ 
  icon,
  title, 
  description,
  className,
  ...props 
}: BaseCardProps) {
  return (
    <BaseCard
      icon={icon}
      title={title}
      description={description}
      className={className}
      {...props}
    />
  )
}

// Step card component for "How it works" section
interface StepCardProps extends BaseCardProps {
  stepNumber: string
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
        <>
          <div className="text-gray-400 mb-4">{stepNumber}</div>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
        </>
      }
      className={className}
      {...props}
    >
      <p className="text-gray-400">{description}</p>
    </BaseCard>
  )
}

// Benefit card component
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
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
      }
      className={className}
      {...props}
    >
      <p className="text-gray-400 mb-6">{description}</p>
    </BaseCard>
  )
}