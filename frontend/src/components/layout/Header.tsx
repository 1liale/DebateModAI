import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu, DesktopMenu } from "@/components/layout/Menu";
import { MessageSquareCode } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-gray-600/20 bg-gray-950/90 sm:bg-gray-950/80 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 p-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center">
          <MessageSquareCode className="w-6 h-6 text-gray-400 mr-1" />
          Debate
          <span className="text-indigo-500">Mod</span>
        </Link>
        <MobileMenu pathname={pathname} />
        <DesktopMenu pathname={pathname} />
      </div>
    </header>
  );
};
