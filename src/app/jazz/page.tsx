import Link from "next/link";
import { ArrowRight, Clock, ListMusic } from "lucide-react";
import { tracks } from "@/data/tracks";
import { trackMap } from "@/data/track-utils";
import { eras } from "@/data/eras";
import { moods } from "@/data/moods";
import { instruments } from "@/data/instruments";
import { glossary } from "@/data/glossary";
import { courses } from "@/data/courses";
import { TrackGrid } from "@/components/tracks/TrackGrid";
import { SectionHeading } from "@/components/ui/index";
import { daySeed } from "@/lib/utils";

export default function HomePage() {
  const seed = daySeed(new Date());
  const firstFive = tracks
    .filter((t) => t.mustListenRank != null && t.mustListenRank <= 5)
    .sort((a, b) => (a.mustListenRank ?? 0) - (b.mustListenRank ?? 0));
  const todayPick = tracks[Math.floor(seed * tracks.length)] ?? tracks[0];
  const todayTerm = glossary[Math.floor(seed * glossary.length)] ?? glossary[0];
  const introCourse = courses.find((c) => c.id === "30min") ?? courses[0];
  const courseSteps = introCourse.steps
    .map((s) => trackMap.get(s.trackId))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="space-y-14">
      {/* 히어로 */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 sm:px-10 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-burgundy/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            재즈 입문자를 위한 감상 가이드
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            재즈, 무엇부터 들어야 할지
            <br />
            모르겠다면
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-subtle sm:text-lg">
            어려운 이론보다 좋은 한 곡부터 시작해 보세요. 대표곡을 듣고, 짧은 설명과 감상 포인트를 따라가며 나만의 재즈
            취향을 찾을 수 있습니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href={`/jazz/tracks/${firstFive[0]?.slug ?? "take-five"}?play=1`}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
            >
              첫 곡 들어보기
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/jazz/courses/30min"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
            >
              30분 입문 코스
            </Link>
            <Link
              href="/jazz/moods#taste-finder"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
            >
              취향으로 곡 찾기
            </Link>
          </div>
        </div>
      </section>

      {/* 첫 5곡 */}
      <section aria-labelledby="first-five">
        <SectionHeading
          title="재즈가 처음인가요? 이 5곡부터 들어보세요"
          subtitle="검증된 대표곡만 골랐습니다. 페이지 안에서 바로 들을 수 있어요."
          moreHref="/jazz/must-listen"
          moreLabel="전체 필수곡 보기"
        />
        <h2 id="first-five" className="sr-only">
          첫 5곡
        </h2>
        <TrackGrid tracks={firstFive} showRank />
      </section>

      {/* 오늘의 추천 */}
      <section aria-labelledby="today-pick" className="rounded-3xl border border-line bg-card p-6 sm:p-8">
        <h2 id="today-pick" className="text-lg font-bold">
          오늘의 추천 곡
        </h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold sm:text-3xl">{todayPick.title}</p>
            <p className="mt-1 text-sm text-subtle">
              {todayPick.primaryArtistName} · {todayPick.releaseYear ?? todayPick.recordingYear}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-subtle">{todayPick.shortDescription}</p>
          </div>
          <Link
            href={`/jazz/tracks/${todayPick.slug}?play=1`}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-brass px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.03] sm:self-auto"
          >
            지금 들어보기
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* 기분으로 고르는 재즈 */}
      <section aria-labelledby="mood-section">
        <SectionHeading title="기분으로 고르는 재즈" subtitle="장르명이 어렵다면 기분과 상황부터 시작하세요." moreHref="/jazz/moods" moreLabel="전체 분위기" />
        <h2 id="mood-section" className="sr-only">
          기분으로 고르는 재즈
        </h2>
        <ul className="flex flex-wrap gap-2">
          {moods.slice(0, 10).map((mood) => (
            <li key={mood.id}>
              <Link
                href={`/jazz/moods/${mood.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2.5 text-sm text-ink transition-colors hover:border-brass hover:text-brass"
              >
                <span aria-hidden>{mood.emoji}</span>
                {mood.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 30분 입문 코스 */}
      <section aria-labelledby="course-section" className="rounded-3xl border border-line bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="course-section" className="flex items-center gap-2 text-lg font-bold">
              <Clock className="h-5 w-5 text-brass" aria-hidden />
              {introCourse.title}
            </h2>
            <p className="mt-1 text-sm text-subtle">{introCourse.subtitle}</p>
          </div>
          <Link
            href={`/jazz/courses/${introCourse.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            코스 시작하기
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ol className="mt-5 grid gap-2 sm:grid-cols-5">
          {introCourse.steps.map((step, i) => {
            const track = courseSteps[i];
            return (
              <li key={step.key}>
                <Link
                  href={track ? `/jazz/tracks/${track.slug}` : "/jazz/courses/30min"}
                  className="flex h-full flex-col gap-1 rounded-xl border border-line bg-bg p-3 transition-colors hover:border-brass"
                >
                  <span className="text-xs font-bold text-brass">STEP {i + 1}</span>
                  <span className="text-sm font-bold text-ink">{step.title}</span>
                  <span className="text-xs text-subtle">{track?.title}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 시대별 탐색 */}
      <section aria-labelledby="era-section">
        <SectionHeading title="시대별 재즈 탐색" subtitle="스윙에서 현대 재즈까지, 100년의 흐름을 따라 들어보세요." moreHref="/jazz/eras" moreLabel="전체 시대" />
        <h2 id="era-section" className="sr-only">
          시대별 재즈 탐색
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {eras.slice(2).map((era) => (
            <li key={era.id}>
              <Link
                href={`/jazz/eras/${era.slug}`}
                className="flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-brass"
              >
                <span>
                  <span className="block text-sm font-bold text-ink">{era.name}</span>
                  <span className="block text-xs text-subtle">{era.period}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 악기별 */}
      <section aria-labelledby="instrument-section">
        <SectionHeading title="악기별 대표 연주" subtitle="좋아하는 소리를 찾으면 재즈가 더 가까워집니다." moreHref="/jazz/instruments" moreLabel="전체 악기" />
        <h2 id="instrument-section" className="sr-only">
          악기별 대표 연주
        </h2>
        <ul className="flex flex-wrap gap-2">
          {instruments.map((instrument) => (
            <li key={instrument.id}>
              <Link
                href={`/jazz/instruments#${instrument.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-2 text-sm text-subtle transition-colors hover:border-brass hover:text-brass"
              >
                {instrument.nameKo}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 용어 한 개 */}
      <section aria-labelledby="term-section" className="rounded-3xl border border-line bg-card p-6 sm:p-8">
        <h2 id="term-section" className="flex items-center gap-2 text-lg font-bold">
          <ListMusic className="h-5 w-5 text-brass" aria-hidden />
          오늘의 재즈 용어
        </h2>
        <p className="mt-3 font-display text-xl font-bold text-brass">{todayTerm.name}</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-subtle">{todayTerm.oneLiner}</p>
        <Link href="/jazz/glossary" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brass hover:underline">
          용어 사전 전체 보기
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
