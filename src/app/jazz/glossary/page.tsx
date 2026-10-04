import type { Metadata } from "next";
import Link from "next/link";
import { glossary } from "@/data/glossary";
import { trackMap } from "@/data/track-utils";

export const metadata: Metadata = {
  title: "재즈 용어 사전",
  description: "스윙, 즉흥연주, 컴핑 등 재즈 용어를 초보자용으로 짧고 쉽게 설명합니다. 용어마다 들어볼 대표곡도 함께 제공합니다.",
};

export default function GlossaryPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">재즈 용어 사전</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          {glossary.length}개의 기본 용어를 짧고 쉽게 정리했습니다. 각 용어에는 &lsquo;이 용어를 들을 수 있는 대표곡&rsquo;이
          함께 있어 바로 귀로 확인할 수 있습니다.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {glossary.map((term) => (
          <li key={term.id} id={term.id} className="flex h-full scroll-mt-20 flex-col rounded-2xl border border-line bg-card p-5">
            <h2 className="text-base font-bold">
              {term.name}
              {term.nameEn && <span className="font-display ml-2 text-sm font-normal text-subtle">{term.nameEn}</span>}
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-ink">{term.oneLiner}</p>
            <p className="mt-2 text-sm leading-relaxed text-subtle">{term.more}</p>

            {term.exampleTrackIds.length > 0 && (
              <p className="mt-3 text-xs text-subtle">
                들어보기:{" "}
                {term.exampleTrackIds
                  .map((id) => trackMap.get(id))
                  .filter((t): t is NonNullable<typeof t> => Boolean(t))
                  .map((t, i) => (
                    <span key={t.id}>
                      {i > 0 && ", "}
                      <Link href={`/jazz/tracks/${t.slug}`} className="text-brass underline decoration-dotted underline-offset-2">
                        {t.title}
                      </Link>
                    </span>
                  ))}
              </p>
            )}

            {term.relatedTermIds.length > 0 && (
              <p className="mt-1.5 text-xs text-subtle">
                관련 용어:{" "}
                {term.relatedTermIds
                  .map((id) => glossary.find((g) => g.id === id))
                  .filter((g): g is NonNullable<typeof g> => Boolean(g))
                  .map((g, i) => (
                    <span key={g.id}>
                      {i > 0 && ", "}
                      <a href={`#${g.id}`} className="text-brass underline decoration-dotted underline-offset-2">
                        {g.name}
                      </a>
                    </span>
                  ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
