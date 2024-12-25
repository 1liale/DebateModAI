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
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { HelpCircle, LogOut } from "lucide-react";
import { Home, Phone } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/app/dashboard" },
  { title: "Room", icon: Phone, url: "/app/room" },
];

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

export const AuthMobileMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <MobileMenu>
      <div className="flex flex-col gap-2 items-start">
        {menuItems && menuItems.map((item) => (
          <LinkButton
            key={item.url}
            href={item.url}
            className={`justify-start w-full gap-3 ${
              pathname === item.url
                ? "bg-nav-active text-nav-text-active"
                : "text-nav-text hover:bg-nav-hover hover:text-nav-text-active"
            }`}
          >
            {item.icon && (
              <item.icon
                className={
                  pathname === item.url
                    ? "text-sidebar-text-active"
                    : "text-sidebar-text"
                }
              />
            )}
            {item.title}
          </LinkButton>
        ))}

        <LinkButton
          href="/help"
          className="justify-start w-full gap-3 text-sidebar-text hover:bg-nav-hover"
        >
          <HelpCircle />
          Help & getting started
        </LinkButton>

        <Button
          className="justify-start w-full gap-3 text-sidebar-text hover:bg-nav-hover"
          variant="ghost"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </MobileMenu>
  );
};
