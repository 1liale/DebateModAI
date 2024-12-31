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
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-sm bg-background/90 border-b-[1.5px] border-border/90 py-2 md:py-3 px-2 md:px-10",
        className
      )}
    >
      <div className="flex h-full items-center gap-2 px-2">{children}</div>
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
            <Image src={logo} alt="Logo" width={24} height={24} />
            <TypographyLarge className="text-lg pt-0.5">
              ebate
              <span className="text-brand">Mod</span>
            </TypographyLarge>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Menu (hidden on desktop) */}
          <UnauthMobileMenu />

          {/* Desktop Menu (hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-3">
            <LinkButton href="/#how-it-works">About</LinkButton>
            <LinkButton href="/#benefits">Features</LinkButton>
            <LinkButton href="/faq">FAQ</LinkButton>
            <SignedIn>
              {!pathname.startsWith("/app") && (
                <LinkButton href="/app/dashboard" variant="outline">
                  Dashboard <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
                </LinkButton>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    userButtonPopoverCard: {
                      pointerEvents: "initial",
                      zIndex: 100,
                      marginTop: "12px",
                    },
                  },
                  baseTheme: theme === "dark" ? customDarkTheme : undefined,
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton fallbackRedirectUrl="/">
                <PrimaryButton>
                  Sign In
                </PrimaryButton>
              </SignInButton>
              <SignUpButton fallbackRedirectUrl="/">
                <SecondaryButton>
                  Register
                </SecondaryButton>
              </SignUpButton>
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
    <Header className="h-[60px] bg-gradient-to-l from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="w-full flex items-center justify-between gap-2">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={28}
            height={35}
            className="h-7 w-auto md:hidden"
          />
        </Link>
        <div className="flex-1 max-w-2xl relative">
          <Input
            type="text"
            placeholder="Search / Enter command"
            className="bg-background/50 border-border/50 focus-visible:ring-brand/50 text-ellipsis h-9"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none">
            <span className="text-xs hidden md:block">⌘ F</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <ThemeButton className="md:hidden" />
          <div className="hidden md:flex items-center">
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
