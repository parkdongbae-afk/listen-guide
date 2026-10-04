"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const apply = (next: "dark" | "light") => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEYS.theme, next);
  };

  return (
    <button
      type="button"
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-line text-subtle",
        "transition-colors hover:text-brass hover:border-brass",
      )}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
