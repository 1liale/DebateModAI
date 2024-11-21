import { Home, User, FileText, Calendar, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link'
import { useState } from 'react'
import { useClerk } from "@clerk/nextjs"
import { useRouter } from 'next/router'
import { useTheme } from "next-themes"
import { ThemeSwitch } from "@/components/misc/ThemeWidget"

type MenuItem = {
  section?: string;
  title?: string;
  icon?: React.ElementType;
  url?: string;
}

const menuItems: MenuItem[] = [
  { title: "Home", icon: Home, url: "/app/dashboard" },
  { title: "Products", icon: FileText, url: "/app/products" },
  { title: "Customers", icon: User, url: "/app/customers" },
  { title: "Shop", icon: Calendar, url: "/app/shop" },
  { title: "Income", icon: Settings, url: "/app/income" },
  { title: "Promote", icon: Settings, url: "/app/promote" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const { signOut } = useClerk()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <aside className={`relative h-full flex-shrink-0 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="h-screen flex flex-col items-stretch justify-start bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex h-full flex-col items-stretch justify-start px-4 py-4">
          <div className="mb-8">
            <Link href="/app">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {isOpen ? 'Dashboard' : 'D'}
              </span>
            </Link>
          </div>
          
          <div className="flex flex-col items-stretch space-y-1">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.url || '#'}>
                <button 
                  className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    router.pathname === item.url 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.icon && (
                    <item.icon className={`h-5 w-5 ${
                      router.pathname === item.url 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`} 
                  />
                  )}
                  {isOpen && <span className="text-sm font-medium">{item.title}</span>}
                </button>
              </Link>
            ))}
          </div>
          
          <div className="flex-grow" />
          
          <Link href="/help">
            <button className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
              <Settings className="h-5 w-5" />
              {isOpen && <span className="text-sm font-medium">Help & getting started</span>}
            </button>
          </Link>

          {isOpen && (
            <div className="mt-4 px-3">
              <ThemeSwitch />
            </div>
          )}
          
          <button 
            className="mt-4 flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}

