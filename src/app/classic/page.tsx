import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CLASSIC_TRACKS } from "@/data/classicTracks";
import { classicFirstFive, classicEraLabels, classicKoreanTracks, classicEraOrder } from "@/lib/classic";
import { ClassicWorkCard } from "@/components/guides/ClassicWorkCard";
import { SectionHeading } from "@/components/ui/index";

export const metadata: Metadata = {
  title: "Classic Guide — 처음 만나는 클래식",
  description: "바로크부터 한국 근대 클래식까지, 31곡을 부담 없는 순서로 감상하는 클래식 입문 가이드.",
};

export default function ClassicHomePage() {
  const firstFive = classicFirstFive();
  const korean = classicKoreanTracks();
  const eraCounts = classicEraOrder.map((era) => ({
    era,
    label: classicEraLabels[era],
    count: CLASSIC_TRACKS.filter((t) => t.era === era).length,
  }));

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 sm:px-10 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-burgundy/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            Classic Guide
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            클래식, 이름부터 외울 필요 없습니다
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-subtle sm:text-lg">
            곡 하나, 감상 포인트 하나. 31곡을 추천 순서대로 따라가다 보면 클래식의 지도가 저절로 그려집니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href={`/classic/works/${firstFive[0]?.id ?? "vivaldi-spring-1"}`}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
            >
              첫 작품 들어보기
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/classic/works"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
            >
              전체 작품 보기
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="first-five-heading">
        <SectionHeading
          title="이 5곡부터 들어보세요"
          subtitle="입문 코스의 첫 순서입니다. 순서대로 따라가 보세요."
          moreHref="/classic/works"
          moreLabel="전체 작품"
        />
        <h2 id="first-five-heading" className="sr-only">
          첫 5곡
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {firstFive.map((track, index) => (
            <li key={track.id}>
              <ClassicWorkCard track={track} rank={index + 1} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="era-heading">
        <SectionHeading title="시대별로 둘러보기" subtitle="익숙한 시대부터 골라 들어도 좋습니다." />
        <h2 id="era-heading" className="sr-only">
          시대별 작품
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {eraCounts
            .filter((e) => e.count > 0)
            .map(({ era, label, count }) => (
              <li key={era}>
                <Link
                  href={`/classic/works?era=${era}`}
                  className="flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-brass"
                >
                  <span>
                    <span className="block text-sm font-bold text-ink">{label}</span>
                    <span className="block text-xs text-subtle">{count}곡</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <section aria-labelledby="korean-heading">
        <SectionHeading title="한국 클래식" subtitle="우리 음악가의 작품도 클래식의 한 페이지입니다." moreHref="/classic/works?origin=korean" moreLabel="전체 보기" />
        <h2 id="korean-heading" className="sr-only">
          한국 클래식
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {korean.map((track) => (
            <li key={track.id}>
              <ClassicWorkCard track={track} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
