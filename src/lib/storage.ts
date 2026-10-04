/**
 * localStorage 안전 래퍼
 * - 클라이언트에서만 접근 (SSR/hydration 오류 방지)
 * - 파싱 실패 시 기본값으로 안전 복구
 */

export const STORAGE_KEYS = {
  favorites: "jazz:favorites",
  completed: "jazz:completed",
  recent: "jazz:recent",
  courses: "jazz:courses",
  searches: "jazz:searches",
  theme: "jazz:theme",
  notes: "jazz:notes",
} as const;

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    // 저장 데이터가 손상된 경우 안전한 기본값으로 복구
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장 실패(용량·비공개 모드 등)는 조용히 무시 — 핵심 기능은 서버 데이터로 동작
  }
}

export function removeKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // 무시
  }
}
