import Link from "next/link";

const sections = [
  {
    title: "가이드",
    links: [
      { href: "/jazz", label: "재즈 가이드" },
      { href: "/classic", label: "클래식 가이드" },
      { href: "/symphony", label: "교향곡 가이드" },
      { href: "/audio-test", label: "오디오 테스트" },
    ],
  },
  {
    title: "재즈 탐색",
    links: [
      { href: "/jazz/must-listen", label: "반드시 들어야 할 곡" },
      { href: "/jazz/eras", label: "시대별 재즈" },
      { href: "/jazz/styles", label: "스타일별 재즈" },
      { href: "/jazz/moods", label: "분위기로 찾기" },
    ],
  },
  {
    title: "클래식·교향곡",
    links: [
      { href: "/classic/works", label: "클래식 전체 작품" },
      { href: "/classic/works?origin=korean", label: "한국 클래식" },
      { href: "/symphony/symphonies", label: "교향곡 전체" },
      { href: "/symphony/symphonies?verified=1", label: "악장 지도 완료" },
    ],
  },
  {
    title: "오디오 테스트·나의 기록",
    links: [
      { href: "/audio-test/tracks", label: "테스트 곡" },
      { href: "/audio-test/evaluation", label: "평가 항목" },
      { href: "/notes", label: "나의 감상 기록" },
      { href: "/guideline", label: "감상 가이드라인" },
    ],
  },
];

export function AppFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-card/40 pb-24 lg:pb-8">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        {sections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h2 className="mb-3 text-sm font-semibold text-ink">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-subtle transition-colors hover:text-brass">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <p className="text-xs leading-relaxed text-subtle">
          Jazz Guide는 재즈 입문자를 위한 비영리 큐레이션 프로젝트입니다. 모든 영상은 YouTube 공식 임베드 방식으로만 제공되며,
          &lsquo;반드시 들어야 할 곡&rsquo;은 편집자의 입문 큐레이션이지 절대적인 음악적 우열을 뜻하지 않습니다.
        </p>
        <p className="mt-2 text-xs text-subtle">© {new Date().getFullYear()} Jazz Guide</p>
      </div>
    </footer>
  );
}
