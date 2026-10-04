import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, courseMap } from "@/data/courses";
import { trackMap } from "@/data/track-utils";
import { CourseStepItem } from "./step-item";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const course = courseMap.get(id);
  if (!course) return { title: "코스를 찾을 수 없습니다" };
  return {
    title: `${course.title} — ${course.subtitle}`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const course = courseMap.get(id);
  if (!course) notFound();

  const steps = course.steps.map((step) => ({ ...step, track: trackMap.get(step.trackId) }));

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
          입문 코스
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{course.title}</h1>
        <p className="mt-1 text-sm text-brass">{course.subtitle}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-subtle">{course.description}</p>
      </header>

      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.key}>
            <CourseStepItem
              courseId={course.id}
              stepKey={step.key}
              stepLabel={course.id === "7days" ? `DAY ${index + 1}` : `STEP ${index + 1}`}
              stepTitle={step.title}
              stepDescription={step.description}
              track={step.track}
            />
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
        각 단계의 체크 상태는 이 브라우저에 저장됩니다. 새로고침해도 진도가 유지되며, &lsquo;나의 재즈&rsquo; 페이지에서
        초기화할 수 있습니다.
      </div>
    </div>
  );
}
