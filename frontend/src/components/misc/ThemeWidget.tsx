"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-1 py-1 shadow-sm border border-gray-200 dark:border-gray-700"
      role="button"
      onClick={() => setTheme( theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200
          ${theme === 'light' ? 'bg-gray-100' : ''}`}
      >
        <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-400'}`} />
      </div>
      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200
          ${!theme || theme === 'dark' ? 'bg-gray-700' : ''}`}
      >
        <Moon className={`h-4 w-4 ${!theme ||theme === 'dark' ? 'text-gray-200' : 'text-gray-400'}`} />
      </div>
    </div>
  )
}