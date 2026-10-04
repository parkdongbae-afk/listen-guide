"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useJazz } from "@/context/JazzContext";
import { ProgressRing } from "@/components/ui/index";
import type { Course } from "@/types";

/** 코스 카드 + 진도 링 (클라이언트 상태 필요) */
export function CourseCard({ course }: { course: Course }) {
  const { courses, hydrated } = useJazz();
  const done = hydrated ? (courses[course.id]?.length ?? 0) : 0;

  return (
    <Link
      href={`/jazz/courses/${course.slug}`}
      className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <GraduationCap className="h-5 w-5 text-brass" aria-hidden />
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-subtle">{course.subtitle}</p>
        </div>
        <ProgressRing value={done} total={course.steps.length} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-subtle">{course.description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brass">
        {done > 0 && done < course.steps.length ? "코스 이어하기" : done >= course.steps.length ? "코스 완료 · 다시 듣기" : "코스 시작하기"}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}
