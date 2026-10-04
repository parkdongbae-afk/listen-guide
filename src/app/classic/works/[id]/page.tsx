import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { CLASSIC_TRACKS, getClassicTrackById } from "@/data/classicTracks";
import { classicEraLabels, classicFormLabels, classicDifficultyLabels } from "@/lib/classic";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";
import { TimestampQuiz } from "@/components/player/TimestampQuiz";
import { NoteRecorder } from "@/components/guides/NoteRecorder";
import { formatDuration } from "@/lib/utils";
import { isVerifiedVideoId, youtubeSearchUrl } from "@/lib/youtube";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return CLASSIC_TRACKS.map((t) => ({ id: t.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const track = getClassicTrackById(id);
  if (!track) return { title: "작품을 찾을 수 없습니다" };
  return {
    title: `${track.titleKo} — ${track.composerKo} | Classic Guide`,
    description: track.oneLineIntro,
  };
}

export default async function ClassicWorkDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const track = getClassicTrackById(id);
  if (!track) notFound();

  const verified = isVerifiedVideoId(track.video.youtubeVideoId);
  const next = track.nextTrackIds.map((nid) => getClassicTrackById(nid)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const related = track.relatedTrackIds
    .map((rid) => getClassicTrackById(rid))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const timelineItems = track.timeline.map((point, index, arr) => ({
    // 초가 기재되지 않은 포인트는 영상 길이에 비례한 추정치로 채운다 (실제와 다를 수 있음)
    seconds:
      point.seconds ??
      (track.durationSeconds
        ? Math.round(((track.durationSeconds * (index + 1)) / (arr.length + 1)) / 5) * 5
        : null),
    label: point.label,
    description: point.description,
  }));

  return (
    <div className="space-y-12">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <Link href={`/classic/works?era=${track.era}`} className="rounded-full bg-brass-soft px-2.5 py-1 font-medium text-brass">
              {classicEraLabels[track.era]}
            </Link>
            <Link href={`/classic/works?form=${track.form}`} className="rounded-full border border-line px-2.5 py-1 text-subtle">
              {classicFormLabels[track.form]}
            </Link>
            <span className="rounded-full border border-line px-2.5 py-1 text-subtle">
              {classicDifficultyLabels[track.difficulty]}
            </span>
            {track.isKorean && <span className="rounded-full border border-burgundy/60 px-2.5 py-1 text-burgundy">한국 클래식</span>}
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{track.titleKo}</h1>
          <p className="text-base text-subtle">
            {track.composerKo} <span className="font-display text-sm">({track.composer})</span>
          </p>
          <p className="font-display text-sm text-subtle">{track.title}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-subtle">
            <li className="flex items-center gap-1.5">
              {track.durationSeconds != null ? (
                <>
                  <Clock className="h-4 w-4" aria-hidden />
                  {formatDuration(track.durationSeconds)}
                </>
              ) : (
                "재생 시간 미확인"
              )}
            </li>
            <li>{track.instruments.join(" · ")}</li>
          </ul>
        </div>

        <div className="space-y-5">
          <YouTubePlayer
            key={track.id}
            videoId={track.video.youtubeVideoId}
            title={track.titleKo}
            artistName={track.composerKo}
            trackId={track.id}
          >
            <section aria-labelledby="classic-timeline-heading" className="mt-5">
              <h2 id="classic-timeline-heading" className="mb-3 text-lg font-bold">
                감상 구간 찾기 퀴즈
              </h2>
              {verified ? (
                <p className="mb-3 text-xs leading-relaxed text-subtle">
                  영상을 들으며 아래 감상 포인트가 시작되는 순간을 직접 찾아 입력해 보세요. 구간 시간은 추정치이며 실제와
                  다를 수 있습니다.
                </p>
              ) : (
                <p className="mb-3 rounded-xl border border-line bg-card px-4 py-3 text-xs leading-relaxed text-subtle">
                  이 작품의 공식 영상은 아직 검증 전입니다. 검색 링크의 영상으로 들으면서 아래 감상 포인트의 순서를
                  확인해 보세요.
                </p>
              )}
              <TimestampQuiz
                storageKey={`classic/${track.id}`}
                items={timelineItems.map((item, index) => ({
                  key: `p${index}`,
                  label: item.label,
                  description: item.description,
                  hintSeconds: item.seconds,
                }))}
              />
            </section>
          </YouTubePlayer>

          {!verified && (
            <a
              href={youtubeSearchUrl(`${track.composer} ${track.title} official performance`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-brass hover:text-brass"
            >
              YouTube에서 &lsquo;{track.titleKo}&rsquo; 검색하기 →
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-8">
          <section aria-labelledby="bg-heading">
            <h2 id="bg-heading" className="mb-3 text-lg font-bold">
              작품의 배경
            </h2>
            <p className="max-w-[65ch] leading-loose text-subtle">{track.background}</p>
          </section>

          <section aria-labelledby="why-heading">
            <h2 id="why-heading" className="mb-3 text-lg font-bold">
              왜 들어야 하는가
            </h2>
            <p className="max-w-[65ch] leading-loose text-subtle">{track.whyMustListen}</p>
          </section>

          <section aria-labelledby="points-heading">
            <h2 id="points-heading" className="mb-3 text-lg font-bold">
              감상 포인트
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {track.listeningPoints.map((point, i) => (
                <li key={i} className="rounded-xl border border-line bg-card p-4 text-sm leading-relaxed text-subtle">
                  <span className="mr-1.5 font-bold text-brass">{i + 1}.</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {track.sources.length > 0 && (
            <section aria-labelledby="src-heading">
              <h2 id="src-heading" className="mb-3 text-lg font-bold">
                출처
              </h2>
              <ul className="max-w-[65ch] space-y-1.5 text-xs text-subtle">
                {track.sources.map((source) => (
                  <li key={source.title}>
                    · {source.title}
                    {source.publisher && ` — ${source.publisher}`}
                    {source.url && (
                      <>
                        {" "}
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-brass">
                          링크
                        </a>
                      </>
                    )}
                    {` (${source.status === "VERIFIED" ? "검증" : "검수 필요"})`}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          {next.length > 0 && (
            <section aria-labelledby="next-heading" className="rounded-2xl border border-brass/40 bg-brass-soft/50 p-5">
              <h2 id="next-heading" className="text-sm font-bold text-brass">
                다음 추천 작품
              </h2>
              <ul className="mt-2 space-y-2">
                {next.map((n) => (
                  <li key={n.id}>
                    <Link href={`/classic/works/${n.id}`} className="text-sm font-semibold hover:underline">
                      {n.titleKo} — {n.composerKo}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-3 text-lg font-bold">
                비슷한 작품
              </h2>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/classic/works/${r.id}`}
                      className="block rounded-xl border border-line bg-card px-4 py-3 transition-colors hover:border-brass"
                    >
                      <span className="block text-sm font-bold text-ink">{r.titleKo}</span>
                      <span className="block text-xs text-subtle">{r.composerKo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <NoteRecorder guideId="classic" trackId={track.id} />

          <section aria-labelledby="rec-heading" className="rounded-2xl border border-line bg-card p-5 text-xs leading-relaxed text-subtle">
            <h2 id="rec-heading" className="mb-1.5 text-sm font-bold text-ink">
              연주 녹음 정보
            </h2>
            {track.recording.performer || track.recording.conductor || track.recording.orchestra ? (
              <p>
                {track.recording.conductor && `${track.recording.conductor} (지휘) · `}
                {track.recording.orchestra && `${track.recording.orchestra} · `}
                {track.recording.performer}
              </p>
            ) : (
              <p>{track.recording.note}</p>
            )}
          </section>
        </aside>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/classic/works" className="text-sm font-medium text-brass hover:underline">
          ← 전체 작품 목록
        </Link>
        {next[0] && (
          <Link href={`/classic/works/${next[0].id}?play=1`} className="inline-flex items-center gap-1.5 text-sm font-medium text-subtle hover:text-brass">
            다음 작품 이어 듣기
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
