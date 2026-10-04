import Link from "next/link";
import { Play } from "lucide-react";
import type { AudioTestTrack } from "@/data/audioTestTracks";
import { audioCategoryLabels, audioDifficultyLabels, audioVocalLabels } from "@/lib/audioTest";
import { cn } from "@/lib/utils";

export function AudioTrackCard({ track }: { track: AudioTestTrack }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-card p-4",
        "transition-all duration-200 hover:-translate-y-1 hover:border-brass/60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold leading-snug">
          <Link href={`/audio-test/tracks/${track.id}`} className="transition-colors hover:text-brass">
            {track.title}
          </Link>
        </h3>
        <Link
          href={`/audio-test/tracks/${track.id}`}
          aria-label={`${track.artist}의 ${track.title} 테스트 페이지로 이동`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-burgundy/70 to-brass/50 text-bg transition-transform hover:scale-105"
        >
          <Play className="ml-0.5 h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <p className="text-sm text-subtle">{track.artist}</p>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-subtle">{track.oneLineReason}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2 text-[11px]">
        <span className="rounded-full bg-brass-soft px-2 py-0.5 text-brass">
          {audioCategoryLabels[track.primaryCategory].label}
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-subtle">{audioVocalLabels[track.vocalType]}</span>
        <span className="rounded-full border border-line px-2 py-0.5 text-subtle">
          {audioDifficultyLabels[track.difficulty]}
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 text-subtle">예상 {track.estimatedTestTime}</span>
      </div>
    </article>
  );
}
