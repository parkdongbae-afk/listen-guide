import type { Metadata } from "next";
import Link from "next/link";
import { searchAll, searchTypeLabel, suggestedSearches, type SearchResultType } from "@/lib/search";
import { SearchInput } from "./search-input";

export const metadata: Metadata = {
  title: "검색",
  description: "곡, 아티스트, 앨범, 스타일, 시대, 용어를 한글과 영문 모두로 검색하세요.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const results = searchAll(q);

  const grouped = new Map<SearchResultType, typeof results>();
  for (const item of results) {
    const list = grouped.get(item.type) ?? [];
    list.push(item);
    grouped.set(item.type, list);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">검색</h1>
      </header>

      <SearchInput initialQuery={q} />

      {!q && (
        <section aria-labelledby="suggest-heading">
          <h2 id="suggest-heading" className="mb-3 text-sm font-semibold text-subtle">
            추천 키워드
          </h2>
          <ul className="flex flex-wrap gap-2">
            {suggestedSearches.map((term) => (
              <li key={term}>
                <Link
                  href={`/jazz/search?q=${encodeURIComponent(term)}`}
                  className="inline-flex rounded-full border border-line bg-card px-3.5 py-2 text-sm text-subtle transition-colors hover:border-brass hover:text-brass"
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {q && results.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line bg-card/50 px-6 py-12 text-center">
          <p className="font-semibold text-ink">&lsquo;{q}&rsquo;에 대한 결과가 없어요</p>
          <p className="mt-2 text-sm text-subtle">추천 키워드로 다시 검색해 보세요.</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {suggestedSearches.slice(0, 5).map((term) => (
              <li key={term}>
                <Link
                  href={`/jazz/search?q=${encodeURIComponent(term)}`}
                  className="inline-flex rounded-full border border-line px-3 py-1.5 text-xs text-subtle hover:border-brass hover:text-brass"
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {q && results.length > 0 && (
        <div className="space-y-8">
          <p className="text-sm text-subtle" aria-live="polite">
            &lsquo;{q}&rsquo;에 대한 결과 {results.length}건
          </p>
          {[...grouped.entries()].map(([type, items]) => (
            <section key={type} aria-labelledby={`group-${type}`}>
              <h2 id={`group-${type}`} className="mb-2 text-sm font-bold text-brass">
                {searchTypeLabel(type)} ({items.length})
              </h2>
              <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
                {items.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    <Link href={item.href} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-card-hover">
                      <span className="rounded-full bg-brass-soft px-2 py-0.5 text-[11px] font-semibold text-brass">
                        {searchTypeLabel(item.type)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink">{item.title}</span>
                        <span className="block truncate text-xs text-subtle">{item.subtitle}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
