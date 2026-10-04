export type GuideId = "jazz" | "classic" | "symphony" | "audio-test";

export interface GuideMeta {
  id: GuideId;
  name: string;
  nameKo: string;
  tagline: string;
  description: string;
  href: string;
  gradient: string;
  count: string;
  highlights: string[];
}

export const guides: GuideMeta[] = [
  {
    id: "jazz",
    name: "Jazz Guide",
    nameKo: "재즈",
    tagline: "처음 만나는 재즈",
    description: "명곡을 페이지 안에서 바로 듣고, 감상 포인트와 입문 코스로 취향을 찾습니다.",
    href: "/jazz",
    gradient: "from-burgundy/70 to-brass/50",
    count: "16곡 · 입문 코스 2개",
    highlights: ["필수 16곡 큐레이션", "타임라인 감상 가이드", "30분·7일 입문 코스"],
  },
  {
    id: "classic",
    name: "Classic Guide",
    nameKo: "클래식",
    tagline: "처음 만나는 클래식",
    description: "바로크부터 한국 근대 클래식까지, 31곡을 부담 없이 순서대로 들어봅니다.",
    href: "/classic",
    gradient: "from-[#5d2c3e] to-[#a56f4a]/60",
    count: "31곡 · 한국 클래식 포함",
    highlights: ["입문 추천 순서 수록", "시대·편성별 필터", "한국 클래식 4곡"],
  },
  {
    id: "symphony",
    name: "Symphony Guide",
    nameKo: "교향곡",
    tagline: "교향곡, 악장부터 천천히",
    description: "교향곡은 길어도 악장만큼은 짧습니다. 악장 지도를 따라 부담 없이 들어보세요.",
    href: "/symphony",
    gradient: "from-[#2c3e5d] to-[#4a6fa5]/60",
    count: "30편 · 악장 지도",
    highlights: ["첫 5분·한 악장·전체 감상 모드", "악장 시작점 seek", "베토벤 5번은 악장 검증 완료"],
  },
  {
    id: "audio-test",
    name: "Audio Test",
    nameKo: "오디오 테스트",
    tagline: "내 장비를 음악으로 점검",
    description: "검증된 테스트 곡 20선으로 초저음부터 공간감까지, 내 이어폰·스피커를 점검합니다.",
    href: "/audio-test",
    gradient: "from-[#3e5d2c]/70 to-[#4a6fa5]/50",
    count: "20곡 · 평가 항목 10개",
    highlights: ["10개 평가 항목 체크리스트", "한국 곡 10선 포함", "A/B 비교 곡 연결"],
  },
];

export function guideByPath(pathname: string): GuideMeta {
  return (
    guides.find((g) => pathname === g.href || pathname.startsWith(g.href + "/")) ??
    guides[0]
  );
}

export interface SectionNavItem {
  href: string;
  label: string;
}

export const guideSectionNavs: Record<GuideId, SectionNavItem[]> = {
  jazz: [
    { href: "/jazz", label: "홈" },
    { href: "/jazz/getting-started", label: "처음이라면" },
    { href: "/jazz/must-listen", label: "반드시 들어야 할 곡" },
    { href: "/jazz/eras", label: "시대별" },
    { href: "/jazz/styles", label: "스타일별" },
    { href: "/jazz/moods", label: "분위기별" },
    { href: "/jazz/artists", label: "아티스트" },
    { href: "/jazz/glossary", label: "재즈 용어" },
    { href: "/jazz/my-jazz", label: "나의 재즈" },
  ],
  classic: [
    { href: "/classic", label: "홈" },
    { href: "/classic/course", label: "입문 코스" },
    { href: "/classic/works", label: "전체 작품" },
    { href: "/classic/works?origin=korean", label: "한국 클래식" },
    { href: "/classic/works?era=baroque", label: "바로크" },
    { href: "/classic/works?era=romantic", label: "낭만주의" },
  ],
  symphony: [
    { href: "/symphony", label: "홈" },
    { href: "/symphony/course", label: "7일 코스" },
    { href: "/symphony/symphonies", label: "전체 교향곡" },
    { href: "/symphony/symphonies?verified=1", label: "악장 지도 완료" },
  ],
  "audio-test": [
    { href: "/audio-test", label: "홈" },
    { href: "/audio-test/tracks", label: "테스트 곡" },
    { href: "/audio-test/tracks?category=sub-bass", label: "초저음" },
    { href: "/audio-test/evaluation", label: "평가 항목" },
  ],
};
