import { ExternalLink, Play } from "lucide-react";

type Props = {
  message?: string;
  fallbackVideoId?: string;
  youtubeQuery: string;
  onFallbackPlay?: () => void;
};

/**
 * 영상 재생 오류 시 대체 UI.
 * 오류가 발생해도 사용자 흐름이 중단되지 않도록 안내한다. (jazz_do.MD §9.3)
 */
export function PlaybackErrorFallback({ message, fallbackVideoId, youtubeQuery, onFallbackPlay }: Props) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-card px-6 text-center">
      <p className="text-sm font-medium text-ink">
        {message ?? "이 영상은 현재 페이지에서 재생할 수 없습니다."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {fallbackVideoId && (
          <button
            type="button"
            onClick={onFallbackPlay}
            className="inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
          >
            <Play className="h-4 w-4" aria-hidden />
            대체 영상 재생
          </button>
        )}
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-brass hover:text-brass"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          YouTube에서 확인
        </a>
      </div>
    </div>
  );
}
