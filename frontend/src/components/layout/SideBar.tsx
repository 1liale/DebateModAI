import { Home, User, FileText, Calendar, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link'
import { useState } from 'react'
import { useClerk } from "@clerk/nextjs"
import { useRouter } from 'next/router'

type MenuItem = {
  section?: string;
  title?: string;
  icon?: React.ElementType;
  url?: string;
}

const menuItems: MenuItem[] = [
  { section: 'Main' },
  { title: "Dashboard", icon: Home, url: "/app/dashboard" },
  { title: "Conferences", icon: User, url: "/app/conferences" },
  { title: "Documents", icon: FileText, url: "/app/documents" },
  { title: "Calendar", icon: Calendar, url: "/app/calendar" },
  { title: "Settings", icon: Settings, url: "/app/settings" },
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
      <div className="h-screen flex flex-col items-stretch justify-start bg-[#1e1f2e]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-4 z-10 rounded-full bg-[#1e1f2e] p-1 shadow-md hover:bg-gray-700"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4 text-gray-300" /> : <ChevronRight className="h-4 w-4 text-gray-300" />}
        </button>

        <div className="flex h-full flex-col items-stretch justify-start px-6 py-6">
          <div className={`mb-8 ${isOpen ? 'pr-16' : 'pr-2'}`}>
            <Link href="/app">
              <span className={`text-xl font-bold text-white ${!isOpen && 'hidden'}`}>Teams Call</span>
              {!isOpen && <span className="text-xl font-bold text-white">TC</span>}
            </Link>
          </div>
          
          <div className="flex flex-col items-stretch space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {!item.section && (
                  <Link href={item.url || '#'}>
                    <button 
                      className={`flex w-full items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        router.pathname === item.url 
                          ? 'bg-[#4f46e5] text-white' 
                          : 'hover:bg-[#282a3a] text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {item.icon && (
                        <item.icon className={`h-5 w-5 ${
                          router.pathname === item.url ? 'text-white' : 'text-gray-400'
                        }`} 
                      />
                      )}
                      {isOpen && <span className="text-sm">{item.title}</span>}
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex-grow" />
          <button 
            className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-gray-200 hover:bg-[#282a3a] rounded-lg"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}

