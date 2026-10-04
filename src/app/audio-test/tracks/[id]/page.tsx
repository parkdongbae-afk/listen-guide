import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ExternalLink, TriangleAlert } from "lucide-react";
import { AUDIO_TEST_TRACKS } from "@/data/audioTestTracks";
import { audioTestVideos } from "@/data/audioTestVideos";
import { audioCategoryLabels, audioVocalLabels, audioDifficultyLabels, getAudioTrack } from "@/lib/audioTest";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";
import { TimestampQuiz } from "@/components/player/TimestampQuiz";
import { NoteRecorder } from "@/components/guides/NoteRecorder";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return AUDIO_TEST_TRACKS.map((t) => ({ id: t.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const track = getAudioTrack(id);
  if (!track) return { title: "곡을 찾을 수 없습니다" };
  return {
    title: `${track.title} — ${track.artist} | Audio Test`,
    description: track.oneLineReason,
  };
}

export default async function AudioTrackDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const track = getAudioTrack(id);
  if (!track) notFound();
  const video = audioTestVideos[id];
  const quizItems = track.listeningGuide.map((guide, index) => ({
    key: `cp${index}`,
    label: guide.title,
    description: guide.description,
    hintSeconds: guide.seconds,
  }));

  const comparisons = track.comparisonTrackIds
    .map((cid) => getAudioTrack(cid))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const nextTracks = track.nextTrackIds
    .map((nid) => getAudioTrack(nid))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <Link
            href={`/audio-test/tracks?category=${track.primaryCategory}`}
            className="rounded-full bg-brass-soft px-2.5 py-1 font-medium text-brass"
          >
            {audioCategoryLabels[track.primaryCategory].label}
          </Link>
          {track.secondaryCategories.map((c) => (
            <Link key={c} href={`/audio-test/tracks?category=${c}`} className="rounded-full border border-line px-2.5 py-1 text-subtle">
              {audioCategoryLabels[c].label}
            </Link>
          ))}
          <span className="rounded-full border border-line px-2.5 py-1 text-subtle">{audioVocalLabels[track.vocalType]}</span>
          <span className="rounded-full border border-line px-2.5 py-1 text-subtle">{audioDifficultyLabels[track.difficulty]}</span>
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{track.title}</h1>
        <p className="text-base text-subtle">
          {track.artist} · {track.album} ({track.releaseInfo})
        </p>
        <p className="max-w-2xl leading-relaxed text-subtle">{track.oneLineReason}</p>
        <p className="text-sm text-subtle">예상 테스트 시간: {track.estimatedTestTime}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-8">
          {video && (
            <section aria-labelledby="video-heading">
              <h2 id="video-heading" className="sr-only">
                YouTube 재생
              </h2>
              <YouTubePlayer
                key={track.id}
                videoId={video.youtubeVideoId}
                title={`${track.title} - ${track.artist}`}
                artistName={track.artist}
                trackId={track.id}
              >
                <div className="mt-3 space-y-3">
                  <p className="text-xs leading-relaxed text-subtle">
                    조회수 기반 자동 선정 영상입니다. 음질 비교가 목적이라면 옆의 음원 서비스(무손실 음질 포함)를
                    우선하세요.
                  </p>
                  <TimestampQuiz storageKey={`audio/${track.id}`} items={quizItems} />
                </div>
              </YouTubePlayer>
            </section>
          )}

          <section aria-labelledby="focus-heading">
            <h2 id="focus-heading" className="mb-3 text-lg font-bold">
              이 곡으로 확인할 것
            </h2>
            <ul className="grid gap-2">
              {track.listeningFocus.map((focus, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border border-line bg-card px-4 py-3 text-sm leading-relaxed text-subtle">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden />
                  {focus}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <section aria-labelledby="good-heading" className="rounded-2xl border border-line bg-card p-5">
              <h2 id="good-heading" className="flex items-center gap-1.5 text-sm font-bold text-brass">
                <Check className="h-4 w-4" aria-hidden />
                잘 들리는 상태라면
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-subtle">
                {track.goodPlaybackExamples.map((example, i) => (
                  <li key={i}>· {example}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="warn-heading" className="rounded-2xl border border-burgundy/40 bg-burgundy/10 p-5">
              <h2 id="warn-heading" className="flex items-center gap-1.5 text-sm font-bold text-burgundy">
                <TriangleAlert className="h-4 w-4" aria-hidden />
                이렇게 들린다면
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-subtle">
                {track.warningSigns.map((sign, i) => (
                  <li key={i}>· {sign}</li>
                ))}
              </ul>
            </section>
          </div>

          <NoteRecorder guideId="audio-test" trackId={track.id} />

          <section aria-labelledby="why-heading">
            <h2 id="why-heading" className="mb-3 text-lg font-bold">
              왜 이 곡인가
            </h2>
            <p className="max-w-[65ch] leading-loose text-subtle">{track.whySuitable}</p>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="service-heading" className="rounded-2xl border border-brass/40 bg-brass-soft/50 p-5">
            <h2 id="service-heading" className="text-sm font-bold text-brass">
              음원으로 듣기
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-subtle">{track.versionInfo.serviceVersionNote}</p>
            <ul className="mt-3 space-y-2">
              {track.externalServices.map((service) => (
                <li key={service.provider}>
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-xl border border-line bg-bg px-4 py-2.5 text-sm transition-colors hover:border-brass"
                  >
                    {service.provider}에서 검색
                    <ExternalLink className="h-3.5 w-3.5 text-subtle" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-bg px-3 py-2 text-[11px] leading-relaxed text-subtle">
              공식 음원·영상으로 감상하세요. 버전에 따라 소리가 달라질 수 있습니다.
            </p>
          </section>

          {comparisons.length > 0 && (
            <section aria-labelledby="compare-heading">
              <h2 id="compare-heading" className="mb-3 text-lg font-bold">
                A/B 비교에 좋은 곡
              </h2>
              <ul className="space-y-2">
                {comparisons.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/audio-test/tracks/${c.id}`}
                      className="block rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-brass"
                    >
                      <span className="block text-sm font-bold text-ink">{c.title}</span>
                      <span className="block text-xs text-subtle">{c.artist}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {nextTracks.length > 0 && (
            <section aria-labelledby="next-heading">
              <h2 id="next-heading" className="mb-3 text-lg font-bold">
                다음 테스트 곡
              </h2>
              <ul className="space-y-2">
                {nextTracks.map((n) => (
                  <li key={n.id}>
                    <Link
                      href={`/audio-test/tracks/${n.id}`}
                      className="block rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-brass"
                    >
                      <span className="block text-sm font-bold text-ink">{n.title}</span>
                      <span className="block text-xs text-subtle">{n.artist}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="meta-heading" className="rounded-2xl border border-line bg-card p-5 text-xs leading-relaxed text-subtle">
            <h2 id="meta-heading" className="mb-1.5 text-sm font-bold text-ink">
              데이터 상태
            </h2>
            <p>{track.sources.required.join(" · ")}</p>
            <p className="mt-1.5">선호 버전: {track.versionInfo.preferredVersion}</p>
          </section>
        </aside>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/audio-test/tracks" className="text-sm font-medium text-brass hover:underline">
          ← 전체 테스트 곡
        </Link>
        <Link href="/audio-test/evaluation" className="text-sm font-medium text-subtle hover:text-brass">
          평가 항목 전체 보기 →
        </Link>
      </div>
    </div>
  );
}
