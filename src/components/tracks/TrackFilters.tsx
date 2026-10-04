"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

export type FilterOption = { value: string; label: string };

type Props = {
  eraOptions: FilterOption[];
  styleOptions: FilterOption[];
  moodOptions: FilterOption[];
};

type FilterKey = "era" | "style" | "mood" | "difficulty" | "vocals" | "sort";

const difficultyOptions: FilterOption[] = [
  { value: "very-easy", label: "매우 쉬움" },
  { value: "easy", label: "쉬움" },
  { value: "medium", label: "보통" },
  { value: "advanced", label: "어려움" },
];

const vocalsOptions: FilterOption[] = [
  { value: "yes", label: "보컬" },
  { value: "no", label: "연주곡" },
];

const sortOptions: FilterOption[] = [
  { value: "recommended", label: "입문 추천순" },
  { value: "era", label: "시대순" },
  { value: "title", label: "곡명순" },
  { value: "duration", label: "짧은 곡부터" },
];

/**
 * URL query parameter 기반 필터 칩.
 * 예: /must-listen?style=cool-jazz&difficulty=beginner (jazz_do.MD §6.3)
 */
export function TrackFilters({ eraOptions, styleOptions, moodOptions }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: FilterKey, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value == null || params.get(key) === value) params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const current = useMemo(
    () => ({
      era: searchParams.get("era"),
      style: searchParams.get("style"),
      mood: searchParams.get("mood"),
      difficulty: searchParams.get("difficulty"),
      vocals: searchParams.get("vocals"),
      sort: searchParams.get("sort") ?? "recommended",
    }),
    [searchParams],
  );

  const groups: { key: FilterKey; label: string; options: FilterOption[] }[] = [
    { key: "era", label: "시대", options: eraOptions },
    { key: "style", label: "스타일", options: styleOptions },
    { key: "mood", label: "분위기", options: moodOptions },
    { key: "difficulty", label: "난이도", options: difficultyOptions },
    { key: "vocals", label: "보컬 여부", options: vocalsOptions },
  ];

  const hasAnyFilter = groups.some((g) => current[g.key]);

  return (
    <div className="space-y-3 rounded-2xl border border-line bg-card p-4">
      {groups.map((group) => (
        <div key={group.key} className="flex flex-wrap items-center gap-1.5">
          <span className="w-16 shrink-0 text-xs font-semibold text-subtle" aria-hidden>
            {group.label}
          </span>
          <div role="group" aria-label={`${group.label} 필터`} className="flex flex-wrap gap-1.5">
            {group.options.map((option) => {
              const active = current[group.key] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setParam(group.key, option.value)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    active
                      ? "border-brass bg-brass-soft font-semibold text-brass"
                      : "border-line text-subtle hover:border-brass/50 hover:text-ink",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
        <div className="flex items-center gap-2">
          <label htmlFor="track-sort" className="text-xs font-semibold text-subtle">
            정렬
          </label>
          <select
            id="track-sort"
            value={current.sort}
            onChange={(e) => setParam("sort", e.target.value === "recommended" ? null : e.target.value)}
            className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs text-ink focus:border-brass focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="rounded-full border border-line px-3 py-1.5 text-xs text-subtle transition-colors hover:border-burgundy hover:text-burgundy"
          >
            필터 초기화
          </button>
        )}
      </div>
    </div>
  );
}
