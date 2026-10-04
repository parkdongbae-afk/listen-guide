import type { Metadata } from "next";
import Link from "next/link";
import { moods } from "@/data/moods";
import { TasteFinder } from "@/components/discovery/TasteFinder";
import { tracks } from "@/data/tracks";

export const metadata: Metadata = {
  title: "분위기로 찾는 재즈",
  description: "장르명이 어렵다면 기분과 상황부터. 편안한 밤, 비 오는 날, 카페, 드라이브 등 분위기별로 재즈를 찾아보세요.",
};

export default function MoodsPage() {
  const moodCounts = moods.map((mood) => ({
    mood,
    count: mood.trackIds.length || tracks.filter((t) => t.moodIds.includes(mood.id)).length,
  }));

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">분위기로 찾는 재즈</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          초보자에게 장르명은 벽이지 문이 아닙니다. 지금 기분과 상황을 골라 보세요. 그것이 재즈를 만나는 가장 빠른
          방법입니다.
        </p>
      </header>

      {/* 취향 찾기 퀴즈 */}
      <section id="taste-finder" aria-labelledby="taste-heading" className="scroll-mt-20">
        <h2 id="taste-heading" className="sr-only">
          취향 찾기 질문
        </h2>
        <TasteFinder candidates={tracks} />
      </section>

      {/* 분위기 목록 */}
      <section aria-labelledby="mood-list-heading">
        <h2 id="mood-list-heading" className="mb-4 text-xl font-bold">
          기분 · 상황으로 고르기
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moodCounts.map(({ mood, count }) => (
            <li key={mood.id}>
              <Link
                href={`/jazz/moods/${mood.slug}`}
                className="flex h-full items-center gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
              >
                <span aria-hidden className="text-3xl">
                  {mood.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-ink">{mood.label}</span>
                  <span className="mt-0.5 block truncate text-xs text-subtle">{mood.description}</span>
                  <span className="mt-1 block text-[11px] text-brass">{count}곡</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
