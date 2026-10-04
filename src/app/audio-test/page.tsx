import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { AUDIO_TEST_TRACKS } from "@/data/audioTestTracks";
import { audioCategoryLabels, audioKoreanTracks } from "@/lib/audioTest";
import { AudioTrackCard } from "@/components/guides/AudioTrackCard";
import { SectionHeading } from "@/components/ui/index";

export const metadata: Metadata = {
  title: "Audio Test — 내 장비를 음악으로 점검",
  description: "검증된 테스트 곡 20선으로 초저음, 공간감, 해상도까지. 이어폰과 스피커를 음악으로 점검하는 가이드.",
};

export default function AudioTestHomePage() {
  const firstFive = AUDIO_TEST_TRACKS.slice(0, 5);
  const korean = audioKoreanTracks();
  const categories = Object.entries(audioCategoryLabels);

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 sm:px-10 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4a6fa5]/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            Audio Test Guide
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            스펙 시트보다
            <br />
            좋아하는 노래 한 곡
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-subtle sm:text-lg">
            익숙한 곡을 들으며 초저음, 보컬, 공간감을 하나씩 점검하세요. 점수는 정답이 아니라 나의 비교 기록입니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href={`/audio-test/tracks/${firstFive[0]?.id ?? ""}`}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
            >
              첫 테스트 시작
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/audio-test/tracks"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
            >
              테스트 곡 전체 보기
            </Link>
            <Link
              href="/audio-test/evaluation"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
            >
              평가 항목 보기
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="category-heading">
        <SectionHeading title="무엇을 점검할까요?" subtitle="10개 항목 중 지금 궁금한 것부터." />
        <h2 id="category-heading" className="sr-only">
          평가 카테고리
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {categories.map(([id, { label, question }]) => (
            <li key={id}>
              <Link
                href={`/audio-test/tracks?category=${id}`}
                className="flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-brass"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink">{label}</span>
                  <span className="block truncate text-xs text-subtle">{question}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="first-heading">
        <SectionHeading title="가장 먼저 들을 5곡" subtitle="다양한 녹음 특성을 고른 입문 세트입니다." moreHref="/audio-test/tracks" moreLabel="전체 20곡" />
        <h2 id="first-heading" className="sr-only">
          첫 5곡
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {firstFive.map((track) => (
            <li key={track.id}>
              <AudioTrackCard track={track} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="korean-heading">
        <SectionHeading title="한국 곡으로 듣는 테스트" subtitle="익숙한 노래일수록 변화가 잘 들립니다." moreHref="/audio-test/tracks?origin=korean" moreLabel="전체 보기" />
        <h2 id="korean-heading" className="sr-only">
          한국 곡
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {korean.map((track) => (
            <li key={track.id}>
              <AudioTrackCard track={track} />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-burgundy/40 bg-burgundy/10 p-6">
        <h2 className="flex items-center gap-2 text-base font-bold">
          <ShieldAlert className="h-5 w-5 text-burgundy" aria-hidden />
          안전한 청취 안내
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-subtle">
          테스트는 편안한 음량에서 진행하세요. 저음·고음을 확인한다고 볼륨을 크게 올리면 청력에 해로울 수 있습니다.
          긴 시간 연속 감상보다 짧은 세션 여러 번을 권합니다.
        </p>
      </section>
    </div>
  );
}
