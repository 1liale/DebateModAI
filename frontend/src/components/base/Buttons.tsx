import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export const buttonVariants = {
  primary: "border border-gray-700/50 hover:border-gray-800 bg-transparent hover:border-gray-800/50",
  secondary: "bg-indigo-200 hover:bg-indigo-300 text-indigo-900 dark:bg-indigo-800/90 hover:dark:bg-indigo-700 dark:text-white",
  link: "dark:hover:bg-gray-800/50 hover:bg-gray-200/50",
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
  <Button
    variant={variant}
    className={cn(buttonVariants.link, className)}
    asChild
    {...props}
  >
    <Link href={href}>
      {children}
    </Link>
  </Button>
);
