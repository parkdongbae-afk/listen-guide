"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import type { Track } from "@/types";
import { cn } from "@/lib/utils";

type Answers = {
  vocals: "yes" | "no" | null;
  energy: "calm" | "energetic" | null;
  flavor: "familiar" | "experimental" | null;
};

const calmMoodIds = ["relaxed-night", "cafe", "rainy-day", "melancholy", "late-night", "focus"];
const energeticMoodIds = ["energetic", "drive", "morning"];
const familiarStyleIds = ["vocal-jazz", "swing", "big-band", "cool-jazz", "bossa-nova"];
const experimentalStyleIds = ["modal-jazz", "free-jazz", "jazz-fusion", "bebop"];

const questions = [
  {
    key: "vocals" as const,
    question: "1. 보컬이 있는 음악을 원하시나요?",
    options: [
      { value: "yes" as const, label: "🎤 노래가 있는 곡" },
      { value: "no" as const, label: "🎷 연주곡이 좋아요" },
    ],
  },
  {
    key: "energy" as const,
    question: "2. 차분한 음악과 활기찬 음악 중 어느 쪽인가요?",
    options: [
      { value: "calm" as const, label: "🌙 차분한 음악" },
      { value: "energetic" as const, label: "🔥 활기찬 음악" },
    ],
  },
  {
    key: "flavor" as const,
    question: "3. 익숙한 멜로디와 실험적인 연주 중 어느 쪽인가요?",
    options: [
      { value: "familiar" as const, label: "🎵 익숙한 멜로디" },
      { value: "experimental" as const, label: "🧪 실험적인 연주" },
    ],
  },
];

/** 3단계 취향 찾기 퀴즈 → 3~5곡 추천 (jazz_do.MD §12) */
export function TasteFinder({ candidates }: { candidates: Track[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ vocals: null, energy: null, flavor: null });

  const results = useMemo(() => {
    if (step < questions.length) return null;
    const scored = candidates.map((track) => {
      let score = 0;
      const reasons: string[] = [];
      if (answers.vocals === "yes" && track.hasVocals) {
        score += 2;
        reasons.push("보컬이 있는 곡");
      }
      if (answers.vocals === "no" && !track.hasVocals) {
        score += 2;
        reasons.push("연주곡");
      }
      if (answers.energy === "calm" && track.moodIds.some((m) => calmMoodIds.includes(m))) {
        score += 1;
        reasons.push("차분한 분위기");
      }
      if (answers.energy === "energetic" && track.moodIds.some((m) => energeticMoodIds.includes(m))) {
        score += 1;
        reasons.push("활기찬 분위기");
      }
      if (answers.flavor === "familiar" && track.styleIds.some((s) => familiarStyleIds.includes(s))) {
        score += 1;
        reasons.push("익숙한 멜로디 계열");
      }
      if (answers.flavor === "experimental" && track.styleIds.some((s) => experimentalStyleIds.includes(s))) {
        score += 1;
        reasons.push("실험적인 연주 계열");
      }
      if (track.difficulty === "very-easy") score += 0.5;
      return { track, score, reasons };
    });
    return scored
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [answers, step, candidates]);

  const answer = (value: "yes" | "no" | "calm" | "energetic" | "familiar" | "experimental") => {
    const q = questions[step];
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({ vocals: null, energy: null, flavor: null });
    setStep(0);
  };

  return (
    <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-brass">
        <Sparkles className="h-4 w-4" aria-hidden />
        취향 찾기 · 3가지 질문으로 곡 추천받기
      </p>

      {results == null ? (
        <div>
          <div className="mb-3 flex gap-1.5" aria-hidden>
            {questions.map((_, i) => (
              <span
                key={i}
                className={cn("h-1.5 flex-1 rounded-full", i < step ? "bg-brass" : "bg-line")}
              />
            ))}
          </div>
          <p className="text-base font-bold text-ink" aria-live="polite">
            {questions[step].question}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            {questions[step].options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => answer(option.value)}
                className="flex-1 rounded-xl border border-line bg-bg px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brass hover:text-brass"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-base font-bold text-ink" aria-live="polite">
            취향에 맞는 곡을 골랐어요 ({results.length}곡)
          </p>
          <ul className="mt-3 space-y-2">
            {results.map(({ track, reasons }) => (
              <li key={track.id}>
                <Link
                  href={`/jazz/tracks/${track.slug}?play=1`}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3 transition-colors hover:border-brass"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink group-hover:text-brass">{track.title}</span>
                    <span className="block truncate text-xs text-subtle">
                      {track.primaryArtistName} · {reasons.join(", ")}{reasons.length > 0 ? " 곡이에요" : ""}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={restart}
            className="mt-4 text-sm font-medium text-brass hover:underline"
          >
            다시 찾아보기
          </button>
        </div>
      )}
    </div>
  );
}
