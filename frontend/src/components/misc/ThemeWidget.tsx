"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={className}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="relative flex items-center w-full rounded-full bg-white dark:bg-gray-800 px-2 py-1 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
      role="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      {/* Sliding background */}
      <div
        className={`absolute inset-[4px] w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-in-out
          ${
            theme === "light"
              ? "left-[4px] bg-gray-100"
              : "left-[calc(50%)] bg-gray-700"
          }`}
      />
      <div className="relative flex w-full">
        <div className="flex items-center justify-center gap-1.5 w-1/2 px-2 py-1 z-10">
          <Sun
            className={`h-4 w-4 transition-colors duration-200 ${
              theme === "light" ? "text-gray-900" : "text-gray-400"
            }`}
          />
          <span
            className={`text-sm transition-colors duration-200 ${
              theme === "light" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Light
          </span>
        </div>
        <div className="flex items-center justify-center gap-1.5 w-1/2 px-2 py-1 z-10">
          <Moon
            className={`h-4 w-4 transition-colors duration-200 ${
              !theme || theme === "dark" ? "text-gray-200" : "text-gray-400"
            }`}
          />
          <span
            className={`text-sm transition-colors duration-200 ${
              !theme || theme === "dark" ? "text-gray-200" : "text-gray-400"
            }`}
          >
            Dark
          </span>
        </div>
      </div>
    </div>
  );
}
