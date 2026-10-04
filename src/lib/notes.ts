import type { GuideId } from "@/lib/guides";
import { trackMap } from "@/data/track-utils";
import { getClassicTrack } from "@/lib/classic";
import { getAudioTrack } from "@/lib/audioTest";
import { getSymphony } from "@/lib/symphony";

export interface TrackMeta {
  title: string;
  subtitle: string;
  href: string;
  guideId: GuideId;
  guideLabel: string;
}

/** 감상 기록 키(`${guideId}:${id}`)의 곡 정보를 찾는다 */
export function resolveTrackMeta(guideId: GuideId, id: string): TrackMeta | null {
  switch (guideId) {
    case "jazz": {
      const t = trackMap.get(id);
      return t ? { title: t.title, subtitle: t.primaryArtistName, href: `/jazz/tracks/${t.slug}`, guideId, guideLabel: "재즈" } : null;
    }
    case "classic": {
      const t = getClassicTrack(id);
      return t ? { title: t.titleKo, subtitle: t.composerKo, href: `/classic/works/${t.id}`, guideId, guideLabel: "클래식" } : null;
    }
    case "symphony": {
      const s = getSymphony(id);
      return s ? { title: s.draft.titleKo, subtitle: s.verified?.conductor ?? "", href: `/symphony/symphonies/${id}`, guideId, guideLabel: "교향곡" } : null;
    }
    case "audio-test": {
      const t = getAudioTrack(id);
      return t ? { title: t.title, subtitle: t.artist, href: `/audio-test/tracks/${t.id}`, guideId, guideLabel: "오디오 테스트" } : null;
    }
    default:
      return null;
  }
}
