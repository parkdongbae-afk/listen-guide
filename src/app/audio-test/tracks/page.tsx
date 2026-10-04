import type { Metadata } from "next";
import Link from "next/link";
import { AUDIO_TEST_TRACKS, type TestCategory } from "@/data/audioTestTracks";
import { audioCategoryLabels, audioVocalLabels } from "@/lib/audioTest";
import { AudioTrackCard } from "@/components/guides/AudioTrackCard";
import { EmptyState } from "@/components/ui/index";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Audio Test — 테스트 곡 목록",
  description: "평가 항목별 오디오 테스트 곡 20선을 필터링해 감상하세요.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const categoryKeys = Object.keys(audioCategoryLabels) as TestCategory[];
const vocalKeys = Object.keys(audioVocalLabels);

export default async function AudioTracksPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const pick = (key: string) => {
    const v = params[key];
    return typeof v === "string" && v.length > 0 ? v : undefined;
  };
  const category = pick("category");
  const vocal = pick("vocal");
  const origin = pick("origin");

  const list = AUDIO_TEST_TRACKS.filter((t) => {
    if (category && t.primaryCategory !== category && !t.secondaryCategories.includes(category as TestCategory))
      return false;
    if (vocal && t.vocalType !== vocal) return false;
    if (origin === "korean" && !t.isKorean) return false;
    if (origin === "international" && t.isKorean) return false;
    return true;
  });

  const buildHref = (key: string, value?: string) => {
    const next = new URLSearchParams();
    if (category && key !== "category") next.set("category", category);
    if (vocal && key !== "vocal") next.set("vocal", vocal);
    if (origin && key !== "origin") next.set("origin", origin);
    if (value) next.set(key, value);
    const qs = next.toString();
    return `/audio-test/tracks${qs ? `?${qs}` : ""}`;
  };

  const active = [category, vocal, origin].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">테스트 곡</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          각 곡은 여러 평가 항목을 겸합니다. 카테고리 필터로 지금 점검할 항목의 곡을 고르세요.
        </p>
      </header>

      <div className="space-y-3 rounded-2xl border border-line bg-card p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="w-12 shrink-0 text-xs font-semibold text-subtle" aria-hidden>
            항목
          </span>
          <div role="group" aria-label="평가 항목 필터" className="flex flex-wrap gap-1.5">
            {categoryKeys.map((key) => {
              const isActive = category === key;
              return (
                <Link
                  key={key}
                  href={buildHref("category", isActive ? undefined : key)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    isActive
                      ? "border-brass bg-brass-soft font-semibold text-brass"
                      : "border-line text-subtle hover:border-brass/50 hover:text-ink",
                  )}
                >
                  {audioCategoryLabels[key].label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="w-12 shrink-0 text-xs font-semibold text-subtle" aria-hidden>
            보컬
          </span>
          <div role="group" aria-label="보컬 필터" className="flex flex-wrap gap-1.5">
            {vocalKeys.map((key) => {
              const isActive = vocal === key;
              return (
                <Link
                  key={key}
                  href={buildHref("vocal", isActive ? undefined : key)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    isActive
                      ? "border-brass bg-brass-soft font-semibold text-brass"
                      : "border-line text-subtle hover:border-brass/50 hover:text-ink",
                  )}
                >
                  {audioVocalLabels[key]}
                </Link>
              );
            })}
          </div>
          <span className="ml-2 w-10 shrink-0 text-xs font-semibold text-subtle" aria-hidden>
            지역
          </span>
          <div role="group" aria-label="지역 필터" className="flex gap-1.5">
            {[
              { value: "korean", label: "한국" },
              { value: "international", label: "해외" },
            ].map(({ value, label }) => {
              const isActive = origin === value;
              return (
                <Link
                  key={value}
                  href={buildHref("origin", isActive ? undefined : value)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    isActive
                      ? "border-brass bg-brass-soft font-semibold text-brass"
                      : "border-line text-subtle hover:border-brass/50 hover:text-ink",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        {active > 0 && (
          <div className="border-t border-line pt-3">
            <Link href="/audio-test/tracks" className="rounded-full border border-line px-3 py-1.5 text-xs text-subtle hover:border-burgundy hover:text-burgundy">
              필터 초기화
            </Link>
          </div>
        )}
      </div>

      <p className="text-sm text-subtle" aria-live="polite">
        {list.length}곡{active > 0 && " (필터 적용됨)"}
      </p>

      {list.length === 0 ? (
        <EmptyState title="조건에 맞는 곡이 없어요" description="필터를 풀어 보세요." actionHref="/audio-test/tracks" actionLabel="필터 초기화" />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((track) => (
            <li key={track.id}>
              <AudioTrackCard track={track} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
