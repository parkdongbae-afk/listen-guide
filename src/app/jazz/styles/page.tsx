import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { styles } from "@/data/styles";

export const metadata: Metadata = {
  title: "스타일별 재즈",
  description: "스윙, 비밥, 쿨 재즈, 모달 재즈 등 재즈의 주요 스타일을 쉬운 설명과 대표곡으로 만나보세요.",
};

export default function StylesPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">스타일별 재즈</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          같은 시대에도 여러 스타일이 공존했습니다. 스타일은 재즈의 &lsquo;말투&rsquo;와 같아서, 좋아하는 말투를 찾으면
          다음에 들을 곡이 저절로 정해집니다.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {styles.map((style) => (
          <li key={style.id}>
            <Link
              href={`/jazz/styles/${style.slug}`}
              className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold">{style.nameKo}</h2>
                <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              </div>
              <p className="text-xs font-medium text-brass">{style.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-subtle">{style.definition}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
