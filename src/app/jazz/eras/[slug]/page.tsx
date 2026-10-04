import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { eras, eraMap } from "@/data/eras";
import { styleMap } from "@/data/styles";
import { trackMap } from "@/data/track-utils";
import { TrackGrid } from "@/components/tracks/TrackGrid";
import { EmptyState, SectionHeading } from "@/components/ui/index";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return eras.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const era = eraMap.get(slug);
  if (!era) return { title: "시대를 찾을 수 없습니다" };
  return {
    title: `${era.name}`,
    description: era.summary,
  };
}

export default async function EraDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const era = eraMap.get(slug);
  if (!era) notFound();

  const eraTracks = era.trackIds.map((id) => trackMap.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const eraStyles = era.styleIds.map((id) => styleMap.get(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold text-brass">{era.period}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{era.name}</h1>
        <p className="mt-3 leading-loose text-subtle">{era.summary}</p>
      </header>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="mb-3 text-lg font-bold">
          이 시대의 핵심
        </h2>
        <ul className="grid gap-2 sm:grid-cols-3">
          {era.keyFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2 rounded-xl border border-line bg-card p-4 text-sm text-subtle">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {eraStyles.length > 0 && (
        <section aria-labelledby="styles-heading">
          <h2 id="styles-heading" className="mb-3 text-lg font-bold">
            이 시대의 주요 스타일
          </h2>
          <ul className="flex flex-wrap gap-2">
            {eraStyles.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/jazz/styles/${s.slug}`}
                  className="inline-flex rounded-full border border-line bg-card px-3.5 py-2 text-sm text-subtle transition-colors hover:border-brass hover:text-brass"
                >
                  {s.nameKo} ({s.name})
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="tracks-heading">
        <SectionHeading title="이 시대의 대표곡" moreHref="/jazz/must-listen" moreLabel="전체 필수곡" />
        <h2 id="tracks-heading" className="sr-only">
          이 시대의 대표곡
        </h2>
        {eraTracks.length > 0 ? (
          <TrackGrid tracks={eraTracks} />
        ) : (
          <EmptyState
            title="아직 수록된 곡이 없어요"
            description="이 시대는 곧 큐레이션이 추가될 예정입니다. 다른 시대의 곡부터 들어보세요."
            actionHref="/jazz/must-listen"
            actionLabel="필수곡 보기"
          />
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/jazz/eras" className="text-sm font-medium text-brass hover:underline">
          ← 전체 시대 목록
        </Link>
        <Link href="/jazz/styles" className="text-sm font-medium text-subtle hover:text-brass">
          스타일별로 보기 →
        </Link>
      </div>
    </div>
  );
}
