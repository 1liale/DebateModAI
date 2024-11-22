import {
  Home,
  User,
  FileText,
  Calendar,
  Settings,
  LogOut,
  HelpCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { ThemeButton, ThemeSwitch } from "@/components/misc/ThemeWidget";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import { TypographyLarge } from "@/components/base/Typography";
import { LinkButton } from "@/components/base/Buttons";
import { Button } from "@/components/ui/button";

export type MenuItem = {
  section?: string;
  title?: string;
  icon?: React.ElementType;
  url?: string;
};

export const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: Home, url: "/app/dashboard" },
  { title: "Room", icon: Phone, url: "/app/room" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSidebarClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof Element &&
      !e.target.closest("button") &&
      !e.target.closest("a") &&
      !e.target.closest('[role="button"]')
    ) {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <aside
      className={`relative h-full border-r border-nav-border flex-shrink-0 transition-all duration-300 ease-in-out cursor-pointer hidden md:block ${
        isOpen ? "w-[250px]" : "w-[62px]"
      }`}
      onClick={handleSidebarClick}
    >
      <div className="h-screen flex flex-col bg-gradient-to-t from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] border-nav-border overflow-hidden">
        <div className="h-[80px] border-b border-nav-border p-3 mb-4 ml-1 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center">
              <Image src={logo} alt="Logo" width={30} height={38} />
              {isOpen && (
                <TypographyLarge className="text-[1.5rem] pt-1">
                  ebate
                  <span className="text-brand">Mod</span>
                </TypographyLarge>
              )}
            </div>
          </Link>
        </div>

        <div className="flex-1 p-3 flex flex-col justify-start gap-1">
          {menuItems.map((item, index) => (
            <LinkButton
              key={index}
              href={item.url || "#"}
              variant="ghost"
              className={`flex w-full items-center justify-start gap-3 px-3 py-2.5 rounded-lg 
                ${
                router.pathname === item.url
                  ? "bg-nav-active text-nav-text-active"
                  : "text-nav-text hover:bg-nav-hover hover:text-nav-text-active"
              }`}
            >
              {item.icon && (
                <item.icon
                  className={` ${
                    router.pathname === item.url
                      ? "text-sidebar-text-active"
                      : "text-sidebar-text"
                  }`}
                />
              )}
              {isOpen && (
                <span className="text-sm font-medium truncate">
                  {item.title}
                </span>
              )}
            </LinkButton>
          ))}
 
        </div>

        {/* Bottom section */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="w-full">
            {isOpen ? (
              <ThemeSwitch />
            ) : (
              <div className="flex w-full justify-center">
                <ThemeButton className="flex-shrink-0 text-sidebar-text" />
              </div>
            )}
          </div>

          <LinkButton
            href="/help"
            variant="ghost"
            className="flex w-full justify-start gap-3 px-3 py-2.5 text-sidebar-text hover:bg-nav-hover rounded-lg"
          >
            <HelpCircle />
            {isOpen && (
              <span className="text-sm font-medium">
                Help & getting started
              </span>
            )}
          </LinkButton>

          <Button
            className="flex w-full justify-start gap-3 px-3 py-2.5 text-sidebar-text hover:bg-nav-hover rounded-lg"
            variant="ghost"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
