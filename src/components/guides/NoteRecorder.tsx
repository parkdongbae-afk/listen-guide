"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PenLine, Save, Trash2 } from "lucide-react";
import { useJazz } from "@/context/JazzContext";
import { cn } from "@/lib/utils";

type Props = {
  guideId: "jazz" | "classic" | "symphony" | "audio-test";
  trackId: string;
};

const RATING_LABELS = ["전혀 아니다", "★", "★★", "★★★", "★★★★", "★★★★★ (다시 듣고 싶다)"];

/**
 * 곡 감상 기록 폼 — guideline.MD §6 템플릿(인상적인 악기/분위기/기억에 남는 순간/별점/한 줄 감상).
 * 브라우저 localStorage에만 저장된다.
 */
export function NoteRecorder({ guideId, trackId }: Props) {
  const { notes, saveNote, deleteNote, hydrated } = useJazz();
  const key = `${guideId}:${trackId}`;
  const existing = hydrated ? notes[key] : undefined;

  const [instrument, setInstrument] = useState("");
  const [mood, setMood] = useState("");
  const [moment, setMoment] = useState("");
  const [rating, setRating] = useState(0);
  const [line, setLine] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (existing) {
      setInstrument(existing.instrument);
      setMood(existing.mood);
      setMoment(existing.moment);
      setRating(existing.rating);
      setLine(existing.line);
      setSavedAt(new Date(existing.updatedAt).toLocaleDateString("ko-KR"));
    } else {
      setInstrument("");
      setMood("");
      setMoment("");
      setRating(0);
      setLine("");
      setSavedAt(null);
    }
  }, [key, existing]);

  const handleSave = () => {
    if (!instrument && !mood && !moment && !line && rating === 0) return;
    saveNote(key, { instrument, mood, moment, rating, line });
    setSavedAt(new Date().toLocaleDateString("ko-KR"));
  };

  const handleDelete = () => {
    deleteNote(key);
    setInstrument("");
    setMood("");
    setMoment("");
    setRating(0);
    setLine("");
    setSavedAt(null);
  };

  return (
    <section aria-labelledby="note-heading" className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 id="note-heading" className="flex items-center gap-2 text-lg font-bold">
          <PenLine className="h-5 w-5 text-brass" aria-hidden />
          감상 기록
        </h2>
        <Link href="/guideline#감상-기록-방법" className="text-xs text-subtle underline decoration-dotted underline-offset-2 hover:text-brass">
          기록 방법
        </Link>
      </div>
      <p className="mt-1 text-xs text-subtle">정답은 없습니다. 들은 대로 짧게 남겨보세요. (이 브라우저에만 저장)</p>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-subtle">가장 인상적인 악기</span>
          <input
            type="text"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            placeholder="예: 트럼펫, 첼로"
            className="h-10 w-full rounded-xl border border-line bg-bg px-3 text-sm text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-subtle">전체 분위기</span>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="예: 차분하지만 긴장감이 있음"
            className="h-10 w-full rounded-xl border border-line bg-bg px-3 text-sm text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-subtle">기억에 남은 순간</span>
          <input
            type="text"
            value={moment}
            onChange={(e) => setMoment(e.target.value)}
            placeholder="예: 솔로가 시작되는 부분"
            className="h-10 w-full rounded-xl border border-line bg-bg px-3 text-sm text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
          />
        </label>
        <fieldset>
          <legend className="mb-1 block text-xs font-semibold text-subtle">다시 듣고 싶은 정도</legend>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="다시 듣고 싶은 정도">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                onClick={() => setRating(rating === value ? 0 : value)}
                title={RATING_LABELS[value]}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  rating === value
                    ? "border-brass bg-brass-soft font-semibold text-brass"
                    : "border-line text-subtle hover:border-brass/50",
                )}
              >
                {"★".repeat(value)}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-subtle">한 줄 감상</span>
          <input
            type="text"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            placeholder="예: 악기들이 여유롭게 대화하는 느낌이었다."
            className="h-10 w-full rounded-xl border border-line bg-bg px-3 text-sm text-ink placeholder:text-subtle focus:border-brass focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-full bg-brass px-4 py-2 text-sm font-bold text-bg transition-transform hover:scale-[1.02]"
        >
          <Save className="h-4 w-4" aria-hidden />
          기록 저장
        </button>
        {existing && (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-full border border-burgundy px-4 py-2 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-white"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            삭제
          </button>
        )}
        {savedAt && (
          <span className="text-xs text-subtle" aria-live="polite">
            저장됨 · {savedAt}
          </span>
        )}
      </div>
    </section>
  );
}
