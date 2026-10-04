"use client";

import { useJazz } from "@/context/JazzContext";
import { ProgressRing } from "@/components/ui/index";

/** 코스 진도 링 (클라이언트 상태 필요) */
export function CourseProgressRing({ courseId, total, size = 64 }: { courseId: string; total: number; size?: number }) {
  const { courses, hydrated } = useJazz();
  const done = hydrated ? (courses[courseId]?.length ?? 0) : 0;
  return <ProgressRing value={done} total={total} size={size} />;
}
