import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu, DesktopMenu } from "@/components/layout/Menu";
import { MessageSquareCode } from "lucide-react";
import { ThemeButton } from "@/components/misc/ThemeWidget";
import { TypographyLarge } from "@/components/base/Typography";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 backdrop-blur-sm dark:border-gray-600/20 dark:bg-gray-950/90 bg-gray-50/90 border-black-200/50">
      <div className="w-full px-4 sm:px-6 lg:px-8 p-3 flex justify-between items-center">
        <Link href="/" className="font-bold tracking-tight flex items-center">
          <MessageSquareCode className="w-6 h-6 text-gray-400 mr-1" />
          <TypographyLarge>
            Debate
            <span className="text-indigo-500">Mod</span>
          </TypographyLarge>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <MobileMenu pathname={pathname} />
          <DesktopMenu pathname={pathname} />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
};
