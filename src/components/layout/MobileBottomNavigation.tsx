"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Disc3, Heart, Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; icon: typeof Home };

function itemsFor(pathname: string): Item[] {
  if (pathname.startsWith("/classic")) {
    return [
      { href: "/", label: "가이드", icon: Home },
      { href: "/classic", label: "홈", icon: Compass },
      { href: "/classic/works", label: "작품", icon: Disc3 },
      { href: "/classic/works?origin=korean", label: "한국", icon: Heart },
    ];
  }
  if (pathname.startsWith("/symphony")) {
    return [
      { href: "/", label: "가이드", icon: Home },
      { href: "/symphony", label: "홈", icon: Compass },
      { href: "/symphony/symphonies", label: "교향곡", icon: Disc3 },
    ];
  }
  if (pathname.startsWith("/audio-test")) {
    return [
      { href: "/", label: "가이드", icon: Home },
      { href: "/audio-test", label: "홈", icon: Compass },
      { href: "/audio-test/tracks", label: "곡", icon: Disc3 },
      { href: "/audio-test/evaluation", label: "평가", icon: Heart },
    ];
  }
  return [
    { href: "/", label: "가이드", icon: Home },
    { href: "/jazz", label: "홈", icon: Compass },
    { href: "/jazz/must-listen", label: "필수곡", icon: Disc3 },
    { href: "/jazz/my-jazz", label: "나의 재즈", icon: Heart },
    { href: "/jazz/search", label: "검색", icon: Search },
  ];
}

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const items = itemsFor(pathname);

  return (
    <nav
      aria-label="모바일 메뉴"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map(({ href, label, icon: Icon }) => {
          const [base] = href.split("?");
          const active = base === "/" ? pathname === "/" : pathname.startsWith(base);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] transition-colors",
                  active ? "text-brass" : "text-subtle",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
