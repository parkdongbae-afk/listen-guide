import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guides } from "@/lib/guides";

export default function HubPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-12 sm:px-10 sm:py-16">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-burgundy/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            음악 감상 가이드 모음
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            오늘은 어떤 음악과
            <br />
            시작해 볼까요?
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-subtle sm:text-lg">
            어려운 이론보다 좋은 한 곡부터. 가이드를 선택하면 대표곡 감상, 쉬운 설명, 감상 포인트가 이어집니다.
          </p>
        </div>
      </section>

      <section aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="sr-only">
          가이드 선택
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.id}>
              <Link
                href={guide.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-200 hover:-translate-y-1 hover:border-brass/60"
              >
                <div className={guide.gradient + " relative h-28 w-full"} aria-hidden>
                  <span className="font-display absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/40">
                    {guide.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">
                      {guide.nameKo}
                      <span className="font-display ml-2 text-sm font-normal text-subtle">{guide.tagline}</span>
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-brass" aria-hidden />
                  </div>
                  <p className="text-sm leading-relaxed text-subtle">{guide.description}</p>
                  <ul className="mt-1 space-y-1">
                    {guide.highlights.map((h) => (
                      <li key={h} className="text-xs text-subtle">
                        · {h}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-2 text-xs font-semibold text-brass">{guide.count}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="menu-extra-heading">
        <h2 id="menu-extra-heading" className="mb-4 text-xl font-bold">
          나의 감상을 남기고 싶다면
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              href="/notes"
              className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
            >
              <h3 className="text-lg font-bold">나의 감상 기록</h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                모든 가이드의 곡 상세 페이지에서 감상 기록(인상적인 악기·분위기·별점·한 줄 감상)을 남기고, 여기서 한눈에
                모아볼 수 있습니다.
              </p>
              <span className="mt-3 text-xs font-semibold text-brass">기록 모아보기 →</span>
            </Link>
          </li>
          <li>
            <Link
              href="/guideline"
              className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brass"
            >
              <h3 className="text-lg font-bold">감상 가이드라인</h3>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                세 가지 음악의 입문 순서, 감상 질문, 4주 입문 코스, 감상 기록 방법까지 — 처음 듣는 사람을 위한 안내서.
              </p>
              <span className="mt-3 text-xs font-semibold text-brass">가이드라인 읽기 →</span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
        <h2 className="text-lg font-bold">가이드 공통 약속</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-subtle sm:grid-cols-2">
          <li>· 모든 설명은 전문용어 없이, 처음 듣는 사람 기준으로 작성했습니다.</li>
          <li>· 영상은 YouTube 공식 임베드로만 제공하며 검증 전 곡은 안전한 검색 링크를 안내합니다.</li>
          <li>· 찜·감상 기록은 이 브라우저에만 저장되고 서버로 전송되지 않습니다.</li>
          <li>· 큐레이션은 편집자의 추천 순서일 뿐 절대적인 우열이 아닙니다.</li>
        </ul>
      </section>
    </div>
  );
}
