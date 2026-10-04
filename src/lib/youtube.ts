/**
 * YouTube 관련 유틸리티
 * - 영상 ID 형식 검증 (보안: 임의 문자열이 URL에 삽입되지 않도록 제한)
 * - 개인정보 보호 강화 모드(youtube-nocookie) 임베드 URL 생성
 */

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
export const TODO_VIDEO_ID = "TODO_VERIFY_VIDEO_ID";

export function isValidYouTubeId(id: string | undefined | null): boolean {
  return typeof id === "string" && VIDEO_ID_PATTERN.test(id);
}

/** 데이터에 들어 있지만 아직 검증되지 않은 ID인지 */
export function isVerifiedVideoId(id: string | undefined | null): boolean {
  return isValidYouTubeId(id) && id !== TODO_VIDEO_ID;
}

export function thumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function embedUrl(videoId: string, startSeconds?: number): string {
  const base = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  return startSeconds && startSeconds > 0 ? `${base}&start=${Math.floor(startSeconds)}` : base;
}

export function watchUrl(videoId: string, startSeconds?: number): string {
  const base = `https://www.youtube.com/watch?v=${videoId}`;
  return startSeconds && startSeconds > 0 ? `${base}&t=${Math.floor(startSeconds)}s` : base;
}

/** 영상 ID가 없거나 검증 전일 때 YouTube 검색 링크로 안내한다 */
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
