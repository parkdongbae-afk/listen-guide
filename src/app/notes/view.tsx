"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useJazz } from "@/context/JazzContext";
import { resolveTrackMeta } from "@/lib/notes";
import { EmptyState } from "@/components/ui/index";
import { cn } from "@/lib/utils";
import type { GuideId } from "@/lib/guides";

const guideOrder: GuideId[] = ["jazz", "classic", "symphony", "audio-test"];
const guideLabels: Record<GuideId, string> = {
  jazz: "재즈",
  classic: "클래식",
  symphony: "교향곡",
  "audio-test": "오디오 테스트",
};

function Stars({ rating }: { rating: number }) {
  if (!rating) return null;
  return (
    <span className="text-brass" aria-label={`다시 듣고 싶은 정도 ${rating}점`}>
      {"★".repeat(rating)}
      <span className="text-line">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export function MyNotesView() {
  const { notes, deleteNote, hydrated } = useJazz();

  const entries = Object.entries(notes)
    .map(([key, note]) => {
      const [guideId, id] = key.split(":") as [GuideId, string];
      const meta = resolveTrackMeta(guideId, id);
      return { key, guideId, id, note, meta };
    })
    .filter((e) => e.meta)
    .sort((a, b) => (a.note.updatedAt < b.note.updatedAt ? 1 : -1));

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-2xl bg-card" aria-hidden />;
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        title="아직 감상 기록이 없어요"
        description="곡을 듣고 나서 감상 기록 폼에 짧게 남겨보세요. 기록은 이 브라우저에만 저장됩니다."
        actionHref="/guideline"
        actionLabel="감상 기록 방법 보기"
      />
    );
  }

  return (
    <div className="space-y-8">
      {guideOrder.map((guideId) => {
        const group = entries.filter((e) => e.guideId === guideId);
        if (group.length === 0) return null;
        return (
          <section key={guideId} aria-labelledby={`notes-${guideId}`}>
            <h2 id={`notes-${guideId}`} className="mb-3 text-lg font-bold">
              {guideLabels[guideId]}{" "}
              <span className="text-sm font-normal text-subtle">({group.length})</span>
            </h2>
            <ul className="space-y-3">
              {group.map(({ key, note, meta }) => (
                <li key={key} className="rounded-2xl border border-line bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link href={meta!.href} className="text-base font-bold transition-colors hover:text-brass">
                        {meta!.title}
                      </Link>
                      <span className="ml-2 text-sm text-subtle">{meta!.subtitle}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Stars rating={note.rating} />
                      <button
                        type="button"
                        onClick={() => deleteNote(key)}
                        aria-label={`${meta!.title} 감상 기록 삭제`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-subtle transition-colors hover:border-burgundy hover:text-burgundy"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                  </div>
                  <dl className={cn("mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2")}>
                    {note.instrument && (
                      <div>
                        <dt className="inline text-subtle">가장 인상적인 악기: </dt>
                        <dd className="inline text-ink">{note.instrument}</dd>
                      </div>
                    )}
                    {note.mood && (
                      <div>
                        <dt className="inline text-subtle">전체 분위기: </dt>
                        <dd className="inline text-ink">{note.mood}</dd>
                      </div>
                    )}
                    {note.moment && (
                      <div className="sm:col-span-2">
                        <dt className="inline text-subtle">기억에 남은 순간: </dt>
                        <dd className="inline text-ink">{note.moment}</dd>
                      </div>
                    )}
                    {note.line && (
                      <div className="sm:col-span-2">
                        <dt className="inline text-subtle">한 줄 감상: </dt>
                        <dd className="inline text-ink">{note.line}</dd>
                      </div>
                    )}
                  </dl>
                  <p className="mt-2 text-[11px] text-subtle">마지막 수정: {new Date(note.updatedAt).toLocaleDateString("ko-KR")}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

