# Listen Guide — 작업 요약 (SUMMARY)

> 재즈·클래식·교향곡 입문 가이드 + 오디오 테스트를 하나로 모은 반응형 웹앱
> 작성일: 2026-10-04 · 스펙: jazz_do.MD / CLASS_DO.MD / SYMPHONY.MD / AUDIO_DO.MD / guideline.MD

---

## 1. 프로젝트 개요

첫 화면(`/`)에서 4개 가이드를 선택하는 구조. 모든 가이드의 곡 상세 페이지 안에서 YouTube 영상을 바로 재생하며, 감상 포인트·타임라인·감상 기록이 이어진다.

| 가이드 | 경로 | 규모 | 핵심 기능 |
|---|---|---|---|
| Jazz Guide | `/jazz` | 16곡 | 필수곡 목록(URL 필터·정렬), 상세 재생, 타임라인 seek(실측), 30분·7일 코스, 시대·스타일·분위기·악기 탐색, 아티스트, 용어 사전(팝오버), 나의 재즈, 검색 |
| Classic Guide | `/classic` | 31곡(한국 4곡) | 입문 코스(31곡 진도), 작품 목록(시대·지역·편성·난이도 필터), 상세 감상 가이드, 구간 찾기 퀴즈 |
| Symphony Guide | `/symphony` | 30편 | 7일 입문 코스, 목록(악장 지도 완료 필터), 악장 지도(베토벤 5·3번 실측 seek, 나머지 퀴즈), 감상 모드 3종 |
| Audio Test | `/audio-test` | 20곡(한국 10곡) | 10개 평가 항목, 카테고리·보컬·지역 필터, 곡 상세(임베드+체크 포인트 퀴즈+음원 링크 5종), A/B 비교 곡 |
| 공통 | `/guideline`, `/notes` | — | 감상 가이드라인 전문, 나의 감상 기록(전 가이드 집약) |

## 2. 기술 스택

- Next.js 15 (App Router, 정적 생성 200+ 페이지) · React 19 · TypeScript strict · Tailwind CSS v4 · Lucide React
- YouTube IFrame Player API (`youtube-nocookie` 개인정보 보호 모드, lite embed — 클릭 시에만 iframe 로드)
- 사용자 데이터(찜·완료·최근 감상·코스 진도·검색어·감상 기록·퀴즈 시간)는 **localStorage에만 저장**(서버 전송 없음)
- 접근성: 키보드 전 경로 조작, focus ring 유지, `prefers-reduced-motion`, aria 라벨, 모바일 하단 내비, 터치 타깃 44px+

## 3. 주요 구현

### 3.1 플레이어 (전 가이드 공통)
- lite embed → 클릭 시 IFrame API 로드 → `youtube-nocookie` 재생
- **클라이언트 내비게이션 대응**: 분리된 인스턴스 중단 가드, 곡별 강제 리마운트(`key`), 지연 확정 파라미터 재시도
- 영상 오류(삭제·비공개·임베드 제한) 시 대체 영상 / YouTube 검색 링크 폴백
- `PlayerContext`로 seek·getCurrentTime을 자식 컴포넌트에 제공 (타임라인·퀴즈가 사용)

### 3.2 구간 찾기 퀴즈 (클래식·교향곡·오디오)
- "이 구간 찾기" → 영상을 해당 순간에 멈추고 "● 지금 이 순간 입력" → `getCurrentTime()`으로 초 캡처
- 캡처된 구간은 "N:NN 위치로 이동" 버튼으로 재이동 가능, localStorage 저장, 초기화 지원
- 서버 추정치(영상 길이 비례)는 "예상 위치" 힌트로만 표시되며 **시간이 틀릴 수 있음을 UI에 명시**

### 3.3 감상 기록 시스템
- guideline.MD §6 템플릿 기반 폼: 인상적인 악기 / 전체 분위기 / 기억에 남은 순간 / 별점(1-5) / 한 줄 감상
- 4개 가이드 전 상세 페이지 하단에 폼, `/notes`에서 가이드별 집약 조회·삭제

### 3.4 코스
- 재즈: 30분 코스(5곡)·7일 코스(7곡) — 진도 저장
- 클래식: 31곡 입문 코스(시대별 그룹 + 진도 링)
- 교향곡: 7일 코스(DAY 1~7, 추천 시작 악장 안내)

### 3.5 탐색·검색·SEO
- 클래식/오디오: URL 쿼리 필터 + 정렬, 교향곡: 악장 지도 완료 필터
- 재즈 통합 검색(한글/영문, 최근 검색어), 페이지별 메타데이터, sitemap.xml, robots.txt

## 4. YouTube 영상 데이터 파이프라인

1. **재즈 16곡**: librarian 조사 + oEmbed 검증 (공식 채널: VEVO·Topic·Verve 등) + 길이 실측(getDuration)
2. **클래식 31 / 오디오 20 / 교향곡 초안 28**: YouTube 검색(조회수 정렬) → 곡명 적합성 스코어링 → 최다 조회수 영상 자동 선정
   - 도구: `scripts/build-video-jobs.mjs`(작업 생성) → Playwright 검색 수집 → `scripts/apply-video-selections.mjs`(데이터 적용)
   - 6곡(봉선화·그리그 아침의 기분·마러 1·차이 4·모차르트 41·윤이상 2)은 적합 영상 미확인 → **검색 링크 폴백 유지**
3. **검증**: `npm run verify-videos`(oEmbed 존재 확인), `node scripts/check-timeline.mjs`(길이·타임라인 정합성), 임베드 재생 브라우저 실측

⚠️ 자동 선정 영상은 일부 부분 영상(단일 악장)이거나 비공식 채널일 수 있다(`partial` 표기). 공개 전 사람 클릭 검수 권장.

## 5. 검증 상태

- `tsc --noEmit` 0 오류 · `eslint` 0 오류 · `next build` 성공(200+ 페이지 SSG)
- 전 라우트 HTTP 200, 존재하지 않는 slug 404 처리
- 브라우저 실측(Playwright): 허브→가이드 이동, 클래식/재즈 클릭 재생, 교향곡 자동재생+악장 seek, 퀴즈 시간 캡처, 감상 기록 저장→/notes 표시, 코스 진도 저장 — 전부 통과

## 6. 실행 방법

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # 프로덕션
npm run verify-videos            # 영상 ID 존재 검증
node scripts/check-timeline.mjs  # 타임라인 정합성 검증
```

환경변수: `.env.example` 참고 — `NEXT_PUBLIC_SITE_URL`(배포 URL)만 설정하면 동작. API 키 불필요.

## 7. 디렉터리 구조

```text
src/
├─ app/                # 라우트 (jazz/ classic/ symphony/ audio-test/ guideline/ notes/)
├─ components/         # layout / tracks / player / guides / discovery / courses / glossary / ui
├─ context/            # JazzContext (localStorage 상태)
├─ data/               # tracks, classicTracks, symphonyTimelines, symphonyVideos,
│                      # audioTestTracks, audioTestVideos, artists, eras, styles, moods, glossary, courses, instruments
├─ lib/                # guides(레지스트리), classic, symphony, audioTest, notes, youtube, storage, search, utils
├─ types/              # 데이터 모델 + YouTube API 타입
scripts/
├─ verify-videos.mjs       # 영상 ID oEmbed 검증
├─ check-timeline.mjs      # 타임라인/길이/참조 정합성
├─ build-video-jobs.mjs    # 조회수 검색 작업 생성
└─ apply-video-selections.mjs  # 선정 결과 데이터 적용
```

## 8. 남은 과제

- [ ] 자동 선정 영상의 사람 검수(공식 채널 교체, 부분 영상 확인) — `partial`/`검증전` 표기로 구분됨
- [ ] 타임라인 구간 초 단위 청취 검수 (현재 추정치 — UI에 명시)
- [ ] 클래식·교향곡·오디오 용어 사전/검색/개인화(찜·최근) 확장 (재즈는 완료)
- [ ] 자막 제공 여부 표시, 라이트 모드 대비 재점검

## 9. 배포 (Vercel)

GitHub 푸시 후 vercel.com에서 리포지토리 Import → Framework Preset 자동 인식(Next.js) → Deploy.
환경변수 `NEXT_PUBLIC_SITE_URL`에 배포 URL 설정 권장(sitemap·metadata 절대 URL). 자세한 절차는 README.md 참고.
