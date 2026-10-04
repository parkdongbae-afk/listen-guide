import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { symphonyFirstTen, symphonyEntryPoints, symphonyList } from "@/lib/symphony";

export const metadata: Metadata = {
  title: "Symphony Guide — 교향곡, 악장부터 천천히",
  description: "교향곡 입문 가이드. 악장 지도와 감상 모드로 긴 작품도 부담 없이 들어보세요.",
};

const modes = [
  {
    name: "첫 5분",
    description: "가장 유명하고 이해하기 쉬운 구간만. 핵심 주제 한두 개를 악기 한두 개만 추적해서 들입니다.",
  },
  {
    name: "한 악장만",
    description: "작품의 성격을 가장 잘 보여 주는 악장 하나. 악장 구조와 감상 포인트 3~5개를 제공합니다.",
  },
  {
    name: "전체 교향곡",
    description: "악장을 이어 들으며 곡 전체의 흐름을 경험합니다. 한 번에 완주하지 않아도 됩니다.",
  },
];

export default function SymphonyHomePage() {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 sm:px-10 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4a6fa5]/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            Symphony Guide
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            교향곡은 길어도,
            <br />
            악장만큼은 짧습니다
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-subtle sm:text-lg">
            {symphonyList.length}편의 교향곡을 악장 지도와 함께 들어봅니다. 베토벤 교향곡 5번·3번은 악장 시작점 검증이
            완료되어 구간 이동이 바로 가능합니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href="/symphony/symphonies/beethoven-symphony-5"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
            >
              베토벤 교향곡 5번부터
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/symphony/symphonies"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
            >
              전체 교향곡 보기
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="modes-heading">
        <h2 id="modes-heading" className="mb-4 text-xl font-bold">
          세 가지 감상 모드
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {modes.map((mode, i) => (
            <li key={mode.name} className="rounded-2xl border border-line bg-card p-5">
              <span className="text-xs font-bold text-brass">MODE {i + 1}</span>
              <h3 className="mt-1 text-base font-bold text-ink">{mode.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">{mode.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="first10-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 id="first10-heading" className="text-xl font-bold">
              가장 먼저 들을 10곡
            </h2>
            <p className="mt-1 text-sm text-subtle">입문자를 위해 검증된 순서입니다. 추천 악장부터 들어보세요.</p>
          </div>
          <Link href="/symphony/symphonies" className="shrink-0 text-sm font-medium text-brass hover:underline">
            전체 {symphonyList.length}편 →
          </Link>
        </div>
        <ol className="space-y-2">
          {symphonyFirstTen.map((s, index) => (
            <li key={s.id}>
              <Link
                href={`/symphony/symphonies/${s.id}`}
                className="flex items-center gap-4 rounded-xl border border-line bg-card px-4 py-3.5 transition-colors hover:border-brass"
              >
                <span aria-hidden className="font-display w-6 shrink-0 text-lg font-bold text-brass tabular-nums">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink">{s.titleKo}</span>
                  <span className="block truncate text-xs text-subtle">
                    추천 악장: {s.recommendedStart}
                    {symphonyEntryPoints[s.id] && ` · ${symphonyEntryPoints[s.id]}`}
                  </span>
                </span>
                {s.verified && (
                  <span className="shrink-0 rounded-full bg-brass-soft px-2 py-0.5 text-[10px] font-semibold text-brass">
                    악장 지도 완료
                  </span>
                )}
                <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
