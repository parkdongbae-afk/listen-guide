import { tracks } from "@/data/tracks";
import { artists } from "@/data/artists";
import { glossary } from "@/data/glossary";
import { styles } from "@/data/styles";
import { eras } from "@/data/eras";
import { moods } from "@/data/moods";
import { normalizeForSearch } from "@/lib/utils";

export type SearchResultType = "track" | "artist" | "glossary" | "style" | "era" | "mood";

export type SearchResult = {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  href: string;
};

const TYPE_LABELS: Record<SearchResultType, string> = {
  track: "곡",
  artist: "아티스트",
  glossary: "용어",
  style: "스타일",
  era: "시대",
  mood: "분위기",
};

export const searchTypeLabel = (t: SearchResultType) => TYPE_LABELS[t];

export function searchAll(query: string): SearchResult[] {
  const q = normalizeForSearch(query);
  if (!q) return [];
  const results: SearchResult[] = [];

  for (const t of tracks) {
    const haystack = normalizeForSearch(
      [t.title, t.titleKo ?? "", t.primaryArtistName, t.albumTitle ?? "", t.shortDescription].join(" "),
    );
    if (haystack.includes(q)) {
      results.push({
        type: "track",
        id: t.id,
        title: t.title,
        subtitle: `${t.primaryArtistName}${t.albumTitle ? ` · ${t.albumTitle}` : ""}`,
        href: `/jazz/tracks/${t.slug}`,
      });
    }
  }

  for (const a of artists) {
    const haystack = normalizeForSearch([a.name, a.nameKo ?? "", a.shortBio].join(" "));
    if (haystack.includes(q)) {
      results.push({ type: "artist", id: a.id, title: a.name, subtitle: a.nameKo ?? a.name, href: `/jazz/artists/${a.slug}` });
    }
  }

  for (const g of glossary) {
    const haystack = normalizeForSearch([g.name, g.nameEn ?? "", g.oneLiner].join(" "));
    if (haystack.includes(q)) {
      results.push({ type: "glossary", id: g.id, title: g.name, subtitle: g.oneLiner, href: `/jazz/glossary#${g.id}` });
    }
  }

  for (const st of styles) {
    const haystack = normalizeForSearch([st.name, st.nameKo, st.definition].join(" "));
    if (haystack.includes(q)) {
      results.push({ type: "style", id: st.id, title: st.nameKo, subtitle: st.name, href: `/jazz/styles/${st.slug}` });
    }
  }

  for (const e of eras) {
    if (normalizeForSearch([e.name, e.period, e.summary].join(" ")).includes(q)) {
      results.push({ type: "era", id: e.id, title: e.name, subtitle: e.period, href: `/jazz/eras/${e.slug}` });
    }
  }

  for (const m of moods) {
    if (normalizeForSearch([m.label, m.description].join(" ")).includes(q)) {
      results.push({ type: "mood", id: m.id, title: m.label, subtitle: m.description, href: `/jazz/moods/${m.slug}` });
    }
  }

  return results;
}

/** 검색어가 비었을 때 추천 키워드 */
export const suggestedSearches = [
  "마일스 데이비스",
  "Take Five",
  "보컬 재즈",
  "스윙",
  "모달 재즈",
  "엘라 피츠제럴드",
  "보사노바",
  "즉흥연주",
];
