# Listen Guide — 음악 감상 가이드 모음

재즈·클래식·교향곡 입문 가이드와 오디오 테스트를 한 곳에 모은 반응형 웹앱. 첫 화면에서 가이드를 선택하면, 대표곡을 **페이지 안에서 바로 재생**하고 짧은 설명과 감상 포인트, 타임라인 가이드를 따라갈 수 있습니다.

## 가이드 구성

| 가이드 | 경로 | 내용 |
|---|---|---|
| **Jazz Guide** | `/jazz` | 필수 16곡, 입문 코스 2개, 시대·스타일·분위기 탐색, 아티스트, 용어 사전 |
| **Classic Guide** | `/classic` | 클래식 31곡(한국 클래식 포함), 시대·편성·지역 필터, 작품 상세 감상 가이드 |
| **Symphony Guide** | `/symphony` | 교향곡 30편, 세 가지 감상 모드(첫 5분·한 악장·전체), 검증된 악장 지도 seek |
| **Audio Test** | `/audio-test` | 테스트 곡 20선(한국 10선), 평가 항목 10개, A/B 비교 곡, 음원 서비스 링크 |

첫 화면(`/`)에서 가이드를 선택합니다. 헤더의 가이드 탭으로 언제든 이동할 수 있습니다.

## 기술 스택

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (디자인 토큰은 `src/app/globals.css`의 CSS 변수로 관리)
- **Lucide React** 아이콘
- YouTube **IFrame Player API** (개인정보 보호 강화 도메인 `youtube-nocookie` 사용)
- 사용자 상태(찜·감상 완료·최근 감상·코스 진도·최근 검색어)는 **localStorage**에만 저장 (서버 전송 없음)

## 실행 방법

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 실행
npm run lint       # ESLint
npm run typecheck  # TypeScript 검사
npm run verify-videos  # 수록곡의 YouTube 영상 ID 존재 여부 검증 (oEmbed)
```

## 주요 기능

| 가이드 | 주요 기능 |
|---|---|
| **재즈** (`/jazz`) | 홈(오늘의 추천·첫 5곡), 필수곡 목록(URL 필터·정렬), 곡 상세(임베드 재생·타임라인 seek·감상 포인트·관련 곡), 30분·7일 코스, 시대·스타일·분위기·악기 탐색, 아티스트, 용어 사전(팝오버), 나의 재즈, 통합 검색 |
| **클래식** (`/classic`) | 홈(첫 5곡·시대 탐색·한국 클래식), 31곡 목록(시대·지역·편성·난이도 필터), 작품 상세(감상 가이드·배경·연주 정보·다음 추천) |
| **교향곡** (`/symphony`) | 홈(세 가지 감상 모드·첫 10곡), 30편 목록(악장 지도 완료 필터), 상세(악장 지도 seek·추천 시작 악장·지휘자/오케스트라 정보) |
| **오디오 테스트** (`/audio-test`) | 홈(10개 평가 항목·한국 곡), 20곡 목록(항목·보컬·지역 필터), 곡 상세(체크 포인트·잘 들리는 상태/경고 신호·음원 서비스 링크·A/B 비교), 평가 항목 안내 |

### 접근성 · UX

- 키보드만으로 내비게이션 · 필터 · 플레이어 · 타임라인 조작 가능 (focus ring 유지)
- `prefers-reduced-motion` 지원 (이퀄라이저 등 모션 정지)
- 모바일 하단 내비게이션, 터치 타깃 44px 이상
- iframe은 사용자가 클릭한 시점에만 로드(lite embed), 목록 화면에는 iframe 없음
- 영상 재생 오류 시 대체 영상 / YouTube 검색 링크 fallback

## 콘텐츠 추가 방법

모든 콘텐츠는 `src/data/`의 정적 TypeScript 데이터입니다. 가이드별 데이터 파일은 외부 작성본을 그대로 적용한 구조입니다.

- 재즈: `tracks.ts`(수정 가능), `artists.ts`, `eras.ts` 등
- 클래식: `classicTracks.ts` — 31곡, `video.status: "TODO_VERIFY"`인 곡은 검색 링크 폴백으로 표시
- 교향곡: `symphonyTimelines.ts` — 검증된 악장 타임라인(`verifiedSymphonyTimelines`)은 seek 가능, `timelineDrafts`는 읽기 전용
- 오디오 테스트: `audioTestTracks.ts` — 20곡, 음원 서비스 검색 링크 기반

**영상 ID 확정 절차** (모든 가이드 공통):

1. 공식 채널/권리 보유자 영상에서 ID를 확정한다. 확정 전에는 반드시 `TODO_VERIFY_VIDEO_ID`(또는 데이터 파일의 TODO 상태)로 남긴다.
2. `npm run verify-videos`로 ID 존재 여부를 확인한다 (oEmbed 기반).
3. `node scripts/check-timeline.mjs`로 길이·타임라인 정합성을 검증한다.
4. 타임라인 초 단위는 최종 채택 영상을 실제로 들으며 검수한다.
5. 출처(sources)를 반드시 남긴다. Wikipedia 단일 출처를 피한다.

## YouTube · 저작권 정책

- 영상은 직접 호스팅하지 않고 공식 임베드(`youtube-nocookie`)로만 제공한다.
- 앨범 커버 등 외부 이미지를 저장·재배포하지 않는다(카드 표지는 자체 그라디언트 사용).
- `반드시 들어야 할 곡`은 편집자의 입문 큐레이션이며 절대적 우열이 아니다.
- 다운로드 기능은 제공하지 않는다.

## 배포

Vercel 등 Next.js 호스팅에 바로 배포 가능하다. 환경변수로 `NEXT_PUBLIC_SITE_URL`(서비스 URL)을 설정하면 sitemap·metadata가 정확한 절대 URL을 생성한다. API 키는 커밋하지 않는다(`.env.example` 참고).

## 알려진 TODO

- [x] 재즈 16곡 + 교향곡 30편(악장 지도) + 클래식 30곡 + 오디오 테스트 20곡의 YouTube 영상 연결 완료
  - 클래식·오디오·교향곱 초안은 **조회수 정렬 검색 기반 자동 선정**(2026-10-04, oEmbed 존재 확인) — 채널·조회수는 `scripts/apply-video-selections.mjs`에 기록
  - 일부 교향곡은 전체가 아닌 단일 악장 영상(partial 표기), 봉선화·그리그 아침의 기분 등 6곡은 적합 영상 미확인으로 검색 링크 폴백 유지
- [x] 각 재즈 영상 길이(durationSeconds) 실측 검증 완료 — 2026-10-04, IFrame API `getDuration()` 기준
- [ ] 자동 선정 영상의 사람 검수(공식 채널 여부·임베드 허용·부분 영상 여부)
- [ ] 타임라인의 **구간 위치(초)** 는 초안값 — 실제 영상을 들으며 최종 검수 필요 (코드에 TODO 표기)
- [ ] 가이드별 용어 사전·입문 코스·개인화 페이지 (재즈는 구현 완료)
- [ ] 자막 제공 여부 표시, 라이트 모드 세부 대비 재점검

## 디렉터리 구조

```text
src/
├─ app/            # 라우트 (App Router)
├─ components/     # layout / tracks / player / discovery / courses / glossary / ui
├─ context/        # JazzContext (localStorage 사용자 상태)
├─ data/           # 정적 콘텐츠 (tracks, artists, eras, styles, moods, courses, glossary, instruments)
├─ lib/            # youtube, storage, search, utils
└─ types/          # 데이터 모델
scripts/
└─ verify-videos.mjs  # 영상 ID 검증 스크립트
```
