import type { Metadata } from "next";
import { Suspense } from "react";
import { tracks } from "@/data/tracks";
import { eras } from "@/data/eras";
import { styles } from "@/data/styles";
import { moods } from "@/data/moods";
import { TrackFilters } from "@/components/tracks/TrackFilters";
import { TrackGrid } from "@/components/tracks/TrackGrid";
import { TrackListItem } from "@/components/tracks/TrackListItem";
import { EmptyState } from "@/components/ui/index";
import { difficultyOrder } from "@/lib/utils";

export const metadata: Metadata = {
  title: "반드시 들어야 할 재즈 곡",
  description:
    "재즈 입문자가 반드시 들어야 할 대표곡 큐레이션. 시대, 스타일, 분위기, 난이도별로 골라 페이지 안에서 바로 들어보세요.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const eraOrder = eras.map((e) => e.id);

export default async function MustListenPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const pick = (key: string): string | undefined => {
    const v = params[key];
    return typeof v === "string" && v.length > 0 ? v : undefined;
  };

  const era = pick("era");
  const style = pick("style");
  const mood = pick("mood");
  const difficulty = pick("difficulty");
  const vocals = pick("vocals");
  const sort = pick("sort") ?? "recommended";

  let list = tracks.filter((t) => {
    if (era && t.eraId !== era) return false;
    if (style && !t.styleIds.includes(style)) return false;
    if (mood && !t.moodIds.includes(mood)) return false;
    if (difficulty && t.difficulty !== difficulty) return false;
    if (vocals === "yes" && !t.hasVocals) return false;
    if (vocals === "no" && t.hasVocals) return false;
    return true;
  });

  list = [...list].sort((a, b) => {
    switch (sort) {
      case "era":
        return eraOrder.indexOf(a.eraId) - eraOrder.indexOf(b.eraId);
      case "title":
        return a.title.localeCompare(b.title);
      case "duration":
        return (a.durationSeconds ?? 99999) - (b.durationSeconds ?? 99999);
      default: {
        const ra = a.mustListenRank ?? 999;
        const rb = b.mustListenRank ?? 999;
        if (ra !== rb) return ra - rb;
        return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
      }
    }
  });

  const activeCount = [era, style, mood, difficulty, vocals].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">반드시 들어야 할 재즈 곡</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          편집자가 고른 입문 큐레이션입니다. 순위는 절대적인 음악적 우열이 아니라 &lsquo;처음 듣기 좋은 순서&rsquo;일 뿐입니다.
          {tracks.length}곡이 수록되어 있으며, 모든 곡을 페이지 안에서 바로 들을 수 있습니다.
        </p>
      </header>

      <Suspense fallback={<div className="h-40 rounded-2xl border border-line bg-card" aria-hidden />}>
        <TrackFilters
          eraOptions={eras.map((e) => ({ value: e.id, label: e.name }))}
          styleOptions={styles.map((s) => ({ value: s.id, label: s.nameKo }))}
          moodOptions={moods.map((m) => ({ value: m.id, label: m.label }))}
        />
      </Suspense>

      <p className="text-sm text-subtle" aria-live="polite">
        {list.length}곡{activeCount > 0 && " (필터 적용됨)"}
      </p>

      {list.length === 0 ? (
        <EmptyState
          title="조건에 맞는 곡이 없어요"
          description="필터를 하나씩 풀어 보거나 다른 분위기를 선택해 보세요."
          actionHref="/jazz/must-listen"
          actionLabel="필터 초기화"
        />
      ) : (
        <>
          {/* 데스크톱: 카드 그리드 */}
          <div className="hidden lg:block">
            <TrackGrid tracks={list} showRank columns="4" />
          </div>
          {/* 모바일/태블릿: 세로 리스트 */}
          <div className="space-y-2 lg:hidden">
            {list.map((track) => (
              <TrackListItem key={track.id} track={track} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
