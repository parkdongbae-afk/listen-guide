"use client";

import { useContext, useEffect, useState } from "react";
import { Crosshair, MapPin, RotateCcw } from "lucide-react";
import { PlayerContext } from "./PlayerContext";
import { readJson, writeJson } from "@/lib/storage";
import { formatDuration, cn } from "@/lib/utils";

export type QuizItem = {
  key: string;
  label: string;
  description: string;
  /** 서버 제공 추정 시간(초) — 정답이 아니라 힌트로만 표시된다 */
  hintSeconds?: number | null;
};

type Props = {
  /** localStorage 키 접미사: `jazz:quiz:${storageKey}` */
  storageKey: string;
  items: QuizItem[];
};

type TimeMap = Record<string, number>;

/**
 * 구간 찾기 퀴즈.
 * 영상을 해당 순간에 멈추고 버튼을 누르면 현재 재생 시간이 기록되고,
 * 기록된 구간은 클릭해 다시 이동할 수 있다. 시간은 이 브라우저에만 저장된다.
 */
export function TimestampQuiz({ storageKey, items }: Props) {
  const player = useContext(PlayerContext);
  const storagePath = `jazz:quiz:${storageKey}`;
  const [times, setTimes] = useState<TimeMap>({});
  const [armed, setArmed] = useState<string | null>(null);

  useEffect(() => {
    setTimes(readJson<TimeMap>(storagePath, {}));
  }, [storagePath]);

  const persist = (next: TimeMap) => {
    setTimes(next);
    writeJson(storagePath, next);
  };

  const capture = (itemKey: string) => {
    const t = player?.getCurrentTime?.();
    if (t == null) return;
    persist({ ...times, [itemKey]: Math.max(0, Math.floor(t)) });
    setArmed(null);
  };

  const resetAll = () => {
    persist({});
    setArmed(null);
  };

  const doneCount = items.filter((item) => times[item.key] != null).length;
  const allDone = items.length > 0 && doneCount === items.length;

  return (
    <div className="space-y-2">
      <p className="rounded-xl border border-line bg-card px-4 py-3 text-xs leading-relaxed text-subtle">
        <strong className="font-semibold text-ink">구간 찾기 퀴즈</strong> — 영상을 재생하며 각 항목이 시작되는 순간에
        멈추고 <span className="font-semibold text-brass">이 순간 입력</span> 버튼을 누르세요. 찾은 시간은 저장되어 언제든
        이동할 수 있습니다. 입력한 시간은 영상 버전이 바뀌면 다시 찾아야 합니다.
      </p>

      <ol className="space-y-2">
        {items.map((item, index) => {
          const saved = times[item.key];
          const isArmed = armed === item.key;

          return (
            <li key={item.key} className={cn("rounded-xl border px-4 py-3", saved != null ? "border-brass/50 bg-brass-soft/20" : "border-line bg-card")}>
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
                    saved != null ? "bg-brass text-bg" : "border border-line text-subtle",
                  )}
                >
                  {saved != null ? formatDuration(saved) : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{item.label}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-subtle">{item.description}</p>
                  {item.hintSeconds != null && (
                    <p className="mt-1 text-[11px] text-subtle">예상 위치: 약 {formatDuration(item.hintSeconds)} 전후</p>
                  )}
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pl-1">
                {saved != null ? (
                  <>
                    <button
                      type="button"
                      onClick={() => player?.seekTo(saved)}
                      className="rounded-full bg-brass-soft px-3 py-1.5 text-xs font-semibold text-brass transition-colors hover:bg-brass hover:text-bg"
                    >
                      {formatDuration(saved)} 위치로 이동
                    </button>
                    <button
                      type="button"
                      onClick={() => setArmed(item.key)}
                      className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs text-subtle transition-colors hover:border-brass hover:text-brass"
                    >
                      <RotateCcw className="h-3 w-3" aria-hidden />
                      다시 찾기
                    </button>
                  </>
                ) : isArmed ? (
                  <>
                    <button
                      type="button"
                      onClick={() => capture(item.key)}
                      className="animate-pulse rounded-full bg-brass px-4 py-1.5 text-xs font-bold text-bg"
                    >
                      ● 지금 이 순간 입력
                    </button>
                    <button
                      type="button"
                      onClick={() => setArmed(null)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-subtle"
                    >
                      취소
                    </button>
                    <span className="text-[11px] text-subtle">영상을 해당 순간에 멈추고 누르세요</span>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setArmed(item.key)}
                    disabled={!player}
                    title={player ? undefined : "먼저 영상을 재생해 주세요"}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-subtle transition-colors enabled:hover:border-brass enabled:hover:text-brass disabled:opacity-50"
                  >
                    <Crosshair className="h-3 w-3" aria-hidden />
                    이 구간 찾기
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-subtle">
        <span aria-live="polite">
          {doneCount}/{items.length} 완료{allDone && " — 훌륭합니다! 모든 구간을 찾았어요."}
        </span>
        {doneCount > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 transition-colors hover:border-burgundy hover:text-burgundy"
          >
            <MapPin className="h-3 w-3" aria-hidden />
            기록 초기화
          </button>
        )}
      </div>
    </div>
  );
}
