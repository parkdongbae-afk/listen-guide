import { tracks } from "@/data/tracks";
import type { Track } from "@/types";

export const trackMap = new Map<string, Track>(tracks.map((t) => [t.id, t]));

export const trackBySlug = new Map<string, Track>(tracks.map((t) => [t.slug, t]));

/** 다음 추천 곡 (없으면 undefined) */
export function nextTrackOf(track: Track): Track | undefined {
  return track.nextTrackId ? trackMap.get(track.nextTrackId) : undefined;
}

/** 관련 곡 목록 (데이터에 없는 id는 무시) */
export function relatedTracksOf(track: Track): Track[] {
  return track.relatedTrackIds
    .map((id) => trackMap.get(id))
    .filter((t): t is Track => Boolean(t));
}
