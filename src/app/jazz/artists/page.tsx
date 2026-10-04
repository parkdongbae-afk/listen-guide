import type { Metadata } from "next";
import { artists } from "@/data/artists";
import { instrumentMap } from "@/data/instruments";
import { ArtistFilter } from "./filter";

export const metadata: Metadata = {
  title: "아티스트",
  description: "재즈를 만든 거장들. 악기와 시대별로 아티스트를 탐색하고 대표곡부터 들어보세요.",
};

export default function ArtistsPage() {
  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">아티스트</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          재즈의 역사는 연주자들의 이야기입니다. 악기 필터로 원하는 소리를 가진 음악가를 찾아보세요.
        </p>
      </header>

      <ArtistFilter
        artists={artists.map((a) => ({
          id: a.id,
          slug: a.slug,
          name: a.name,
          nameKo: a.nameKo,
          shortBio: a.shortBio,
          instruments: a.primaryInstrumentIds
            .map((id) => instrumentMap.get(id)?.nameKo ?? id)
            .join(" · "),
        }))}
      />
    </div>
  );
}
