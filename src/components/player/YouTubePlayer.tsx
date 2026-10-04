"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Play } from "lucide-react";
import type { YTNamespace, YTPlayer } from "@/types/youtube";
import { isVerifiedVideoId, thumbnailUrl } from "@/lib/youtube";
import { useJazz } from "@/context/JazzContext";
import { PlaybackErrorFallback } from "./PlaybackErrorFallback";
import { PlayerContext } from "./PlayerContext";
import { cn } from "@/lib/utils";

const API_TIMEOUT_MS = 15000;

let apiPromise: Promise<YTNamespace> | null = null;

/** YouTube IFrame API를 한 번만 로드한다. 네트워크가 막혀도 영구 대기하지 않도록 타임아웃을 둔다. */
function loadYouTubeApi(): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("client only"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const timer = setTimeout(() => {
      apiPromise = null;
      reject(new Error("YouTube IFrame API 로드 시간 초과"));
    }, API_TIMEOUT_MS);

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      clearTimeout(timer);
      if (window.YT) resolve(window.YT);
      else {
        apiPromise = null;
        reject(new Error("YouTube API 초기화 실패"));
      }
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => {
      clearTimeout(timer);
      apiPromise = null;
      reject(new Error("YouTube IFrame API 로드 실패"));
    };
    document.head.appendChild(tag);
  });
  return apiPromise;
}

type Props = {
  videoId: string;
  fallbackVideoId?: string;
  title: string;
  artistName: string;
  startSeconds?: number;
  trackId: string;
  /** 플레이어 아래에 렌더링할 요소(타임라인 등). PlayerContext 안에서 렌더된다. */
  children?: React.ReactNode;
};

/**
 * 곡 상세 페이지 전용 플레이어.
 * - 클릭 전에는 썸네일만 렌더링하는 lite embed (초기 로딩에 iframe 없음, jazz_do.MD §9.1)
 * - 클릭 시 IFrame API로 플레이어 생성 → 타임라인 seek 지원 (§9.3)
 * - 재생 오류 시 PlaybackErrorFallback 표시
 *
 * 구조 노트: IFrame API는 전달한 요소를 iframe으로 교체한다. React가 관리하는 노드가
 * 교체되면 재조정이 깨지므로, React 자식이 없는 전용 셸 div를 항상 DOM에 두고
 * 그 안에 마운트 요소를 명령형으로 준비한 뒤 플레이어를 생성한다.
 */
export function YouTubePlayer({ videoId, fallbackVideoId, title, artistName, startSeconds, trackId, children }: Props) {
  // /tracks/[slug]?play=1 로 진입하면 자동 재생을 시도한다 (브라우저 정책상 재생 버튼이 필요할 수 있다)
  const searchParams = useSearchParams();
  const autoPlay = searchParams.get("play") === "1";

  const shellRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const desiredStartRef = useRef<number | undefined>(startSeconds);
  const recentLoggedRef = useRef(false);
  const autoStartRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeId, setActiveId] = useState(videoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addRecent, hydrated } = useJazz();

  const query = useMemo(() => `${artistName} ${title}`, [artistName, title]);
  const verified = isVerifiedVideoId(activeId);

  const handleStateChange = useCallback(
    (data: number) => {
      // 1: PLAYING, 2: PAUSED, 0: ENDED
      setIsPlaying(data === 1);
      if (data === 1 && !recentLoggedRef.current) {
        recentLoggedRef.current = true;
        if (hydrated) addRecent(trackId);
      }
    },
    [addRecent, trackId, hydrated],
  );

  const createPlayer = useCallback(
    (yt: YTNamespace, id: string) => {
      const shell = shellRef.current;
      // 내비게이션 전환으로 이 인스턴스의 DOM이 문서에서 분리된 경우 여기서 중단한다.
      // 살아있는(표시 중인) 인스턴스가 자체 파라미터로 재생을 시작하므로 분리된 인스턴스에
      // 플레이어를 만들면 유실되어 status가 loading에 갇힌다.
      if (!shell || !shell.isConnected) return;
      playerRef.current?.destroy();
      playerRef.current = null;
      shell.replaceChildren();
      const mount = document.createElement("div");
      shell.appendChild(mount);
      const start = desiredStartRef.current;
      playerRef.current = new yt.Player(mount, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          rel: 0,
          autoplay: 1,
          playsinline: 1,
          ...(start && start > 0 ? { start: Math.floor(start) } : {}),
        },
        events: {
          onReady: () => {
            setStatus("ready");
            // autoplay 파라미터가 정책에 막히더라도 사용자 클릭 이력이 있으면 재생을 시도한다
            playerRef.current?.playVideo();
          },
          onStateChange: (event) => handleStateChange(event.data),
          onError: (event) => {
            // 2: 잘못된 파라미터, 5: HTML5 오류, 100: 삭제/비공개, 101/150: 임베드 제한
            setStatus("error");
            setIsPlaying(false);
            setErrorMessage(
              event.data === 101 || event.data === 150
                ? "이 영상은 임베드 재생이 제한되어 있습니다."
                : "이 영상은 현재 페이지에서 재생할 수 없습니다.",
            );
          },
        },
      });
    },
    [handleStateChange],
  );

  const startPlayback = useCallback(async () => {
    setStatus("loading");
    try {
      const yt = await loadYouTubeApi();
      // API 로드 동안 인스턴스가 분리되었으면 중단 (살아있는 인스턴스가 대신 시작한다)
      if (!shellRef.current?.isConnected) return;
      createPlayer(yt, activeId);
    } catch {
      setStatus("error");
      setErrorMessage("플레이어를 불러오지 못했습니다. 네트워크 상태를 확인해 주세요.");
    }
  }, [activeId, createPlayer]);

  // ?play=1 자동 재생.
  // 클라이언트 내비게이션에서는 useSearchParams 값이 마운트보다 늦게 확정될 수 있으므로
  // autoPlay 변화에 반응하고, 이중 실행은 autoStartRef로 막는다.
  useEffect(() => {
    if (autoStartRef.current || !autoPlay || !isVerifiedVideoId(videoId)) return;
    autoStartRef.current = true;
    void startPlayback();
  }, [autoPlay, videoId, startPlayback]);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const seekTo = useCallback(
    (seconds: number) => {
      const player = playerRef.current;
      if (!player) {
        // 아직 재생 전이면 해당 시점부터 새로 시작
        desiredStartRef.current = seconds;
        void startPlayback();
        return;
      }
      player.seekTo(seconds, true);
      player.playVideo();
    },
    [startPlayback],
  );

  const playFallback = useCallback(() => {
    if (!fallbackVideoId) return;
    setActiveId(fallbackVideoId);
    desiredStartRef.current = undefined;
    recentLoggedRef.current = false;
    setStatus("loading");
    loadYouTubeApi()
      .then((yt) => createPlayer(yt, fallbackVideoId))
      .catch(() => {
        setStatus("error");
        setErrorMessage("대체 영상도 재생할 수 없습니다.");
      });
  }, [fallbackVideoId, createPlayer]);

  const controller = useMemo(
    () => ({
      seekTo,
      getCurrentTime: () => {
        const player = playerRef.current;
        if (!player) return null;
        try {
          const t = player.getCurrentTime();
          return Number.isFinite(t) ? t : null;
        } catch {
          return null;
        }
      },
    }),
    [seekTo],
  );

  const showOverlay = status === "idle" || status === "loading";

  return (
    <PlayerContext.Provider value={controller}>
      <div className="w-full">
        {status === "error" ? (
          <PlaybackErrorFallback
            message={errorMessage}
            fallbackVideoId={isVerifiedVideoId(fallbackVideoId) ? fallbackVideoId : undefined}
            youtubeQuery={query}
            onFallbackPlay={playFallback}
          />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black">
            {/* React 자식이 없는 셸: IFrame API가 이 안의 마운트 요소를 iframe으로 교체한다 */}
            <div ref={shellRef} className="player-shell absolute inset-0" aria-hidden={showOverlay} />

            {showOverlay && (
              <div className="absolute inset-0">
                {verified ? (
                  <Image
                    src={thumbnailUrl(activeId)}
                    alt={`${artistName}의 ${title} YouTube 썸네일`}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover opacity-80"
                    unoptimized
                  />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-burgundy/40 via-card to-brass/20" />
                )}
                <button
                  type="button"
                  onClick={() => void startPlayback()}
                  disabled={status === "loading" || !verified}
                  aria-label={
                    verified
                      ? `${title} 재생 시작`
                      : `${title} — 영상 ID 검증 전입니다. 아래 안내 링크에서 YouTube로 들을 수 있습니다.`
                  }
                  className="group absolute inset-0 flex items-center justify-center"
                >
                  <span
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full bg-brass text-bg shadow-lg transition-transform group-hover:scale-110 group-focus-visible:scale-110",
                      status === "loading" && "animate-pulse",
                    )}
                  >
                    <Play className="ml-1 h-7 w-7" aria-hidden />
                  </span>
                </button>
                <span className="absolute bottom-3 left-3 rounded-full bg-bg/80 px-3 py-1 text-xs text-subtle">
                  {verified ? "클릭하면 이 페이지에서 바로 재생됩니다" : "영상 검증 전 · 아래 링크에서 YouTube로 들어보세요"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 재생 상태 안내 (스크린 리더) */}
        <p aria-live="polite" className="sr-only">
          {isPlaying ? `${title} 재생 중` : status === "ready" ? `${title} 일시정지 또는 재생 대기` : ""}
        </p>
      </div>
      {children}
    </PlayerContext.Provider>
  );
}

/** 재생 중 표시용 이퀄라이저 (prefers-reduced-motion에서 정지) */
export function Equalizer({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex h-3.5 items-end gap-[2px]", className)} aria-hidden>
      <span className="eq-bar w-[3px] rounded-sm bg-brass" style={{ height: "100%", animationDelay: "0ms" }} />
      <span className="eq-bar w-[3px] rounded-sm bg-brass" style={{ height: "100%", animationDelay: "150ms" }} />
      <span className="eq-bar w-[3px] rounded-sm bg-brass" style={{ height: "100%", animationDelay: "300ms" }} />
    </span>
  );
}
