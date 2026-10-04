import type { TestCategory } from "@/data/audioTestTracks";
import { AUDIO_TEST_TRACKS } from "@/data/audioTestTracks";

export const audioCategoryLabels: Record<TestCategory, { label: string; question: string }> = {
  "sub-bass": { label: "초저음 확장", question: "아주 낮은 저음이 음정과 질감을 유지하는가?" },
  "bass-control": { label: "저음 제어력", question: "킥 드럼과 베이스가 서로 구분되는가?" },
  midrange: { label: "보컬과 중음", question: "목소리의 몸통과 발음이 자연스러운가?" },
  treble: { label: "고음과 치찰음", question: "심벌과 고음의 끝이 선명하지만 날카롭지 않은가?" },
  imaging: { label: "공간감과 이미징", question: "무대의 폭·깊이와 악기 위치가 느껴지는가?" },
  detail: { label: "해상도와 분리도", question: "호흡·잔향 같은 세부가 들리는가?" },
  dynamics: { label: "다이내믹과 임팩트", question: "작은 소리와 큰 소리의 차이가 자연스러운가?" },
  transient: { label: "트랜지언트와 속도", question: "빠른 타격음의 시작과 끝이 분명한가?" },
  timbre: { label: "음색과 자연스러움", question: "악기 고유의 질감이 납득 가능한가?" },
  comfort: { label: "장시간 피로도", question: "오래 들어도 귀가 피곤하지 않은가?" },
};

export const audioVocalLabels: Record<string, string> = {
  instrumental: "연주곡",
  male: "남성 보컬",
  female: "여성 보컬",
  mixed: "혼성 보컬",
  "female-group": "여성 그룹",
  "mixed-group": "혼성 그룹",
};

export const audioDifficultyLabels = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "심화",
} as const;

export function getAudioTrack(id: string) {
  return AUDIO_TEST_TRACKS.find((t) => t.id === id);
}

export function audioKoreanTracks() {
  return AUDIO_TEST_TRACKS.filter((t) => t.isKorean);
}

export function audioTracksByCategory(category: TestCategory) {
  return AUDIO_TEST_TRACKS.filter(
    (t) => t.primaryCategory === category || t.secondaryCategories.includes(category),
  );
}
