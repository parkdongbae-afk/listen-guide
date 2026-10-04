"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { guides, guideByPath, guideSectionNavs } from "@/lib/guides";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const isHub = pathname === "/";
  const guide = guideByPath(pathname);
  const sectionNav = guideSectionNavs[guide.id];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="가이드 선택 홈으로">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brass text-bg" aria-hidden>
              <Disc />
            </span>
            <span className="leading-none">
              <span className="font-display block text-base font-bold tracking-tight">{isHub ? "Listen Guide" : guide.name}</span>
              <span className="hidden text-[10px] text-subtle sm:block">{isHub ? "음악 감상 가이드 모음" : guide.tagline}</span>
            </span>
          </Link>

          <nav aria-label="가이드 선택" className="hidden items-center gap-0.5 rounded-full border border-line bg-card p-0.5 md:flex">
            {guides.map((g) => {
              const active = g.id === guide.id && !isHub;
              return (
                <Link
                  key={g.id}
                  href={g.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    active ? "bg-brass text-bg" : "text-subtle hover:text-ink",
                  )}
                >
                  {g.nameKo}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {guide.id === "jazz" && !isHub && (
              <form action="/jazz/search" role="search" className="hidden items-center lg:flex">
                <label htmlFor="global-search" className="sr-only">
                  곡, 아티스트, 용어 검색
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
                  <input
                    id="global-search"
                    type="search"
                    name="q"
                    placeholder="곡 · 아티스트 · 용어"
                    className="h-9 w-44 rounded-full border border-line bg-card pl-9 pr-3 text-sm text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
                  />
                </div>
              </form>
            )}
            <ThemeToggle />
          </div>
        </div>

        {!isHub && (
          <nav
            aria-label={`${guide.nameKo} 섹션 메뉴`}
            className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {sectionNav.map((item) => {
              const [base] = item.href.split("?");
              const active = pathname === base;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
                    active ? "bg-brass-soft font-semibold text-brass" : "text-subtle hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

function Disc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  );
}
