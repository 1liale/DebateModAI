"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  LinkButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/base/Buttons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { customDarkTheme } from "@/styles/customTheme";
import { usePathname } from "next/navigation";

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden relative w-10 h-10 p-0 m-0"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="max-w-[250px] fixed right-4 left-auto mt-16 rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export const UnauthMobileMenu = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <MobileMenu>
      <div className="flex flex-col gap-2 items-start">
        <LinkButton href="#about" className="justify-start w-full">
          About Us
        </LinkButton>
        <LinkButton href="#features" className="justify-start w-full">
          Features
        </LinkButton>
        <LinkButton href="#pricing" className="justify-start w-full">
          Pricing
        </LinkButton>
        <LinkButton href="#pricing" className="justify-start w-full">
          Contact Us
        </LinkButton>
        <SignedIn>
          {!pathname.startsWith("/app") && (
            <Link href="/app/dashboard" className="w-full">
              <PrimaryButton className="justify-between">
                Dashboard <ArrowUpRight className="h-4 w-4 ml-2" />
              </PrimaryButton>
            </Link>
          )}
          <div className="flex justify-center ml-1 relative">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: {
                    pointerEvents: "initial",
                    zIndex: 100,
                  },
                },
                baseTheme: theme === "dark" ? customDarkTheme : undefined,
              }}
            />
          </div>
        </SignedIn>
        <SignedOut>
          <PrimaryButton className="w-full justify-center">
            <SignInButton fallbackRedirectUrl="/" />
          </PrimaryButton>
          <SecondaryButton className="w-full justify-center">
            <SignUpButton fallbackRedirectUrl="/">Register</SignUpButton>
          </SecondaryButton>
        </SignedOut>
      </div>
    </MobileMenu>
  );
};
