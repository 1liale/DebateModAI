import { customDarkTheme } from "@/styles/customTheme";
import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  LinkButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/base/Buttons";
import { UnauthMobileMenu } from "@/components/layout/Menu";
import { TypographyLarge } from "@/components/base/Typography";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import { ThemeButton } from "../misc/ThemeWidget";
import { cn } from "@/lib/utils";
interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      // Has to be sticky for some reasons
      className={cn(
        "sticky top-0 z-50 h-16 border-b backdrop-blur-sm bg-background/90 border-border/50",
        className
      )}
    >
      <div className="flex h-full items-center gap-2 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
};

export const UnauthHeader = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <Header>
      <div className="flex-1 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight flex items-center">
          <Image
            src={logo}
            alt="DebateMod Logo"
            width={24}
            height={24}
            className="mb-1"
          />
          <TypographyLarge className="text-xl">
            ebate
            <span className="text-brand">Mod</span>
          </TypographyLarge>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Menu (hidden on desktop) */}
          <UnauthMobileMenu />

          {/* Desktop Menu (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-3">
            <LinkButton href="#Solutions">Solutions</LinkButton>
            <LinkButton href="#pricing">Pricing</LinkButton>
            <LinkButton href="#pricing">Contact Us</LinkButton>
            <SignedIn>
              {!pathname.startsWith("/app") && (
                <Link href="/app/dashboard">
                  <PrimaryButton className="mr-4">
                    Dashboard <ArrowUpRight className="h-4 w-4 ml-2" />
                  </PrimaryButton>
                </Link>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard: {
                      pointerEvents: "initial",
                      zIndex: 100,
                      marginTop: "16px",
                    },
                  },
                  baseTheme: theme === "dark" ? customDarkTheme : undefined,
                }}
              />
            </SignedIn>
            <SignedOut>
              <PrimaryButton>
                <SignInButton fallbackRedirectUrl="/" />
              </PrimaryButton>
              <SecondaryButton>
                <SignUpButton fallbackRedirectUrl="/">Register</SignUpButton>
              </SecondaryButton>
            </SignedOut>
          </div>

          {/* Theme Button */}
          <ThemeButton />
        </div>
      </div>
    </Header>
  );
};

export const AuthHeader = () => {
  return (
    <Header className="min-h-[80px] bg-gradient-to-l from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="w-full flex items-center justify-between">
        <TypographyLarge>Welcome to DebateMod</TypographyLarge>
      </div>
    </Header>
  );
};
