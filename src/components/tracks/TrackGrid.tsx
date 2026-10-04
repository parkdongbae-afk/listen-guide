import type { Track } from "@/types";
import { TrackCard } from "./TrackCard";
import { cn } from "@/lib/utils";

type Props = {
  tracks: Track[];
  showRank?: boolean;
  columns?: "3" | "4";
};

/** 반응형 카드 그리드: 모바일 1열, 태블릿 2열, 데스크톱 3~4열 (jazz_do.MD §17) */
export function TrackGrid({ tracks, showRank, columns = "3" }: Props) {
  if (tracks.length === 0) return null;
  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        columns === "4" ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {tracks.map((track) => (
        <li key={track.id}>
          <TrackCard track={track} showRank={showRank} />
        </li>
      ))}
    </ul>
  );
}
