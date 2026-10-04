import Link from "next/link";
import { Play } from "lucide-react";
import type { ClassicTrack } from "@/data/classicTracks";
import { classicEraLabels, classicFormLabels, classicDifficultyLabels } from "@/lib/classic";
import { cn, formatDuration } from "@/lib/utils";
import { isVerifiedVideoId } from "@/lib/youtube";

type Props = {
  track: ClassicTrack;
  rank?: number;
};

export function ClassicWorkCard({ track, rank }: Props) {
  const verified = isVerifiedVideoId(track.video.youtubeVideoId);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card",
        "transition-all duration-200 hover:-translate-y-1 hover:border-brass/60",
      )}
    >
      <div className="relative h-24 w-full bg-gradient-to-br from-burgundy/60 to-brass/30" aria-hidden>
        {rank != null && (
          <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-bold text-brass tabular-nums">
            {rank}
          </span>
        )}
        <Link
          href={`/classic/works/${track.id}`}
          aria-label={`${track.composerKo}의 ${track.titleKo} 감상 페이지로 이동`}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brass text-bg shadow-lg">
            <Play className="ml-0.5 h-4.5 w-4.5" aria-hidden />
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold leading-snug">
          <Link href={`/classic/works/${track.id}`} className="transition-colors hover:text-brass">
            {track.titleKo}
          </Link>
        </h3>
        <p className="text-sm text-subtle">
          {track.composerKo}
          {track.isKorean && <span className="ml-1.5 rounded-full bg-brass-soft px-1.5 py-0.5 text-[10px] text-brass">한국</span>}
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-subtle">{track.oneLineIntro}</p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <span className="rounded-full bg-brass-soft px-2 py-0.5 text-brass">{classicEraLabels[track.era]}</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-subtle">{classicFormLabels[track.form]}</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-subtle">
            {classicDifficultyLabels[track.difficulty]}
          </span>
          {track.durationSeconds != null ? (
            <span className="rounded-full border border-line px-2 py-0.5 text-subtle tabular-nums">
              {formatDuration(track.durationSeconds)}
            </span>
          ) : (
            <span className="rounded-full border border-line px-2 py-0.5 text-subtle">길이 미확인</span>
          )}
          {!verified && (
            <span className="rounded-full border border-line px-2 py-0.5 text-subtle" title="영상 ID 검증 전 — 검색 링크로 안내">
              검증전
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
