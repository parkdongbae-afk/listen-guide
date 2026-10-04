import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, artistMap } from "@/data/artists";
import { styleMap } from "@/data/styles";
import { trackMap } from "@/data/track-utils";
import { instrumentMap } from "@/data/instruments";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const artist = artistMap.get(slug);
  if (!artist) return { title: "아티스트를 찾을 수 없습니다" };
  return {
    title: `${artist.nameKo ?? artist.name} — 재즈 아티스트 가이드`,
    description: artist.shortBio,
  };
}

export default async function ArtistDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const artist = artistMap.get(slug);
  if (!artist) notFound();

  const firstTracks = artist.firstTrackIds.map((id) => trackMap.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const keyTracks = artist.keyTrackIds.map((id) => trackMap.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const artistStyles = artist.styleIds.map((id) => styleMap.get(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const artistInstruments = artist.primaryInstrumentIds
    .map((id) => instrumentMap.get(id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          aria-hidden
          className="font-display flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-burgundy/70 to-brass/50 text-3xl font-bold text-bg"
        >
          {(artist.nameKo ?? artist.name).charAt(0)}
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{artist.nameKo ?? artist.name}</h1>
          <p className="font-display text-base text-subtle">{artist.name}</p>
          <p className="mt-2 max-w-xl leading-relaxed text-subtle">{artist.shortBio}</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-subtle">
            <li>
              활동 시기:{" "}
              {artist.birthYear
                ? `${artist.birthYear}~${artist.deathYear ?? ""}${artist.deathYear ? "" : " (활동 중)"}`
                : "정보 준비 중"}
            </li>
            <li>대표 악기: {artistInstruments.map((i) => i.nameKo).join(" · ")}</li>
            <li>
              관련 스타일:{" "}
              {artistStyles.map((s, i) => (
                <span key={s.id}>
                  {i > 0 && ", "}
                  <Link href={`/jazz/styles/${s.slug}`} className="transition-colors hover:text-brass">
                    {s.nameKo}
                  </Link>
                </span>
              ))}
            </li>
          </ul>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-8">
          <section aria-labelledby="bio-heading">
            <h2 id="bio-heading" className="mb-3 text-lg font-bold">
              아티스트 소개
            </h2>
            <p className="max-w-[65ch] leading-loose text-subtle">{artist.biography}</p>
          </section>

          <section aria-labelledby="traits-heading">
            <h2 id="traits-heading" className="mb-3 text-lg font-bold">
              음악적 특징
            </h2>
            <ul className="grid gap-2">
              {artist.musicalTraits.map((trait) => (
                <li key={trait} className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-subtle">
                  {trait}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="listen-order-heading">
            <h2 id="listen-order-heading" className="mb-3 text-lg font-bold">
              입문자에게 추천하는 감상 순서
            </h2>
            <ol className="space-y-2">
              {firstTracks.map((track, i) => (
                <li key={track.id} className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3">
                  <span aria-hidden className="font-display text-lg font-bold text-brass">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <Link href={`/jazz/tracks/${track.slug}`} className="text-sm font-bold transition-colors hover:text-brass">
                      {track.title}
                    </Link>
                    <span className="block text-xs text-subtle">{track.primaryArtistName}</span>
                  </span>
                  <Link
                    href={`/jazz/tracks/${track.slug}?play=1`}
                    className="shrink-0 text-xs font-semibold text-brass hover:underline"
                  >
                    바로 듣기 →
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-8">
          {keyTracks.length > 0 && (
            <section aria-labelledby="key-tracks-heading" className="rounded-2xl border border-brass/40 bg-brass-soft/50 p-5">
              <h2 id="key-tracks-heading" className="text-sm font-bold text-brass">
                YouTube에서 바로 듣기
              </h2>
              <ul className="mt-2 space-y-1.5">
                {keyTracks.map((track) => (
                  <li key={track.id}>
                    <Link href={`/jazz/tracks/${track.slug}?play=1`} className="text-sm font-semibold hover:underline">
                      {track.title} — {track.primaryArtistName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="albums-heading">
            <h2 id="albums-heading" className="mb-3 text-lg font-bold">
              대표 앨범
            </h2>
            <ul className="space-y-2">
              {artist.keyAlbums.map((album) => (
                <li key={album} className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-subtle">
                  {album}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="collab-heading">
            <h2 id="collab-heading" className="mb-3 text-lg font-bold">
              함께 연주한 주요 음악가
            </h2>
            <ul className="flex flex-wrap gap-2">
              {artist.collaborators.map((c) => (
                <li key={c} className="rounded-full border border-line px-3 py-1.5 text-xs text-subtle">
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="source-heading">
            <h2 id="source-heading" className="mb-3 text-lg font-bold">
              출처
            </h2>
            <ul className="space-y-1.5 text-xs text-subtle">
              {artist.sources.map((source) => (
                <li key={source.url}>
                  ·{" "}
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-brass">
                    {source.title}
                  </a>
                  {source.publisher && ` — ${source.publisher}`}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <Link href="/jazz/artists" className="inline-block text-sm font-medium text-brass hover:underline">
        ← 전체 아티스트 목록
      </Link>
    </div>
  );
}
