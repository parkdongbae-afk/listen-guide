import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { MyNotesView } from "./view";

export const metadata: Metadata = {
  title: "나의 감상 기록",
  description: "가이드에서 저장한 감상 기록을 한곳에서 확인하세요.",
};

export default function NotesPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
          <PenLine className="h-3.5 w-3.5" aria-hidden />
          나의 감상 기록
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">내가 남긴 감상</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          가이드에서 저장한 감상 기록을 한곳에서 볼 수 있습니다. 기록은 이 브라우저에만 저장됩니다.
        </p>
      </header>
      <MyNotesView />
    </div>
  );
}
