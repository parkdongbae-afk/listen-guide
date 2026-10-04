"use client";

import { createContext, useContext } from "react";

export type PlayerController = {
  seekTo: (seconds: number) => void;
  /** 현재 재생 시간(초). 플레이어가 없으면 null */
  getCurrentTime: () => number | null;
};

export const PlayerContext = createContext<PlayerController | null>(null);

export function usePlayer(): PlayerController {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerContext");
  return ctx;
}
