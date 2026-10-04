import type { Difficulty } from "@/types";

/** 간단한 클래스 병합 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** 초를 "3:24" 형식으로 변환 */
export function formatDuration(seconds?: number): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** "43:51" / "1:26:28" 형식을 초로 변환 */
export function parseDuration(length?: string | null): number | null {
  if (!length) return null;
  const p = length.split(":").map(Number);
  if (p.some(isNaN)) return null;
  if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
  if (p.length === 2) return p[0] * 60 + p[1];
  return null;
}

export const difficultyLabels: Record<Difficulty, string> = {
  "very-easy": "매우 쉬움",
  easy: "쉬움",
  medium: "보통",
  advanced: "어려움",
};

export const difficultyOrder: Difficulty[] = ["very-easy", "easy", "medium", "advanced"];

export function difficultyLabel(d: Difficulty): string {
  return difficultyLabels[d];
}

/** 문자열 정규화: 검색용 소문자 + 공백 축소 */
export function normalizeForSearch(input: string): string {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

/** 오늘 날짜를 시드로 하는 안정적인 의사난수 (0..1) */
export function daySeed(date: Date): number {
  const key = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const x = Math.sin(key) * 10000;
  return x - Math.floor(x);
}
