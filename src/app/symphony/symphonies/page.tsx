import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { symphonyList, symphonyVerifiedCount } from "@/lib/symphony";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Symphony Guide — 전체 교향곡",
  description: "베토벤부터 윤이상까지, 30편의 교향곡을 악장 지도와 함께 감상하세요.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SymphonyListPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const verifiedOnly = params.verified === "1";
  const list = verifiedOnly ? symphonyList.filter((s) => s.verified) : symphonyList;

  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">전체 교향곡</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          {symphonyList.length}편을 큐레이션 순서로 수록했습니다. 악장 지도 완료 {symphonyVerifiedCount}편은 악장 시작점
          바로 이동이 가능합니다.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-1.5">
        <Link
          href="/symphony/symphonies"
          aria-pressed={!verifiedOnly}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs transition-colors",
            !verifiedOnly ? "border-brass bg-brass-soft font-semibold text-brass" : "border-line text-subtle hover:text-ink",
          )}
        >
          전체
        </Link>
        <Link
          href="/symphony/symphonies?verified=1"
          aria-pressed={verifiedOnly}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs transition-colors",
            verifiedOnly ? "border-brass bg-brass-soft font-semibold text-brass" : "border-line text-subtle hover:text-ink",
          )}
        >
          악장 지도 완료만
        </Link>
      </div>

      <p className="text-sm text-subtle" aria-live="polite">
        {list.length}편
      </p>

      <ul className="grid gap-2 lg:grid-cols-2">
        {list.map((s, index) => (
          <li key={s.id}>
            <Link
              href={`/symphony/symphonies/${s.id}`}
              className="flex h-full items-center gap-3 rounded-xl border border-line bg-card px-4 py-3.5 transition-colors hover:border-brass"
            >
              <span aria-hidden className="w-6 shrink-0 text-center text-xs font-bold text-subtle tabular-nums">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-ink">{s.titleKo}</span>
                <span className="block truncate text-xs text-subtle">
                  {s.composer} · 추천 악장: {s.recommendedStart}
                  {s.conductor && ` · ${s.conductor}`}
                </span>
              </span>
              {s.verified ? (
                <span className="shrink-0 rounded-full bg-brass-soft px-2 py-0.5 text-[10px] font-semibold text-brass">
                  악장 {s.eventCount}개
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] text-subtle">초안</span>
              )}
              <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
