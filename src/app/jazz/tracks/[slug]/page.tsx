import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Album, ArrowRight, Calendar, Music2, Users } from "lucide-react";
import { trackBySlug, nextTrackOf, relatedTracksOf } from "@/data/track-utils";
import { eraMap } from "@/data/eras";
import { styleMap } from "@/data/styles";
import { moodMap } from "@/data/moods";
import { instrumentMap } from "@/data/instruments";
import { artistMap } from "@/data/artists";
import { glossaryMap } from "@/data/glossary";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";
import { ListeningTimeline } from "@/components/player/ListeningTimeline";
import { Term } from "@/components/glossary/GlossaryPopover";
import { TrackCard } from "@/components/tracks/TrackCard";
import { FavoriteButton } from "@/components/tracks/FavoriteButton";
import { CompletionButton } from "@/components/tracks/CompletionButton";
import { ShareButton } from "@/components/tracks/ShareButton";
import { DifficultyBadge } from "@/components/ui/index";
import { NoteRecorder } from "@/components/guides/NoteRecorder";
import { formatDuration } from "@/lib/utils";
import { isVerifiedVideoId, youtubeSearchUrl } from "@/lib/youtube";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return [...trackBySlug.keys()].map((slug) => ({ slug }));
}

// 정적 데이터 기반이므로 데이터에 없는 slug는 서버 수준에서 404로 처리한다
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const track = trackBySlug.get(slug);
  if (!track) return { title: "곡을 찾을 수 없습니다" };
  return {
    title: `${track.title} — 초보자를 위한 곡 설명과 감상 포인트`,
    description: `${track.primaryArtistName}의 ${track.title}을(를) 페이지에서 바로 듣고, ${track.shortDescription}`,
    openGraph: {
      title: `${track.title} — 초보자를 위한 곡 설명과 감상 포인트`,
      description: track.shortDescription,
      type: "article",
    },
    alternates: { canonical: `/jazz/tracks/${track.slug}` },
  };
}

export default async function TrackDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const track = trackBySlug.get(slug);
  if (!track) notFound();

  const era = eraMap.get(track.eraId);
  const trackStyles = track.styleIds.map((id) => styleMap.get(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const trackMoods = track.moodIds.map((id) => moodMap.get(id)).filter((m): m is NonNullable<typeof m> => Boolean(m));
  const trackInstruments = track.instrumentIds
    .map((id) => instrumentMap.get(id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const trackArtists = track.artistIds.map((id) => artistMap.get(id)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const terms = track.glossaryTermIds.map((id) => glossaryMap.get(id)).filter((g): g is NonNullable<typeof g> => Boolean(g));
  const related = relatedTracksOf(track);
  const next = nextTrackOf(track);
  const videoVerified = isVerifiedVideoId(track.video.youtubeVideoId);

  return (
    <div className="space-y-12">
      {/* 곡 헤더 */}
      <header className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {era && (
              <Link href={`/jazz/eras/${era.slug}`} className="rounded-full border border-line px-2.5 py-1 text-subtle transition-colors hover:border-brass hover:text-brass">
                {era.name}
              </Link>
            )}
            {trackStyles.map((s) => (
              <Link key={s.id} href={`/jazz/styles/${s.slug}`} className="rounded-full bg-brass-soft px-2.5 py-1 font-medium text-brass transition-opacity hover:opacity-80">
                {s.nameKo}
              </Link>
            ))}
            <DifficultyBadge difficulty={track.difficulty} />
            {track.hasVocals && <span className="rounded-full border border-line px-2.5 py-1 text-subtle">보컬</span>}
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{track.title}</h1>
          <p className="text-base text-subtle">
            <Link href={`/jazz/artists/${trackArtists[0]?.slug ?? ""}`} className="transition-colors hover:text-brass">
              {track.primaryArtistName}
            </Link>
            {track.titleKo && <span className="ml-2 text-sm">({track.titleKo})</span>}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-subtle">
            {track.albumTitle && (
              <li className="flex items-center gap-1.5">
                <Album className="h-4 w-4" aria-hidden />
                {track.albumTitle}
              </li>
            )}
            <li className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden />
              {track.recordingYear && track.releaseYear && track.recordingYear !== track.releaseYear
                ? `${track.recordingYear} 녹음 · ${track.releaseYear} 발매`
                : (track.releaseYear ?? track.recordingYear)}
            </li>
            {track.durationSeconds != null && (
              <li className="flex items-center gap-1.5">
                <Music2 className="h-4 w-4" aria-hidden />
                {formatDuration(track.durationSeconds)}
              </li>
            )}
            <li className="flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden />
              {trackInstruments.map((i) => i.nameKo).join(" · ")}
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            <FavoriteButton trackId={track.id} />
            <CompletionButton trackId={track.id} />
            <ShareButton title={track.title} path={`/jazz/tracks/${track.slug}`} />
          </div>
        </div>

        {/* 플레이어 + 타임라인 (PlayerContext 공유) */}
        <div className="space-y-5">
          {/* useSearchParams(?play=1)를 쓰는 클라이언트 컴포넌트 — 정적 렌더링을 위해 Suspense로 감싼다 */}
          <Suspense
            fallback={<div className="aspect-video w-full animate-pulse rounded-2xl border border-line bg-card" aria-hidden />}
          >
            <YouTubePlayer
              key={track.id}
              videoId={track.video.youtubeVideoId}
              fallbackVideoId={track.video.fallbackVideoId}
              title={track.title}
              artistName={track.primaryArtistName}
              trackId={track.id}
            >
              <section aria-labelledby="timeline-heading" className="mt-5">
                <h2 id="timeline-heading" className="mb-3 text-lg font-bold">
                  타임라인 감상 가이드
                </h2>
                {isVerifiedVideoId(track.video.youtubeVideoId) ? (
                  <p className="mb-3 text-xs leading-relaxed text-subtle">
                    아래 항목을 클릭하면 플레이어가 해당 시점으로 이동합니다. 키보드 Tab으로도 선택할 수 있습니다.
                  </p>
                ) : (
                  <p className="mb-3 rounded-xl border border-line bg-card px-4 py-3 text-xs leading-relaxed text-subtle">
                    이 곡의 YouTube 영상 ID는 아직 검증 전입니다. 아래 링크에서 직접 들어보실 수 있으며, 검수 후 이
                    페이지에서 바로 재생됩니다.
                  </p>
                )}
                <ListeningTimeline timeline={track.timeline} />
              </section>
            </YouTubePlayer>
          </Suspense>
          {!videoVerified && (
            <a
              href={youtubeSearchUrl(`${track.primaryArtistName} ${track.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-brass hover:text-brass"
            >
              YouTube에서 &lsquo;{track.title}&rsquo; 검색하기 →
            </a>
          )}
        </div>
      </header>

      {/* 설명 본문 */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-8">
          <section aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="mb-3 text-lg font-bold">
              한 줄 소개
            </h2>
            <p className="max-w-[65ch] leading-loose text-ink">{track.introduction}</p>
          </section>

          <section aria-labelledby="history-heading">
            <h2 id="history-heading" className="mb-3 text-lg font-bold">
              곡의 배경
            </h2>
            <p className="max-w-[65ch] leading-loose text-subtle">{track.historicalContext}</p>
          </section>

          <section aria-labelledby="why-heading">
            <h2 id="why-heading" className="mb-3 text-lg font-bold">
              왜 반드시 들어야 하는가
            </h2>
            <p className="max-w-[65ch] leading-loose text-subtle">{track.whyItMatters}</p>
          </section>

          <section aria-labelledby="points-heading">
            <h2 id="points-heading" className="mb-3 text-lg font-bold">
              초보자 감상 포인트
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {track.listeningPoints.map((point) => (
                <li key={point.title} className="rounded-xl border border-line bg-card p-4">
                  <p className="text-sm font-bold text-brass">{point.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-subtle">{point.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {terms.length > 0 && (
            <section aria-labelledby="terms-heading">
              <h2 id="terms-heading" className="mb-3 text-lg font-bold">
                이 곡을 이해하는 용어
              </h2>
              <p className="max-w-[65ch] text-sm leading-loose text-subtle">
                아래 용어를 클릭하면 페이지를 벗어나지 않고 뜻을 확인할 수 있습니다:{" "}
                {terms.map((term) => (
                  <span key={term.id} className="mx-1 inline-block">
                    <Term termId={term.id} />
                  </span>
                ))}
              </p>
            </section>
          )}

          <section aria-labelledby="note-heading-jazz">
            <h2 id="note-heading-jazz" className="sr-only">
              감상 기록
            </h2>
            <NoteRecorder guideId="jazz" trackId={track.id} />
          </section>

          <section aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="mb-3 text-lg font-bold">
              출처
            </h2>
            <ul className="max-w-[65ch] space-y-1.5 text-xs text-subtle">
              {track.sources.map((source) => (
                <li key={source.url}>
                  ·{" "}
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-brass">
                    {source.title}
                  </a>
                  {source.publisher && ` — ${source.publisher}`}
                  {` (확인일 ${source.accessedAt})`}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 사이드: 관련 곡 + 다음 곡 */}
        <aside className="space-y-8">
          {next && (
            <section aria-labelledby="next-heading" className="rounded-2xl border border-brass/40 bg-brass-soft/50 p-5">
              <h2 id="next-heading" className="text-sm font-bold text-brass">
                다음 추천 곡
              </h2>
              <p className="mt-2 font-display text-xl font-bold">{next.title}</p>
              <p className="text-sm text-subtle">{next.primaryArtistName}</p>
              <p className="mt-2 text-sm leading-relaxed text-subtle">{next.shortDescription}</p>
              <Link
                href={`/jazz/tracks/${next.slug}?play=1`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brass hover:underline"
              >
                이어서 듣기
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </section>
          )}

          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-3 text-lg font-bold">
                비슷한 곡
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {related.map((t) => (
                  <TrackCard key={t.id} track={t} />
                ))}
              </div>
            </section>
          )}

          {trackMoods.length > 0 && (
            <section aria-labelledby="moods-heading">
              <h2 id="moods-heading" className="mb-3 text-lg font-bold">
                이런 기분일 때 다시 들어보세요
              </h2>
              <ul className="flex flex-wrap gap-2">
                {trackMoods.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/jazz/moods/${m.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-subtle transition-colors hover:border-brass hover:text-brass"
                    >
                      <span aria-hidden>{m.emoji}</span> {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {trackArtists.length > 1 && (
            <section aria-labelledby="artists-heading">
              <h2 id="artists-heading" className="mb-3 text-lg font-bold">
                함께 연주한 음악가
              </h2>
              <ul className="flex flex-wrap gap-2">
                {trackArtists.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/jazz/artists/${a.slug}`}
                      className="inline-flex rounded-full border border-line px-3 py-1.5 text-xs text-subtle transition-colors hover:border-brass hover:text-brass"
                    >
                      {a.nameKo ?? a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
