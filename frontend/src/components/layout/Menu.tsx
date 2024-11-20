import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
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

interface MobileMenuProps {
  pathname: string;
}

export const MobileMenu = ({ pathname }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden relative">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="w-[250px] fixed right-4 left-auto mt-16 rounded-lg border border-gray-800 bg-gray-950"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center mb-4">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetTrigger asChild></SheetTrigger>
        </div>
        <div className="flex flex-col space-y-4 items-start p-2">
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
            {pathname !== "/dashboard" && (
              <LinkButton
                href="/dashboard"
                variant="default"
                className="w-full justify-start"
              >
                Dashboard
              </LinkButton>
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
      </SheetContent>
    </Sheet>
  );
};

interface MenuProps {
  pathname: string;
}

export const DesktopMenu = ({ pathname }: MenuProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-3">
      <LinkButton href="#Solutions">
        Solutions
      </LinkButton>
      <LinkButton href="#pricing">
        Pricing
      </LinkButton>
      <LinkButton href="#pricing">
        Contact Us
      </LinkButton>
      <SignedIn>
        {pathname !== "/dashboard" && (
          <Link href="/dashboard">
            <PrimaryButton className="mr-4">
              Dashboard <ArrowUpRight className="h-4 w-4 ml-2" />
            </PrimaryButton>
          </Link>
        )}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10",
              userButtonPopoverCard: { pointerEvents: "initial" },
            },
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
  );
};
