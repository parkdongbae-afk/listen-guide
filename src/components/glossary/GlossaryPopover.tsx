"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen } from "lucide-react";
import type { GlossaryTerm } from "@/types";
import { glossaryMap } from "@/data/glossary";
import { trackMap } from "@/data/track-utils";
import { cn } from "@/lib/utils";

/**
 * 곡 본문 속 용어 클릭 시 페이지 이탈 없이 뜻을 보여주는 팝오버. (jazz_do.MD §14)
 */
export function Term({ termId }: { termId: string }) {
  const term: GlossaryTerm | undefined = glossaryMap.get(termId);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!term) return null;

  return (
    <span ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "underline decoration-dotted decoration-2 underline-offset-4 transition-colors",
          open ? "text-brass" : "text-brass/90 hover:text-brass",
        )}
      >
        {term.name}
      </button>
      {open && (
        <span className="absolute left-0 top-full z-40 mt-2 block w-72 rounded-xl border border-line bg-card p-4 text-left shadow-xl" style={{ boxShadow: "0 12px 32px var(--shadow)" }}>
          <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <BookOpen className="h-3.5 w-3.5 text-brass" aria-hidden />
            {term.name}
            {term.nameEn && <span className="text-xs font-normal text-subtle">{term.nameEn}</span>}
          </span>
          <span className="mt-1.5 block text-sm leading-relaxed text-ink">{term.oneLiner}</span>
          <span className="mt-2 block text-xs leading-relaxed text-subtle">{term.more}</span>
          {term.exampleTrackIds.length > 0 && (
            <span className="mt-2.5 block text-xs text-subtle">
              들어보기:{" "}
              {term.exampleTrackIds
                .map((id) => trackMap.get(id))
                .filter((t): t is NonNullable<typeof t> => Boolean(t))
                .map((t) => (
                  <Link
                    key={t.id}
                    href={`/jazz/tracks/${t.slug}`}
                    className="mr-1.5 inline-block text-brass underline decoration-dotted underline-offset-2"
                  >
                    {t.title}
                  </Link>
                ))}
            </span>
          )}
          <Link
            href={`/jazz/glossary#${term.id}`}
            className="mt-2.5 block text-xs font-medium text-brass hover:underline"
          >
            용어 사전에서 자세히 →
          </Link>
        </span>
      )}
    </span>
  );
}
