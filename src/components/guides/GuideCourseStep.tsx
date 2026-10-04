"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { useJazz } from "@/context/JazzContext";
import { cn } from "@/lib/utils";

type Props = {
  courseId: string;
  stepKey: string;
  stepLabel: string;
  stepTitle: string;
  stepDescription: string;
  href: string;
  linkLabel?: string;
};

/** 가이드 공통 코스 단계: 완료 체크 + 이동 링크 */
export function GuideCourseStep({ courseId, stepKey, stepLabel, stepTitle, stepDescription, href, linkLabel = "듣기" }: Props) {
  const { isCourseStepDone, toggleCourseStep, hydrated } = useJazz();
  const done = hydrated && isCourseStepDone(courseId, stepKey);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 transition-colors",
        done ? "border-brass/60 bg-brass-soft/30" : "border-line",
      )}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => toggleCourseStep(courseId, stepKey)}
          aria-pressed={done}
          aria-label={`${stepLabel} 완료 ${done ? "취소" : "표시"}`}
          className="mt-0.5 shrink-0"
        >
          {done ? (
            <CheckCircle2 className="h-6 w-6 text-brass" aria-hidden />
          ) : (
            <Circle className="h-6 w-6 text-subtle transition-colors hover:text-brass" aria-hidden />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-brass">{stepLabel}</p>
          <h2 className="mt-0.5 text-base font-bold text-ink">{stepTitle}</h2>
          <p className="mt-1 text-sm leading-relaxed text-subtle">{stepDescription}</p>
          <Link href={href} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brass hover:underline">
            {linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
