import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { styles, styleMap } from "@/data/styles";
import { trackMap } from "@/data/track-utils";
import { artistMap } from "@/data/artists";
import { instrumentMap } from "@/data/instruments";
import { TrackGrid } from "@/components/tracks/TrackGrid";
import { SectionHeading } from "@/components/ui/index";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return styles.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const style = styleMap.get(slug);
  if (!style) return { title: "스타일을 찾을 수 없습니다" };
  return {
    title: `${style.nameKo} (${style.name}) — 스타일 가이드와 대표곡`,
    description: style.definition,
  };
}

export default async function StyleDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const style = styleMap.get(slug);
  if (!style) notFound();

  const firstTracks = style.firstTrackIds.map((id) => trackMap.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const deepTracks = style.deepTrackIds.map((id) => trackMap.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const styleArtists = style.artistIds.map((id) => artistMap.get(id)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const styleInstruments = style.instrumentIds
    .map((id) => instrumentMap.get(id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const before = style.beforeStyleId ? styleMap.get(style.beforeStyleId) : undefined;
  const after = style.afterStyleId ? styleMap.get(style.afterStyleId) : undefined;

  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {style.nameKo} <span className="font-display text-xl text-subtle">{style.name}</span>
        </h1>
        <p className="mt-3 leading-loose text-subtle">{style.definition}</p>
        {style.firstTrackIds.length === 0 && (
          <p className="mt-2 text-xs text-subtle">
            ※ 이 스타일의 전용 수록곡은 준비 중입니다. 아래 &lsquo;더 깊게&rsquo; 곡들은 이 스타일로 이어지는 뿌리를 들을 수
            있습니다.
          </p>
        )}
      </header>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="mb-3 text-lg font-bold">
          핵심 특징 3가지
        </h2>
        <ul className="grid gap-2 sm:grid-cols-3">
          {style.keyFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2 rounded-xl border border-line bg-card p-4 text-sm text-subtle">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="instruments-heading">
        <h2 id="instruments-heading" className="mb-3 text-lg font-bold">
          대표 악기
        </h2>
        <ul className="flex flex-wrap gap-2">
          {styleInstruments.map((i) => (
            <li key={i.id} title={i.role}>
              <span className="inline-flex rounded-full border border-line bg-card px-3.5 py-2 text-sm text-subtle">
                {i.nameKo}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {firstTracks.length > 0 && (
        <section aria-labelledby="first-heading">
          <SectionHeading title="처음 들을 3곡" subtitle="이 스타일의 가장 친절한 얼굴들입니다." />
          <h2 id="first-heading" className="sr-only">
            처음 들을 3곡
          </h2>
          <TrackGrid tracks={firstTracks} />
        </section>
      )}

      {deepTracks.length > 0 && (
        <section aria-labelledby="deep-heading">
          <SectionHeading title="더 깊게 들을 곡" />
          <h2 id="deep-heading" className="sr-only">
            더 깊게 들을 곡
          </h2>
          <TrackGrid tracks={deepTracks} columns="4" />
        </section>
      )}

      {styleArtists.length > 0 && (
        <section aria-labelledby="artists-heading">
          <h2 id="artists-heading" className="mb-3 text-lg font-bold">
            대표 아티스트
          </h2>
          <ul className="flex flex-wrap gap-2">
            {styleArtists.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/jazz/artists/${a.slug}`}
                  className="inline-flex rounded-full border border-line bg-card px-3.5 py-2 text-sm text-subtle transition-colors hover:border-brass hover:text-brass"
                >
                  {a.nameKo ?? a.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="relation-heading" className="rounded-2xl border border-line bg-card p-5">
        <h2 id="relation-heading" className="text-sm font-bold text-brass">
          앞뒤 스타일과의 관계
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {before ? (
            <Link href={`/jazz/styles/${before.slug}`} className="rounded-full border border-line px-3 py-1.5 text-subtle transition-colors hover:border-brass hover:text-brass">
              ← {before.nameKo}
            </Link>
          ) : (
            <span className="rounded-full border border-dashed border-line px-3 py-1.5 text-subtle">재즈의 뿌리</span>
          )}
          <span aria-hidden className="text-brass">
            【 {style.nameKo} 】
          </span>
          {after ? (
            <Link href={`/jazz/styles/${after.slug}`} className="rounded-full border border-line px-3 py-1.5 text-subtle transition-colors hover:border-brass hover:text-brass">
              {after.nameKo} →
            </Link>
          ) : (
            <span className="rounded-full border border-dashed border-line px-3 py-1.5 text-subtle">계속 이어지는 흐름</span>
          )}
        </div>
      </section>

      <Link href="/jazz/styles" className="inline-block text-sm font-medium text-brass hover:underline">
        ← 전체 스타일 목록
      </Link>
    </div>
  );
}
