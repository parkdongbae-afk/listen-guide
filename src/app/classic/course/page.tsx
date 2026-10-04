import type { Metadata } from "next";
import { CLASSIC_TRACKS } from "@/data/classicTracks";
import { classicEraLabels, classicEraOrder } from "@/lib/classic";
import { GuideCourseStep } from "@/components/guides/GuideCourseStep";
import { CourseProgressRing } from "@/components/guides/CourseProgressRing";

export const metadata: Metadata = {
  title: "Classic Guide — 31곡 입문 코스",
  description: "바로크에서 한국 클래식까지, 추천 순서대로 따라가는 클래식 입문 코스. 진도를 저장하며 들어보세요.",
};

const COURSE_ID = "classic-31";

export default function ClassicCoursePage() {
  const steps = [...CLASSIC_TRACKS].sort((a, b) => a.courseOrder - b.courseOrder);
  const eraGroups = classicEraOrder
    .map((era) => ({ era, label: classicEraLabels[era], tracks: steps.filter((t) => t.era === era) }))
    .filter((g) => g.tracks.length > 0);

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            입문 코스
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">클래식 31곡 입문 코스</h1>
          <p className="mt-2 text-sm leading-relaxed text-subtle">
            바로크 → 고전 → 낭만 → 인상·현대 → 한국 클래식 순서로 이어집니다. 하루에 한 곡씩만 들어도 한 달입니다.
            체크한 진도는 이 브라우저에 저장됩니다.
          </p>
        </div>
        <CourseProgressRing courseId={COURSE_ID} total={steps.length} size={72} />
      </header>

      {eraGroups.map((group) => (
        <section key={group.era} aria-labelledby={`era-${group.era}`} className="space-y-3">
          <h2 id={`era-${group.era}`} className="text-lg font-bold">
            {group.label}
            <span className="ml-2 text-xs font-normal text-subtle">{group.tracks.length}곡</span>
          </h2>
          <ol className="space-y-3">
            {group.tracks.map((track) => (
              <li key={track.id}>
                <GuideCourseStep
                  courseId={COURSE_ID}
                  stepKey={track.id}
                  stepLabel={`STEP ${track.courseOrder}`}
                  stepTitle={`${track.titleKo} — ${track.composerKo}`}
                  stepDescription={track.oneLineIntro}
                  href={`/classic/works/${track.id}`}
                  linkLabel="감상 페이지로"
                />
              </li>
            ))}
          </ol>
        </section>
      ))}

      <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
        완료 체크는 이 브라우저에만 저장됩니다. 순서는 추천일 뿐 — 마음에 드는 시대부터 들어도 좋습니다.
      </div>
    </div>
  );
}
