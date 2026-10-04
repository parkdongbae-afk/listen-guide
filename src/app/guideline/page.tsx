import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: "감상 가이드라인 — 초보자를 위한 음악 감상 안내",
  description: "재즈·클래식·교향곡을 처음 듣는 사람을 위한 감상 가이드라인. 입문 순서, 감상 질문, 4주 코스, 감상 기록 방법.",
};

const jazzStages = [
  {
    stage: "1단계: 편안한 보컬과 피아노",
    works: ["Louis Armstrong & Ella Fitzgerald — Cheek to Cheek", "Ella Fitzgerald — Misty", "Bill Evans — Waltz for Debby", "Dave Brubeck Quartet — Take Five"],
  },
  {
    stage: "2단계: 대표적인 재즈 앙상블",
    works: ["Miles Davis — So What", "John Coltrane — Blue Train", "Art Blakey — Moanin'", "Duke Ellington — Take the “A” Train"],
  },
  {
    stage: "3단계: 더 자유롭고 강한 표현",
    works: ["John Coltrane — A Love Supreme, Pt. I", "Charles Mingus — Haitian Fight Song", "Thelonious Monk — Straight, No Chaser", "Ornette Coleman — Lonely Woman"],
  },
];

const classicGenres = [
  { name: "독주곡", desc: "한 악기의 음색과 연주자의 표현에 집중하기 좋습니다.", works: ["Bach — Cello Suite No. 1: Prelude", "Beethoven — Für Elise", "Chopin — Nocturne Op. 9 No. 2", "Debussy — Clair de Lune"] },
  { name: "실내악", desc: "소수의 연주자가 주고받는 음악적 대화를 들을 수 있습니다.", works: ["Mozart — Eine kleine Nachtmusik", "Schubert — Death and the Maiden", "Dvořák — American Quartet"] },
  { name: "협주곡", desc: "독주 악기와 오케스트라의 대비를 감상하기 좋습니다.", works: ["Vivaldi — The Four Seasons: Spring", "Mozart — Piano Concerto No. 21", "Mendelssohn — Violin Concerto", "Rachmaninoff — Piano Concerto No. 2"] },
  { name: "성악과 합창", desc: "사람의 목소리와 극적인 감정을 중심으로 듣습니다.", works: ["Mozart — Requiem: Lacrimosa", "Handel — Messiah: Hallelujah", "Puccini — Nessun dorma", "Fauré — In Paradisum"] },
];

const eraTable = [
  ["바로크", "규칙적인 흐름, 정교한 구조, 장식적 표현", "Bach, Vivaldi, Handel"],
  ["고전주의", "균형, 명료함, 깔끔한 형식", "Haydn, Mozart, Beethoven 초기"],
  ["낭만주의", "강한 감정, 풍부한 선율, 극적인 대비", "Schubert, Chopin, Brahms, Tchaikovsky"],
  ["인상주의·근현대", "새로운 음색, 분위기, 다양한 리듬과 화성", "Debussy, Ravel, Stravinsky"],
];

const symphonyStages = [
  { stage: "1단계: 익숙하고 선명한 작품", works: ["Beethoven — Symphony No. 5", "Dvořák — Symphony No. 9 신세계로부터", "Tchaikovsky — Symphony No. 5", "Mozart — Symphony No. 40"] },
  { stage: "2단계: 감정과 이야기가 풍부한 작품", works: ["Beethoven — Symphony No. 6 전원", "Schubert — Symphony No. 8 미완성", "Brahms — Symphony No. 3", "Tchaikovsky — Symphony No. 6 비창"] },
  { stage: "3단계: 규모와 음향을 경험하는 작품", works: ["Beethoven — Symphony No. 9 합창", "Mahler — Symphony No. 1", "Sibelius — Symphony No. 2", "Shostakovich — Symphony No. 5"] },
];

const fourWeeks = [
  { week: "1주 차 — 친숙한 멜로디", items: ["재즈: Take Five (Dave Brubeck)", "클래식: Clair de Lune (Debussy)", "교향곡: 베토벤 교향곡 5번 1악장"], goal: "좋아하는 음색과 분위기를 찾습니다." },
  { week: "2주 차 — 리듬과 대화", items: ["재즈: So What (Miles Davis)", "클래식: 사계 중 봄 (Vivaldi)", "교향곡: 신세계로부터 4악장 (드보르자크)"], goal: "리듬, 반복, 악기 간의 대화를 듣습니다." },
  { week: "3주 차 — 감정의 변화", items: ["재즈: Moanin' (Art Blakey)", "클래식: 피아노 협주곡 2번 2악장 (라흐마니노프)", "교향곡: 비창 1악장 (차이콥스키)"], goal: "긴장과 이완, 강약의 변화를 느낍니다." },
  { week: "4주 차 — 작품 전체 듣기", items: ["재즈: Kind of Blue (전체)", "클래식: 사계 (전체)", "교향곡: 신세계로부터 (전체)"], goal: "세부 분석보다 전체 흐름과 개인적인 인상을 기록합니다." },
];

const principles = [
  "좋고 나쁨보다 느낌을 먼저 기록합니다.",
  "한 번에 모든 악기를 구별하려 하지 않습니다.",
  "긴 작품은 한 악장 또는 한 트랙씩 나누어 듣습니다.",
  "유명한 작품이 반드시 자신의 취향과 맞는 것은 아닙니다.",
  "마음에 든 곡은 최소 세 번 들어봅니다.",
  "같은 곡의 다른 연주를 비교해 봅니다.",
  "장비보다 감상 습관을 우선합니다.",
  "배경음악 시간과 집중 듣기 시간을 구분합니다.",
  "해설은 음악을 들은 뒤 찾아봐도 충분합니다.",
  "가장 중요한 기준은 다시 듣고 싶은가입니다.",
];

const quickPicks = [
  ["편안하고 차분한 음악", "Bill Evans — Waltz for Debby"],
  ["밤에 듣기 좋은 피아노", "Debussy — Clair de Lune"],
  ["힘차고 익숙한 음악", "Beethoven — Symphony No. 5"],
  ["경쾌하고 독특한 리듬", "Dave Brubeck — Take Five"],
  ["넓고 장대한 분위기", "Dvořák — Symphony No. 9"],
  ["깊고 감성적인 음악", "Rachmaninoff — Piano Concerto No. 2"],
  ["강렬하고 자유로운 재즈", "John Coltrane — A Love Supreme"],
];

function WorkList({ works }: { works: string[] }) {
  return (
    <ul className="mt-2 space-y-1">
      {works.map((w) => (
        <li key={w} className="text-sm leading-relaxed text-subtle">
          · {w}
        </li>
      ))}
    </ul>
  );
}

export default function GuidelinePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-14">
      <header className="max-w-2xl">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
          감상 가이드라인
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">초보자를 위한 음악 감상 가이드라인</h1>
        <p className="mt-3 leading-relaxed text-subtle">
          재즈, 클래식, 교향곡을 처음 듣는 사람을 위한 입문 안내입니다. 목표는 음악 지식을 암기하는 것이 아니라{" "}
          <strong className="font-semibold text-ink">부담 없이 듣고 자신만의 취향을 발견하는 것</strong>입니다.
        </p>
      </header>

      <nav aria-label="목차" className="rounded-2xl border border-line bg-card p-5">
        <h2 className="mb-2 text-sm font-bold">목차</h2>
        <ol className="grid gap-1.5 text-sm text-subtle sm:grid-cols-2">
          <li><a href="#먼저-알아둘-점" className="hover:text-brass">1. 먼저 알아둘 점</a></li>
          <li><a href="#jazz-입문" className="hover:text-brass">2. Jazz 입문 가이드</a></li>
          <li><a href="#classical-입문" className="hover:text-brass">3. Classical Music 입문 가이드</a></li>
          <li><a href="#symphony-입문" className="hover:text-brass">4. Symphony 입문 가이드</a></li>
          <li><a href="#4주-입문-코스" className="hover:text-brass">5. 4주 입문 코스</a></li>
          <li><a href="#감상-기록-방법" className="hover:text-brass">6. 감상 기록 방법</a></li>
          <li><a href="#공통-원칙" className="hover:text-brass">7. 초보자를 위한 공통 원칙</a></li>
        </ol>
      </nav>

      <section id="먼저-알아둘-점" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">1. 먼저 알아둘 점</h2>
        <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
          <p className="font-semibold text-ink">Classical Music과 Symphony의 차이</p>
          <ul className="mt-2 space-y-1">
            <li>· Classical Music(클래식 음악)은 서양 예술음악 전반을 가리키는 넓은 표현입니다.</li>
            <li>· Symphony(교향곡)는 클래식 음악에 포함되는 하나의 장르입니다.</li>
            <li>· 클래식 음악에는 교향곡 외에도 협주곡, 실내악, 독주곡, 오페라, 합창곡 등이 있습니다.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
          <p className="font-semibold text-ink">감상 전 준비</p>
          <ul className="mt-2 space-y-1">
            <li>· 처음부터 작품 전체를 이해하려 하지 않습니다.</li>
            <li>· 조용한 환경과 편안한 음량, 하루 10~30분부터 시작합니다.</li>
            <li>· 마음에 들지 않는 곡을 억지로 끝까지 들을 필요는 없습니다.</li>
            <li>· 같은 곡을 다른 날 다시 들으면 인상이 달라질 수 있습니다.</li>
          </ul>
        </div>
      </section>

      <section id="jazz-입문" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">2. Jazz 입문 가이드</h2>
        <p className="text-sm leading-relaxed text-subtle">
          먼저 들어볼 요소: <strong className="text-ink">리듬</strong>(몸이 움직이는지) →{" "}
          <strong className="text-ink">즉흥연주</strong>(무엇이 달라지는지) →{" "}
          <strong className="text-ink">악기 간의 대화</strong>(질문과 답) →{" "}
          <strong className="text-ink">구조</strong>(주제–솔로–주제 재등장).
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {jazzStages.map((s) => (
            <div key={s.stage} className="rounded-2xl border border-line bg-card p-4">
              <h3 className="text-sm font-bold text-ink">{s.stage}</h3>
              <WorkList works={s.works} />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <h3 className="text-sm font-bold text-ink">감상 질문</h3>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-subtle">
            <li>· 가장 먼저 귀에 들어온 악기는 무엇인가?</li>
            <li>· 리듬은 부드러운가, 긴장감이 있는가?</li>
            <li>· 솔로의 시작과 끝을 알아차릴 수 있는가?</li>
            <li>· 음악이 대화처럼 느껴지는 순간이 있었는가?</li>
          </ul>
        </div>
      </section>

      <section id="classical-입문" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">3. Classical Music 입문 가이드</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {classicGenres.map((g) => (
            <div key={g.name} className="rounded-2xl border border-line bg-card p-4">
              <h3 className="text-sm font-bold text-ink">{g.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle">{g.desc}</p>
              <WorkList works={g.works} />
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="sr-only">시대별 특징</caption>
            <thead className="bg-card text-xs text-subtle">
              <tr>
                <th scope="col" className="px-4 py-2.5">시대</th>
                <th scope="col" className="px-4 py-2.5">대략적인 특징</th>
                <th scope="col" className="px-4 py-2.5">입문 작곡가</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {eraTable.map(([era, feature, composers]) => (
                <tr key={era}>
                  <th scope="row" className="px-4 py-2.5 font-semibold text-ink">{era}</th>
                  <td className="px-4 py-2.5 text-subtle">{feature}</td>
                  <td className="px-4 py-2.5 text-subtle">{composers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <h3 className="text-sm font-bold text-ink">감상 질문</h3>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-subtle">
            <li>· 음악이 밝은가, 어두운가? · 반복되는 멜로디가 있는가?</li>
            <li>· 어느 순간 소리가 커지거나 작아지는가?</li>
            <li>· 가장 인상적인 악기나 음색은 무엇인가?</li>
          </ul>
        </div>
      </section>

      <section id="symphony-입문" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">4. Symphony 입문 가이드</h2>
        <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
          <p>
            전통적인 교향곡은 4악장 구조: <strong className="text-ink">1악장</strong> 빠르고 극적인 시작 →{" "}
            <strong className="text-ink">2악장</strong> 느리고 서정적 → <strong className="text-ink">3악장</strong> 춤곡·활기 →{" "}
            <strong className="text-ink">4악장</strong> 빠르고 강렬한 마무리. 처음에는 현악 → 목관 → 금관 → 타액 순서로 큰
            음색의 차이만 느껴봐도 충분합니다.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {symphonyStages.map((s) => (
            <div key={s.stage} className="rounded-2xl border border-line bg-card p-4">
              <h3 className="text-sm font-bold text-ink">{s.stage}</h3>
              <WorkList works={s.works} />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <h3 className="text-sm font-bold text-ink">네 번에 걸친 감상 방법</h3>
          <ol className="mt-2 space-y-1 text-sm leading-relaxed text-subtle">
            <li>1. 전체 분위기 — 분석 없이 흐름을 경험</li>
            <li>2. 반복되는 주제 — 주제가 악기·음량을 바꾸며 변하는 지점</li>
            <li>3. 악기군 — 현악만, 그다음 목관·금관, 타악의 순간</li>
            <li>4. 연주 비교 — 다른 지휘자·오케스트라의 속도와 음색 차이</li>
          </ol>
        </div>
      </section>

      <section id="4주-입문-코스" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">5. 4주 입문 코스</h2>
        <ul className="space-y-3">
          {fourWeeks.map((w) => (
            <li key={w.week} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="text-sm font-bold text-ink">{w.week}</h3>
              <WorkList works={w.items} />
              <p className="mt-2 text-xs text-brass">목표: {w.goal}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-subtle">
          각 가이드의 코스 페이지도 참고하세요:{" "}
          <Link href="/jazz/getting-started#courses" className="text-brass underline decoration-dotted underline-offset-2">재즈 입문 코스</Link>
          {" · "}
          <Link href="/classic/course" className="text-brass underline decoration-dotted underline-offset-2">클래식 31곡 코스</Link>
          {" · "}
          <Link href="/symphony/course" className="text-brass underline decoration-dotted underline-offset-2">교향곡 7일 코스</Link>
        </p>
      </section>

      <section id="감상-기록-방법" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">6. 감상 기록 방법</h2>
        <p className="text-sm leading-relaxed text-subtle">
          곡을 들은 뒤 아래 항목을 짧게 기록합니다. 모든 가이드의 곡 상세 페이지 하단에 있는{" "}
          <strong className="text-ink">감상 기록</strong> 폼에서 바로 남길 수 있고,{" "}
          <Link href="/notes" className="text-brass underline decoration-dotted underline-offset-2">나의 감상 기록</Link>{" "}
         에서 모아볼 수 있습니다.
        </p>
        <div className="rounded-2xl border border-line bg-card p-5 text-sm leading-relaxed text-subtle">
          <p className="font-mono text-xs">날짜 · 곡명 · 작곡가/연주자 · 장르 · 가장 인상적인 악기 · 전체 분위기 · 기억에 남은 순간 · 다시 듣고 싶은 정도(★) · 한 줄 감상</p>
          <p className="mt-2 text-xs">
            예: 2026-10-04 / So What / Miles Davis / 재즈 / 트럼펫 / 차분하지만 긴장감 있음 / 트럼펫 솔로가 시작되는 부분 /
            ★★★★ / 악기들이 여유롭게 대화하는 느낌이었다.
          </p>
        </div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-bg transition-transform hover:scale-[1.02]"
        >
          <PenLine className="h-4 w-4" aria-hidden />
          나의 감상 기록 열기
        </Link>
      </section>

      <section id="공통-원칙" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold">7. 초보자를 위한 공통 원칙</h2>
        <ol className="grid gap-2 text-sm leading-relaxed text-subtle sm:grid-cols-2">
          {principles.map((p, i) => (
            <li key={i} className="rounded-xl border border-line bg-card px-4 py-3">
              <span className="mr-1.5 font-bold text-brass">{i + 1}.</span>
              {p}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="quick-heading" className="rounded-3xl border border-line bg-card p-6 sm:p-8">
        <h2 id="quick-heading" className="text-lg font-bold">
          빠른 선택 메뉴
        </h2>
        <p className="mt-1 text-sm text-subtle">현재 기분에 따라 한 곡을 선택해 보세요.</p>
        <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {quickPicks.map(([mood, work]) => (
            <li key={mood} className="text-subtle">
              <span className="text-ink">{mood}</span> → {work}
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-line pt-6">
        <p className="text-center text-sm leading-relaxed text-subtle">
          음악 감상에는 정답이 없습니다. 작품의 구조를 이해하는 것보다 먼저,{" "}
          <strong className="font-semibold text-ink">어떤 소리가 자신을 움직이는지</strong> 발견해 보세요.
        </p>
      </footer>
    </div>
  );
}
