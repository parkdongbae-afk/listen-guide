import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, GraduationCap } from "lucide-react";
import { courses } from "@/data/courses";
import { SectionHeading } from "@/components/ui/index";
import { CourseCard } from "@/components/courses/CourseCard";

export const metadata: Metadata = {
  title: "처음이라면 — 재즈 입문 가이드",
  description:
    "재즈가 처음인 사람을 위한 안내. 30분 코스와 7일 코스, 그리고 꼭 알아두면 좋은 기초 개념을 쉽게 설명합니다.",
};

const articles: { title: string; answer: string }[] = [
  {
    title: "재즈는 왜 연주할 때마다 다르게 들릴까?",
    answer:
      "재즈의 중심에는 즉흥연주가 있습니다. 곡의 뼈대(주제 멜로디와 화음 진행)는 정해져 있지만, 그 위에 얹는 솔로는 연주하는 순간순간 새로 만들어집니다. 같은 곡을 다른 날 다른 무대에서 들으면 전혀 다른 곡처럼 들리는 이유입니다.",
  },
  {
    title: "스윙이란 무엇일까?",
    answer:
      "스윙은 박을 똑같이 나누지 않고 첫 박을 길게, 둘째 박을 짧게 눌러 연주하는 리듬 감각입니다. 악보에는 같은 8분음표처럼 적히지만 실제로는 통통 튀듯 흔들리는데, 이 미묘한 비대칭이 재즈 특유의 걸으면서 춤추는 느낌을 만듭니다.",
  },
  {
    title: "즉흥연주는 아무렇게나 연주하는 것일까?",
    answer:
      "아니요. 즉흥연주는 정해 둔 코드와 음계라는 놀이터 안에서 하는 창작입니다. 경험 많은 연주자일수록 그 규칙을 깊이 알고 있으며, 그 안에서 매번 새로운 문장을 만들어 냅니다. 말로 치면 '주어진 주제로 이야기하기'에 가깝습니다.",
  },
  {
    title: "재즈 밴드의 악기 구성",
    answer:
      "기본적으로 리듬 섹션(피아노, 베이스, 드럼)과 멜로디 악기(트럼펫, 색소폰 등)로 나뉩니다. 리듬 섹션은 곡의 바닥과 화음을 받치고, 멜로디 악기가 주제와 솔로를 노래합니다. 빅밴드는 여기에 트롬본 등 10여 명 이상이 더해진 대형 편성입니다.",
  },
  {
    title: "멜로디, 솔로, 컴핑, 리듬 섹션 구분하기",
    answer:
      "멜로디는 곡의 얼굴이 되는 주제선율, 솔로는 한 연주자가 즉흥으로 만드는 구간, 컴핑은 솔로 뒤에서 화음과 리듬으로 받쳐 주는 반주, 리듬 섹션은 베이스와 드럼 등 곡의 엔진입니다. 처음에는 '지금 누가 주인공인가'를 따져 들으면 구조가 보입니다.",
  },
  {
    title: "박수는 언제 쳐야 할까?",
    answer:
      "솔로가 끝나고 주제 멜로디가 돌아왔을 때가 가장 안전한 타이밍입니다. 잘 모르겠다면 치지 않아도 전혀 문제없습니다. 공연에서는 연주자가 명확하게 곡을 끝냈을 때 박수를 치면 됩니다.",
  },
  {
    title: "재즈 공연을 처음 보러 갈 때 알아둘 점",
    answer:
      "연주 중에는 조용히 듣는 것이 기본이지만, 마음에 드는 솔로가 끝나면 가볍게 박수를 보내는 건 자연스러운 문화입니다. 클럽 공연은 무대가 가까우니 음료를 주문하며 편하게 즐기면 됩니다. 재즈 감상에 정답을 강요하는 분위기는 없습니다.",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
          <Compass className="h-3.5 w-3.5" aria-hidden />
          입문 가이드
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">처음이라면</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          이론을 다 외울 필요는 없습니다. 궁금증 하나, 좋은 곡 한 개면 충분합니다. 아래 개념 카드와 입문 코스로 가볍게
          시작해 보세요.
        </p>
      </header>

      {/* 입문 코스 */}
      <section id="courses" aria-labelledby="courses-heading">
        <SectionHeading title="입문 코스" subtitle="정해진 순서대로 곡을 따라가며 재즈 지도를 그려보세요." />
        <h2 id="courses-heading" className="sr-only">
          입문 코스
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>

      {/* 기초 개념 카드 */}
      <section aria-labelledby="basics-heading">
        <SectionHeading title="알아두면 좋은 기초 개념" subtitle="궁금했던 질문에 짧게 답했습니다." moreHref="/jazz/glossary" moreLabel="용어 사전" />
        <h2 id="basics-heading" className="sr-only">
          기초 개념
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.title} className="flex h-full flex-col rounded-2xl border border-line bg-card p-5">
              <h3 className="flex items-start gap-2 text-sm font-bold leading-snug">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden />
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-subtle">{article.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <GraduationCap className="h-5 w-5 text-brass" aria-hidden />
          바로 들어보고 싶다면
        </h2>
        <p className="mt-2 text-sm text-subtle">설명보다 음악이 먼저입니다. 입문 필수 10곡부터 시작해 보세요.</p>
        <Link
          href="/jazz/must-listen"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
        >
          반드시 들어야 할 곡 보기
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
