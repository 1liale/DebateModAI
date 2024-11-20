import { Gavel } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu, DesktopMenu } from "@/components/layout/Menu";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-gray-600/20 bg-gray-950/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Gavel className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-semibold">DebateModAI</span>
        </Link>

        <MobileMenu pathname={pathname} />
        <DesktopMenu pathname={pathname} />
      </div>
    </header>
  );
};
