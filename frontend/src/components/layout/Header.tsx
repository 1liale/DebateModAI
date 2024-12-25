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
import { AuthMobileMenu, UnauthMobileMenu } from "@/components/layout/Menu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import { ThemeButton } from "../misc/ThemeWidget";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { TypographyLarge } from "../base/Typography";

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
        {/* Logo */}

        <Link href="/">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" width={28} height={28} />

            <TypographyLarge className="text-[1.25rem] pt-1">
              ebate
              <span className="text-brand">Mod</span>
            </TypographyLarge>
          </div>
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
  const { theme } = useTheme();

  return (
    <Header className="min-h-[80px] bg-gradient-to-l from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="w-full flex items-center justify-between gap-2">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={30}
            height={38}
            className="h-8 w-auto md:hidden"
          />
        </Link>
        <div className="flex-1 max-w-3xl relative">
          <Input
            type="text"
            placeholder="Search / Enter command"
            className="bg-background/50 border-border/50 focus-visible:ring-brand/50 text-ellipsis"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none">
            <span className="text-sm hidden md:block">⌘ F</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <ThemeButton className="md:hidden" />
          <div className="hidden md:block">
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
          </div>
          <AuthMobileMenu />
        </div>
      </div>
    </Header>
  );
};
