/** 교향곡 초안 작품에 연결된 YouTube 영상 정보 */
export interface SymphonyVideo {
  youtubeVideoId: string;
  title: string;
  channel: string;
  length: string;
  /** 전체가 아닌 일부 악장만 수록된 영상인지 */
  partial: boolean;
  lastVerifiedAt: string;
}
