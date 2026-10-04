import type { Metadata } from "next";
import Link from "next/link";
import { CLASSIC_TRACKS, type ClassicalEra, type PerformanceForm } from "@/data/classicTracks";
import {
  classicEraLabels,
  classicEraOrder,
  classicFormLabels,
  classicDifficultyLabels,
} from "@/lib/classic";
import { cn } from "@/lib/utils";
import { ClassicWorkCard } from "@/components/guides/ClassicWorkCard";
import { EmptyState } from "@/components/ui/index";

export const metadata: Metadata = {
  title: "Classic Guide — 반드시 들어야 할 작품 목록",
  description: "클래식 입문 필수 31곡을 시대·편성·난이도별로 필터링해 감상하세요.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const pick = (params: Record<string, string | string[] | undefined>, key: string) => {
  const v = params[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
};

const eraKeys = Object.keys(classicEraLabels) as ClassicalEra[];
const formKeys = Object.keys(classicFormLabels) as PerformanceForm[];
const difficultyKeys = ["easy", "medium", "advanced"] as const;

export default async function ClassicWorksPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const era = pick(params, "era");
  const origin = pick(params, "origin");
  const form = pick(params, "form");
  const difficulty = pick(params, "difficulty");
  const sort = pick(params, "sort") ?? "course";

  let list = CLASSIC_TRACKS.filter((t) => {
    if (era && t.era !== era) return false;
    if (origin === "korean" && !t.isKorean) return false;
    if (origin === "international" && t.isKorean) return false;
    if (form && t.form !== form) return false;
    if (difficulty && t.difficulty !== difficulty) return false;
    return true;
  });

  list = [...list].sort((a, b) => {
    switch (sort) {
      case "era":
        return classicEraOrder.indexOf(a.era) - classicEraOrder.indexOf(b.era);
      case "title":
        return a.titleKo.localeCompare(b.titleKo, "ko");
      case "composer":
        return a.composerKo.localeCompare(b.composerKo, "ko");
      case "duration":
        return (a.durationSeconds ?? 99999) - (b.durationSeconds ?? 99999);
      default:
        return a.courseOrder - b.courseOrder;
    }
  });

  const filterGroups: { key: string; label: string; options: { value?: string; label: string }[] }[] = [
    {
      key: "era",
      label: "시대",
      options: eraKeys.map((k) => ({ value: k, label: classicEraLabels[k] })),
    },
    {
      key: "origin",
      label: "지역",
      options: [
        { value: "korean", label: "한국 클래식" },
        { value: "international", label: "해외" },
      ],
    },
    {
      key: "form",
      label: "편성",
      options: formKeys.map((k) => ({ value: k, label: classicFormLabels[k] })),
    },
    {
      key: "difficulty",
      label: "난이도",
      options: difficultyKeys.map((k) => ({ value: k, label: classicDifficultyLabels[k] })),
    },
  ];

  const buildHref = (key: string, value?: string) => {
    const next = new URLSearchParams();
    if (era && key !== "era") next.set("era", era);
    if (origin && key !== "origin") next.set("origin", origin);
    if (form && key !== "form") next.set("form", form);
    if (difficulty && key !== "difficulty") next.set("difficulty", difficulty);
    if (value) next.set(key, value);
    const qs = next.toString();
    return `/classic/works${qs ? `?${qs}` : ""}`;
  };

  const active = [era, origin, form, difficulty].filter(Boolean).length;
  const current = { era, origin, form, difficulty };

  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">반드시 들어야 할 작품</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          편집자의 입문 큐레이션 31곡입니다. 순위는 추천 순서일 뿐 절대적인 우열이 아닙니다.
        </p>
      </header>

      <div className="space-y-3 rounded-2xl border border-line bg-card p-4">
        {filterGroups.map((group) => (
          <div key={group.key} className="flex flex-wrap items-center gap-1.5">
            <span className="w-12 shrink-0 text-xs font-semibold text-subtle" aria-hidden>
              {group.label}
            </span>
            <div role="group" aria-label={`${group.label} 필터`} className="flex flex-wrap gap-1.5">
              {group.options.map((option) => {
                const isActive = current[group.key as keyof typeof current] === option.value;
                return (
                  <Link
                    key={option.label}
                    href={buildHref(group.key, isActive ? undefined : option.value)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition-colors",
                      isActive
                        ? "border-brass bg-brass-soft font-semibold text-brass"
                        : "border-line text-subtle hover:border-brass/50 hover:text-ink",
                    )}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
          <div className="flex items-center gap-2">
            <label htmlFor="classic-sort" className="text-xs font-semibold text-subtle">
              정렬
            </label>
            {(
              [
                ["course", "입문 추천순"],
                ["era", "시대순"],
                ["title", "작품명순"],
                ["composer", "작곡가순"],
                ["duration", "짧은 곡부터"],
              ] as const
            ).map(([value, label]) => {
              const isActive = sort === value;
              const next = new URLSearchParams();
              if (era) next.set("era", era);
              if (origin) next.set("origin", origin);
              if (form) next.set("form", form);
              if (difficulty) next.set("difficulty", difficulty);
              if (value !== "course") next.set("sort", value);
              const qs = next.toString();
              return (
                <Link
                  key={value}
                  href={`/classic/works${qs ? `?${qs}` : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs transition-colors",
                    isActive ? "bg-brass-soft font-semibold text-brass" : "text-subtle hover:text-ink",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          {active > 0 && (
            <Link href="/classic/works" className="rounded-full border border-line px-3 py-1.5 text-xs text-subtle hover:border-burgundy hover:text-burgundy">
              필터 초기화
            </Link>
          )}
        </div>
      </div>

      <p className="text-sm text-subtle" aria-live="polite">
        {list.length}곡{active > 0 && " (필터 적용됨)"}
      </p>

      {list.length === 0 ? (
        <EmptyState
          title="조건에 맞는 작품이 없어요"
          description="필터를 하나씩 풀어 보세요."
          actionHref="/classic/works"
          actionLabel="필터 초기화"
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((track) => (
            <li key={track.id}>
              <ClassicWorkCard track={track} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
