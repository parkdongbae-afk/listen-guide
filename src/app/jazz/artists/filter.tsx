"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type ArtistItem = {
  id: string;
  slug: string;
  name: string;
  nameKo?: string;
  shortBio: string;
  instruments: string;
};

const instrumentFilterOptions = [
  { value: "", label: "전체" },
  { value: "트럼펫", label: "트럼펫" },
  { value: "색소폰", label: "색소폰" },
  { value: "피아노", label: "피아노" },
  { value: "드럼", label: "드럼" },
  { value: "보컬", label: "보컬" },
  { value: "클라리넷", label: "클라리넷" },
  { value: "기타", label: "기타" },
  { value: "베이스", label: "베이스" },
];

/** 아티스트 목록: 악기 필터 + 이름 검색 (클라이언트 필터링) */
export function ArtistFilter({ artists }: { artists: ArtistItem[] }) {
  const [instrument, setInstrument] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artists.filter((a) => {
      if (instrument && !a.instruments.includes(instrument)) return false;
      if (q && !`${a.name} ${a.nameKo ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [artists, instrument, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="악기별 필터" className="flex flex-wrap gap-1.5">
          {instrumentFilterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={instrument === option.value}
              onClick={() => setInstrument(option.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                instrument === option.value
                  ? "border-brass bg-brass-soft font-semibold text-brass"
                  : "border-line text-subtle hover:border-brass/50 hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
          <label htmlFor="artist-name-search" className="sr-only">
            아티스트 이름 검색
          </label>
          <input
            id="artist-name-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름 검색 (한글/영문)"
            className="h-9 w-48 rounded-full border border-line bg-card pl-9 pr-3 text-sm text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-card/50 px-6 py-12 text-center text-sm text-subtle">
          조건에 맞는 아티스트가 없어요. 필터를 바꿔 보세요.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((artist) => (
            <li key={artist.id}>
              <Link
                href={`/jazz/artists/${artist.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-burgundy/70 to-brass/50 text-lg font-bold text-bg"
                  >
                    {artist.nameKo?.charAt(0) ?? artist.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-ink">{artist.nameKo ?? artist.name}</span>
                    <span className="block truncate text-xs text-subtle">{artist.name}</span>
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-subtle">{artist.shortBio}</p>
                <p className="mt-3 text-xs text-brass">{artist.instruments}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
