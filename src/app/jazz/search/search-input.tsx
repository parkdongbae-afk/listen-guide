"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useJazz } from "@/context/JazzContext";

type Props = {
  initialQuery: string;
};

/** 검색 입력 + 최근 검색어 (로컬 저장) */
export function SearchInput({ initialQuery }: Props) {
  const router = useRouter();
  const { searches, addSearch, clearSearches, hydrated } = useJazz();
  const submittedRef = useRef(false);

  // q 파라미터가 있으면 최근 검색어에 등록 (1회)
  useEffect(() => {
    if (initialQuery && !submittedRef.current && hydrated) {
      submittedRef.current = true;
      addSearch(initialQuery);
    }
  }, [initialQuery, hydrated, addSearch]);

  return (
    <div className="space-y-3">
      <form
        action="/jazz/search"
        role="search"
        onSubmit={(e) => {
          // 네이티브 GET 제출 직전 최근 검색어에 등록
          const q = new FormData(e.currentTarget).get("q");
          if (typeof q === "string" && q.trim()) addSearch(q.trim());
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" aria-hidden />
        <label htmlFor="search-input" className="sr-only">
          검색어
        </label>
        <input
          id="search-input"
          type="search"
          name="q"
          defaultValue={initialQuery}
          placeholder="곡 · 아티스트 · 앨범 · 용어를 검색해 보세요"
          className="h-12 w-full rounded-2xl border border-line bg-card pl-12 pr-4 text-base text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
        />
      </form>

      {hydrated && searches.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-subtle">최근 검색어</span>
          {searches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => router.push(`/jazz/search?q=${encodeURIComponent(term)}`)}
              className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs text-subtle transition-colors hover:border-brass hover:text-brass"
            >
              {term}
            </button>
          ))}
          <button
            type="button"
            onClick={clearSearches}
            aria-label="최근 검색어 모두 지우기"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs text-subtle hover:text-burgundy"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            지우기
          </button>
        </div>
      )}
    </div>
  );
}
