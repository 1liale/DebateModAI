import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export const buttonVariants = {
  primary: "border border-gray-700 bg-transparent hover:border-gray-800/50",
  secondary: "bg-indigo-800/90 hover:bg-indigo-700",
  link: "text-white hover:bg-gray-800/50",
};

export const PrimaryButton = ({
  children,
  className,
  variant = "outline",
  ...props
}: ButtonProps) => (
  <Button
    variant={variant}
    className={cn(buttonVariants.primary, className)}
    {...props}
  >
    {children}
  </Button>
);

export const SecondaryButton = ({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) => (
  <Button
    variant={variant}
    className={cn(buttonVariants.secondary, className)}
    {...props}
  >
    {children}
  </Button>
);

export const LinkButton = ({
  children,
  className,
  href,
  variant = "link",
  ...props
}: ButtonProps & { href: string }) => (
  <Link href={href} className={cn(buttonVariants.link, className)}>
    <Button
      variant={variant}
      className={cn(buttonVariants.link, className)}
      {...props}
    >
      {children}
    </Button>
  </Link>
);
