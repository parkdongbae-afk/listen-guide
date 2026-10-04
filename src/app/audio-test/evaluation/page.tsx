import type { Metadata } from "next";
import Link from "next/link";
import { audioCategoryLabels } from "@/lib/audioTest";

export const metadata: Metadata = {
  title: "Audio Test — 평가 항목 10개",
  description: "초저음부터 장시간 피로도까지, 오디오 장비를 점검하는 10개 평가 항목과 점검 질문.",
};

const evaluations = [
  {
    id: "sub-bass",
    questions: [
      "아주 낮은 저음이 존재감만 남기지 않고 음정과 질감을 유지하는가?",
      "볼륨을 과도하게 올리지 않아도 낮은 대역이 느껴지는가?",
      "진동감과 실제 음의 윤곽을 구분할 수 있는가?",
    ],
  },
  {
    id: "bass-control",
    questions: [
      "킥 드럼과 베이스가 서로 구분되는가?",
      "저음이 멈춰야 할 때 빠르게 멈추는가?",
      "저음이 보컬과 중음을 가리지 않는가?",
    ],
  },
  {
    id: "midrange",
    questions: [
      "목소리의 몸통과 발음이 자연스러운가?",
      "보컬이 너무 멀거나 과도하게 앞으로 나오지 않는가?",
      "남성·여성 보컬 모두 얇거나 답답하게 들리지 않는가?",
    ],
  },
  {
    id: "treble",
    questions: [
      "심벌과 현악기의 끝이 선명하지만 날카롭지 않은가?",
      "'ㅅ', 'ㅆ', 'ㅈ' 발음이 과도하게 튀지 않는가?",
      "고음이 밝은 것과 거칠거나 왜곡된 것을 구분할 수 있는가?",
    ],
  },
  {
    id: "imaging",
    questions: [
      "무대의 폭, 깊이, 높이가 자연스럽게 느껴지는가?",
      "중앙 보컬과 좌우 악기의 위치가 안정적인가?",
      "소리가 단순히 머리 바깥으로 넓기만 한 것이 아니라 위치를 구분할 수 있는가?",
    ],
  },
  {
    id: "detail",
    questions: [
      "작은 호흡, 잔향, 손가락 움직임 같은 세부가 들리는가?",
      "복잡한 구간에서도 악기들이 한 덩어리로 뭉치지 않는가?",
      "세부음이 과도하게 강조되어 부자연스럽지는 않은가?",
    ],
  },
  {
    id: "dynamics",
    questions: [
      "작은 소리와 큰 소리의 차이가 자연스럽게 표현되는가?",
      "드럼의 첫 타격이 둔하지 않은가?",
      "갑작스러운 합주에서도 압축되거나 답답해지지 않는가?",
    ],
  },
  {
    id: "transient",
    questions: [
      "짧고 빠른 타격음의 시작과 끝이 분명한가?",
      "빠른 베이스와 드럼이 흐릿하게 이어지지 않는가?",
      "리듬의 미세한 타이밍이 살아 있는가?",
    ],
  },
  {
    id: "timbre",
    questions: [
      "피아노, 기타, 현악기, 관악기의 고유한 질감이 납득 가능한가?",
      "특정 대역이 강조되어 모든 악기가 비슷한 색으로 들리지 않는가?",
      "오래 들어도 인위적인 강조가 피곤하지 않은가?",
    ],
  },
  {
    id: "comfort",
    questions: [
      "15~30분 감상 후 귀가 자극되거나 압박되는가?",
      "고음, 저음 또는 보컬 대역 중 특정 부분이 계속 신경 쓰이는가?",
      "편안한 음량에서도 음악의 핵심이 유지되는가?",
    ],
  },
] as const;

export default function AudioEvaluationPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">평가 항목 10개</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          각 항목은 1~5점과 메모로 기록합니다. 점수는 성능의 절대 순위가 아니라{" "}
          <strong className="font-semibold text-ink">동일 사용자의 비교 기록</strong>입니다. 한 번에 다 하지 말고
          궁금한 항목부터 시작하세요.
        </p>
      </header>

      <ol className="space-y-4">
        {evaluations.map((evaluation, index) => {
          const meta = audioCategoryLabels[evaluation.id];
          return (
            <li key={evaluation.id} id={evaluation.id} className="scroll-mt-24 rounded-2xl border border-line bg-card p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-bold">
                  {index + 1}. {meta.label}
                </h2>
                <Link href={`/audio-test/tracks?category=${evaluation.id}`} className="shrink-0 text-xs font-medium text-brass hover:underline">
                  테스트 곡 보기 →
                </Link>
              </div>
              <p className="mt-1 text-sm text-subtle">{meta.question}</p>
              <ul className="mt-3 space-y-1.5">
                {evaluation.questions.map((question) => (
                  <li key={question} className="flex items-start gap-2 text-sm leading-relaxed text-subtle">
                    <span aria-hidden className="text-brass">
                      ?
                    </span>
                    {question}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <section className="rounded-2xl border border-burgundy/40 bg-burgundy/10 p-5 text-sm leading-relaxed text-subtle">
        <p>테스트는 항상 편안한 음량에서. 볼륨을 올리는 것보다 같은 곡을 여러 장비에서 비교하는 편이 훨씬 많은 것을 알려 줍니다.</p>
      </section>
    </div>
  );
}
