# Symphony Guide 웹앱 개발 작업지시서

> 문서명: `SYMPHONY.MD`  
> 프로젝트명: **Symphony Guide — 처음 만나는 교향곡**  
> 대상 작업 도구: **Z.ai Coding Plan**  
> 서비스 형태: 반응형 웹앱  
> 기본 언어: 한국어  
> 핵심 사용자: 교향곡을 처음 듣는 사람, 긴 클래식 작품을 악장과 주제별로 쉽게 이해하고 싶은 사람  
> 데이터 기준일: 2026-10-04

---

## 0. Z.ai Coding Plan 핵심 실행 지침

이 프로젝트는 오디오 기기 테스트나 교향곡 순위 사이트가 아니다.  
핵심 목적은 사용자가 긴 교향곡을 부담스러워하지 않고 **한 악장, 한 주제, 한 장면씩** 이해하며 듣게 하는 것이다.

### 가장 먼저 구현할 흐름

> 교향곡 발견 → 먼저 들을 악장 선택 → 짧은 설명 확인 → 페이지 안에서 재생 → 주제와 악기 추적 → 다음 악장 또는 관련 교향곡으로 확장

### 구현 우선순위

1. 이 문서의 최초 수록 교향곡 데이터를 정적 TypeScript로 작성한다.
2. 홈 → 교향곡 목록 → 작품 상세 → 악장 선택 → YouTube 재생 → 감상 포인트 → 관련 작품 흐름을 먼저 완성한다.
3. 전체 교향곡 완주를 강요하지 않고 `첫 5분`, `한 악장만`, `전체 감상`의 세 가지 진입 방식을 제공한다.
4. 작품명, 교향곡 번호, 조성, 작품번호, 악장과 별칭을 분리해서 저장한다.
5. 지휘자·오케스트라·연주 영상은 최종 채택 버전을 기준으로 저장한다.
6. 검증하지 않은 YouTube ID, 타임라인, 녹음 정보는 임의로 만들지 않고 `TODO_VERIFY`로 남긴다.
7. 실제 영상이 미확정이어도 작품 설명, 악장 구조와 감상 포인트는 정상적으로 표시한다.
8. 찜, 최근 감상, 악장별 완료, 전체 완주와 코스 진도는 `localStorage`에 저장한다.
9. 모바일 우선, 키보드 접근성, 충분한 대비와 `prefers-reduced-motion`을 포함한다.
10. 각 Phase 종료 시 변경 파일, 구현 기능, 테스트 결과와 남은 TODO를 보고한다.

### 만들지 않는 기능

- 교향곡의 절대 순위
- 지휘자와 오케스트라의 단순 점수 순위
- 오디오 기기 성능 테스트
- 음원 다운로드
- 저작권이 확인되지 않은 악보·앨범 커버 재배포
- AI가 추측한 영상 ID와 타임라인
- 초보자에게 전체 작품 완주를 강요하는 UX

---

## 1. 프로젝트 개요

교향곡은 클래식 음악의 대표 장르지만 입문자에게는 다음과 같은 장벽이 있다.

- 한 작품이 30분에서 90분 이상으로 길다.
- 같은 작곡가의 작품이 숫자로만 구분되어 헷갈린다.
- 작품명, 별칭, 조성, 작품번호와 악장 이름이 복잡하다.
- 악장이 여러 개라 어디서부터 들어야 할지 모른다.
- 오케스트라 악기를 한 번에 구분하기 어렵다.
- 같은 작품도 지휘자와 오케스트라에 따라 크게 달라진다.
- 해설을 읽어도 실제 음악의 어느 부분인지 찾기 어렵다.
- 유명한 몇 초만 알고 전체 흐름은 모르는 경우가 많다.

이 웹앱은 교향곡을 백과사전처럼 나열하는 대신 다음 경험을 제공한다.

- 지금 바로 들을 한 악장 추천
- 악장별 분위기와 역할 설명
- 기억하기 쉬운 핵심 주제
- 주요 악기와 악기군 안내
- 실제 영상 기준 타임라인
- 긴 작품을 나누어 듣는 진행 관리
- 시대와 작곡가를 연결하는 다음 작품 추천
- 같은 작품의 연주 차이를 이해하는 선택적 비교 콘텐츠

---

## 2. 프로젝트 목표

### 핵심 목표

1. 사용자가 10초 안에 첫 교향곡 또는 첫 악장을 선택하게 한다.
2. `전체 45분`보다 `먼저 들을 7분`을 우선 보여 준다.
3. 각 교향곡에서 가장 기억하기 쉬운 주제와 악기를 안내한다.
4. 4악장 구조를 기본으로 설명하되 예외적인 작품도 쉽게 소개한다.
5. 시대별로 오케스트라와 교향곡 형식이 어떻게 확장됐는지 보여 준다.
6. 공식 또는 권리 보유자의 YouTube 영상을 상세 페이지 안에서 재생한다.
7. 실제 채택 영상 기준으로 악장 시작점과 감상 타임라인을 제공한다.
8. 악장별 감상 완료와 전체 완주 상태를 저장한다.
9. 입문자가 자신의 취향을 `웅장함`, `서정성`, `리듬`, `어두움`, `자연`, `합창` 등의 언어로 찾게 한다.
10. 한국 작곡가의 교향악 작품으로 확장할 수 있는 별도 탐색 경로를 제공한다.

### 성공 기준

- 홈에서 첫 추천 악장 재생까지 10초 이내
- 작품 상세에서 전체 길이보다 `추천 시작 악장`을 먼저 확인 가능
- 악장 구조와 주요 주제를 쉬운 한국어로 이해 가능
- 최소 20개 교향곡의 상세 페이지 제공
- 최소 10개 작품에 검수된 공식 또는 권리 보유 영상 제공
- 악장별 완료 상태와 코스 진도 저장
- 한글·영문 작곡가명, 별칭과 교향곡 번호 검색
- 모바일과 키보드 환경에서 전체 감상 흐름 사용 가능

---

## 3. 교향곡 입문 UX의 핵심 아이디어

## 3.1 세 가지 감상 모드

각 작품 상세 페이지에서 다음 세 가지를 제공한다.

### `첫 5분`

- 가장 유명하거나 이해하기 쉬운 구간
- 핵심 주제 한두 개
- 악기 한두 개만 추적
- 입문자에게 가장 먼저 노출

### `한 악장만`

- 작품의 성격을 가장 잘 보여 주는 추천 악장
- 악장 전체의 간단한 구조
- 3~5개의 타임라인 감상 포인트
- 예상 감상 시간 표시

### `전체 교향곡`

- 악장별 이어 듣기
- 악장 사이의 관계 설명
- 중단 지점 저장
- 전체 완주 배지
- 한 번에 완주하지 않아도 됨을 안내

---

## 3.2 주제 카드

입문자는 악보를 읽지 않아도 주제를 기억할 수 있어야 한다.

주제 카드는 다음 내용을 포함한다.

```text
주제 이름
쉬운 리듬 표현
처음 등장하는 시간
처음 연주하는 악기
다시 등장하는 주요 시간
분위기 키워드
```

예:

```text
운명 동기
짧게-짧게-짧게-길게
00:00
현악기와 클라리넷
여러 악기군으로 반복
긴장 · 추진력 · 집요함
```

음표를 텍스트로 무리하게 변환하지 않는다. 저작권이 허용되는 퍼블릭 도메인 악보를 사용할 경우에도 출처와 판본을 표시한다.

---

## 3.3 악장 지도

각 작품 상단에 전체 구조를 시각적으로 표시한다.

```text
1악장  갈등과 출발       12분  ● 완료
2악장  느린 노래         10분  ○
3악장  춤 또는 스케르초   6분  ○
4악장  결말과 절정        9분  ○
```

### 악장 지도 요구사항

- 악장 번호
- 빠르기말
- 쉬운 한국어 역할
- 예상 길이
- 추천 악장 배지
- 감상 완료 상태
- 악장 시작 버튼
- 전체 영상에서는 `startSeconds`로 이동
- 분리 영상에서는 해당 영상으로 전환
- 모바일에서는 가로 스크롤 대신 세로 목록 우선

---

## 3.4 “무엇을 따라 들을까?” 모드

한 번에 모든 악기를 듣게 하지 않는다.

- **멜로디 따라가기**
- **리듬 따라가기**
- **저음과 팀파니 듣기**
- **목관악기 찾기**
- **금관이 들어오는 순간**
- **주제가 돌아오는 순간**
- **작은 소리에서 큰 소리로 커지는 과정**
- **합창 또는 독창이 등장하는 순간**

사용자는 같은 악장을 다른 모드로 다시 들을 수 있다.

---

## 3.5 긴 작품 피로 방지

- 전체 길이를 지나치게 강조하지 않는다.
- `오늘은 1악장만 들어도 충분합니다` 문구 제공
- 15분 이상 연속 감상 시 선택적 휴식 안내
- 중단 지점 자동 저장
- 다음 방문 시 `이어서 듣기`
- 완주하지 않아도 악장별 완료 기록 제공
- 처음에는 가장 유명한 악장부터 들어도 된다고 안내

---

## 4. 권장 기술 스택

### 프론트엔드

- Next.js 최신 안정 버전
- React
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui 또는 동등한 접근성 컴포넌트
- Lucide React
- YouTube IFrame Player API 또는 안정적인 React wrapper
- Server Components 우선
- 필요한 플레이어·사용자 상태 영역만 Client Component

### 데이터

초기 MVP는 정적 TypeScript 데이터로 구현한다.

```text
src/data/symphonies.ts
src/data/composers.ts
src/data/eras.ts
src/data/orchestras.ts
src/data/instruments.ts
src/data/courses.ts
src/data/glossary.ts
```

### 사용자 상태

로그인 없는 MVP에서는 `localStorage` 사용:

- 찜한 교향곡
- 최근 들은 작품
- 악장별 감상 완료
- 전체 완주
- 마지막 재생 악장과 시간
- 코스 진도
- 최근 검색어
- 나만의 플레이리스트

확장 단계에서는 Supabase 또는 PostgreSQL + Prisma를 검토한다.

---

## 5. 데이터 모델

```ts
export type SymphonyEra =
  | "early-classical"
  | "classical"
  | "classical-romantic"
  | "romantic"
  | "late-romantic"
  | "nationalist"
  | "modern"
  | "contemporary"
  | "korean-modern";

export type SymphonyMood =
  | "bright"
  | "dramatic"
  | "heroic"
  | "lyrical"
  | "dark"
  | "mysterious"
  | "pastoral"
  | "rhythmic"
  | "tragic"
  | "spiritual"
  | "monumental";

export type Movement = {
  number: number;
  title: string;
  tempoMarking?: string;
  easyRole: string;
  durationSeconds?: number;
  recommended: boolean;
  difficulty: "easy" | "medium" | "advanced";
  videoId?: string;
  startSeconds?: number;
  timeline: {
    seconds: number | null;
    title: string;
    description: string;
    instrument?: string;
    themeId?: string;
    status: "TODO_VERIFY" | "VERIFIED";
  }[];
};

export type ThemeGuide = {
  id: string;
  name: string;
  simpleRhythm?: string;
  description: string;
  firstMovement: number;
  firstSeconds: number | null;
  firstInstrument?: string;
  moodKeywords: string[];
  status: "TODO_VERIFY" | "VERIFIED";
};

export type VideoSource = {
  youtubeVideoId: string;
  title: string;
  channelName: string;
  performer?: string;
  conductor?: string;
  orchestra?: string;
  choir?: string;
  soloists?: string[];
  isOfficial: boolean | null;
  isEmbeddable: boolean | null;
  versionType: "full-performance" | "movement" | "official-audio";
  lastVerifiedAt: string | null;
  fallbackVideoId?: string;
  status: "TODO_VERIFY" | "VERIFIED";
};

export type Symphony = {
  id: string;
  slug: string;
  title: string;
  titleKo: string;
  nickname?: string;
  composerId: string;
  composer: string;
  composerKo: string;
  number?: number;
  key?: string;
  opus?: string;
  catalogNumber?: string;
  era: SymphonyEra;
  country: string;
  composedYears?: string;
  premiereYear?: number;
  movementCount: number;
  estimatedDurationMinutes?: number;
  difficulty: "easy" | "medium" | "advanced";
  moods: SymphonyMood[];
  featuredInstruments: string[];
  hasChoir: boolean;
  hasSoloists: boolean;
  oneLineIntro: string;
  background: string;
  whyMustListen: string;
  beginnerTips: string[];
  movements: Movement[];
  themes: ThemeGuide[];
  primaryVideo: VideoSource;
  alternativeVideos: VideoSource[];
  relatedSymphonyIds: string[];
  nextSymphonyId?: string;
  glossaryTerms: string[];
  sources: {
    title: string;
    publisher?: string;
    url: string;
    accessedAt: string;
    note?: string;
  }[];
  status: "draft" | "reviewed" | "published";
};
```

---

## 6. 디자인 방향

### 콘셉트

- 콘서트홀의 집중감과 입문 가이드의 친근함을 결합
- 짙은 네이비, 따뜻한 아이보리와 브론즈 포인트
- 작품번호보다 한글 제목과 핵심 분위기를 크게 표시
- 지휘봉, 악보와 음표를 장식으로 과도하게 사용하지 않음
- 작곡가 초상, 오케스트라 사진과 악보는 라이선스를 확인
- 이미지가 없으면 시대·분위기별 자체 그라디언트 사용

### 카드 디자인

각 교향곡 카드에 표시:

- 한글 작품명
- 작곡가
- 시대
- 별칭
- 추천 시작 악장
- 예상 첫 감상 시간
- 전체 악장 수
- 분위기 태그
- 난이도
- 재생
- 찜
- 악장별 진행률

### 애니메이션

- 카드 hover 시 약한 상승
- 페이지 전환은 짧은 fade
- 재생 중 작은 이퀄라이저
- 악장 지도 진행 상태의 부드러운 전환
- 과도한 지휘봉·음표 애니메이션 금지
- `prefers-reduced-motion` 지원

---

## 7. 전체 메뉴

1. **홈**
2. **처음이라면**
3. **반드시 들어야 할 교향곡**
4. **시대별**
5. **분위기별**
6. **작곡가별**
7. **악기군으로 듣기**
8. **악장으로 시작하기**
9. **한국 교향악**
10. **교향곡 용어**
11. **나의 교향곡**
12. **검색**

### 권장 구조

```text
홈
├─ 오늘의 한 악장
├─ 첫 5분 추천
├─ 교향곡 첫 5곡
├─ 30분 입문 코스
└─ 이어 듣기

처음이라면
├─ 교향곡이란?
├─ 왜 보통 4악장일까?
├─ 작품번호 읽는 법
├─ 오케스트라 악기군
├─ 지휘자는 무엇을 할까?
├─ 긴 작품 나누어 듣기
└─ 같은 작품의 연주가 다른 이유

둘러보기
├─ 시대별
├─ 분위기별
├─ 작곡가별
├─ 악기군별
├─ 길이별
└─ 합창 교향곡

나의 교향곡
├─ 찜한 작품
├─ 최근 감상
├─ 악장별 완료
├─ 전체 완주
├─ 코스 진도
└─ 나만의 플레이리스트
```

---

## 8. 핵심 화면

## 8.1 홈

### 구성 순서

1. 헤더와 검색
2. 히어로
3. 오늘의 한 악장
4. `교향곡이 처음이라면 이 5곡부터`
5. `첫 5분만 들어보기`
6. 분위기로 선택
7. 30분 입문 코스
8. 시대별 교향곡
9. 오케스트라 악기군
10. 한국 교향악으로 확장
11. 이어 듣기
12. 용어 한 개
13. 푸터

### 히어로 문구

**긴 교향곡도 한 악장부터 시작하면 어렵지 않습니다**

유명한 주제를 먼저 듣고, 어떤 악기가 연주하는지 따라가 보세요.  
전체를 한 번에 완주하지 않아도 나만의 속도로 교향곡을 이해할 수 있습니다.

CTA:

- `오늘의 한 악장 듣기`
- `첫 5분 코스`
- `분위기로 고르기`

---

## 8.2 처음이라면

### 필수 콘텐츠

- 교향곡은 무엇인가?
- 관현악곡과 교향곡의 차이
- 왜 여러 악장으로 이루어지는가?
- 빠름–느림–춤–빠름의 전통적 구조
- 미뉴에트와 스케르초
- 주제, 동기와 발전
- 소나타 형식을 악보 없이 듣는 법
- 지휘자와 오케스트라의 역할
- 같은 작품이 연주마다 다른 이유
- 박수는 언제 치는가?
- 공연장에서 악장 사이에 박수치지 않는 관습
- 긴 작품을 나누어 듣는 방법

### 초보자용 설명 원칙

- 형식보다 실제 소리와 장면을 먼저 설명한다.
- `제시부` 대신 `주요 인물을 처음 소개하는 부분`과 같은 쉬운 비유를 먼저 제공한다.
- 전문용어는 접을 수 있는 추가 설명으로 배치한다.
- 예외가 많은 규칙은 절대적인 법칙처럼 설명하지 않는다.
- 공연 관습을 예절 시험처럼 다루지 않는다.

---

## 8.3 반드시 들어야 할 교향곡 목록

### 필터

- 시대
- 작곡가
- 국가
- 분위기
- 난이도
- 악장 수
- 예상 전체 길이
- 추천 시작 악장 길이
- 주요 악기
- 합창 포함 여부
- 독창자 포함 여부
- 감상 진행률
- 전체 완주 여부

### 정렬

- 입문 추천순
- 시대순
- 작곡가순
- 교향곡 번호순
- 짧은 작품부터
- 추천 악장이 짧은 순
- 최근 추가순
- 나의 진행률순

### URL 예시

```text
/symphonies?era=romantic&mood=dramatic
/symphonies?choir=true
/symphonies?duration=under-40
/symphonies?progress=in-progress
```

---

## 8.4 교향곡 상세

### 상단 요약

- 작품명과 별칭
- 작곡가
- 번호, 조성, 작품번호
- 시대와 국가
- 작곡 시기와 초연 정보
- 악장 수
- 예상 전체 길이
- 입문 난이도
- 핵심 분위기
- 추천 시작 악장
- `첫 5분`, `한 악장`, `전체 듣기` 버튼

### 필수 영역

1. YouTube 플레이어
2. 이 작품을 한 문장으로
3. 작품의 배경
4. 왜 반드시 들어야 하는가
5. 전체 악장 지도
6. 추천 시작 악장
7. 핵심 주제 카드
8. 주요 악기와 악기군
9. 악장별 쉬운 설명
10. 실제 영상 기준 타임라인
11. 무엇을 따라 들을지 선택
12. 어려운 용어
13. 같은 시대의 작품
14. 비슷한 분위기의 작품
15. 다음 추천 교향곡
16. 같은 작품의 다른 연주
17. 찜, 공유, 악장 완료와 전체 완주
18. 영상 오류 fallback
19. 연주·영상·역사 출처

### 설명 작성 규칙

- 첫 문단은 2~3문장
- 본문은 작품당 약 800~1,500자로 시작
- 작품의 역사와 감상 방법을 분리
- 별칭의 유래와 공식 여부를 확인
- 작곡 시기, 초연과 출판 시기를 구분
- 교향곡 번호 체계가 다른 경우 설명
- 현재 소개하는 특정 연주를 명시
- 지휘자 해석을 절대적인 정답으로 표현하지 않음
- 확인되지 않은 일화는 사용하지 않음
- 긴 작품 전체를 한 번에 들으라고 강요하지 않음

---

## 8.5 악장 상세

경로 예시:

```text
/symphonies/beethoven-5/movements/1
/symphonies/dvorak-9/movements/2
```

### 필수 영역

- 악장 번호와 빠르기말
- 쉬운 역할 설명
- 예상 길이
- 이 악장에서 기억할 주제
- 처음 들을 핵심 구간
- 주요 악기
- 타임라인
- 악장 구조
- 이전·다음 악장
- 악장 완료
- 전체 작품으로 돌아가기

### 쉬운 악장 구조 예시

```text
도입
첫 번째 주제
두 번째 주제
주제들이 흔들리고 충돌하는 중간
첫 주제의 귀환
마무리
```

`제시부–발전부–재현부–코다`는 보조 용어로 함께 표시한다.

---

## 9. 최초 수록 권장 교향곡

최초 MVP는 아래 24개 작품을 기본 큐레이션으로 사용한다.  
정확한 작품 정보와 채택 연주 영상은 공개 전에 검수한다.

## 9.1 가장 먼저 들을 10곡

| 순서 | 작품 | 작곡가 | 추천 시작 악장 | 입문 포인트 |
|---:|---|---|---|---|
| 1 | 교향곡 5번 | 베토벤 | 1악장 | 네 음의 동기가 작품을 이끄는 과정 |
| 2 | 교향곡 9번 `신세계로부터` | 드보르자크 | 2악장 | 잉글리시 호른의 넓고 외로운 선율 |
| 3 | 교향곡 40번 | 모차르트 | 1악장 | 불안한 첫 주제와 균형 잡힌 고전주의 구조 |
| 4 | 교향곡 6번 `전원` | 베토벤 | 1악장 | 자연의 평온함과 반복되는 리듬 |
| 5 | 교향곡 94번 `놀람` | 하이든 | 2악장 | 조용한 주제와 갑작스러운 강한 화음 |
| 6 | 교향곡 8번 `미완성` | 슈베르트 | 1악장 | 어두운 도입과 노래하는 긴 선율 |
| 7 | 교향곡 9번 `합창` | 베토벤 | 4악장 | 단순한 환희 주제가 합창으로 성장 |
| 8 | 교향곡 4번 `이탈리아` | 멘델스존 | 1악장 | 밝고 빠른 리듬과 여행의 에너지 |
| 9 | 교향곡 1번 | 브람스 | 4악장 | 긴 긴장 뒤 펼쳐지는 넓은 주제 |
| 10 | 교향곡 5번 | 차이콥스키 | 2악장 | 호른의 서정적인 선율과 운명 주제 |

---

## 9.2 시대별 확장 작품

### 초기·고전주의

| 작품 | 작곡가 | 먼저 들을 악장 | 포인트 |
|---|---|---|---|
| 교향곡 45번 `고별` | 하이든 | 4악장 | 연주자가 차례로 퇴장하는 독특한 결말 |
| 교향곡 101번 `시계` | 하이든 | 2악장 | 규칙적인 리듬과 목관의 색채 |
| 교향곡 41번 `주피터` | 모차르트 | 4악장 | 여러 주제가 동시에 결합되는 피날레 |
| 교향곡 3번 `영웅` | 베토벤 | 1악장 | 교향곡의 규모와 영웅적 서사의 확장 |

### 낭만주의

| 작품 | 작곡가 | 먼저 들을 악장 | 포인트 |
|---|---|---|---|
| 교향곡 3번 `라인` | 슈만 | 1악장 | 넓고 힘찬 첫 주제와 라인강의 이미지 |
| 교향곡 4번 | 브람스 | 4악장 | 반복되는 베이스 위의 변주 |
| 교향곡 4번 | 차이콥스키 | 1악장 | 강한 운명 동기와 감정의 충돌 |
| 교향곡 6번 `비창` | 차이콥스키 | 1악장 또는 4악장 | 어둠에서 격정, 다시 침묵으로 |
| 교향곡 8번 | 드보르자크 | 3악장 | 왈츠 같은 선율과 보헤미아의 색채 |
| 교향곡 2번 | 시벨리우스 | 4악장 | 작은 동기가 장대한 결말로 성장 |

### 후기 낭만주의·20세기

| 작품 | 작곡가 | 먼저 들을 악장 | 포인트 |
|---|---|---|---|
| 교향곡 1번 `거인` | 말러 | 1악장 | 자연의 소리에서 교향곡이 깨어나는 과정 |
| 교향곡 2번 `부활` | 말러 | 5악장 | 멀리서 시작해 합창과 오르간으로 확장 |
| 교향곡 5번 | 말러 | 4악장 `아다지에토` | 현악기와 하프의 느리고 섬세한 흐름 |
| 교향곡 5번 | 쇼스타코비치 | 4악장 | 승리처럼 들리지만 복합적인 긴장 |
| 교향곡 7번 `레닌그라드` | 쇼스타코비치 | 1악장 | 반복 주제가 거대한 행진으로 변함 |
| 교향곡 1번 `고전` | 프로코피예프 | 1악장 | 고전주의 형식을 현대적 재치로 재해석 |

---

## 9.3 한국 교향악 확장 섹션

한국 작곡가의 교향곡과 대규모 관현악 작품은 별도의 편집 검수 후 추가한다.

### 우선 검토 대상

- 윤이상 — 교향곡 1번
- 윤이상 — 교향곡 2번
- 윤이상 — 교향곡 4번 `어둠 속에서 노래하다`
- 최성환 — 아리랑 환상곡
- 한국 작곡가의 교향곡·관현악 작품 중 공식 녹음과 출처가 확보된 작품

### 적용 원칙

- 작품명, 작곡 연도, 초연과 편성 확인
- 교향곡과 교향시·환상곡을 구분
- 공식 음원 또는 공연 영상 확보
- 한국어·영문 작곡가명 제공
- 서양 교향곡의 형식 기준만으로 평가하지 않음
- 현대음악의 불협화음과 확장 주법을 쉬운 말로 설명
- 공식 출처 확보 전 `TODO_VERIFY_KOREAN_SYMPHONY` 유지

---

## 10. 입문 코스

## 10.1 15분 `첫 주제 찾기`

1. 베토벤 교향곡 5번 — 운명 동기
2. 하이든 교향곡 94번 — 놀람의 순간
3. 드보르자크 교향곡 9번 — 잉글리시 호른 주제
4. 모차르트 교향곡 40번 — 불안한 첫 주제
5. 베토벤 교향곡 9번 — 환희의 주제

각 단계는 2~3분 분량의 핵심 구간과 한 문장 설명으로 구성한다.

---

## 10.2 30분 입문 코스

1. **동기:** 베토벤 교향곡 5번 1악장
2. **느린 악장:** 드보르자크 교향곡 9번 2악장
3. **고전주의:** 모차르트 교향곡 40번 1악장
4. **자연:** 베토벤 교향곡 6번 1악장
5. **합창:** 베토벤 교향곡 9번 4악장

---

## 10.3 7일 입문 코스

- 1일차: 짧은 동기 — 베토벤 5번
- 2일차: 노래하는 느린 악장 — 드보르자크 9번
- 3일차: 고전주의의 균형 — 모차르트 40번
- 4일차: 자연과 장면 — 베토벤 6번
- 5일차: 낭만주의 감정 — 차이콥스키 5번
- 6일차: 거대한 오케스트라 — 말러 1번
- 7일차: 합창과 결말 — 베토벤 9번

---

## 10.4 악기군 코스

### 현악기

- 모차르트 교향곡 40번 1악장
- 차이콥스키 교향곡 6번 4악장
- 말러 교향곡 5번 아다지에토

### 목관악기

- 드보르자크 교향곡 9번 2악장
- 베토벤 교향곡 6번 2악장
- 프로코피예프 교향곡 1번 1악장

### 금관악기

- 브람스 교향곡 1번 4악장
- 시벨리우스 교향곡 2번 4악장
- 말러 교향곡 2번 5악장

### 타악기

- 베토벤 교향곡 5번 1악장
- 쇼스타코비치 교향곡 5번 4악장
- 말러 교향곡 1번 4악장

---

## 11. 같은 작품의 다른 연주

MVP 이후 또는 선택 기능으로 제공한다.

### 비교 항목

- 전체 연주 시간
- 빠르기
- 강약 대비
- 현악기와 관악기의 균형
- 반복구간 수행 여부
- 시대악기 또는 현대악기
- 오케스트라 규모
- 공연 실황 또는 스튜디오 녹음

### UX 원칙

- 어느 연주가 절대적으로 더 좋다고 단정하지 않는다.
- 초보자에게는 차이를 1~2개만 안내한다.
- 같은 악장의 같은 구간을 비교한다.
- 음량 차이를 해석 차이로 오해하지 않도록 안내한다.
- 비교 영상은 모두 공식성과 임베드 가능 여부를 확인한다.

### 예시 문구

```text
연주 A는 빠르고 긴장감 있게 진행됩니다.
연주 B는 주제 사이의 여백과 금관의 무게를 더 크게 느낄 수 있습니다.
먼저 1악장 첫 2분의 템포와 현악기 어택을 비교해 보세요.
```

---

## 12. YouTube 영상 요구사항

### 선정 우선순위

1. 오케스트라·지휘자·연주자의 공식 채널
2. 음반사 또는 권리 보유자의 공식 영상
3. 공연장·음악제·방송사의 공식 공연
4. 자동 생성 Topic 영상 중 크레딧이 명확한 항목
5. 검증된 음악 교육 기관

### 영상 데이터 원칙

- 전체 교향곡 영상과 악장별 영상을 구분
- 전체 영상은 악장별 `startSeconds` 저장
- 영상 제목에 작품 전체만 적혀 있다면 악장 시작점을 수동 검수
- 지휘자, 오케스트라와 독창·합창 크레딧 저장
- 리허설, 해설 포함, 편집 영상 여부 표시
- 목록 화면에서는 iframe 금지
- 사용자 클릭 시에만 iframe 로드
- `youtube-nocookie.com` 사용
- 자동 재생 기본값 금지
- 영상 오류 시 대체 영상과 YouTube 검색 링크 제공
- 다운로드 기능 금지

### 미검수 상태

```ts
primaryVideo: {
  youtubeVideoId: "TODO_VERIFY_VIDEO_ID",
  title: "TODO_VERIFY_TITLE",
  channelName: "TODO_VERIFY_CHANNEL",
  isOfficial: null,
  isEmbeddable: null,
  versionType: "full-performance",
  lastVerifiedAt: null,
  status: "TODO_VERIFY"
}
```

---

## 13. 콘텐츠 출처와 검수

### 우선 출처

- 작곡가 재단과 작품 카탈로그
- 오케스트라 공식 프로그램 노트
- 음악 기관과 도서관
- 음반사 공식 크레딧
- 신뢰할 수 있는 음악 사전
- 퍼블릭 도메인 악보의 출판 정보
- 채택 영상의 공식 설명

### 반드시 구분할 정보

- 작곡 시기
- 초연 연도
- 출판 연도
- 교향곡 번호
- 조성과 작품번호
- 작곡가가 붙인 제목
- 후대에 붙은 별칭
- 채택 연주의 녹음·공연 연도
- 전체 영상과 악장별 영상
- 판본 차이
- 반복 수행 여부

### 작성 원칙

- Wikipedia 단일 출처 금지
- 유명 일화도 출처가 불확실하면 단정하지 않음
- `베토벤이 운명의 문을 두드리는 소리라고 말했다`와 같은 일화는 출처와 논쟁 여부를 설명
- AI 생성 설명은 편집 검수 전 `draft`
- 외부 글을 길게 복사하지 않고 직접 요약
- 같은 교향곡의 번호 체계가 자료마다 다르면 함께 설명
- 한국 작곡가 작품은 한국어 공식 자료를 우선 검토

---

## 14. 교향곡 용어 사전

### 최초 등록 용어

- 교향곡
- 관현악
- 악장
- 빠르기말
- 조성
- 작품번호
- 주제
- 동기
- 제시부
- 발전부
- 재현부
- 코다
- 소나타 형식
- 변주곡
- 미뉴에트
- 스케르초
- 피날레
- 서주
- 크레셴도
- 다이내믹
- 오케스트레이션
- 악기군
- 현악기
- 목관악기
- 금관악기
- 타악기
- 지휘자
- 총보
- 시대악기
- 반복구간
- 합창 교향곡
- 교향시
- 별칭
- 초연
- 판본

### 용어 설명 형식

```text
용어
한 줄 설명
쉬운 비유
실제 교향곡에서 듣는 방법
대표 작품
관련 용어
```

---

## 15. 검색

### 검색 대상

- 한글·영문 작곡가명
- 교향곡 번호
- 한글·원어 작품명
- 조성
- 작품번호
- 별칭
- 악장
- 시대
- 국가
- 분위기
- 주요 악기
- 합창 여부
- 용어

### 검색 예시

```text
베토벤 5
Beethoven 5
운명
신세계
합창
느린 악장
호른
어두운 교향곡
40분 이하
```

### 검색 UX

- `베토벤 5번`, `베토벤 교향곡 5번`, `운명`을 같은 작품으로 연결
- `드보르작`, `드보르자크`, `Dvorak`, `Dvořák` 별칭 검색 지원
- 번호만 검색하면 작곡가 선택 유도
- 검색 결과를 작품·작곡가·악장·용어로 구분
- 최근 검색어 로컬 저장
- `/search?q=베토벤+5` 공유 가능

---

## 16. 추천 로직

### 기본 추천

- 같은 시대
- 비슷한 분위기
- 같은 주요 악기
- 비슷한 전체 길이
- 같은 입문 난이도
- 합창 유무
- 사용자가 완료한 악장

### 추천 예시

```text
베토벤 5번을 좋아했다면
→ 브람스 1번: 긴장 뒤의 장대한 결말
→ 차이콥스키 4번: 강한 운명 동기
→ 쇼스타코비치 5번: 현대적인 긴장과 피날레
```

### 과도한 개인화 금지

MVP에서는 복잡한 AI 추천보다 편집자가 검수한 관계 데이터를 우선한다.

```ts
relatedSymphonyIds: [
  "brahms-symphony-1",
  "tchaikovsky-symphony-4",
  "shostakovich-symphony-5"
]
```

---

## 16.1 같은 작품의 지휘자별 비교

같은 교향곡도 지휘자, 오케스트라, 공연장과 녹음 시기에 따라 빠르기, 강약, 악기 균형과 전체 인상이 크게 달라진다. 이 기능은 연주에 순위를 매기기보다 사용자가 **해석의 차이를 구체적으로 듣는 방법**을 배우게 한다.

### 기본 UX

1. 비교할 작품을 선택한다.
2. 편집자가 검수한 연주 2개를 선택한다.
3. 같은 악장과 같은 음악적 구간을 맞춘다.
4. 음량 차이에 관한 안내를 표시한다.
5. 한 번에 비교할 항목을 하나만 선택한다.
6. 각 연주의 차이를 쉬운 문장으로 기록한다.
7. 사용자가 더 마음에 든 연주와 이유를 저장할 수 있게 한다.

### 비교 항목

- 전체 연주 시간
- 악장별 연주 시간
- 기본 템포
- 템포 변화와 루바토
- 강약 대비
- 프레이즈의 길이
- 현악기와 관악기의 균형
- 금관과 팀파니의 존재감
- 반복구간 수행 여부
- 시대악기 또는 현대악기
- 오케스트라 규모
- 공연 실황 또는 스튜디오 녹음
- 홀 잔향
- 합창·독창 편성
- 사용 판본

### 비교 화면

```text
작품: 베토벤 교향곡 5번 1악장
비교 구간: 첫 주제부터 두 번째 주제 전까지

연주 A
- 빠르고 짧은 어택
- 현악기의 추진력이 강함
- 약 00:00~02:10

연주 B
- 조금 느리고 무게감 있음
- 금관과 저현의 존재감이 큼
- 약 00:00~02:28
```

### 동기화 방식

연주 시간이 다르므로 단순히 같은 초를 동시에 재생하지 않는다. 각 연주에 동일한 음악적 사건을 연결하는 `ComparisonCue`를 저장한다.

```ts
export type ComparisonCue = {
  id: string;
  label: string;
  description: string;
  performanceASeconds: number;
  performanceBSeconds: number;
  themeId?: string;
  movementNumber: number;
};

export type PerformanceInterpretation = {
  id: string;
  symphonyId: string;
  label: string;
  conductor: string;
  orchestra: string;
  choir?: string;
  soloists?: string[];
  recordingYear?: number;
  releaseYear?: number;
  venue?: string;
  periodInstrument: boolean;
  movementDurations?: number[];
  repeats?: string[];
  edition?: string;
  video: VideoSource;
  editorialNotes: {
    tempo?: string;
    dynamics?: string;
    balance?: string;
    phrasing?: string;
    overallCharacter?: string;
  };
  sources: {
    title: string;
    url: string;
    accessedAt: string;
  }[];
};
```

### 비교 원칙

- 음량이 큰 연주를 더 좋은 연주로 평가하지 않는다.
- 지휘자의 의도를 단정하지 않는다.
- 편집 설명은 실제 들리는 차이에 집중한다.
- 한 작품당 MVP에서는 검수된 연주 2개만 제공한다.
- 사용자가 임의의 YouTube 영상 두 개를 바로 비교하는 기능은 초기 버전에서 제공하지 않는다.
- 영상별 타임라인과 비교 지점을 따로 검수한다.
- 저작권이 있는 음원을 서버에서 추출하거나 재가공하지 않는다.

---

## 16.2 악보를 읽지 않는 주제 퀴즈

악보와 음악 이론을 몰라도 핵심 주제를 기억하고 다시 찾을 수 있는 짧은 듣기 퀴즈를 제공한다.

### 퀴즈 유형

#### 주제 다시 찾기

한 악장에서 주제를 먼저 들려준 뒤, 세 개의 구간 중 같은 주제가 돌아오는 구간을 선택한다.

#### 분위기로 기억하기

```text
이 주제와 가장 가까운 느낌은?
- 긴장하며 두드리는 느낌
- 천천히 걷는 느낌
- 넓게 노래하는 느낌
- 가볍게 춤추는 느낌
```

정답보다는 주제를 기억하기 위한 언어 선택에 가깝게 설계한다.

#### 리듬 패턴 고르기

악보 대신 다음과 같은 쉬운 표현을 사용한다.

```text
짧게-짧게-짧게-길게
길게-짧게-짧게
쿵-쉬고-쿵-쿵
```

#### 처음 연주한 악기 찾기

주제를 처음 제시한 악기 또는 악기군을 선택한다.

#### 주제 변화 찾기

원래 주제가 다음에 어떻게 달라졌는지 선택한다.

- 더 크게 연주됨
- 더 느리게 연주됨
- 다른 악기가 연주함
- 장조 또는 단조 분위기가 바뀜
- 리듬이 짧게 나뉨

### 데이터 구조

```ts
export type ThemeQuiz = {
  id: string;
  symphonyId: string;
  movementNumber: number;
  themeId: string;
  type:
    | "find-return"
    | "mood"
    | "rhythm"
    | "first-instrument"
    | "transformation";
  prompt: string;
  referenceClip: {
    videoId: string;
    startSeconds: number;
    endSeconds: number;
  };
  choices: {
    id: string;
    label: string;
    clip?: {
      videoId: string;
      startSeconds: number;
      endSeconds: number;
    };
  }[];
  correctChoiceIds: string[];
  explanation: string;
  difficulty: "easy" | "medium" | "advanced";
  status: "TODO_VERIFY" | "VERIFIED";
};
```

### UX 원칙

- 점수 경쟁보다 듣기 습관 형성을 우선한다.
- 오답에는 `틀렸습니다`보다 다시 들을 포인트를 안내한다.
- 한 문제는 30~90초 안에 완료하게 한다.
- 자동 재생하지 않는다.
- 같은 구간을 반복 재생할 수 있게 한다.
- 자막·텍스트 설명을 제공하되 정답을 먼저 노출하지 않는다.
- 퀴즈 완료 상태와 다시 풀기 기록을 로컬에 저장한다.

---

## 16.3 악기군 맞히기

오케스트라의 네 악기군과 대표 악기 음색을 실제 교향곡 구간에서 찾는 기능이다.

### 단계

#### Level 1 — 악기군

- 현악기
- 목관악기
- 금관악기
- 타악기

#### Level 2 — 대표 악기

- 바이올린
- 비올라
- 첼로
- 더블베이스
- 플루트
- 오보에
- 클라리넷
- 바순
- 호른
- 트럼펫
- 트롬본
- 튜바
- 팀파니

#### Level 3 — 혼합 편성

여러 악기군이 동시에 연주하는 구간에서 주제를 맡은 악기군을 찾는다.

### 문제 구성

```ts
export type InstrumentQuiz = {
  id: string;
  symphonyId: string;
  movementNumber: number;
  clip: {
    videoId: string;
    startSeconds: number;
    endSeconds: number;
  };
  level: 1 | 2 | 3;
  prompt: string;
  dominantInstrumentIds: string[];
  secondaryInstrumentIds?: string[];
  choices: {
    id: string;
    label: string;
    group?: "strings" | "woodwinds" | "brass" | "percussion";
  }[];
  explanation: string;
  listeningHint: string;
  status: "TODO_VERIFY" | "VERIFIED";
};
```

### 시각 보조

- 오케스트라 좌석 배치도
- 선택한 악기군 영역 강조
- 악기 실루엣
- 음역을 낮음·중간·높음으로 단순 표시
- 장식용 애니메이션 대신 실제 위치와 역할 중심

### 접근성

- 소리를 들을 수 없는 상황에서도 문제 설명과 학습 내용을 확인 가능
- 색상과 함께 텍스트·패턴으로 악기군 구분
- 악기 배치도에 표 형태의 대체 콘텐츠 제공
- 퀴즈 제한 시간을 강제하지 않음

---

## 16.4 시대별 오케스트라 규모 변화

교향곡의 역사를 연도 목록으로만 보여 주지 않고, 오케스트라의 편성과 음향 규모가 어떻게 변했는지 시각화한다.

### 시대 구간

1. 초기 고전주의
2. 하이든·모차르트의 고전주의
3. 베토벤과 고전주의에서 낭만주의로의 전환
4. 낭만주의 오케스트라의 확대
5. 후기 낭만주의의 대편성
6. 20세기의 다양한 편성
7. 현대와 한국 교향악

### 비교 항목

- 예상 연주자 수
- 현악기 규모
- 목관 편성
- 금관 편성
- 타악기 종류
- 하프·피아노·오르간 등 추가 악기
- 합창·독창 사용
- 공연장 규모
- 지휘자의 역할 변화
- 악기 제작과 연주 관습

### 주의사항

- 시대별 연주자 수는 절대값이 아니라 대표적인 범위로 표시한다.
- 같은 시대와 작품도 공연 조건에 따라 규모가 다를 수 있음을 안내한다.
- `고전주의는 작고 낭만주의는 크다`는 식의 단순화만으로 끝내지 않는다.
- 현대음악은 항상 대편성이라는 오해를 피한다.
- 시대악기 연주와 현대 오케스트라 연주를 구분한다.

### 데이터 구조

```ts
export type OrchestraEraProfile = {
  id: string;
  label: string;
  years: string;
  description: string;
  typicalPlayerRange?: {
    min: number;
    max: number;
  };
  strings?: {
    firstViolins?: string;
    secondViolins?: string;
    violas?: string;
    cellos?: string;
    doubleBasses?: string;
  };
  woodwinds: string[];
  brass: string[];
  percussion: string[];
  additionalInstruments: string[];
  choirUsage: string;
  representativeSymphonyIds: string[];
  caveats: string[];
  sources: {
    title: string;
    url: string;
    accessedAt: string;
  }[];
};
```

### 화면 구성

- 시대 타임라인
- 오케스트라 좌석 배치 변화
- 악기군별 증감
- 대표 교향곡 카드
- `이 시대의 소리 듣기` 버튼
- 두 시대 나란히 비교
- 모바일에서는 표보다 카드와 단계별 슬라이드 사용

---

## 16.5 작품별 전체 총보 연동

사용자가 음악을 들으며 현재 연주되는 총보 페이지를 선택적으로 확인할 수 있게 한다. 총보는 고급 기능이므로 기본 감상 화면을 방해하지 않게 접을 수 있는 패널로 제공한다.

### 기본 기능

- 전체 총보 열기
- 현재 악장 페이지로 이동
- 재생 시간에 맞춰 페이지 자동 이동
- 수동 페이지 이동
- 현재 주제 또는 악기군이 있는 위치 안내
- 전체 화면과 확대
- 총보 패널 닫기
- 모바일에서는 새 화면 또는 bottom sheet 사용

### 사용자 수준별 표시

#### 입문 모드

- 현재 페이지
- 현재 악기군
- 주제 이름
- 쉬운 설명

#### 탐색 모드

- 악기 이름
- 마디 범위
- 주제 색인
- 악장 구조

#### 악보 읽기 모드

- 원본 총보
- 페이지·마디 번호
- 판본 정보
- 필요한 경우 원어 악기명

### 데이터 구조

```ts
export type ScoreEdition = {
  id: string;
  symphonyId: string;
  movementNumber?: number;
  title: string;
  editor?: string;
  publisher?: string;
  publicationYear?: number;
  sourceUrl: string;
  fileUrl?: string;
  viewerType: "pdf" | "iiif" | "external";
  publicDomainStatus:
    | "PUBLIC_DOMAIN_CONFIRMED"
    | "PUBLIC_DOMAIN_US_ONLY"
    | "PERMISSION_GRANTED"
    | "TODO_VERIFY";
  jurisdictionNote: string;
  pageOffset?: number;
  hasMeasureNumbers: boolean;
  attribution: string;
  accessedAt: string;
};

export type ScoreSyncPoint = {
  id: string;
  scoreEditionId: string;
  movementNumber: number;
  videoId: string;
  seconds: number;
  page: number;
  measureStart?: number;
  measureEnd?: number;
  themeId?: string;
  note?: string;
  status: "TODO_VERIFY" | "VERIFIED";
};
```

### 구현 방식

- 초기 MVP에서는 수동으로 검수한 페이지 전환 지점만 사용한다.
- 매초 자동 추적하는 복잡한 악보 인식은 구현하지 않는다.
- `ScoreSyncPoint` 사이에서는 가장 최근 페이지를 유지한다.
- 사용자가 자동 페이지 이동을 끌 수 있게 한다.
- 영상과 판본이 변경되면 동기화 데이터를 다시 검수한다.
- PDF 전체를 애플리케이션 서버에 복제하기보다 허용된 뷰어·원본 링크를 우선한다.

---

## 16.6 퍼블릭 도메인 악보 페이지 동기화

총보 연동은 저작권과 판본 권리를 확인한 자료에만 적용한다.

### 권리 확인 원칙

- 작곡 자체가 퍼블릭 도메인이어도 현대 편집판은 저작권이 있을 수 있다.
- 국가별 보호 기간이 다를 수 있다.
- 미국에서 퍼블릭 도메인인 자료가 다른 국가에서도 동일하다고 단정하지 않는다.
- 악보 스캔 이미지, 편집, 식자와 주석의 별도 권리를 확인한다.
- `퍼블릭 도메인` 표기는 출처와 관할 지역을 함께 저장한다.
- 출처 사이트의 이용 약관과 임베드 정책을 확인한다.
- 확실하지 않으면 외부 링크만 제공하고 파일을 복제하지 않는다.

### 우선 검토 출처

- IMSLP의 권리 상태가 명시된 자료
- 국제 또는 국가 도서관의 디지털 컬렉션
- 작곡가 재단과 공공 아카이브
- IIIF를 제공하는 도서관·박물관
- 명확한 오픈 라이선스를 제공하는 악보 프로젝트

### 동기화 워크플로

1. 작품과 악장을 선택한다.
2. 판본과 권리 상태를 확인한다.
3. 페이지 번호와 실제 PDF 페이지 오프셋을 기록한다.
4. 채택 영상의 주요 음악적 사건 시간을 기록한다.
5. 해당 사건의 총보 페이지와 마디를 연결한다.
6. 편집자가 영상과 악보를 함께 재생하며 검수한다.
7. 검수 완료 지점만 사용자 화면에 공개한다.
8. 출처·판본·권리 정보를 총보 패널에 항상 표시한다.

### 페이지 오프셋 문제

PDF 표지와 서문 때문에 인쇄 페이지와 실제 PDF 인덱스가 다를 수 있다.

```ts
const getPdfPageIndex = (
  printedPage: number,
  pageOffset: number,
) => printedPage + pageOffset;
```

오프셋은 판본별로 저장하고 추측하지 않는다.

### fallback

- 동기화 실패 시 현재 악장의 첫 페이지로 이동
- PDF 뷰어 오류 시 원본 사이트 열기
- 모바일 성능이 부족하면 자동 동기화 비활성화
- 권리 상태가 변경되면 총보 표시 중단
- 악보 없이도 모든 감상 설명과 타임라인 사용 가능

---

## 16.7 사용자의 분위기 취향 기반 추천

사용자가 음악 이론이나 시대 이름을 몰라도 분위기 선택으로 다음 교향곡을 찾게 한다.

### 초기 분위기 태그

- 밝고 경쾌함
- 장엄함
- 영웅적
- 서정적
- 어둡고 비극적
- 신비로움
- 평화로운 자연
- 강한 리듬
- 긴장감
- 영적인 분위기
- 거대한 절정
- 따뜻함
- 쓸쓸함
- 불안함
- 희망적 결말

### 취향 입력 방식

#### 빠른 선택

```text
오늘은 어떤 음악을 듣고 싶나요?
[평화로운] [웅장한] [어두운] [리듬감 있는] [따뜻한]
```

#### 감상 후 반응

- 이 분위기가 좋았어요.
- 비슷하지만 더 짧은 작품
- 비슷하지만 더 강한 작품
- 같은 분위기의 느린 악장
- 다음에는 다른 시대에서 추천

#### 명시적 선호

사용자가 선호 분위기와 피하고 싶은 분위기를 직접 선택한다.

### 추천 데이터

```ts
export type UserMoodProfile = {
  likedMoods: Record<SymphonyMood, number>;
  dislikedMoods: Record<SymphonyMood, number>;
  preferredDuration?: "short" | "medium" | "long";
  preferredDifficulty?: "easy" | "medium" | "advanced";
  prefersChoir?: boolean;
  preferredEras?: SymphonyEra[];
  updatedAt: string;
};

export type MoodRecommendationReason = {
  symphonyId: string;
  score: number;
  reasons: string[];
  matchedMoods: SymphonyMood[];
  diversityReason?: string;
};
```

### MVP 추천 방식

복잡한 AI 모델 대신 설명 가능한 점수 기반 로직을 사용한다.

```text
선호 분위기 일치        +3
최근 좋아요 분위기 일치 +2
선호 길이 일치          +1
선호 난이도 일치        +1
이미 완료한 작품        -4
최근 반복 노출          -2
새 시대 탐색 보너스     +1
```

### 추천 설명 예시

```text
드보르자크 교향곡 9번을 추천하는 이유
- 서정적이고 쓸쓸한 느린 악장을 좋아했습니다.
- 10분 안팎의 추천 악장을 선호합니다.
- 아직 듣지 않은 낭만주의 작품입니다.
```

### 다양성 원칙

- 같은 작곡가만 반복 추천하지 않는다.
- 사용자의 취향을 너무 빨리 고정하지 않는다.
- 선호 작품 4개마다 새로운 시대 또는 분위기 작품 1개를 탐색 추천한다.
- `추천이 마음에 들지 않아요` 피드백을 저장한다.
- 추천 이유를 항상 표시한다.
- 민감한 개인정보를 추론하지 않는다.
- 로그인 없는 MVP에서는 프로필을 로컬에만 저장한다.

---

## 17. 공통 컴포넌트

```text
AppHeader
DesktopNavigation
MobileBottomNavigation
GlobalSearch
HeroSection
SymphonyCard
SymphonyListItem
SymphonyGrid
SymphonyFilters
SymphonySort
EraBadge
MoodChip
DifficultyBadge
MovementMap
MovementCard
MovementProgress
ThemeCard
ThemeReplayButton
OrchestraSectionMap
InstrumentGroupCard
YouTubePlayer
LiteYouTubeEmbed
PlaybackErrorFallback
ListeningTimeline
ListeningModeSelector
FavoriteButton
MovementCompletionButton
FullCompletionButton
ContinueListeningCard
CourseCard
GlossaryPopover
RelatedSymphonies
PerformanceComparison
ComparisonCueList
ThemeQuizCard
InstrumentQuizCard
OrchestraEraTimeline
OrchestraSizeComparison
ScoreViewer
ScoreSyncController
ScoreEditionInfo
MoodPreferencePicker
RecommendationReasonCard
SourceList
EmptyState
ErrorState
SkeletonLoader
AppFooter
```

---

## 18. 반응형 요구사항

### 모바일

- 하단 내비게이션
- 작품 카드는 세로 리스트 우선
- 악장 지도는 세로 목록
- 플레이어는 화면 폭에 맞춤
- 필터는 bottom sheet
- `첫 5분 듣기`를 가장 큰 CTA로 표시
- 재생·완료 버튼 터치 타깃 최소 44px
- 타임라인 설명을 생략하지 않음

### 태블릿

- 작품 정보와 악장 지도를 2열로 배치 가능
- 플레이어는 상단 고정이 아니라 자연스러운 문서 흐름 유지

### 데스크톱

- 왼쪽 작품 설명, 오른쪽 악장 지도 또는 플레이어 배치 가능
- 지나치게 넓은 본문 방지
- 플레이어 sticky는 다른 콘텐츠 접근을 방해하지 않는 범위에서만 사용

---

## 19. 접근성

- 키보드만으로 메뉴, 필터, 플레이어와 타임라인 조작
- focus ring 유지
- 색상만으로 완료 상태 구분 금지
- 악장 지도에 텍스트 상태 제공
- 모든 버튼에 accessible name
- 재생 중 상태를 스크린 리더에 알림
- 타임라인 시간과 설명을 텍스트로 제공
- 악기 배치 이미지는 대체 텍스트와 표 제공
- 차트 사용 시 텍스트 대안 제공
- `prefers-reduced-motion`
- 충분한 텍스트 대비
- 자막 제공 여부 표시
- 자동 재생 금지

---

## 20. SEO

### 작품 메타데이터 예시

```ts
title: "베토벤 교향곡 5번 — 악장별 설명과 감상 포인트 | Symphony Guide"
description: "베토벤 교향곡 5번을 한 악장부터 들어보세요. 운명 동기, 주요 악기와 실제 연주 영상 기준 감상 포인트를 쉽게 안내합니다."
```

### 필수 항목

- 작품별 고유 title·description
- 작곡가 페이지
- 시대 페이지
- canonical
- Open Graph
- Twitter/X card
- sitemap
- robots.txt
- 구조화 데이터 검토
- 공유 이미지 기본 템플릿

---

## 21. 성능

- iframe lazy loading
- 목록 화면 iframe 금지
- 서버 컴포넌트 우선
- 불필요한 클라이언트 상태 최소화
- 이미지 크기 사전 지정
- layout shift 방지
- 로딩 skeleton
- 긴 작품 데이터 페이지네이션 또는 지연 렌더링
- 저속 네트워크에서 설명 텍스트 우선 표시
- Lighthouse 성능·접근성·모범 사례·SEO 점검

---

## 22. 권장 파일 구조

```text
src/
├─ app/
│  ├─ page.tsx
│  ├─ getting-started/
│  ├─ symphonies/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  │     ├─ page.tsx
│  │     └─ movements/
│  │        └─ [movement]/
│  │           └─ page.tsx
│  ├─ eras/
│  ├─ moods/
│  ├─ composers/
│  ├─ instruments/
│  ├─ courses/
│  ├─ korean-symphony/
│  ├─ performances/
│  │  └─ [symphony]/
│  ├─ quizzes/
│  │  ├─ themes/
│  │  └─ instruments/
│  ├─ orchestra-history/
│  ├─ scores/
│  ├─ recommendations/
│  ├─ glossary/
│  ├─ my-symphony/
│  ├─ search/
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ error.tsx
│  └─ not-found.tsx
├─ components/
│  ├─ layout/
│  ├─ symphonies/
│  ├─ movements/
│  ├─ player/
│  ├─ themes/
│  ├─ orchestra/
│  ├─ courses/
│  ├─ glossary/
│  └─ ui/
├─ data/
│  ├─ symphonies.ts
│  ├─ composers.ts
│  ├─ eras.ts
│  ├─ moods.ts
│  ├─ instruments.ts
│  ├─ courses.ts
│  ├─ performances.ts
│  ├─ themeQuizzes.ts
│  ├─ instrumentQuizzes.ts
│  ├─ orchestraEras.ts
│  ├─ scoreEditions.ts
│  ├─ scoreSyncPoints.ts
│  └─ glossary.ts
├─ hooks/
├─ lib/
│  ├─ youtube.ts
│  ├─ search.ts
│  ├─ storage.ts
│  ├─ recommendations.ts
│  ├─ performanceComparison.ts
│  ├─ scoreSync.ts
│  ├─ quiz.ts
│  └─ validation.ts
├─ types/
└─ styles/
```

---

## 23. 개발 단계

## Phase 1 — 설계와 기반

- Next.js + TypeScript + Tailwind 프로젝트
- 디자인 토큰과 전역 레이아웃
- 헤더, 데스크톱·모바일 내비게이션
- `Symphony`, `Movement`, `ThemeGuide`, `VideoSource` 타입
- 최초 샘플 교향곡 10개 데이터
- 홈, 목록과 상세 기본 라우팅
- 검색 기본 구조
- SEO 기본 설정

### 완료 조건

- 주요 경로 접근 가능
- 모바일·데스크톱 내비게이션 작동
- 10개 작품 카드와 상세 페이지 렌더링
- TypeScript 오류 없음

---

## Phase 2 — 핵심 감상 기능

- 작품 목록
- 필터와 정렬
- 작품 상세
- 악장 지도
- 악장 상세
- YouTube lite embed
- 전체 영상의 악장 seek
- 감상 타임라인
- 주제 카드
- 영상 오류 fallback
- 다음·관련 작품

### 완료 조건

- 최소 10개 작품에 완전한 상세 흐름
- 최소 5개 작품에 검수된 영상
- 악장 시작 버튼 작동
- 미검수 타임라인에서도 오류 없음
- 영상 fallback 작동

---

## Phase 3 — 입문 학습

- 처음이라면
- 첫 5분 코스
- 15분 주제 코스
- 30분 입문 코스
- 7일 코스
- 시대별
- 분위기별
- 악기군별
- 용어 사전과 팝오버

### 완료 조건

- 코스 진도 저장
- 작품에서 관련 용어 확인
- 같은 주제를 다시 듣는 기능
- 악기군별 대표 작품 탐색

---

## Phase 4 — 개인화

- 찜
- 최근 감상
- 악장별 완료
- 전체 완주
- 이어 듣기
- 사용자 플레이리스트
- localStorage 저장
- 초기화와 손상 데이터 복구

### 완료 조건

- 새로고침 후 상태 유지
- 작품과 악장 진행률 계산
- 마지막 재생 악장과 시간이 복구됨
- 저장 데이터 오류 시 안전한 기본 상태

---

## Phase 5 — 심화 감상과 상호작용

- 동일한 음악적 사건의 비교 지점 동기화
- 작품별 총보 뷰어
- 퍼블릭 도메인 악보 권리 상태 표시
- 수동 검수 기반 영상·총보 페이지 동기화
- 분위기 취향 프로필
- 설명 가능한 분위기 추천

### 완료 조건

- 최소 2개 교향곡에서 지휘자별 연주 2개 비교 가능
- 최소 10개의 주제 퀴즈 제공
- 최소 10개의 악기군 퀴즈 제공
- 시대별 오케스트라 편성 비교 화면 제공
- 최소 2개 작품에서 검수된 총보 페이지 동기화
- 총보 출처·판본·권리 상태 표시
- 추천 결과에 구체적인 추천 이유 표시
- 모든 심화 기능에 키보드와 텍스트 대안 제공

---

## Phase 6 — 확장과 품질

- 같은 작품의 다른 연주 비교
- 한국 교향악 섹션
- 접근성 테스트
- Lighthouse
- 이미지·iframe 최적화
- 출처 검수
- 모바일 브라우저 테스트
- 오류·빈 상태 개선
- README와 배포 문서

---

## 24. 테스트 요구사항

### 단위 테스트

- 시대·분위기·길이 필터
- 합창 여부 필터
- 검색어 정규화
- 교향곡 번호 검색
- 악장 진행률 계산
- 전체 완주 판정
- 재생 시간 형식
- YouTube ID 검증
- 관련 작품 추천
- localStorage 직렬화와 복구
- 지휘자별 비교 지점 매핑
- 퀴즈 정답과 해설
- 악기군 문제 필터링
- 총보 페이지 오프셋 계산
- 영상 시간과 총보 페이지 동기화
- 분위기 추천 점수와 다양성 보너스
- 퍼블릭 도메인 상태별 fallback

### 컴포넌트 테스트

- SymphonyCard
- SymphonyFilters
- MovementMap
- MovementCard
- ThemeCard
- ListeningTimeline
- ListeningModeSelector
- MovementCompletionButton
- ContinueListeningCard
- PlaybackErrorFallback
- GlossaryPopover
- PerformanceComparison
- ThemeQuizCard
- InstrumentQuizCard
- OrchestraEraTimeline
- ScoreViewer
- ScoreSyncController
- MoodPreferencePicker
- RecommendationReasonCard

### E2E

1. 홈에서 오늘의 한 악장 선택
2. 작품 상세 이동
3. `첫 5분` 재생
4. 핵심 주제 카드 확인
5. 악장 지도에서 다른 악장 선택
6. 타임라인으로 구간 이동
7. 악장 완료
8. 이어 듣기 확인
9. 작품 찜하기
10. 분위기 필터 사용
11. `베토벤 5` 검색
12. 영상 오류 fallback
13. 모바일 메뉴
14. 키보드만으로 주요 흐름 완료
15. 같은 작품의 두 연주 비교
16. 주제 퀴즈 반복 재생과 정답 확인
17. 악기군 퀴즈 완료
18. 시대별 오케스트라 규모 비교
19. 총보 페이지 자동·수동 이동
20. 악보 원본 사이트 fallback
21. 분위기 선택 후 추천과 추천 이유 확인

### 브라우저

- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

---

## 25. MVP 완료 기준

- 반응형 홈
- 처음이라면
- 반드시 들어야 할 교향곡 목록
- 최소 20개 교향곡 데이터
- 최소 10개의 완전한 상세 페이지
- 최소 10개의 검수된 영상
- 악장 지도
- 악장별 쉬운 설명
- 주제 카드
- 실제 영상 기준 타임라인
- `첫 5분`, `한 악장`, `전체 듣기`
- 시대·분위기·작곡가·악기군 필터
- 30분·7일 입문 코스
- 용어 25개 이상
- 찜·최근·악장 완료·전체 완주 저장
- 이어 듣기
- 최소 2개 작품의 지휘자별 비교
- 주제 퀴즈와 악기군 퀴즈
- 시대별 오케스트라 규모 변화 화면
- 최소 2개 작품의 검수된 총보 연동
- 퍼블릭 도메인 악보 권리·출처 표시
- 분위기 취향 기반 추천과 추천 이유
- 한글·영문 검색
- 기본 SEO
- 접근성
- 출처 데이터
- README
- lint, typecheck, production build 성공

---

## 26. 보안과 저작권

- API 키를 저장소에 커밋하지 않음
- 외부 URL 허용 도메인 검증
- YouTube ID 형식 검증
- 사용자 입력 XSS 방어
- 관리자 기능은 인증과 권한 분리
- 음원·영상 다운로드 기능 금지
- 앨범 커버와 공연 사진 무단 저장 금지
- 퍼블릭 도메인 악보도 판본 이미지 권리를 별도 확인
- 분석 도구 사용 시 개인정보 보호 정책 검토
- MVP에서는 불필요한 개인정보 수집 금지

---

## 27. README 필수 내용

- 프로젝트 소개
- 기술 스택
- 설치
- 개발 서버 실행
- lint
- typecheck
- production build
- 환경 변수
- 데이터 추가 방법
- 교향곡 추가 방법
- 악장과 주제 데이터 작성 방법
- YouTube 영상 검수 방법
- 타임라인 검수 방법
- 출처 작성 방법
- localStorage 데이터 구조
- 배포
- 알려진 TODO

---

## 28. Z.ai Coding Plan 최종 프롬프트

```text
이 문서에 따라 “Symphony Guide — 처음 만나는 교향곡” 반응형 웹앱을 구현해 주세요.

핵심 사용자는 교향곡을 처음 듣는 사람입니다. 긴 작품을 한 번에 완주하도록 강요하지 말고, ‘첫 5분’, ‘한 악장만’, ‘전체 교향곡’의 세 가지 진입 방식을 제공하세요.

사용자가 작품을 선택하면 쉬운 배경 설명, 전체 악장 지도, 추천 시작 악장, 기억할 핵심 주제, 주요 악기와 실제 영상 기준 타임라인을 확인하고 페이지 안에서 바로 감상할 수 있어야 합니다.

Next.js, React, TypeScript strict와 Tailwind CSS를 사용하세요. 초기 데이터는 정적 TypeScript로 분리하고 나중에 DB로 이전하기 쉬운 구조로 만드세요. 찜, 최근 감상, 악장별 완료, 전체 완주, 이어 듣기와 코스 진도는 localStorage에 저장하세요.

YouTube 영상은 공식 오케스트라, 지휘자, 연주자, 음반사와 권리 보유 채널을 우선하세요. 검증하지 않은 영상 ID, 악장 시작 시간, 타임라인, 지휘자와 오케스트라 정보를 임의로 만들지 말고 TODO_VERIFY로 남기세요. 목록 화면에서는 iframe을 렌더링하지 말고 사용자 클릭 시에만 개인정보 보호 강화 도메인으로 로드하세요.

교향곡 번호, 조성, 작품번호, 별칭, 악장과 채택 연주 버전을 구분해서 저장하세요. 작품의 역사와 감상 방법을 분리하고, 확인되지 않은 유명 일화를 사실처럼 단정하지 마세요.

먼저 샘플 교향곡 10개로 홈 → 작품 목록 → 작품 상세 → 악장 지도 → 페이지 내 재생 → 주제 카드 → 타임라인 → 악장 완료 → 관련 작품의 전체 흐름을 완성하세요. 이후 최초 수록 권장 작품을 20개 이상으로 확장하세요.

같은 작품의 지휘자별 비교 기능에서는 단순히 같은 초를 재생하지 말고 동일한 음악적 사건별 비교 지점을 따로 저장하세요. 연주에 절대 순위를 부여하지 말고 템포, 강약, 악기 균형과 프레이즈 차이를 쉬운 문장으로 안내하세요.

악보를 읽지 않는 주제 퀴즈와 악기군 맞히기를 제공하세요. 짧은 듣기 구간, 반복 재생, 오답 해설과 접근성 있는 텍스트 대안을 포함하세요.

시대별 오케스트라 규모와 편성 변화를 시각화하되 대표 범위를 절대적인 정답처럼 표시하지 마세요.

작품별 총보 연동은 퍼블릭 도메인 또는 명시적으로 허가된 판본만 사용하세요. 영상 시간과 총보 페이지는 편집자가 검수한 지점으로 연결하고, 자동 동기화를 끌 수 있게 하세요. 작곡 자체와 현대 편집판·스캔 이미지의 권리를 구분하세요.

사용자의 분위기 취향 추천은 설명 가능한 점수 기반 로직으로 시작하세요. 추천 이유를 표시하고 같은 작곡가와 시대만 반복하지 않도록 다양성 규칙을 적용하세요.

모바일 우선 반응형 디자인, 키보드 접근성, 명확한 focus, 충분한 대비, prefers-reduced-motion, 영상 fallback과 페이지별 SEO를 포함하세요.

작업은 Phase 1부터 순서대로 진행하고 각 단계 종료 시 구현 내용, 변경 파일, 테스트 결과와 남은 TODO를 보고하세요. 마지막에 lint, typecheck와 production build를 실행해 모든 오류를 수정하세요.
```

---

## 29. 향후 확장 아이디어

- 공연 실황과 스튜디오 녹음 비교
- 악장 사이의 주제 관계 시각화
- 공연장과 오케스트라 소개
- 국내 교향악단 공연 일정
- 한국 작곡가 교향악 큐레이션
- 어린이용 쉬운 모드
- 시니어용 큰 글씨 모드
- 감상 노트
- 플레이리스트 공유
- 다국어 지원
- PWA
- 관리자 CMS

---

## 30. 최종 UX 원칙

1. 긴 작품보다 지금 들을 한 악장을 먼저 보여 준다.
2. 이론보다 기억할 주제와 악기를 먼저 안내한다.
3. 전체를 완주하지 않아도 성취감을 제공한다.
4. 악장 구조를 쉬운 이야기 흐름으로 설명한다.
5. 같은 작품의 여러 연주에 절대적인 정답을 부여하지 않는다.
6. 작곡가의 별칭과 유명 일화를 무검증 상태로 사용하지 않는다.
7. 실제 채택 영상과 타임라인을 항상 연결해 관리한다.
8. 한국 교향악을 부가 콘텐츠가 아닌 확장 경로로 제공한다.
9. 모바일에서 재생, 악장 선택과 완료가 쉬워야 한다.
10. 사용자가 “교향곡은 너무 길고 어렵다”에서 “한 악장 더 들어보고 싶다”로 이동하게 한다.
