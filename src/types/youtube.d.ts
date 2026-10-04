// YouTube IFrame API 최소 타입 선언
export type YTPlayer = {
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  pauseVideo(): void;
  getCurrentTime(): number;
  destroy(): void;
};

export type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};
