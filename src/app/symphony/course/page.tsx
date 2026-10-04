import type { Metadata } from "next";
import { CourseProgressRing } from "@/components/guides/CourseProgressRing";
import { GuideCourseStep } from "@/components/guides/GuideCourseStep";
import { symphonyList } from "@/lib/symphony";

export const metadata: Metadata = {
  title: "Symphony Guide — 7일 입문 코스",
  description: "일주일 동안 하루 한 악장씩. 교향곡 입문을 위한 7일 코스입니다.",
};

const COURSE_ID = "symphony-7days";

const steps = [
  {
    key: "day-1",
    symphonyId: "beethoven-symphony-5",
    title: "1일차 — 네 음의 동기",
    description: "베토벤 교향곡 5번. 세상에서 가장 유명한 네 음이 작품 전체를 이끄는 과정을 따라가 봅니다.",
    start: "1악장",
  },
  {
    key: "day-2",
    symphonyId: "dvorak-symphony-9",
    title: "2일차 — 넓고 외로운 선율",
    description: "드보르자크 9번 '신세계로부터'. 잉글리시 호른이 노래하는 유명한 2악장부터 듣습니다.",
    start: "2악장",
  },
  {
    key: "day-3",
    symphonyId: "mozart-symphony-40",
    title: "3일차 — 불안한 우아함",
    description: "모차르트 40번. 불안하게 달리는 첫 주제가 고전주의의 균형 위를 걷는 방식을 들어봅니다.",
    start: "1악장",
  },
  {
    key: "day-4",
    symphonyId: "haydn-symphony-94",
    title: "4일차 — 조용하다가, 쿵",
    description: "하이든 94번 '놀람'. 조용한 주제를 듣다가 갑작스러운 강한 화음에 놀라는 경험을 합니다.",
    start: "2악장",
  },
  {
    key: "day-5",
    symphonyId: "schubert-symphony-8",
    title: "5일차 — 노래하는 미완성",
    description: "슈베르트 8번 '미완성'. 어두운 도입 뒤 이어지는 길고 노래하는 선율에 집중합니다.",
    start: "1악장",
  },
  {
    key: "day-6",
    symphonyId: "brahms-symphony-1",
    title: "6일차 — 긴 긴장의 결실",
    description: "브람스 1번. 4악장에서 긴 긴장 뒤 펼쳐지는 넓은 주제가 보상으로 돌아옵니다.",
    start: "4악장",
  },
  {
    key: "day-7",
    symphonyId: "tchaikovsky-symphony-6",
    title: "7일차 — 서정과 환희로 마무리",
    description: "차이콥스키 5번 2악장의 서정으로 하루를 열고, 베토벤 9번 4악장 '환희'로 일주일을 마무리합니다.",
    start: "2악장",
  },
];

export default function SymphonyCoursePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
            입문 코스
          </p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">7일 입문 코스</h1>
          <p className="mt-2 text-sm leading-relaxed text-subtle">
            매일 추천 악장 하나씩. 일주일이면 교향곡의 다양한 얼굴을 모두 만나게 됩니다. 체크한 진도는 이 브라우저에
            저장됩니다.
          </p>
        </div>
        <CourseProgressRing courseId={COURSE_ID} total={steps.length} size={72} />
      </header>

      <ol className="space-y-4">
        {steps.map((step, index) => {
          const symphony = symphonyList.find((s) => s.id === step.symphonyId);
          return (
            <li key={step.key}>
              <GuideCourseStep
                courseId={COURSE_ID}
                stepKey={step.key}
                stepLabel={`DAY ${index + 1}`}
                stepTitle={step.title}
                stepDescription={step.description}
                href={`/symphony/symphonies/${step.symphonyId}`}
                linkLabel={`${symphony?.titleKo ?? ""} 악장 지도로`}
              />
            </li>
          );
        })}
      </ol>

      <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
        추천 악장은 교향곡 상세 페이지의 &lsquo;악장 지도&rsquo;에서 바로 이동할 수 있습니다. 악장 시작 시간은 추정치이므로
        살짝 어긋날 수 있습니다.
      </div>
    </div>
  );
}
