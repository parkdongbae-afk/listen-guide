import Link from "next/link";
import { Play } from "lucide-react";
import type { Track } from "@/types";
import { artistMap } from "@/data/artists";
import { styleMap } from "@/data/styles";
import { difficultyLabel, cn, formatDuration } from "@/lib/utils";
import { isVerifiedVideoId } from "@/lib/youtube";
import { FavoriteButton } from "./FavoriteButton";
import { CompletionButton } from "./CompletionButton";

type Props = {
  track: Track;
  showRank?: boolean;
};

/** 재사용 가능한 곡 카드 (홈, 목록, 관련 곡 등에서 사용) */
export function TrackCard({ track, showRank }: Props) {
  const artist = artistMap.get(track.artistIds[0]);
  const primaryStyle = styleMap.get(track.styleIds[0]);
  const gradient = gradients[track.id.length % gradients.length];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card",
        "transition-all duration-200 hover:-translate-y-1 hover:border-brass/60",
        "focus-within:border-brass",
      )}
    >
      {/* 표지 영역 — 저작권 보호를 위해 외부 이미지 대신 그라디언트 사용 */}
      <div className={cn("relative h-36 w-full", gradient)} aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl text-white/30">{track.title.charAt(0)}</span>
        </div>
        {showRank && track.mustListenRank != null && (
          <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-bold text-brass tabular-nums">
            {track.mustListenRank}
          </span>
        )}
        <div className="absolute right-3 top-3 flex gap-1.5">
          <FavoriteButton trackId={track.id} variant="overlay" />
          <CompletionButton trackId={track.id} variant="overlay" />
        </div>
        <Link
          href={`/jazz/tracks/${track.slug}?play=1`}
          aria-label={`${track.primaryArtistName}의 ${track.title} 재생 페이지로 이동`}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brass text-bg shadow-lg">
            <Play className="ml-0.5 h-5 w-5" aria-hidden />
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug">
            <Link
              href={`/jazz/tracks/${track.slug}`}
              className="transition-colors hover:text-brass"
            >
              {track.title}
            </Link>
          </h3>
          <span className="shrink-0 text-xs text-subtle tabular-nums">{track.releaseYear ?? track.recordingYear}</span>
        </div>
        <p className="text-sm text-subtle">{track.primaryArtistName}</p>
        <p className="line-clamp-2 text-sm leading-relaxed text-subtle">{track.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          {primaryStyle && (
            <span className="rounded-full bg-brass-soft px-2 py-0.5 text-brass">{primaryStyle.nameKo}</span>
          )}
          <span className="rounded-full border border-line px-2 py-0.5 text-subtle">
            난이도 {difficultyLabel(track.difficulty)}
          </span>
          {track.durationSeconds != null && (
            <span className="rounded-full border border-line px-2 py-0.5 text-subtle tabular-nums">
              {formatDuration(track.durationSeconds)}
            </span>
          )}
          {!isVerifiedVideoId(track.video.youtubeVideoId) && (
            <span className="rounded-full border border-line px-2 py-0.5 text-subtle" title="영상 ID 검증 전">
              검증전
            </span>
          )}
          {artist && <span className="sr-only">{artist.nameKo ?? artist.name}</span>}
        </div>
      </div>
    </article>
  );
}

const gradients = [
  "bg-gradient-to-br from-burgundy/70 to-brass/40",
  "bg-gradient-to-br from-[#2c3e5d] to-[#4a6fa5]/60",
  "bg-gradient-to-br from-[#5d2c3e] to-brass/30",
  "bg-gradient-to-br from-[#3e5d2c]/70 to-[#a56f4a]/50",
  "bg-gradient-to-br from-[#4a2c5d]/80 to-[#7a3145]/60",
];
