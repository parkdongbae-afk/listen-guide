import type { ClassicalEra, PerformanceForm } from "@/data/classicTracks";
import { CLASSIC_TRACKS } from "@/data/classicTracks";

export const classicEraLabels: Record<ClassicalEra, string> = {
  baroque: "바로크",
  classical: "고전주의",
  "classical-romantic": "고전주의·초기 낭만주의",
  romantic: "낭만주의",
  impressionist: "인상주의",
  modern: "20세기",
  "korean-modern": "한국 클래식",
};

export const classicFormLabels: Record<PerformanceForm, string> = {
  solo: "독주",
  chamber: "실내악",
  concerto: "협주곡",
  symphony: "교향곡",
  orchestra: "관현악",
  ballet: "발레 음악",
  "art-song": "가곡",
};

export const classicDifficultyLabels = {
  easy: "쉬움",
  medium: "보통",
  advanced: "깊이 듣기",
} as const;

export const classicDurationLabels = {
  short: "5분 이내",
  medium: "5~15분",
  long: "15분 이상",
} as const;

export function getClassicTrack(id: string) {
  return CLASSIC_TRACKS.find((t) => t.id === id);
}

export function classicFirstFive() {
  return [...CLASSIC_TRACKS].sort((a, b) => a.courseOrder - b.courseOrder).slice(0, 5);
}

export function classicKoreanTracks() {
  return CLASSIC_TRACKS.filter((t) => t.isKorean);
}

export const classicEraOrder: ClassicalEra[] = [
  "baroque",
  "classical",
  "classical-romantic",
  "romantic",
  "impressionist",
  "modern",
  "korean-modern",
];
