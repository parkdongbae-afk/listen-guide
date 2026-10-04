# Jazz Guide 웹앱 개발 작업지시서

> 문서명: `jazz_do.md`  
> 프로젝트명: **Jazz Guide — 처음 만나는 재즈**  
> 대상 작업 도구: **Z.ai Coding Plan**  
> 서비스 형태: 반응형 웹앱  
> 기본 언어: 한국어  
> 핵심 사용자: 재즈를 처음 듣는 사람, 유명한 곡부터 체계적으로 듣고 싶은 사람

---

## 1. 프로젝트 개요

재즈에 관심은 있지만 아래와 같은 이유로 쉽게 시작하지 못하는 초보자를 위한 웹앱을 개발한다.

- 어떤 음악부터 들어야 하는지 모른다.
- 재즈 장르와 시대 구분이 어렵다.
- 아티스트와 명반이 너무 많아 선택하기 어렵다.
- 곡을 들어도 무엇을 집중해서 들어야 하는지 모른다.
- 설명을 읽고 다시 YouTube를 검색해야 하는 과정이 번거롭다.

이 웹앱은 재즈 입문자에게 **추천 순서, 쉬운 설명, 감상 포인트, 시대·스타일 정보, 웹페이지 안에서 바로 재생할 수 있는 YouTube 플레이어**를 제공한다.

서비스는 백과사전처럼 정보를 나열하는 방식보다 다음 흐름을 중심으로 설계한다.

> 곡 발견 → 간단한 설명 확인 → 페이지 안에서 감상 → 감상 포인트 이해 → 관련 곡으로 확장

---

## 2. 프로젝트 목표

### 핵심 목표

1. 사용자가 고민하지 않고 첫 번째 재즈곡을 선택할 수 있게 한다.
2. 전문용어를 최소화하고 쉬운 한국어로 재즈를 설명한다.
3. 반드시 들어야 할 대표곡을 시대, 분위기, 악기, 난이도별로 제공한다.
4. 모든 곡 상세 페이지에 YouTube 임베드 플레이어를 제공한다.
5. 각 곡에서 무엇을 들어야 하는지 타임라인 또는 감상 포인트로 안내한다.
6. 사용자가 좋아하는 스타일을 찾도록 관련 곡과 다음 곡을 추천한다.
7. 모바일과 데스크톱에서 모두 편안하게 사용할 수 있게 한다.

### 성공 기준

- 신규 사용자가 홈 화면에서 10초 안에 곡 재생을 시작할 수 있다.
- 각 곡 상세 페이지에서 곡 설명과 감상 포인트를 바로 이해할 수 있다.
- 영상 재생이 불가능한 경우 대체 영상이나 YouTube 열기 기능을 제공한다.
- 사용자가 들은 곡, 찜한 곡, 학습 진도를 확인할 수 있다.
- WCAG 수준을 고려한 키보드 탐색과 명확한 대비를 제공한다.

---

## 3. 권장 기술 스택

Z.ai Coding Plan은 아래 구성을 우선 사용한다.

### 프론트엔드

- **Next.js 최신 안정 버전**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** 또는 이에 준하는 접근성 높은 UI 컴포넌트
- 아이콘: **Lucide React**
- 상태 관리:
  - 초기 버전은 React Context 또는 Zustand
  - 서버 데이터는 Next.js Server Components 또는 TanStack Query 사용 가능

### 데이터 및 백엔드

초기 MVP는 정적 데이터로 구현한다.

- `data/tracks.ts`
- `data/artists.ts`
- `data/genres.ts`
- `data/playlists.ts`
- `data/glossary.ts`

확장 버전에서는 다음 중 하나를 사용한다.

- Supabase
- PostgreSQL + Prisma
- Firebase

### 사용자 설정 저장

로그인 없는 MVP:

- `localStorage`에 찜 목록, 감상 완료 여부, 최근 감상 곡 저장
- localStorage 접근은 클라이언트에서만 실행하여 hydration 오류 방지

확장 버전:

- 이메일 또는 소셜 로그인
- 사용자별 플레이리스트와 진도 동기화

### YouTube

- YouTube IFrame Player API 또는 `react-youtube`
- 영상 정보 자동 조회가 필요한 경우 YouTube Data API v3
- API 키는 반드시 환경변수로 관리
- API 키를 클라이언트 코드에 직접 노출하지 않는다.

예시 환경변수:

```env
YOUTUBE_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 4. 디자인 방향

### 콘셉트

**오래된 재즈 레코드 라이브러리와 현대적인 스트리밍 앱의 결합**

### 시각적 키워드

- 따뜻함
- 깊은 밤
- 레코드
- 작은 재즈 바
- 황동 악기
- 빈티지 포스터
- 차분하지만 낡아 보이지 않는 디자인

### 권장 색상

- 배경: 짙은 네이비 또는 차콜 `#111318`
- 카드: `#1A1D24`
- 주요 강조색: 브라스 골드 `#D8A84E`
- 보조 강조색: 버건디 `#7A3145`
- 본문: 따뜻한 아이보리 `#F3EBDD`
- 보조 텍스트: `#AAA69D`

라이트 모드도 지원하되 기본 디자인은 다크 모드에 최적화한다.

### 타이포그래피

- 한글 본문: Pretendard 또는 Noto Sans KR
- 영문 제목: 재즈 포스터 느낌의 세리프 글꼴 사용 가능
- 본문 가독성을 해치므로 장식 글꼴을 긴 설명에 사용하지 않는다.

### 애니메이션

- 카드 hover 시 약한 상승 효과
- 페이지 전환은 짧은 fade
- 재생 중인 곡에는 작은 이퀄라이저 애니메이션
- 과도한 회전 레코드 효과나 배경 애니메이션은 금지
- `prefers-reduced-motion`을 존중한다.

---

## 5. 전체 정보 구조와 메뉴

데스크톱 상단 내비게이션과 모바일 하단 내비게이션을 제공한다.

### 필수 메뉴

1. **홈**
2. **처음이라면**
3. **반드시 들어야 할 곡**
4. **시대별 재즈**
5. **스타일별 재즈**
6. **분위기로 찾기**
7. **아티스트**
8. **재즈 용어**
9. **나의 재즈**
10. **검색**

메뉴가 너무 많아 보이지 않도록 데스크톱에서는 일부 메뉴를 `둘러보기` 드롭다운으로 묶어도 된다.

### 권장 메뉴 구조

```text
홈
├─ 오늘의 추천
├─ 5곡으로 시작하기
├─ 입문 코스
└─ 최근 인기 콘텐츠

처음이라면
├─ 재즈란 무엇인가
├─ 30분 입문 코스
├─ 7일 입문 코스
├─ 악기별 듣는 법
└─ 즉흥연주를 듣는 법

반드시 들어야 할 곡
├─ 입문 필수 10곡
├─ 재즈 스탠더드
├─ 명연주
├─ 명반 속 대표곡
└─ 에디터 추천

둘러보기
├─ 시대별
├─ 스타일별
├─ 분위기별
├─ 악기별
└─ 아티스트별

나의 재즈
├─ 찜한 곡
├─ 최근 들은 곡
├─ 감상 완료
└─ 나만의 플레이리스트
```

---

## 6. 핵심 화면

## 6.1 홈 화면

홈 화면은 설명보다 **바로 듣기**에 집중한다.

### 구성 순서

1. 헤더와 검색
2. 히어로 섹션
3. `재즈가 처음인가요? 이 5곡부터 들어보세요`
4. 오늘의 추천 곡
5. 기분으로 고르는 재즈
6. 30분 입문 코스
7. 시대별 재즈 탐색
8. 악기별 대표 연주
9. 재즈 용어 한 개
10. 푸터

### 히어로 문구 예시

**재즈, 무엇부터 들어야 할지 모르겠다면**

어려운 이론보다 좋은 한 곡부터 시작해 보세요.  
대표곡을 듣고, 짧은 설명과 감상 포인트를 따라가며 나만의 재즈 취향을 찾을 수 있습니다.

CTA:

- `첫 곡 들어보기`
- `30분 입문 코스`
- `취향으로 곡 찾기`

### 첫 5곡 카드

- Dave Brubeck Quartet — Take Five
- Miles Davis — So What
- Louis Armstrong — What a Wonderful World
- Ella Fitzgerald & Louis Armstrong — Cheek to Cheek
- John Coltrane — My Favorite Things

각 카드에는 아래 항목을 표시한다.

- 앨범 커버 또는 아티스트 이미지
- 곡명
- 아티스트
- 연도
- 스타일
- 입문 난이도
- 한 줄 설명
- 재생 버튼
- 찜 버튼
- 감상 완료 체크

---

## 6.2 `처음이라면` 화면

재즈 초보자를 위한 가이드 허브다.

### 콘텐츠 카드

- 재즈는 왜 연주할 때마다 다르게 들릴까?
- 스윙이란 무엇일까?
- 즉흥연주는 아무렇게나 연주하는 것일까?
- 재즈 밴드의 악기 구성
- 멜로디, 솔로, 컴핑, 리듬 섹션 구분하기
- 박수는 언제 쳐야 할까?
- 재즈 공연을 처음 보러 갈 때 알아둘 점

### 입문 코스

#### 30분 코스

1. 보컬 재즈
2. 쿨 재즈
3. 스윙
4. 하드 밥
5. 모달 재즈

각 단계에서 1곡을 들려주고 2~3문장의 설명을 제공한다.

#### 7일 코스

- 1일차: 익숙한 멜로디
- 2일차: 스윙 리듬
- 3일차: 보컬 재즈
- 4일차: 블루스와 재즈
- 5일차: 비밥과 빠른 즉흥연주
- 6일차: 쿨 재즈와 모달 재즈
- 7일차: 현대 재즈로 확장

진도율과 완료 체크 기능을 제공한다.

---

## 6.3 `반드시 들어야 할 재즈 곡` 화면

### 필터

- 시대
- 스타일
- 분위기
- 대표 악기
- 보컬/연주곡
- 입문 난이도
- 연주 시간
- 감상 완료 여부

### 정렬

- 입문 추천순
- 시대순
- 곡명순
- 짧은 곡부터
- 인기순
- 최근 추가순

### 화면 구성

- 상단 설명
- 필터 칩
- 데스크톱 카드 그리드
- 모바일 리스트
- 무한 스크롤보다 페이지네이션 또는 `더 보기` 사용
- URL query parameter로 필터 상태 유지

예:

```text
/must-listen?style=cool-jazz&difficulty=beginner
```

---

## 6.4 곡 상세 화면

경로 예시:

```text
/tracks/so-what
/tracks/take-five
```

### 필수 영역

1. 곡명, 아티스트, 앨범, 발표 연도
2. 스타일 태그
3. 난이도
4. YouTube 임베드 플레이어
5. 곡 한 줄 소개
6. 곡의 배경
7. 왜 반드시 들어야 하는가
8. 초보자 감상 포인트
9. 주요 악기와 연주자
10. 타임라인 감상 가이드
11. 어려운 용어 설명
12. 비슷한 곡
13. 다음 추천 곡
14. 찜, 공유, 감상 완료
15. 영상 오류 시 대체 재생 UI

### 상세 설명 작성 규칙

모든 설명은 다음 원칙을 따른다.

- 전문용어를 사용하면 바로 쉬운 설명을 붙인다.
- 첫 문단은 2~3문장으로 짧게 작성한다.
- 음악적 역사와 감상 방법을 분리한다.
- 확인되지 않은 일화나 단정적인 평가는 넣지 않는다.
- 한 곡당 본문은 약 500~1,000자 수준으로 시작한다.
- 아티스트명, 앨범명, 작곡자, 녹음 연도, 발표 연도를 구분한다.
- 여러 버전이 존재하는 스탠더드는 현재 소개하는 연주 버전을 명확하게 표시한다.

### 감상 타임라인 예시

시간은 실제 채택한 YouTube 영상 기준으로 작성해야 한다.

```text
00:00  베이스가 곡의 기본 패턴을 제시합니다.
00:32  트럼펫이 여백이 많은 주제를 연주합니다.
01:45  색소폰 솔로가 시작됩니다.
03:20  피아노가 짧은 화음으로 솔로를 받쳐줍니다.
```

타임라인 항목을 클릭하면 YouTube 플레이어가 해당 시점으로 이동하게 구현한다.

---

## 7. 최초 수록 권장 곡

아래 목록을 MVP의 기본 큐레이션으로 사용한다. 단, 실제 서비스에 넣기 전 곡 정보, 연주 버전, 연도, 앨범, YouTube 영상의 임베드 가능 여부를 검수한다.

### 가장 먼저 들을 10곡

| 순서 | 곡 | 대표 연주자 | 입문 포인트 |
|---:|---|---|---|
| 1 | Take Five | Dave Brubeck Quartet | 기억하기 쉬운 멜로디와 5박자 |
| 2 | So What | Miles Davis | 여백과 모달 재즈의 분위기 |
| 3 | What a Wonderful World | Louis Armstrong | 친숙한 보컬과 독특한 음색 |
| 4 | Cheek to Cheek | Ella Fitzgerald & Louis Armstrong | 남녀 보컬의 대화 |
| 5 | My Favorite Things | John Coltrane | 익숙한 멜로디가 즉흥연주로 확장되는 과정 |
| 6 | Blue in Green | Miles Davis | 느리고 서정적인 재즈 |
| 7 | C Jam Blues | Duke Ellington | 단순한 멜로디와 블루스 구조 |
| 8 | Moanin' | Art Blakey and the Jazz Messengers | 강한 리듬과 하드 밥 |
| 9 | Autumn Leaves | Cannonball Adderley 또는 Bill Evans 버전 | 대표적인 재즈 스탠더드 |
| 10 | Sing, Sing, Sing | Benny Goodman | 빅밴드와 스윙의 에너지 |

### 추가 필수 곡

- Louis Armstrong — West End Blues
- Duke Ellington — Take the “A” Train
- Billie Holiday — Strange Fruit
- Charlie Parker — Ko-Ko
- Thelonious Monk — ’Round Midnight
- Dizzy Gillespie — A Night in Tunisia
- Miles Davis — Freddie Freeloader
- John Coltrane — Naima
- John Coltrane — Giant Steps
- Charles Mingus — Goodbye Pork Pie Hat
- Art Blakey — Blues March
- Herbie Hancock — Cantaloupe Island
- Wes Montgomery — Four on Six
- Stan Getz & João Gilberto — The Girl from Ipanema
- Ella Fitzgerald — Summertime
- Nina Simone — I Put a Spell on You
- Bill Evans Trio — Waltz for Debby
- Sonny Rollins — St. Thomas
- Lee Morgan — The Sidewinder
- Weather Report — Birdland
- Chick Corea — Spain
- Pat Metheny Group — Last Train Home
- Esperanza Spalding — I Know You Know
- Robert Glasper Experiment — Afro Blue
- Kamasi Washington — Street Fighter Mas

### 저작권과 표현상 주의

- `반드시 들어야 할 곡`은 편집자의 입문 큐레이션이라는 점을 표시한다.
- 순위를 절대적인 음악적 우열처럼 표현하지 않는다.
- 앨범 커버를 무단으로 저장하거나 재배포하지 않는다.
- 외부 이미지 사용 시 라이선스와 이용 조건을 확인한다.
- YouTube 영상은 직접 호스팅하지 않고 공식 임베드 방식으로 제공한다.

---

## 8. 샘플 곡 상세 콘텐츠

아래 샘플은 화면과 데이터 모델을 구현하기 위한 초안이다. 실제 영상 타임스탬프는 최종 YouTube 영상 선정 후 수정한다.

### 8.1 Take Five

**곡:** Take Five  
**아티스트:** The Dave Brubeck Quartet  
**작곡:** Paul Desmond  
**스타일:** Cool Jazz, West Coast Jazz  
**추천 난이도:** 매우 쉬움  
**대표 악기:** 알토 색소폰, 피아노, 드럼

#### 한 줄 소개

익숙한 멜로디와 독특한 5박자 리듬 덕분에 재즈를 처음 듣는 사람도 쉽게 기억할 수 있는 곡이다.

#### 왜 들어야 하나

대부분의 대중음악이 4박자를 사용하는 것과 달리 이 곡은 다섯 박이 한 묶음으로 움직인다. 하지만 복잡하게 계산하며 들을 필요는 없다. 반복되는 피아노 리듬과 색소폰 멜로디를 따라가다 보면 자연스럽게 독특한 박자를 느낄 수 있다.

#### 감상 포인트

- 피아노가 반복하는 짧은 리듬
- 부드럽고 건조한 알토 색소폰 음색
- 드럼 솔로 중에도 계속 유지되는 곡의 박자
- 솔로가 끝난 뒤 처음 멜로디로 돌아오는 순간

#### 다음 추천

- Dave Brubeck Quartet — Blue Rondo à la Turk
- Paul Desmond — Take Ten
- Miles Davis — So What

---

### 8.2 So What

**곡:** So What  
**아티스트:** Miles Davis  
**앨범:** Kind of Blue  
**스타일:** Modal Jazz  
**추천 난이도:** 쉬움  
**대표 악기:** 트럼펫, 테너 색소폰, 알토 색소폰, 피아노, 베이스

#### 한 줄 소개

많은 음을 빠르게 연주하기보다 여백, 음색, 분위기가 얼마나 강한 인상을 만들 수 있는지 보여주는 모달 재즈의 대표곡이다.

#### 왜 들어야 하나

복잡한 코드가 빠르게 바뀌는 비밥과 달리 이 곡은 비교적 제한된 화성 공간 안에서 연주자들이 멜로디를 만들어 간다. 초보자는 이론보다 각 연주자의 소리와 문장 길이가 어떻게 다른지 비교해 들으면 된다.

#### 감상 포인트

- 도입부의 조용하고 신비로운 피아노와 베이스
- 베이스 질문에 악기들이 대답하는 듯한 주제
- Miles Davis의 짧고 여유 있는 트럼펫
- John Coltrane의 밀도 높은 테너 색소폰
- 같은 곡 안에서 연주자별 표현 방식이 달라지는 과정

#### 쉬운 용어

**모달 재즈:** 코드가 계속 빠르게 바뀌기보다 일정한 음계와 분위기 안에서 멜로디를 자유롭게 펼치는 재즈 방식.

---

### 8.3 My Favorite Things

**곡:** My Favorite Things  
**아티스트:** John Coltrane  
**스타일:** Modal Jazz  
**추천 난이도:** 보통  
**대표 악기:** 소프라노 색소폰

#### 한 줄 소개

뮤지컬의 친숙한 노래가 반복과 즉흥연주를 통해 강렬하고 몰입감 있는 재즈로 변하는 과정을 들을 수 있다.

#### 감상 포인트

- 원곡에서도 쉽게 알아볼 수 있는 멜로디
- 소프라노 색소폰의 날카롭고 맑은 음색
- 반복되는 피아노 패턴
- 익숙한 주제가 점차 멀리 확장되는 과정
- 긴 솔로 뒤 주제가 다시 등장할 때의 안정감

---

### 8.4 Moanin'

**곡:** Moanin'  
**아티스트:** Art Blakey and the Jazz Messengers  
**작곡:** Bobby Timmons  
**스타일:** Hard Bop  
**추천 난이도:** 쉬움  
**대표 악기:** 피아노, 트럼펫, 테너 색소폰, 드럼

#### 한 줄 소개

가스펠과 블루스의 느낌, 힘 있는 드럼, 질문과 대답 구조가 결합된 하드 밥 입문곡이다.

#### 감상 포인트

- 피아노의 짧은 질문과 관악기의 대답
- 몸을 움직이게 하는 강한 그루브
- Art Blakey의 추진력 있는 드럼
- 솔로와 합주가 번갈아 등장하는 구조

---

### 8.5 Autumn Leaves

스탠더드 곡은 특정 연주자 버전을 선택하여 소개한다.

#### 필수 표시

- `이 페이지는 [연주자명]의 [앨범명] 수록 버전을 설명합니다.`
- 작곡자와 작사가
- 원곡과 재즈 스탠더드로 발전한 배경
- 다른 추천 버전 3개
- 같은 멜로디가 연주자에 따라 어떻게 달라지는지 비교 설명

---

## 9. YouTube 임베드 요구사항

## 9.1 기본 동작

- 외부 링크만 제공하지 말고 상세 페이지 안에 YouTube 플레이어를 삽입한다.
- 반응형 16:9 비율을 유지한다.
- 사용자가 재생하기 전에는 썸네일과 재생 버튼을 보여 주는 lite embed 방식을 권장한다.
- 초기 페이지 로딩 시 YouTube iframe을 모두 동시에 불러오지 않는다.
- 영상은 사용자가 클릭할 때 로드한다.
- 상세 페이지에는 영상 한 개를 주 플레이어로 표시한다.
- 관련 곡 카드에서는 자동 재생하지 않는다.
- 자동 재생과 배경 재생을 기본값으로 사용하지 않는다.

## 9.2 개인정보 보호

가능하면 개인정보 보호 강화 모드를 사용한다.

```text
https://www.youtube-nocookie.com/embed/{VIDEO_ID}
```

## 9.3 영상 데이터

각 곡은 다음 필드를 가진다.

```ts
type VideoSource = {
  youtubeVideoId: string;
  title: string;
  channelName: string;
  isOfficial: boolean;
  isEmbeddable: boolean;
  startSeconds?: number;
  fallbackVideoId?: string;
  lastVerifiedAt: string;
};
```

### 영상 선정 우선순위

1. 아티스트 또는 음반사의 공식 채널
2. 권리 보유자가 제공한 공식 오디오
3. 검증된 라이선스 파트너 채널
4. 그 외 출처는 관리자 검수 후 제한적으로 사용

### 영상 오류 처리

YouTube 영상은 삭제, 지역 제한, 임베드 제한이 발생할 수 있다.

아래 UX를 반드시 구현한다.

- `이 영상은 현재 페이지에서 재생할 수 없습니다.`
- 대체 영상이 있으면 `대체 영상 재생`
- 대체 영상이 없으면 `YouTube에서 확인`
- 오류 발생 시 전체 페이지가 깨지지 않게 한다.
- 데이터에 `lastVerifiedAt`을 저장한다.
- 관리자용 검수 스크립트 또는 체크리스트를 제공한다.

### 타임라인 제어

YouTube IFrame API를 사용하여 감상 포인트 클릭 시 해당 시간으로 이동한다.

```ts
player.seekTo(seconds, true);
player.playVideo();
```

키보드로도 타임라인 버튼을 선택할 수 있어야 한다.

---

## 10. 데이터 모델

## 10.1 Track

```ts
export type Track = {
  id: string;
  slug: string;
  title: string;
  titleKo?: string;
  artistIds: string[];
  primaryArtistName: string;

  composerNames: string[];
  albumTitle?: string;
  recordingYear?: number;
  releaseYear?: number;

  eraId: string;
  styleIds: string[];
  moodIds: string[];
  instrumentIds: string[];

  durationSeconds?: number;
  hasVocals: boolean;
  difficulty: "very-easy" | "easy" | "medium" | "advanced";

  shortDescription: string;
  introduction: string;
  historicalContext: string;
  whyItMatters: string;
  listeningPoints: ListeningPoint[];
  timeline: TimelinePoint[];
  glossaryTermIds: string[];

  video: VideoSource;
  alternateVideos?: VideoSource[];

  albumImageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageLicense?: string;

  relatedTrackIds: string[];
  nextTrackId?: string;

  featured: boolean;
  mustListenRank?: number;
  editorialTags: string[];

  sources: ContentSource[];
  contentReviewedAt: string;
};
```

## 10.2 TimelinePoint

```ts
export type TimelinePoint = {
  seconds: number;
  label: string;
  description: string;
  instrumentIds?: string[];
};
```

## 10.3 Artist

```ts
export type Artist = {
  id: string;
  slug: string;
  name: string;
  nameKo?: string;
  birthYear?: number;
  deathYear?: number;
  country?: string;
  primaryInstrumentIds: string[];
  shortBio: string;
  biography: string;
  keyTrackIds: string[];
  imageUrl?: string;
  imageAlt?: string;
  sources: ContentSource[];
};
```

## 10.4 사용자 로컬 데이터

```ts
export type UserJazzState = {
  favoriteTrackIds: string[];
  completedTrackIds: string[];
  recentlyPlayed: {
    trackId: string;
    playedAt: string;
    lastPositionSeconds?: number;
  }[];
  customPlaylists: {
    id: string;
    name: string;
    trackIds: string[];
    createdAt: string;
  }[];
};
```

---

## 11. 시대와 스타일 분류

초보자가 혼동하지 않도록 시대와 스타일을 완전히 동일한 개념처럼 보여 주지 않는다.

### 시대별 탐색

- 재즈의 뿌리와 초기 재즈
- 1920년대: 뉴올리언스와 초기 재즈
- 1930년대: 스윙과 빅밴드
- 1940년대: 비밥
- 1950년대: 쿨 재즈와 하드 밥
- 1960년대: 모달과 프리 재즈
- 1970년대: 퓨전
- 1980~1990년대
- 2000년대 이후 현대 재즈

### 스타일별 탐색

- Swing
- Big Band
- Bebop
- Cool Jazz
- Hard Bop
- Modal Jazz
- Vocal Jazz
- Bossa Nova / Jazz Samba
- Free Jazz
- Soul Jazz
- Jazz Fusion
- Contemporary Jazz

각 스타일 페이지에는 아래 내용을 넣는다.

1. 한 문장 정의
2. 어려운 설명을 제외한 핵심 특징 3개
3. 대표 악기
4. 처음 들을 3곡
5. 더 깊게 들을 5곡
6. 대표 아티스트
7. 앞뒤 스타일과의 관계

---

## 12. 분위기별 탐색

초보자는 장르명보다 상황과 기분으로 음악을 찾는 경우가 많으므로 중요한 기능으로 구현한다.

### 분위기 태그 예시

- 편안한 밤
- 비 오는 날
- 카페
- 집중할 때
- 드라이브
- 로맨틱
- 활기찬
- 쓸쓸한
- 따뜻한
- 긴장감 있는
- 실험적인
- 아침에 듣기 좋은
- 늦은 밤 혼자 듣기 좋은

### 취향 찾기 질문

간단한 3단계 추천 UI를 제공한다.

1. 보컬이 있는 음악을 원하는가?
2. 차분한 음악과 활기찬 음악 중 어느 쪽인가?
3. 익숙한 멜로디와 실험적인 연주 중 어느 쪽인가?

결과로 3~5곡을 추천하고 각 추천 이유를 한 줄로 표시한다.

---

## 13. 아티스트 화면

### 아티스트 목록

- 악기
- 시대
- 스타일
- 보컬/연주자
- 이름 검색

### 상세 페이지

- 짧은 소개
- 주요 활동 시기
- 대표 악기
- 음악적 특징
- 처음 들을 3곡
- 대표 앨범
- 함께 연주한 주요 음악가
- 관련 스타일
- YouTube에서 바로 듣기
- 입문자에게 추천하는 감상 순서

역사적 사실은 출처를 저장하고 검수 가능한 구조로 작성한다.

---

## 14. 재즈 용어 사전

초보자용으로 짧고 쉬운 설명을 제공한다.

### 최초 등록 용어

- 스윙
- 즉흥연주
- 솔로
- 컴핑
- 리듬 섹션
- 스탠더드
- 블루스
- 리프
- 워킹 베이스
- 브러시
- 빅밴드
- 잼 세션
- 콜 앤드 리스폰스
- 싱코페이션
- 코드
- 모드
- 헤드
- 코러스
- 트레이딩 포스
- 보이싱

### 용어 설명 형식

```text
용어
한 줄 설명
조금 더 알아보기
이 용어를 들을 수 있는 대표곡
관련 용어
```

곡 상세 페이지에서 용어를 클릭하면 페이지를 이탈하지 않고 작은 팝오버로 뜻을 볼 수 있게 한다.

---

## 15. 검색 기능

### 통합 검색 대상

- 곡
- 아티스트
- 앨범
- 스타일
- 시대
- 악기
- 분위기
- 재즈 용어

### 검색 UX

- 한글과 영문명을 모두 검색 가능하게 한다.
- 예: `마일스 데이비스`, `Miles Davis`
- 오타 교정은 선택 기능이다.
- 최근 검색어를 로컬에 저장한다.
- 검색 결과가 없을 때 추천 키워드를 보여 준다.
- `/search?q=miles` 형태로 URL 공유가 가능해야 한다.
- 검색 결과를 유형별로 구분한다.

---

## 16. 공통 컴포넌트

다음 컴포넌트를 재사용 가능하게 구현한다.

```text
AppHeader
DesktopNavigation
MobileBottomNavigation
GlobalSearch
HeroSection
TrackCard
TrackListItem
TrackGrid
TrackFilters
TrackSort
YouTubePlayer
LiteYouTubeEmbed
PlaybackErrorFallback
ListeningTimeline
ListeningPointCard
ArtistCard
StyleCard
MoodChip
DifficultyBadge
FavoriteButton
CompletionButton
ShareButton
ProgressRing
CourseCard
GlossaryPopover
RelatedTracks
SourceList
EmptyState
ErrorState
SkeletonLoader
AppFooter
```

---

## 17. 반응형 요구사항

### 모바일

- 하단 내비게이션 제공
- 카드보다 세로 리스트 중심
- YouTube 플레이어를 화면 폭에 맞춤
- 필터는 bottom sheet로 표시
- 주요 재생 버튼은 엄지손가락으로 누르기 쉬운 크기
- 터치 타깃 최소 44px 권장

### 태블릿

- 2열 카드
- 필터는 drawer 또는 상단 칩

### 데스크톱

- 3~4열 카드
- 상세 화면은 플레이어와 설명을 2열로 구성 가능
- 긴 본문은 최대 폭을 제한하여 가독성 확보

---

## 18. 접근성

- 모든 이미지에 의미 있는 `alt` 제공
- 장식 이미지는 빈 alt 사용
- 모든 버튼에 명확한 accessible name 제공
- 키보드만으로 메뉴, 필터, 플레이어 제어 영역 탐색 가능
- focus ring을 제거하지 않는다.
- 색상만으로 상태를 구분하지 않는다.
- 텍스트 대비를 충분히 확보한다.
- 영상 자체 자막 제공 여부를 표시할 수 있게 한다.
- 재생 중 상태를 스크린 리더에 알린다.
- 타임라인의 시간과 설명을 텍스트로 제공한다.
- 모션 감소 설정을 지원한다.

---

## 19. SEO 및 메타데이터

각 곡, 아티스트, 스타일 페이지에 고유한 메타데이터를 생성한다.

### 예시

```ts
title: "So What — 초보자를 위한 곡 설명과 감상 포인트 | Jazz Guide"
description: "Miles Davis의 So What을 페이지에서 바로 듣고, 모달 재즈의 특징과 초보자 감상 포인트를 알아보세요."
```

### 추가 요구

- Open Graph metadata
- Twitter/X card metadata
- canonical URL
- sitemap
- robots.txt
- 구조화 데이터 적용 검토
- 공유 이미지 기본 템플릿

YouTube iframe은 검색 엔진 최적화보다 사용자 경험과 성능을 우선하여 지연 로딩한다.

---

## 20. 성능 요구사항

- Next.js Image 최적화 사용
- iframe lazy loading
- 목록 화면에서는 실제 iframe을 렌더링하지 않는다.
- 홈 화면의 초기 번들 크기를 최소화한다.
- 불필요한 클라이언트 컴포넌트 사용을 피한다.
- 로딩 skeleton 제공
- 이미지 크기를 사전에 지정하여 layout shift 방지
- Lighthouse 기준으로 성능, 접근성, 모범 사례, SEO를 점검한다.
- 저속 모바일 네트워크에서도 핵심 텍스트가 먼저 표시되어야 한다.

---

## 21. 콘텐츠 출처와 검수

재즈 역사, 녹음 정보, 연주자 크레딧은 오류가 발생하기 쉬우므로 각 콘텐츠에 출처를 저장한다.

```ts
export type ContentSource = {
  title: string;
  publisher?: string;
  url: string;
  accessedAt: string;
  note?: string;
};
```

### 콘텐츠 작성 원칙

- Wikipedia 한 곳만을 출처로 사용하지 않는다.
- 공식 아티스트 사이트, 음반사, 음악 기관, 앨범 라이너 노트, 신뢰할 수 있는 음악 데이터베이스를 우선한다.
- 작곡 연도, 녹음 연도, 발표 연도를 혼동하지 않는다.
- 연주자 크레딧은 소개하는 특정 녹음 버전을 기준으로 한다.
- 논쟁이 있는 정보는 단정하지 않고 여러 견해가 있음을 표시한다.
- AI가 생성한 설명은 편집 검수 전 `draft` 상태로 관리한다.
- 외부 문장을 길게 복사하지 않고 직접 요약한다.

---

## 22. 보안 및 운영 주의사항

- API 키를 Git 저장소에 커밋하지 않는다.
- 외부 URL을 렌더링할 때 허용 도메인을 제한한다.
- 사용자 입력을 화면에 표시할 경우 XSS 방어를 적용한다.
- YouTube 영상 ID 형식을 검증한다.
- 관리자 기능 추가 시 인증과 권한을 분리한다.
- 개인정보를 수집하지 않는 MVP에서는 불필요한 추적 도구를 넣지 않는다.
- 분석 도구를 사용할 경우 개인정보 보호 안내와 동의 정책을 검토한다.

---

## 23. 권장 디렉터리 구조

```text
src/
├─ app/
│  ├─ page.tsx
│  ├─ getting-started/
│  │  └─ page.tsx
│  ├─ must-listen/
│  │  └─ page.tsx
│  ├─ tracks/
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ artists/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ eras/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ styles/
│  │  ├─ page.tsx
│  │  └─ [slug]/
│  │     └─ page.tsx
│  ├─ moods/
│  │  └─ page.tsx
│  ├─ glossary/
│  │  └─ page.tsx
│  ├─ my-jazz/
│  │  └─ page.tsx
│  ├─ search/
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ error.tsx
│  └─ not-found.tsx
├─ components/
│  ├─ layout/
│  ├─ tracks/
│  ├─ player/
│  ├─ discovery/
│  ├─ courses/
│  ├─ glossary/
│  └─ ui/
├─ data/
│  ├─ tracks.ts
│  ├─ artists.ts
│  ├─ eras.ts
│  ├─ styles.ts
│  ├─ moods.ts
│  ├─ courses.ts
│  └─ glossary.ts
├─ hooks/
├─ lib/
│  ├─ youtube.ts
│  ├─ search.ts
│  ├─ storage.ts
│  └─ utils.ts
├─ types/
└─ styles/
```

---

## 24. 개발 단계

## Phase 1 — 설계와 기반

- Next.js + TypeScript + Tailwind 프로젝트 생성
- 디자인 토큰과 전역 레이아웃 구현
- 공통 헤더, 내비게이션, 푸터 구현
- 데이터 타입 정의
- 샘플 곡 10개 데이터 작성
- 라우팅과 기본 SEO 설정

완료 조건:

- 모든 주요 경로에 접근 가능
- 모바일과 데스크톱 내비게이션 작동
- TypeScript 오류 없음

## Phase 2 — 핵심 감상 기능

- 곡 목록
- 필터와 정렬
- 곡 상세 페이지
- YouTube lite embed
- 영상 오류 처리
- 타임라인 seek 기능
- 관련 곡 추천

완료 조건:

- 최소 10곡을 페이지 안에서 재생 가능
- 타임라인 클릭 시 해당 구간으로 이동
- 임베드 불가 영상의 fallback 작동

## Phase 3 — 입문 학습 기능

- 30분 코스
- 7일 코스
- 스타일별 페이지
- 시대별 페이지
- 재즈 용어 사전
- 용어 팝오버

완료 조건:

- 코스 완료 상태 저장
- 곡에서 관련 용어를 바로 확인 가능

## Phase 4 — 개인화

- 찜하기
- 최근 들은 곡
- 감상 완료
- 사용자 플레이리스트
- localStorage 저장
- 데이터 초기화 기능

완료 조건:

- 새로고침 후에도 사용자 상태 유지
- 저장 데이터 오류 시 안전한 기본 상태로 복구

## Phase 5 — 품질 개선

- 접근성 테스트
- Lighthouse 점검
- 이미지 및 iframe 성능 최적화
- 콘텐츠 출처 검수
- 모바일 브라우저 테스트
- 오류 화면 및 빈 상태 개선
- 배포 문서 작성

---

## 25. 테스트 요구사항

### 단위 테스트

- 필터 조합
- 검색 결과
- 재생 시간 형식 변환
- localStorage 직렬화와 복구
- 추천 로직
- YouTube ID 검증

### 컴포넌트 테스트

- TrackCard
- FavoriteButton
- CompletionButton
- ListeningTimeline
- PlaybackErrorFallback
- 검색과 필터 UI

### E2E 테스트

1. 홈에서 첫 추천곡 선택
2. 상세 페이지에서 영상 재생
3. 타임라인을 클릭하여 구간 이동
4. 곡 찜하기
5. `나의 재즈`에서 찜한 곡 확인
6. 필터로 보컬 재즈만 검색
7. 모바일 메뉴 사용
8. 임베드 오류 시 대체 영상 사용

### 브라우저

- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

---

## 26. MVP 완료 기준

다음 조건을 모두 충족해야 MVP가 완료된 것으로 본다.

- 반응형 홈 화면
- 초보자 입문 페이지
- 반드시 들어야 할 곡 목록
- 최소 10개의 검수된 곡 상세 페이지
- 각 상세 페이지 내 YouTube 임베드
- 영상 fallback
- 감상 포인트 및 타임라인
- 시대·스타일·분위기 필터
- 아티스트 기본 페이지
- 재즈 용어 20개 이상
- 찜, 최근 감상, 완료 상태 저장
- 한국어 기반 검색
- 기본 SEO
- 접근성 점검
- README와 실행 방법
- 콘텐츠 및 영상 출처 데이터
- 빌드와 lint 성공

---

## 27. Z.ai Coding Plan 실행 지침

아래 순서로 작업한다.

1. 먼저 전체 구현 계획과 파일 구조를 제안한다.
2. 계획 승인 대기 없이 MVP 기준의 기본 프로젝트를 구성한다.
3. 한 번에 거대한 파일을 만들지 말고 기능 단위 컴포넌트로 분리한다.
4. 하드코딩된 UI와 데이터 모델을 분리한다.
5. 첫 구현에서는 샘플 곡 10개로 완전한 사용자 흐름을 만든다.
6. YouTube 영상 ID는 검증된 값만 데이터에 입력한다.
7. 실제 ID를 확인하지 못했으면 임의의 ID를 만들지 말고 `TODO_VERIFY_VIDEO_ID`로 명시한다.
8. 실제 타임라인은 최종 영상별로 검수하여 입력한다.
9. 각 단계 종료 시 변경 파일, 구현 기능, 남은 TODO를 요약한다.
10. 모든 코드에 TypeScript 타입을 적용한다.
11. lint, typecheck, build를 실행하고 오류를 수정한다.
12. 접근성과 모바일 UX를 기능 완료 조건에 포함한다.
13. `.env.example`을 제공하되 실제 API 키는 포함하지 않는다.
14. README에 설치, 실행, 빌드, 배포, 콘텐츠 추가 방법을 작성한다.
15. YouTube 약관과 이미지 저작권을 위반하는 다운로드 기능을 만들지 않는다.

---

## 28. Z.ai에 전달할 최종 프롬프트

다음 내용을 Z.ai Coding Plan에 그대로 전달해도 된다.

```text
이 문서에 정의된 요구사항에 따라 “Jazz Guide — 처음 만나는 재즈” 반응형 웹앱을 구현해 주세요.

핵심 사용자는 재즈를 잘 모르는 초보자입니다. 사용자가 어떤 음악부터 들어야 할지 고민하지 않도록 필수곡, 입문 코스, 시대·스타일·분위기별 탐색, 쉬운 곡 설명과 감상 포인트를 제공해야 합니다.

가장 중요한 기능은 곡 상세 페이지 안에서 YouTube 영상을 바로 재생하는 것입니다. 단순 외부 링크 목록으로 만들지 마세요. YouTube IFrame API 또는 안정적인 React wrapper를 이용하고, iframe 지연 로딩, 개인정보 보호 강화 도메인, 임베드 오류 fallback, 대체 영상, 타임라인 seek 기능을 구현해 주세요.

Next.js, React, TypeScript, Tailwind CSS를 사용하세요. 초기 데이터는 정적 TypeScript 데이터로 분리하고, 나중에 DB로 이전하기 쉬운 타입 구조를 만드세요. 찜, 최근 감상, 감상 완료와 플레이리스트는 MVP에서 localStorage에 저장하세요.

먼저 샘플 곡 10개로 홈 → 곡 목록 → 곡 상세 → 페이지 내 재생 → 감상 포인트 → 관련 곡 → 찜/완료의 전체 흐름을 완성하세요. 검증하지 않은 YouTube 영상 ID나 음악 정보를 임의로 만들지 마세요. 확인되지 않은 값은 TODO로 남기세요.

모바일 우선 반응형 디자인, 키보드 접근성, 명확한 focus 상태, 충분한 색상 대비, prefers-reduced-motion 지원을 포함하세요. 페이지별 SEO 메타데이터도 생성하세요.

작업은 Phase 1부터 순서대로 진행하고, 각 Phase 종료 시 구현 내용, 변경 파일, 테스트 결과, 남은 TODO를 보고하세요. 마지막에 lint, typecheck, production build를 실행하고 모든 오류를 수정하세요.
```

---

## 29. 향후 확장 아이디어

MVP 이후 별도 단계에서 검토한다.

- Spotify 또는 Apple Music 연결
- 곡별 여러 연주 버전 비교
- `같은 스탠더드, 다른 연주` 비교 플레이어
- 사용자의 취향 기반 추천
- 재즈 공연 일정
- 국내 재즈 클럽 안내
- 앨범 단위 감상 코스
- 음악 퀴즈
- 악기 음색 맞히기
- 감상 노트
- 소셜 플레이리스트 공유
- 관리자 CMS
- 다국어 지원
- PWA와 오프라인 텍스트 읽기
- 주간 재즈 뉴스레터

음원이나 YouTube 영상을 오프라인 저장하는 기능은 권리와 플랫폼 약관 문제가 있으므로 구현하지 않는다.

---

## 30. 최종 UX 원칙

1. 첫 화면에서 이론보다 음악을 먼저 들려준다.
2. 설명은 짧게 시작하고 원하는 사람만 더 읽게 한다.
3. 전문용어보다 `어디를 어떻게 들으면 좋은지`를 먼저 알려준다.
4. 재즈의 정답을 강요하지 않는다.
5. 순위보다 발견과 연결에 집중한다.
6. 모든 곡에는 다음에 들을 곡이 있어야 한다.
7. 영상이 작동하지 않아도 사용자 흐름이 중단되지 않아야 한다.
8. 초보자가 자신이 음악을 잘못 듣고 있다고 느끼게 하지 않는다.
9. 데스크톱보다 모바일 감상 경험을 우선한다.
10. 정보의 정확성과 콘텐츠 출처를 디자인 품질만큼 중요하게 취급한다.
