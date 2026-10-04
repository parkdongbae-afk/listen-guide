import {
  timelineDrafts,
  verifiedSymphonyTimelines,
  getVerifiedSymphonyTimeline,
  getSymphonyTimelineDraft,
} from "@/data/symphonyTimelines";

export interface SymphonyListItem {
  id: string;
  titleKo: string;
  composer: string;
  recommendedStart: string;
  verified: boolean;
  eventCount: number;
  conductor?: string;
  orchestra?: string;
  searchUrl: string;
}

/** 초안 순서 = 스펙 §9의 큐레이션 순서(첫 10곡 → 시대별 확장) */
export const symphonyList: SymphonyListItem[] = timelineDrafts.map((draft) => {
  const verified = getVerifiedSymphonyTimeline(draft.symphonyId);
  const composer = draft.titleKo.split(" ")[0] ?? draft.titleKo;
  return {
    id: draft.symphonyId,
    titleKo: draft.titleKo,
    composer,
    recommendedStart: draft.recommendedStart,
    verified: Boolean(verified),
    eventCount: verified ? verified.items.length : draft.events.length,
    conductor: verified?.conductor,
    orchestra: verified?.orchestra,
    searchUrl: draft.youtubeSearchUrl,
  };
});

export const symphonyFirstTen = symphonyList.slice(0, 10);

/** 스펙 §9.1의 첫 10곡 입문 포인트 */
export const symphonyEntryPoints: Record<string, string> = {
  "beethoven-symphony-5": "네 음의 동기가 작품을 이끄는 과정",
  "dvorak-symphony-9": "잉글리시 호른의 넓고 외로운 선율",
  "mozart-symphony-40": "불안한 첫 주제와 균형 잡힌 고전주의 구조",
  "beethoven-symphony-6": "자연의 평온함과 반복되는 리듬",
  "haydn-symphony-94": "조용한 주제와 갑작스러운 강한 화음",
  "schubert-symphony-8": "어두운 도입과 노래하는 긴 선율",
  "beethoven-symphony-9": "단순한 환희 주제가 합창으로 성장",
  "mendelssohn-symphony-4": "밝고 빠른 리듬과 여행의 에너지",
  "brahms-symphony-1": "긴 긴장 뒤 펼쳐지는 넓은 주제",
  "tchaikovsky-symphony-5": "호른의 서정적인 선율과 운명 주제",
};

export function getSymphony(id: string) {
  const draft = getSymphonyTimelineDraft(id);
  if (!draft) return null;
  const verified = getVerifiedSymphonyTimeline(id);
  return { draft, verified };
}

export const symphonyVerifiedCount = verifiedSymphonyTimelines.length;
