import Link from "next/link";
import { Play } from "lucide-react";
import type { Track } from "@/types";
import { difficultyLabel, cn, formatDuration } from "@/lib/utils";
import { FavoriteButton } from "./FavoriteButton";
import { CompletionButton } from "./CompletionButton";

/** 모바일 중심의 세로 리스트 항목 (jazz_do.MD §17) */
export function TrackListItem({ track }: { track: Track }) {
  return (
    <article
      className={cn(
        "flex items-center gap-3 rounded-xl border border-line bg-card p-3 transition-colors",
        "hover:border-brass/50 hover:bg-card-hover",
      )}
    >
      <Link
        href={`/jazz/tracks/${track.slug}?play=1`}
        aria-label={`${track.primaryArtistName}의 ${track.title} 재생 페이지로 이동`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-burgundy/70 to-brass/50 text-bg transition-transform hover:scale-105"
      >
        <Play className="ml-0.5 h-4 w-4" aria-hidden />
      </Link>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold">
          <Link href={`/jazz/tracks/${track.slug}`} className="transition-colors hover:text-brass">
            {track.title}
          </Link>
        </h3>
        <p className="truncate text-xs text-subtle">
          {track.primaryArtistName} · {track.releaseYear ?? track.recordingYear} · {difficultyLabel(track.difficulty)}
          {track.durationSeconds != null && ` · ${formatDuration(track.durationSeconds)}`}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <FavoriteButton trackId={track.id} variant="overlay" />
        <CompletionButton trackId={track.id} variant="overlay" />
      </div>
    </article>
  );
}
