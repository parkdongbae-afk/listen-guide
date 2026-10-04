import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { moods, moodMap } from "@/data/moods";
import { trackMap } from "@/data/track-utils";
import { TrackGrid } from "@/components/tracks/TrackGrid";
import { EmptyState } from "@/components/ui/index";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return moods.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const mood = moodMap.get(slug);
  if (!mood) return { title: "분위기를 찾을 수 없습니다" };
  return {
    title: `${mood.label} — 기분으로 고르는 재즈`,
    description: mood.description,
  };
}

export default async function MoodDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const mood = moodMap.get(slug);
  if (!mood) notFound();

  const moodTracks = [...trackMap.values()].filter((t) => t.moodIds.includes(mood.id));

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <span aria-hidden className="text-4xl">
          {mood.emoji}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{mood.label}</h1>
        <p className="mt-2 leading-relaxed text-subtle">{mood.description}</p>
      </header>

      {moodTracks.length > 0 ? (
        <TrackGrid tracks={moodTracks} />
      ) : (
        <EmptyState
          title="아직 이 분위기의 곡이 없어요"
          description="다른 분위기를 둘러보세요. 취향 찾기 퀴즈로 곡을 추천받을 수도 있습니다."
          actionHref="/jazz/moods"
          actionLabel="다른 분위기 보기"
        />
      )}

      <Link href="/jazz/moods" className="inline-block text-sm font-medium text-brass hover:underline">
        ← 전체 분위기 목록
      </Link>
    </div>
  );
}
