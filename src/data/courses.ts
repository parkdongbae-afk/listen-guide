import type { Course } from "@/types";

export const courses: Course[] = [
  {
    id: "30min",
    slug: "30min",
    title: "30분 입문 코스",
    subtitle: "다섯 곡으로 재즈의 큰 그림 보기",
    description:
      "재즈의 대표적인 다섯 얼굴 — 보컬, 쿨 재즈, 스윙, 하드 밥, 모달 재즈 — 을 곡마다 한 곡씩 들어봅니다. 각 단계에서 짧은 설명이 곡을 안내합니다.",
    estimatedMinutes: 30,
    steps: [
      {
        key: "step-1-vocal",
        title: "보컬 재즈",
        description: "노래하는 목소리가 하나의 악기가 되는 순간부터 시작합니다. 가장 친숙한 목소리로 재즈의 문을 엽니다.",
        trackId: "what-a-wonderful-world",
      },
      {
        key: "step-2-cool",
        title: "쿨 재즈",
        description: "여백과 담백한 음색으로 만드는 차분한 재즈. 5박자 리듬이 왜 어색하지 않은지 느껴 봅니다.",
        trackId: "take-five",
      },
      {
        key: "step-3-swing",
        title: "스윙",
        description: "재즈의 뿌리이자 가장 신나는 리듬. 빅밴드의 화력 속에서 스윙 감각을 몸으로 익힙니다.",
        trackId: "sing-sing-sing",
      },
      {
        key: "step-4-hardbop",
        title: "하드 밥",
        description: "블루스의 열기와 강한 그루브. 질문과 대답 구조를 들으며 재즈의 뜨거운 얼굴을 만납니다.",
        trackId: "moanin",
      },
      {
        key: "step-5-modal",
        title: "모달 재즈",
        description: "코드가 아닌 분위기 위에서 노래하는 즉흥연주. 여백이 만드는 강렬함을 경험합니다.",
        trackId: "so-what",
      },
    ],
  },
  {
    id: "7days",
    slug: "7days",
    title: "7일 입문 코스",
    subtitle: "일주일에 하나씩, 재즈 지도 그리기",
    description:
      "매일 한 곡씩 일주일 동안 재즈의 큰 지도를 그립니다. 익숙한 멜로디에서 시작해 스윙, 보컬, 블루스, 비밥, 모달, 현대 재즈까지 확장합니다.",
    dayLabel: "일",
    steps: [
      {
        key: "day-1",
        title: "1일차: 익숙한 멜로디",
        description: "전 세계가 사랑하는 노래로 시작합니다. 재즈가 낯설지 않다는 것부터 확인해 봅니다.",
        trackId: "what-a-wonderful-world",
      },
      {
        key: "day-2",
        title: "2일차: 스윙 리듬",
        description: "박을 튕겨 올리는 스윙 감각. 빅밴드의 에너지를 몸으로 느껴 봅니다.",
        trackId: "sing-sing-sing",
      },
      {
        key: "day-3",
        title: "3일차: 보컬 재즈",
        description: "남녀 보컬이 주고받는 대화. 목소리가 악기가 되는 순간을 들어 봅니다.",
        trackId: "cheek-to-cheek",
      },
      {
        key: "day-4",
        title: "4일차: 블루스와 재즈",
        description: "재즈의 어머니인 블루스. 단순한 멜로디가 어떻게 무한히 확장되는지 확인합니다.",
        trackId: "c-jam-blues",
      },
      {
        key: "day-5",
        title: "5일차: 비밥과 빠른 즉흥연주",
        description: "재즈 기술의 정점, 비밥. 빠른 손가락 뒤에 숨은 논리를 따라가 봅니다.",
        trackId: "ko-ko",
      },
      {
        key: "day-6",
        title: "6일차: 쿨 재즈와 모달 재즈",
        description: "여백의 미학. 연주자들이 같은 분위기 안에서 서로 다른 문장을 만들어 냅니다.",
        trackId: "so-what",
      },
      {
        key: "day-7",
        title: "7일차: 현대 재즈로 확장",
        description: "일렉트릭 사운드와 만난 1970년대 퓨전. 재즈가 지금도 살아 있음을 확인합니다.",
        trackId: "birdland",
      },
    ],
  },
];

export const courseMap = new Map(courses.map((c) => [c.id, c]));
