import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { eras } from "@/data/eras";

export const metadata: Metadata = {
  title: "시대별 재즈",
  description: "재즈의 뿌리부터 현대 재즈까지, 100년의 흐름을 시대별로 살펴보고 대표곡을 바로 들어보세요.",
};

export default function ErasPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">시대별 재즈</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          재즈는 100년 넘게 계속 변해왔습니다. 시대의 흐름을 따라가면 어떤 곡이 왜 중요한지 자연스럽게 보입니다.
          시대와 스타일은 비슷해 보이지만 다른 개념입니다 — 시대는 &lsquo;언제&rsquo;, 스타일은 &lsquo;어떻게&rsquo;입니다.
        </p>
      </header>

      <ol className="relative space-y-4 border-l border-line pl-6">
        {eras.map((era) => (
          <li key={era.id} className="relative">
            <span aria-hidden className="absolute -left-[30px] top-3 h-3 w-3 rounded-full border-2 border-brass bg-bg" />
            <Link
              href={`/jazz/eras/${era.slug}`}
              className="block rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold">{era.name}</h2>
                <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              </div>
              <p className="mt-0.5 text-xs font-medium text-brass">{era.period}</p>
              <p className="mt-2 text-sm leading-relaxed text-subtle">{era.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
