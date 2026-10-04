"use client";

import { useContext } from "react";
import { Clock } from "lucide-react";
import { PlayerContext } from "./PlayerContext";
import { formatDuration, cn } from "@/lib/utils";

export type GuideTimelineItem = {
  seconds: number | null;
  label: string;
  description: string;
};

type Props = {
  items: GuideTimelineItem[];
  seekEnabled: boolean;
};

/**
 * 가이드 공통 타임라인.
 * seekEnabled이면 항목 클릭으로 플레이어 구간 이동(PlayerContext 필요),
 * 아니면 읽기 전용 목록으로 표시한다.
 */
export function GuideTimeline({ items, seekEnabled }: Props) {
  // Provider 밖(영상 없는 초안 페이지)에서도 렌더될 수 있으므로 null을 허용한다
  const player = useContext(PlayerContext);

  if (items.length === 0) return null;

  return (
    <ol className="space-y-2">
      {items.map((item, index) => {
        const seekable = seekEnabled && typeof item.seconds === "number";

        if (seekable) {
          return (
            <li key={`${item.label}-${index}`}>
              <button
                type="button"
                onClick={() => player?.seekTo(item.seconds as number)}
                aria-label={`${formatDuration(item.seconds as number)} ${item.label} — ${item.description} 구간으로 이동`}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-xl border border-line bg-card px-4 py-3 text-left transition-colors",
                  "hover:border-brass hover:bg-card-hover",
                )}
              >
                <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brass-soft px-2.5 py-1 text-xs font-semibold text-brass tabular-nums">
                  <Clock className="h-3 w-3" aria-hidden />
                  {formatDuration(item.seconds as number)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{item.label}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-subtle group-hover:text-ink">
                    {item.description}
                  </span>
                </span>
              </button>
            </li>
          );
        }

        return (
          <li key={`${item.label}-${index}`}>
            <div className="flex w-full items-start gap-3 rounded-xl border border-line bg-card px-4 py-3">
              <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-subtle">
                <Clock className="h-3 w-3" aria-hidden />
                {typeof item.seconds === "number" ? formatDuration(item.seconds) : "시간 검수 전"}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{item.label}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-subtle">{item.description}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
