"use client";

import { Clock } from "lucide-react";
import type { TimelinePoint } from "@/types";
import { usePlayer } from "./PlayerContext";
import { formatDuration, cn } from "@/lib/utils";

type Props = {
  timeline: TimelinePoint[];
};

/**
 * 감상 타임라인. 항목 클릭 시 플레이어가 해당 시점으로 이동한다.
 * 키보드로도 조작 가능한 실제 버튼으로 구현한다. (jazz_do.MD §9.3, §18)
 */
export function ListeningTimeline({ timeline }: Props) {
  const { seekTo } = usePlayer();

  if (timeline.length === 0) return null;

  return (
    <ol className="space-y-2">
      {timeline.map((point) => (
        <li key={point.seconds}>
          <button
            type="button"
            onClick={() => seekTo(point.seconds)}
            aria-label={`${formatDuration(point.seconds)} ${point.label} — ${point.description} 구간으로 이동`}
            className={cn(
              "group flex w-full items-start gap-3 rounded-xl border border-line bg-card px-4 py-3 text-left transition-colors",
              "hover:border-brass hover:bg-card-hover",
            )}
          >
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brass-soft px-2.5 py-1 text-xs font-semibold text-brass tabular-nums">
              <Clock className="h-3 w-3" aria-hidden />
              {formatDuration(point.seconds)}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink">{point.label}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-subtle group-hover:text-ink">
                {point.description}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
