"use client";

import Link from "next/link";
import { useState } from "react";
import { useJazz } from "@/context/JazzContext";
import { trackMap } from "@/data/track-utils";
import { courses } from "@/data/courses";
import { TrackListItem } from "@/components/tracks/TrackListItem";
import { EmptyState, ProgressRing } from "@/components/ui/index";
import { cn } from "@/lib/utils";
import type { Track } from "@/types";

type Tab = "favorites" | "recent" | "completed";

const tabs: { key: Tab; label: string }[] = [
  { key: "favorites", label: "찜한 곡" },
  { key: "recent", label: "최근 들은 곡" },
  { key: "completed", label: "감상 완료" },
];

const emptyCopy: Record<Tab, { title: string; actionHref: string; actionLabel: string }> = {
  favorites: { title: "아직 찜한 곡이 없어요", actionHref: "/jazz/must-listen", actionLabel: "필수곡에서 찜하기" },
  recent: { title: "아직 감상 기록이 없어요", actionHref: "/", actionLabel: "홈에서 곡 고르기" },
  completed: { title: "완료 표시한 곡이 없어요", actionHref: "/jazz/must-listen", actionLabel: "곡 감상하기" },
};

/** 나의 재즈: 찜 · 최근 감상 · 완료 · 코스 진도 · 데이터 초기화 */
export function MyJazzView() {
  const { favorites, recent, completed, courses: courseProgress, hydrated, resetAll } = useJazz();
  const [active, setActive] = useState<Tab>("favorites");

  const resolve = (ids: string[]): Track[] =>
    ids.map((id) => trackMap.get(id)).filter((t): t is Track => Boolean(t));

  const lists: Record<Tab, Track[]> = {
    favorites: resolve(favorites),
    recent: resolve(recent.map((r) => r.trackId)),
    completed: resolve(completed),
  };

  const activeList = lists[active];
  const empty = emptyCopy[active];

  const handleReset = () => {
    if (window.confirm("정말 초기화할까요? 찜, 감상 기록, 코스 진도가 모두 삭제됩니다.")) {
      resetAll();
    }
  };

  return (
    <div className="space-y-10">
      {/* 코스 진도 */}
      <section aria-labelledby="course-progress-heading">
        <h2 id="course-progress-heading" className="mb-4 text-xl font-bold">
          코스 진도
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {courses.map((course) => {
            const done = hydrated ? (courseProgress[course.id]?.length ?? 0) : 0;
            return (
              <li key={course.id}>
                <Link
                  href={`/jazz/courses/${course.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
                >
                  <ProgressRing value={done} total={course.steps.length} size={56} />
                  <span>
                    <span className="block font-bold text-ink">{course.title}</span>
                    <span className="block text-xs text-subtle">
                      {done}/{course.steps.length} 단계 완료
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 탭: 찜 / 최근 / 완료 */}
      <section aria-labelledby="lists-heading">
        <h2 id="lists-heading" className="sr-only">
          나의 곡 목록
        </h2>
        <div role="tablist" aria-label="나의 곡 목록" className="mb-4 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active === tab.key
                  ? "border-brass bg-brass-soft font-semibold text-brass"
                  : "border-line text-subtle hover:border-brass/50 hover:text-ink",
              )}
            >
              {tab.label} ({lists[tab.key].length})
            </button>
          ))}
        </div>

        {activeList.length === 0 ? (
          <EmptyState title={empty.title} description="기록은 이 브라우저에만 저장됩니다." actionHref={empty.actionHref} actionLabel={empty.actionLabel} />
        ) : (
          <ul className="space-y-2">
            {activeList.map((track) => (
              <li key={track.id}>
                <TrackListItem track={track} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 데이터 관리 */}
      <section aria-labelledby="data-heading" className="rounded-2xl border border-line bg-card p-5">
        <h2 id="data-heading" className="text-sm font-bold">
          데이터 관리
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-subtle">
          찜 목록, 감상 기록, 코스 진도는 이 브라우저의 로컬 저장소에만 저장됩니다. 서버로 전송되지 않습니다.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-3 rounded-full border border-burgundy px-4 py-2 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
        >
          저장 데이터 초기화
        </button>
      </section>
    </div>
  );
}
