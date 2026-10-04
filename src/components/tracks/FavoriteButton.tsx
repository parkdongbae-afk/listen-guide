"use client";

import { Heart } from "lucide-react";
import { useJazz } from "@/context/JazzContext";
import { cn } from "@/lib/utils";

type Props = {
  trackId: string;
  variant?: "default" | "overlay";
};

export function FavoriteButton({ trackId, variant = "default" }: Props) {
  const { isFavorite, toggleFavorite, hydrated } = useJazz();
  const active = hydrated && isFavorite(trackId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(trackId)}
      aria-pressed={active}
      aria-label={active ? "찜한 곡에서 제거" : "이 곡 찜하기"}
      title={active ? "찜 취소" : "찜하기"}
      className={cn(
        "flex items-center justify-center rounded-full transition-all",
        variant === "overlay"
          ? cn(
              "h-8 w-8 border border-white/20 bg-bg/70 backdrop-blur",
              active ? "text-burgundy" : "text-white/80 hover:text-brass",
            )
          : cn(
              "h-9 gap-1.5 border border-line px-3 text-sm",
              active ? "border-burgundy bg-burgundy/10 text-burgundy" : "text-subtle hover:border-brass hover:text-brass",
            ),
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} aria-hidden />
      {variant === "default" && <span>{active ? "찜함" : "찜하기"}</span>}
    </button>
  );
}
