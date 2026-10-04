"use client";

import { Check } from "lucide-react";
import { useJazz } from "@/context/JazzContext";
import { cn } from "@/lib/utils";

type Props = {
  trackId: string;
  variant?: "default" | "overlay";
};

export function CompletionButton({ trackId, variant = "default" }: Props) {
  const { isCompleted, toggleCompleted, hydrated } = useJazz();
  const active = hydrated && isCompleted(trackId);

  return (
    <button
      type="button"
      onClick={() => toggleCompleted(trackId)}
      aria-pressed={active}
      aria-label={active ? "감상 완료 표시 해제" : "감상 완료로 표시"}
      title={active ? "감상 완료 취소" : "감상 완료"}
      className={cn(
        "flex items-center justify-center rounded-full transition-all",
        variant === "overlay"
          ? cn(
              "h-8 w-8 border border-white/20 bg-bg/70 backdrop-blur",
              active ? "text-brass" : "text-white/80 hover:text-brass",
            )
          : cn(
              "h-9 gap-1.5 border border-line px-3 text-sm",
              active ? "border-brass bg-brass-soft text-brass" : "text-subtle hover:border-brass hover:text-brass",
            ),
      )}
    >
      <Check className={cn("h-4 w-4", active && "stroke-[3]")} aria-hidden />
      {variant === "default" && <span>{active ? "감상 완료" : "감상 완료하기"}</span>}
    </button>
  );
}
