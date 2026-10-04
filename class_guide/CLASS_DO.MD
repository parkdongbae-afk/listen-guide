# Classic Guide 웹앱 개발 작업지시서

> 문서명: `classic_do.MD`  
> 프로젝트명: **Classic Guide — 처음 만나는 클래식**  
> 대상 작업 도구: **Z.ai Coding Plan**  
> 서비스 형태: 반응형 웹앱  
> 기본 언어: 한국어  
> 핵심 사용자: 클래식을 처음 듣는 사람, 유명한 작품부터 시대·악기·편성별로 확장하고 싶은 사람  
> 데이터 기준일: 2026-10-04

---

## 0. Z.ai Coding Plan 빠른 실행 지침

이 문서는 기존의 다음 3개 파일을 하나로 통합한 최종 작업지시서다.

1. `classic_do.MD` — 클래식 입문 웹앱 요구사항
2. `class_traks.ts` — 클래식 입문 작품 31곡 데이터
3. `youtube_classic_guide.MD` — 작품별 YouTube 검색 링크와 영상 검수 기준

부록 A에는 `class_traks.ts` 전체 소스가, 부록 B에는 YouTube 링크 가이드가 포함되어 있다.

1. 부록 A를 `src/data/classTraks.ts`에 그대로 저장한다.
2. 부록 B의 검색 링크와 검수 기준을 사용해 각 작품의 공식 연주 영상을 확정한다.
3. 영상이 확정되기 전에는 `TODO_VERIFY_VIDEO_ID`를 유지하고 검색 링크 fallback을 제공한다.
4. `CLASSIC_TRACKS`를 홈·목록·상세·시대·편성·한국 클래식·검색 화면의 단일 데이터 소스로 사용한다.
5. 31곡을 다시 조사하거나 페이지별 배열로 복제하지 않는다.
6. `TODO_VERIFY_VIDEO_ID`, `seconds: null`, 미확정 연주 정보는 임의로 채우지 않는다.
7. 먼저 텍스트 설명과 감상 포인트가 완전하게 작동하도록 구현한다.
8. 영상과 타임라인은 공식 연주 버전을 확정한 뒤 연결한다.
9. `nextTrackIds`와 `relatedTrackIds`는 실제 존재하는 ID만 안전하게 표시한다.
10. 즐겨찾기·최근 감상·감상 완료 상태는 정적 데이터와 분리해 `localStorage`에 저장한다.
11. `isKorean`으로 한국 클래식 화면을 구성한다.
12. 테스트 점수, A/B 비교, 음질 평가 기능은 구현하지 않는다.

### 이 프로젝트가 하지 않는 것

- 오디오 기기 성능 테스트
- 곡에 대한 절대 순위 부여
- 어려운 음악 이론 중심의 강의
- 음원 다운로드 또는 오프라인 저장
- 검증하지 않은 연주자·영상 정보 생성

---

## 0.1 통합 파일 적용 순서

### Step 1 — 데이터 적용

- 부록 A를 `src/data/classTraks.ts`로 생성한다.
- 원본 다운로드 파일명은 `class_traks.ts`이며, 프로젝트 내부에서는 TypeScript 관례에 맞춰 `classTraks.ts`를 사용한다.
- `CLASSIC_TRACKS` 31곡을 앱 전체의 단일 데이터 소스로 사용한다.
- 페이지마다 별도 작품 배열을 만들지 않는다.
- 즐겨찾기와 감상 완료 상태는 정적 데이터와 분리한다.

### Step 2 — 기본 화면 완성

- 홈
- 처음이라면
- 반드시 들어야 할 작품
- 작품 상세
- 시대별
- 편성별
- 악기별
- 작곡가별
- 한국 클래식
- 검색
- 나의 클래식

영상 검수 전에도 작품 설명, 배경, 감상 포인트와 관련 작품 탐색은 정상 작동해야 한다.

### Step 3 — YouTube 후보 선정

- 부록 B의 작품별 검색 링크를 사용한다.
- 공식 연주자·오케스트라·음악 기관·레이블 채널을 우선한다.
- 검색 결과 URL 자체를 iframe 또는 `youtubeVideoId`로 사용하지 않는다.
- 최종 선택 영상의 11자리 ID만 저장한다.
- 전체 작품 영상이면 소개 악장의 시작 초를 기록한다.
- 연주자, 지휘자, 오케스트라, 합창단과 앨범 정보를 함께 저장한다.

### Step 4 — 타임라인 검수

- 최종 영상 하나를 확정한 작품만 초 단위 타임라인을 입력한다.
- `seconds: null`인 작품에서는 감상 설명만 표시하고 seek 버튼을 숨긴다.
- 다른 연주 영상의 시간을 복사하지 않는다.
- 영상 변경 시 타임라인을 다시 검수한다.

### Step 5 — 검증과 완료

- 영상 공개 상태와 공식성
- 작품과 악장 일치
- 임베드 가능 여부
- 지역 제한
- 연주자 크레딧
- fallback 영상 또는 검색 링크
- lint
- typecheck
- production build

---

## 0.2 통합 데이터 충돌 해결 원칙

세 파일 사이에 내용이 다르면 다음 우선순위를 적용한다.

1. **수록곡과 상세 텍스트:** 부록 A의 `class_traks.ts`
2. **영상 검색 및 선정 규칙:** 부록 B의 YouTube 가이드
3. **화면·기능·UX 요구사항:** 본문 `CLASS_DO.MD`
4. **미확정 데이터:** 추측하지 않고 `TODO_VERIFY`
5. **작품 수:** 총 31곡
6. **서비스 목적:** 오디오 테스트가 아닌 클래식 입문 가이드

### 통합 과정에서 수정한 내용

- 기존 문서의 20곡 표기를 실제 데이터 기준인 31곡으로 변경했다.
- 데이터 파일명을 `class_traks.ts`로 통일했다.
- 프로젝트 내부 권장 경로를 `src/data/classTraks.ts`로 명시했다.
- 오래된 부록 데이터를 최신 31곡 데이터로 교체했다.
- YouTube 검색 링크와 실제 영상 ID를 명확히 분리했다.
- 공식 영상 미확정 상태에서도 텍스트 중심 MVP를 개발할 수 있게 했다.

---

## 1. 프로젝트 개요

클래식에 관심은 있지만 무엇부터 들어야 할지 모르는 입문자를 위한 웹앱을 개발한다.

- 시대와 작곡가가 너무 많아 시작하기 어렵다.
- 작품번호와 악장 표기가 복잡하다.
- 교향곡, 협주곡, 소나타와 실내악의 차이를 모른다.
- 긴 작품을 처음부터 끝까지 들어야 한다는 부담이 있다.
- 곡을 들어도 어떤 악기와 흐름에 집중해야 하는지 모른다.
- 설명을 읽고 다시 YouTube를 검색하는 과정이 번거롭다.

서비스의 핵심 흐름은 다음과 같다.

> 작품 발견 → 쉬운 설명 확인 → 페이지 안에서 감상 → 감상 포인트 이해 → 관련 작품으로 확장

---

## 2. 프로젝트 목표

1. 고민하지 않고 첫 클래식 작품을 선택하게 한다.
2. 유명한 악장과 짧은 작품부터 시작하게 한다.
3. 바로크·고전주의·낭만주의·인상주의·현대 음악을 쉬운 말로 설명한다.
4. 작품명, 작곡가, 작품번호와 악장을 구분해 보여 준다.
5. 곡 상세 페이지 안에서 공식 YouTube 영상을 재생한다.
6. 실제 영상 기준의 감상 타임라인을 제공한다.
7. 악기와 편성, 분위기와 난이도로 작품을 찾게 한다.
8. 한국 가곡과 한국 작곡가의 관현악 작품도 핵심 큐레이션에 포함한다.
9. 찜, 최근 감상과 완료 상태를 브라우저에 저장한다.
10. 모바일과 데스크톱에서 편안하게 이용하게 한다.

### 성공 기준

- 사용자가 홈에서 10초 안에 첫 작품 재생을 시작한다.
- 작품번호를 몰라도 한글 제목과 분위기로 검색할 수 있다.
- 상세 페이지에서 작곡 배경과 감상 포인트를 쉽게 이해한다.
- 긴 작품은 먼저 들을 악장과 구간을 안내받는다.
- 한 작품을 들은 뒤 같은 시대·악기·분위기의 다음 작품으로 이동한다.

---

## 3. 권장 기술 스택

- Next.js 최신 안정 버전
- React
- TypeScript strict
- Tailwind CSS
- 접근성 높은 UI 컴포넌트
- Lucide React
- YouTube IFrame Player API 또는 안정적인 wrapper
- 정적 TypeScript 데이터
- 사용자 상태는 localStorage
- 확장 시 Supabase 또는 PostgreSQL + Prisma

---

## 4. 디자인 방향

### 콘셉트

- 무겁고 권위적인 박물관보다 편안한 음악 가이드
- 따뜻한 아이보리, 짙은 네이비와 차분한 금색 포인트
- 작곡가 초상과 악보 이미지는 저작권·라이선스를 확인한 자료만 사용
- 이미지가 없으면 시대와 편성별 자체 그라디언트 사용
- 작품 카드에서 한글 작품명을 가장 크게 표시
- 작품번호는 보조 정보로 표시

### 애니메이션

- 카드 hover 시 약한 상승
- 페이지 전환은 짧은 fade
- 재생 중 작품에 작은 이퀄라이저
- 과도한 음표·악보 애니메이션 금지
- `prefers-reduced-motion` 지원

---

## 5. 전체 메뉴

1. 홈
2. 처음이라면
3. 반드시 들어야 할 작품
4. 시대별 클래식
5. 편성별 클래식
6. 악기별 클래식
7. 분위기로 찾기
8. 작곡가
9. 한국 클래식
10. 클래식 용어
11. 나의 클래식
12. 검색

```text
홈
├─ 오늘의 추천
├─ 5곡으로 시작하기
├─ 한국 클래식
└─ 최근 인기 콘텐츠

처음이라면
├─ 클래식 음악이란?
├─ 30분 입문 코스
├─ 7일 입문 코스
├─ 오케스트라 악기 듣는 법
├─ 작품명과 작품번호 읽는 법
└─ 긴 작품 듣는 법

둘러보기
├─ 시대별
├─ 편성별
├─ 악기별
├─ 분위기별
└─ 작곡가별
```

---

## 6. 핵심 화면

## 6.1 홈

1. 헤더와 검색
2. 히어로
3. `클래식이 처음인가요? 이 5곡부터 들어보세요`
4. 오늘의 추천 작품
5. 분위기로 고르기
6. 30분 입문 코스
7. 시대별 탐색
8. 악기별 대표 작품
9. 한국 클래식
10. 클래식 용어 한 개
11. 푸터

### 첫 5곡

1. 비발디 — 사계 중 봄 1악장
2. 모차르트 — 아이네 클라이네 나흐트무지크 1악장
3. 베토벤 — 교향곡 5번 1악장
4. 쇼팽 — 녹턴 작품 9-2
5. 생상스 — 동물의 사육제 중 백조

---

## 6.2 처음이라면

### 콘텐츠 카드

- 교향곡과 협주곡은 무엇이 다를까?
- 작품번호 Op., K., BWV는 무엇일까?
- 한 작품에 악장이 여러 개인 이유
- 오케스트라의 악기 배치
- 바이올린, 비올라, 첼로와 더블베이스 구분하기
- 지휘자는 실제로 무엇을 할까?
- 연주자에 따라 같은 곡이 달라지는 이유
- 박수는 언제 쳐야 할까?
- 긴 교향곡을 부담 없이 듣는 방법

### 30분 코스

1. 표제 음악 — 비발디 《봄》
2. 고전주의 — 모차르트 《아이네 클라이네 나흐트무지크》
3. 교향곡 — 베토벤 교향곡 5번
4. 낭만주의 피아노 — 쇼팽 녹턴
5. 인상주의 — 드뷔시 《달빛》

### 7일 코스

- 1일차: 익숙한 멜로디
- 2일차: 독주 악기
- 3일차: 실내악
- 4일차: 협주곡
- 5일차: 교향곡
- 6일차: 발레와 표제 음악
- 7일차: 한국 클래식과 현대 음악

---

## 6.3 반드시 들어야 할 작품 목록

### 필터

- 시대
- 국가·한국 클래식
- 장르
- 연주 형태
- 주요 악기
- 분위기
- 입문 난이도
- 예상 감상 시간
- 감상 완료 여부

### 정렬

- 입문 추천순
- 시대순
- 작품명순
- 작곡가순
- 짧은 곡부터
- 최근 추가순

### 카드 표시 정보

- 한글 작품명
- 원어 작품명
- 작곡가 한글·영문명
- 작품번호
- 시대
- 편성
- 주요 악기
- 난이도
- 한 줄 소개
- 재생
- 찜
- 감상 완료

---

## 6.4 작품 상세

1. 작품명, 악장, 작곡가와 작품번호
2. 시대, 국가, 장르와 편성
3. 최종 채택한 연주자·지휘자·오케스트라·앨범
4. YouTube 임베드
5. 한 줄 소개
6. 작품의 배경
7. 왜 반드시 들어야 하는가
8. 초보자 감상 포인트
9. 주요 악기와 역할
10. 실제 영상 기준 타임라인
11. 어려운 용어 설명
12. 같은 시대 작품
13. 비슷한 편성의 작품
14. 다음 추천 작품
15. 찜·공유·감상 완료
16. 영상 오류 fallback
17. 출처와 판본·연주 정보

### 설명 규칙

- 첫 문단은 2~3문장으로 짧게 쓴다.
- 역사와 감상 방법을 분리한다.
- 작품명, 악장, 작품번호와 연주 버전을 구분한다.
- 별칭이 작곡가가 직접 붙인 것인지 확인한다.
- 확인되지 않은 일화는 넣지 않는다.
- 전문용어 뒤에는 쉬운 설명을 붙인다.
- 초보자에게 작품 전체 완주를 강요하지 않는다.
- 한 작품당 본문은 약 500~1,000자로 시작한다.
- 같은 작품의 다른 연주를 추천할 수 있지만 현재 소개 버전을 명시한다.

### 타임라인

```text
00:00  첫 주제가 어떤 악기로 시작하는지 들어봅니다.
00:35  같은 주제를 다른 악기군이 이어받습니다.
01:20  반주와 강약이 달라지며 분위기가 변합니다.
02:10  처음의 주제가 돌아오는지 확인합니다.
```

실제 시간은 최종 채택한 영상별로 검수한다.

---

## 7. 확장 수록 작품

부록 A의 `CLASSIC_TRACKS` 31곡을 확장 데이터로 사용한다.

### 시대별 구성

- 바로크: 비발디, 바흐, 헨델
- 고전주의: 모차르트
- 고전주의에서 낭만주의로: 베토벤
- 낭만주의: 슈베르트, 쇼팽, 차이콥스키, 드보르자크, 생상스
- 인상주의: 드뷔시
- 20세기: 라벨, 홀스트
- 한국 클래식: 홍난파, 김동진, 최성환

### 한국 클래식

- 홍난파 — 봉선화
- 김동진 — 가고파
- 최성환 — 아리랑 환상곡

한국 작품은 부가 코너가 아니라 홈, 입문 코스와 관련 작품 추천에 함께 노출한다.

---

## 8. YouTube 요구사항

- 목록 화면에는 iframe을 렌더링하지 않는다.
- 사용자가 클릭할 때만 iframe을 로드한다.
- `youtube-nocookie.com`을 우선한다.
- 공식 연주자·오케스트라·레이블 채널을 우선한다.
- 검증하지 않은 ID는 `TODO_VERIFY_VIDEO_ID`로 유지한다.
- 최종 영상별로 타임라인을 검수한다.
- 자동 재생과 배경 재생을 기본값으로 사용하지 않는다.
- 임베드 실패 시 대체 영상과 YouTube 검색 링크를 제공한다.
- 음원 다운로드 기능을 제공하지 않는다.

---

## 9. 데이터 적용

```ts
export {
  CLASSIC_TRACKS,
  CLASSIC_FILTERS,
  CLASSIC_SORT_OPTIONS,
  getClassicTrackById,
  getKoreanClassicTracks,
  getClassicTracksByEra,
  getClassicTracksByForm,
  resolveClassicTracks,
  toClassicTrackCard,
} from "@/data/classTraks";
```

### 미검수 상태

- `durationSeconds === null`: `연주 시간 검수 중`
- `video.status === "TODO_VERIFY"`: 썸네일 대신 기본 작품 카드
- `timeline[].seconds === null`: 설명만 표시하고 seek 비활성화
- `recording.status === "TODO_VERIFY"`: `소개 연주 선정 중`
- 관리자·개발 환경에서만 상세 TODO 경고 표시

---

## 10. 클래식 용어

- 시대
- 바로크
- 고전주의
- 낭만주의
- 인상주의
- 현대 음악
- 교향곡
- 협주곡
- 소나타
- 모음곡
- 세레나데
- 녹턴
- 가곡
- 실내악
- 독주
- 악장
- 작품번호
- 주제
- 동기
- 변주
- 소나타 형식
- 론도
- 오케스트레이션
- 크레셴도
- 루바토
- 지휘자
- 악기군
- 현악기
- 목관악기
- 금관악기
- 타악기

---

## 11. 개인화

- 찜한 작품
- 최근 들은 작품
- 감상 완료
- 코스 진행률
- 나만의 플레이리스트
- 최근 검색어
- localStorage 저장
- 초기화와 손상 데이터 복구

오디오 기기 점수, 성능 비교와 테스트 세션은 포함하지 않는다.

---

## 12. 검색

검색 대상:

- 한글·원어 작품명
- 작곡가 한글·영문명
- 작품번호
- 시대
- 장르
- 편성
- 악기
- 분위기
- 클래식 용어

예:

```text
/search?q=베토벤
/search?q=첼로
/search?q=봄
/search?q=BWV
```

---

## 13. 접근성과 성능

- 키보드로 메뉴·필터·플레이어·타임라인 조작
- 명확한 focus ring
- 색상 이외의 상태 표시
- 타임라인 시간과 설명을 텍스트로 제공
- `prefers-reduced-motion`
- 모바일 터치 타깃 44px 이상
- iframe lazy loading
- 목록에서 iframe 금지
- 이미지 크기 사전 지정
- 로딩 skeleton
- 저속 네트워크에서 텍스트 우선 표시

---

## 14. 콘텐츠 검수

- 공식 작곡가 재단, 음악 기관, 오케스트라, 연주자와 레이블 출처 우선
- 작품번호와 악장 표기 확인
- 작곡 연도, 초연 연도와 음반 발매 연도 구분
- 별칭의 유래를 확인하고 불확실하면 단정하지 않기
- 연주 크레딧은 채택한 특정 영상 기준
- 한국 가곡의 작사자와 작곡자 확인
- Wikipedia 단일 출처 금지
- AI 설명은 편집 검수 전 `draft`
- 외부 문장을 복사하지 않고 직접 요약

---

## 15. 파일 구조

```text
src/
├─ app/
│  ├─ page.tsx
│  ├─ getting-started/
│  ├─ must-listen/
│  ├─ tracks/[id]/
│  ├─ eras/[era]/
│  ├─ forms/[form]/
│  ├─ instruments/[instrument]/
│  ├─ composers/[composer]/
│  ├─ korean-classic/
│  ├─ courses/
│  ├─ glossary/
│  ├─ my-classic/
│  └─ search/
├─ components/
│  ├─ tracks/
│  ├─ player/
│  ├─ discovery/
│  ├─ courses/
│  ├─ glossary/
│  └─ ui/
├─ data/
│  ├─ classicTracks.ts
│  ├─ composers.ts
│  ├─ eras.ts
│  ├─ forms.ts
│  ├─ instruments.ts
│  ├─ moods.ts
│  └─ glossary.ts
├─ lib/
│  ├─ youtube.ts
│  ├─ search.ts
│  ├─ storage.ts
│  └─ validation.ts
└─ types/
```

---

## 16. 개발 단계

### Phase 1 — 기반과 31곡 적용

- Next.js + TypeScript + Tailwind
- 부록 A를 `src/data/classTraks.ts`에 저장
- 홈·목록·상세 기본 경로
- 필터·검색·정렬
- 한국 클래식 화면
- 모바일·데스크톱 내비게이션

### Phase 2 — 감상 기능

- 공식 YouTube lite embed
- 영상 오류 fallback
- 실제 영상별 타임라인 seek
- 주요 악기와 감상 포인트
- 다음·관련 작품

### Phase 3 — 입문 학습

- 처음이라면
- 30분 코스
- 7일 코스
- 시대·편성·악기별 페이지
- 용어 사전과 팝오버

### Phase 4 — 개인화

- 찜
- 최근 감상
- 감상 완료
- 사용자 플레이리스트
- localStorage 저장과 복구

### Phase 5 — 품질

- 콘텐츠 출처 검수
- 접근성
- Lighthouse
- 모바일 브라우저
- lint, typecheck, production build
- README와 배포 문서

---

## 17. 테스트 요구사항

### 단위 테스트

- 시대·편성·악기·한국 클래식 필터
- 검색과 정렬
- 재생 시간 형식
- YouTube ID 검증
- localStorage 복구
- 관련 작품 추천

### E2E

1. 홈에서 첫 5곡 확인
2. 작품 상세 이동
3. 영상 재생
4. 타임라인 seek
5. 작품 찜하기
6. 시대별 필터
7. 한국 클래식 화면
8. 코스 진행 저장
9. 검색
10. 영상 오류 fallback
11. 모바일 메뉴
12. 키보드 탐색

---

## 18. MVP 완료 기준

- 반응형 홈
- 입문 가이드
- 반드시 들어야 할 작품 목록
- 부록 A의 31곡 상세 데이터
- 공식 영상이 검수된 최소 10개 상세 페이지
- 시대·편성·악기·분위기 필터
- 한국 클래식 화면
- 30분·7일 코스
- 용어 20개 이상
- 찜·최근·완료·코스 진도 저장
- 한글·영문 검색
- 기본 SEO
- 접근성
- 출처 데이터
- README
- lint, typecheck, build 성공

---

## 19. Z.ai 최종 실행 프롬프트

```text
이 문서에 따라 “Classic Guide — 처음 만나는 클래식” 반응형 웹앱을 구현해 주세요.

이 프로젝트는 오디오 기기 테스트가 아니라 클래식 입문자를 위한 감상 가이드입니다. 테스트 점수, A/B 기기 비교와 음질 평가 기능을 만들지 마세요.

먼저 부록 A의 classic_tracks.ts를 src/data/classicTracks.ts에 그대로 저장하고, CLASSIC_TRACKS를 모든 목록·상세·시대·편성·악기·한국 클래식·검색 화면의 단일 데이터 소스로 사용하세요. 곡 데이터를 다시 작성하지 마세요.

사용자가 유명하고 이해하기 쉬운 작품부터 시작하여 작품 배경, 주요 악기, 감상 포인트와 실제 영상 기준 타임라인을 확인하고 관련 작품으로 확장할 수 있게 하세요.

검증하지 않은 영상 ID, 연주자, 지휘자, 오케스트라, 앨범과 타임라인을 임의로 만들지 마세요. TODO_VERIFY 상태를 유지하고 UI에서 안전한 fallback을 제공하세요.

Next.js, React, TypeScript strict와 Tailwind CSS를 사용하세요. 찜, 최근 감상, 감상 완료, 플레이리스트와 코스 진도는 localStorage에 저장하세요.

모바일 우선 반응형 디자인, 키보드 접근성, 명확한 focus, 충분한 대비, prefers-reduced-motion과 페이지별 SEO를 포함하세요.

Phase 1부터 진행하고 각 단계 종료 시 변경 파일, 구현 기능, 테스트 결과와 남은 TODO를 보고하세요. 마지막에 lint, typecheck와 production build를 실행해 오류를 수정하세요.
```

---

# 부록 A — `class_traks.ts` 전체 소스

> 이 소스를 `src/data/classTraks.ts`에 저장한다.  
> 총 31곡의 작품 설명, 감상 포인트, 관련 작품, 미검수 영상·연주 상태가 포함되어 있다.

```ts
/**
 * Classic Guide — 클래식 입문자용 확장 수록곡 데이터
 *
 * 테스트용 데이터가 아니다.
 * 목표: 작품 발견 → 쉬운 배경 설명 → 감상 포인트 → 관련 작품 확장
 *
 * 수록 규모: 입문 작품 31곡
 * 공개 전 검수:
 * - 최종 채택 연주자·지휘자·오케스트라·앨범·영상 ID
 * - 실제 영상 기준 타임라인
 * - 작품번호, 작곡·초연·출판 정보
 * - 한국 작품의 작사자, 작곡자, 판본과 공식 녹음
 */

export type ClassicalEra =
  | "baroque"
  | "classical"
  | "classical-romantic"
  | "romantic"
  | "impressionist"
  | "modern"
  | "korean-modern";

export type PerformanceForm =
  | "solo"
  | "chamber"
  | "concerto"
  | "symphony"
  | "orchestra"
  | "ballet"
  | "art-song";

export interface ClassicTimelinePoint {
  seconds: number | null;
  label: string;
  description: string;
  status: "TODO_VERIFY" | "VERIFIED";
}

export interface ClassicSource {
  title: string;
  publisher?: string;
  url?: string;
  accessedAt?: string;
  status: "TODO_VERIFY" | "VERIFIED";
  note?: string;
}

export interface ClassicTrack {
  id: string;
  title: string;
  titleKo: string;
  composer: string;
  composerKo: string;
  work: string;
  era: ClassicalEra;
  country: string;
  isKorean: boolean;
  genres: string[];
  form: PerformanceForm;
  instruments: string[];
  difficulty: "easy" | "medium" | "advanced";
  durationClass: "short" | "medium" | "long";
  durationSeconds: number | null;
  courseOrder: number;
  oneLineIntro: string;
  background: string;
  whyMustListen: string;
  listeningPoints: string[];
  timeline: ClassicTimelinePoint[];
  glossaryTerms: string[];
  nextTrackIds: string[];
  relatedTrackIds: string[];
  video: {
    youtubeVideoId: string;
    title: string;
    channelName: string;
    isOfficial: boolean | null;
    isEmbeddable: boolean | null;
    lastVerifiedAt: string | null;
    status: "TODO_VERIFY" | "VERIFIED";
  };
  recording: {
    performer: string | null;
    conductor: string | null;
    orchestra: string | null;
    album: string | null;
    releaseYear: number | null;
    label: string | null;
    note: string;
    status: "TODO_VERIFY" | "VERIFIED";
  };
  sources: ClassicSource[];
  status: "draft" | "reviewed" | "published";
}

const unverifiedTimeline = (points: string[]): ClassicTimelinePoint[] =>
  points.map((description, index) => ({
    seconds: null,
    label: `감상 포인트 ${index + 1}`,
    description,
    status: "TODO_VERIFY",
  }));

const unverifiedVideo = () => ({
  youtubeVideoId: "TODO_VERIFY_VIDEO_ID",
  title: "TODO_VERIFY_OFFICIAL_VIDEO",
  channelName: "TODO_VERIFY_CHANNEL",
  isOfficial: null,
  isEmbeddable: null,
  lastVerifiedAt: null,
  status: "TODO_VERIFY" as const,
});

const unverifiedRecording = (note: string) => ({
  performer: null,
  conductor: null,
  orchestra: null,
  album: null,
  releaseYear: null,
  label: null,
  note,
  status: "TODO_VERIFY" as const,
});

export const CLASSIC_TRACKS: ClassicTrack[] = [

  {
    id: "vivaldi-spring-1",
    title: "The Four Seasons: Spring, I. Allegro",
    titleKo: "사계 중 봄 1악장",
    composer: "Antonio Vivaldi",
    composerKo: "안토니오 비발디",
    work: "The Four Seasons, Op. 8 No. 1, RV 269",
    era: "baroque",
    country: "이탈리아",
    isKorean: false,
    genres: ["바로크", "바이올린 협주곡"],
    form: "concerto",
    instruments: ["바이올린", "현악 합주", "쳄발로"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 1,
    oneLineIntro: "새소리와 시냇물, 천둥을 바이올린으로 묘사하는 장면이 선명해 클래식의 ‘이야기’를 쉽게 느낄 수 있는 곡이다.",
    background: "비발디의 《사계》는 네 편의 바이올린 협주곡으로 이루어져 있다. 각 협주곡에는 계절의 풍경을 설명하는 짧은 시가 연결되어 있어, 음악이 자연의 장면을 어떻게 표현하는지 따라가기 쉽다. ‘봄’ 1악장에서는 새들의 지저귐, 흐르는 물, 갑작스러운 천둥과 다시 돌아오는 밝은 분위기를 들을 수 있다.",
    whyMustListen: "익숙하고 밝은 주제가 반복되며 독주 바이올린과 합주가 질문하고 대답한다. 클래식 협주곡에서 독주자와 오케스트라가 어떤 관계를 맺는지 처음 이해하기 좋다.",
    listeningPoints: ["처음 등장하는 밝은 봄의 주제", "여러 바이올린이 새소리를 흉내 내는 부분", "빠른 음형으로 표현되는 시냇물", "어두운 화음 뒤 다시 돌아오는 주제"],
    timeline: unverifiedTimeline(["처음 등장하는 밝은 봄의 주제", "여러 바이올린이 새소리를 흉내 내는 부분", "빠른 음형으로 표현되는 시냇물", "어두운 화음 뒤 다시 돌아오는 주제"]),
    glossaryTerms: ["협주곡", "독주", "리토르넬로"],
    nextTrackIds: ["bach-air", "mozart-eine-kleine-1"],
    relatedTrackIds: ["saint-saens-swan", "tchaikovsky-swan-lake-scene"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "bach-air",
    title: "Orchestral Suite No. 3: Air",
    titleKo: "관현악 모음곡 3번 중 아리아",
    composer: "Johann Sebastian Bach",
    composerKo: "요한 제바스티안 바흐",
    work: "Orchestral Suite No. 3 in D major, BWV 1068",
    era: "baroque",
    country: "독일",
    isKorean: false,
    genres: ["바로크", "관현악곡"],
    form: "orchestra",
    instruments: ["현악기", "통주저음"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 2,
    oneLineIntro: "천천히 이어지는 현악 선율을 통해 바로크 음악의 질서와 평온함을 느낄 수 있는 곡이다.",
    background: "이 곡은 바흐의 관현악 모음곡 3번에 포함된 느린 악장이다. 후대에 바이올린 독주용으로 편곡된 ‘G선상의 아리아’라는 이름도 널리 알려졌지만, 입문 페이지에서는 원래 관현악 모음곡의 악장이라는 점과 소개하는 연주 버전을 구분한다.",
    whyMustListen: "복잡한 이론을 몰라도 긴 선율과 베이스의 규칙적인 움직임을 따라갈 수 있다. 여러 현악 파트가 서로 다른 선을 연주하면서 하나의 차분한 흐름을 만드는 방식을 배우기 좋다.",
    listeningPoints: ["첫 바이올린의 길고 부드러운 선율", "아래에서 규칙적으로 움직이는 베이스", "중간 성부가 채우는 화음", "마지막으로 갈수록 편안하게 정리되는 흐름"],
    timeline: unverifiedTimeline(["첫 바이올린의 길고 부드러운 선율", "아래에서 규칙적으로 움직이는 베이스", "중간 성부가 채우는 화음", "마지막으로 갈수록 편안하게 정리되는 흐름"]),
    glossaryTerms: ["아리아", "통주저음", "성부"],
    nextTrackIds: ["bach-cello-suite-1-prelude", "handel-water-music-hornpipe"],
    relatedTrackIds: ["debussy-clair-de-lune", "hong-nan-pa-bongsunhwa"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "bach-cello-suite-1-prelude",
    title: "Cello Suite No. 1: Prelude",
    titleKo: "무반주 첼로 모음곡 1번 중 프렐류드",
    composer: "Johann Sebastian Bach",
    composerKo: "요한 제바스티안 바흐",
    work: "Cello Suite No. 1 in G major, BWV 1007",
    era: "baroque",
    country: "독일",
    isKorean: false,
    genres: ["바로크", "무반주 독주"],
    form: "solo",
    instruments: ["첼로"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 3,
    oneLineIntro: "첼로 한 대가 화음과 선율을 동시에 암시하며 넓은 공간을 채우는 대표적인 무반주곡이다.",
    background: "바흐의 여섯 개 무반주 첼로 모음곡 가운데 첫 번째 작품의 시작 악장이다. 반주 없이 한 대의 첼로만 연주하지만, 연속되는 음형 속에서 화음의 진행과 여러 목소리가 숨어 있는 듯한 효과를 만든다.",
    whyMustListen: "악기 한 대만으로 음악이 얼마나 풍성해질 수 있는지 체험할 수 있다. 첼로의 낮은 울림과 높은 선율, 반복 패턴이 변화하는 과정을 따라가면 클래식 독주곡의 구조를 부담 없이 이해할 수 있다.",
    listeningPoints: ["처음 반복되는 펼친화음 패턴", "낮은 음과 높은 음이 만드는 대화", "같은 패턴이 다른 화음으로 이동하는 과정", "마지막 긴 음으로 긴장이 풀리는 순간"],
    timeline: unverifiedTimeline(["처음 반복되는 펼친화음 패턴", "낮은 음과 높은 음이 만드는 대화", "같은 패턴이 다른 화음으로 이동하는 과정", "마지막 긴 음으로 긴장이 풀리는 순간"]),
    glossaryTerms: ["무반주", "프렐류드", "펼친화음"],
    nextTrackIds: ["mozart-eine-kleine-1", "saint-saens-swan"],
    relatedTrackIds: ["bach-air", "yoon-yi-sang-glissees"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "handel-water-music-hornpipe",
    title: "Water Music: Alla Hornpipe",
    titleKo: "수상 음악 중 알라 혼파이프",
    composer: "George Frideric Handel",
    composerKo: "게오르크 프리드리히 헨델",
    work: "Water Music Suite in D major, HWV 349",
    era: "baroque",
    country: "독일·영국",
    isKorean: false,
    genres: ["바로크", "관현악 모음곡"],
    form: "orchestra",
    instruments: ["현악기", "오보에", "호른", "트럼펫"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 4,
    oneLineIntro: "야외 축제처럼 화려한 금관과 경쾌한 리듬으로 바로크 관현악의 밝은 매력을 보여 준다.",
    background: "《수상 음악》은 영국 왕실의 템스강 행사와 연결되어 전해지는 관현악 모음곡이다. 야외에서도 잘 들리도록 금관과 목관의 존재감이 크며, 여러 춤곡이 이어지는 형식이다. ‘알라 혼파이프’는 당당한 리듬과 화려한 음색으로 특히 유명하다.",
    whyMustListen: "바흐의 차분한 현악곡과 비교하면 같은 바로크 시대에도 음악의 목적과 분위기가 얼마나 달라지는지 알 수 있다. 호른과 트럼펫, 현악기의 음색을 구분하는 연습에도 적합하다.",
    listeningPoints: ["처음 등장하는 당당한 금관 주제", "현악기와 관악기의 주고받음", "춤을 연상시키는 규칙적인 박자", "주제가 반복될 때 달라지는 악기 조합"],
    timeline: unverifiedTimeline(["처음 등장하는 당당한 금관 주제", "현악기와 관악기의 주고받음", "춤을 연상시키는 규칙적인 박자", "주제가 반복될 때 달라지는 악기 조합"]),
    glossaryTerms: ["모음곡", "혼파이프", "금관악기"],
    nextTrackIds: ["mozart-eine-kleine-1", "beethoven-symphony-5-1"],
    relatedTrackIds: ["vivaldi-spring-1", "ravel-bolero"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "mozart-eine-kleine-1",
    title: "Eine kleine Nachtmusik: I. Allegro",
    titleKo: "아이네 클라이네 나흐트무지크 1악장",
    composer: "Wolfgang Amadeus Mozart",
    composerKo: "볼프강 아마데우스 모차르트",
    work: "Serenade No. 13 in G major, K. 525",
    era: "classical",
    country: "오스트리아",
    isKorean: false,
    genres: ["고전주의", "세레나데"],
    form: "chamber",
    instruments: ["바이올린", "비올라", "첼로", "더블베이스"],
    difficulty: "easy",
    durationClass: "medium",
    durationSeconds: null,
    courseOrder: 5,
    oneLineIntro: "또렷한 주제와 균형 잡힌 구조를 통해 고전주의 음악의 명료함을 쉽게 느낄 수 있다.",
    background: "제목은 ‘작은 밤의 음악’이라는 뜻이다. 모차르트가 쓴 세레나데 가운데 가장 널리 알려진 작품으로, 현악 합주 또는 소규모 현악 편성으로 자주 연주된다. 첫 악장은 힘찬 주제와 부드러운 두 번째 주제가 대비된다.",
    whyMustListen: "주제가 명확하고 반복과 대비가 뚜렷해 소나타 형식의 기본 흐름을 설명하기 좋다. 먼저 주제를 기억한 뒤 그것이 다른 조성과 분위기로 이동했다가 돌아오는 과정을 따라가면 된다.",
    listeningPoints: ["첫 마디의 힘찬 상승 주제", "부드럽게 이어지는 두 번째 성격의 선율", "중간에서 주제가 조각나며 전개되는 부분", "처음의 주제가 안정적으로 돌아오는 순간"],
    timeline: unverifiedTimeline(["첫 마디의 힘찬 상승 주제", "부드럽게 이어지는 두 번째 성격의 선율", "중간에서 주제가 조각나며 전개되는 부분", "처음의 주제가 안정적으로 돌아오는 순간"]),
    glossaryTerms: ["세레나데", "소나타 형식", "주제"],
    nextTrackIds: ["mozart-turkish-march", "beethoven-symphony-5-1"],
    relatedTrackIds: ["vivaldi-spring-1", "schubert-trout-4"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "mozart-turkish-march",
    title: "Piano Sonata No. 11: III. Alla turca",
    titleKo: "피아노 소나타 11번 중 터키 행진곡",
    composer: "Wolfgang Amadeus Mozart",
    composerKo: "볼프강 아마데우스 모차르트",
    work: "Piano Sonata No. 11 in A major, K. 331",
    era: "classical",
    country: "오스트리아",
    isKorean: false,
    genres: ["고전주의", "피아노 소나타"],
    form: "solo",
    instruments: ["피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 6,
    oneLineIntro: "익숙한 행진 리듬과 선명한 반복 구조로 피아노 독주곡에 쉽게 접근하게 해 주는 곡이다.",
    background: "피아노 소나타 11번의 마지막 악장으로, 당시 유럽에서 유행한 ‘터키풍’ 음악을 피아노로 표현했다. 실제 오스만 군악을 그대로 재현한 곡이라기보다 강한 리듬과 장식적인 선율을 활용한 고전주의 시대의 양식으로 이해하면 좋다.",
    whyMustListen: "멜로디가 친숙하고 구간별 성격이 분명하다. 오른손 선율과 왼손 반주를 나누어 듣고, 같은 주제가 약하게 또는 강하게 반복될 때 분위기가 어떻게 달라지는지 살펴볼 수 있다.",
    listeningPoints: ["처음의 가볍고 빠른 주제", "왼손이 만드는 행진 리듬", "장조로 밝게 바뀌는 부분", "마지막의 화려하고 강한 마무리"],
    timeline: unverifiedTimeline(["처음의 가볍고 빠른 주제", "왼손이 만드는 행진 리듬", "장조로 밝게 바뀌는 부분", "마지막의 화려하고 강한 마무리"]),
    glossaryTerms: ["피아노 소나타", "악장", "장조"],
    nextTrackIds: ["beethoven-fur-elise", "chopin-nocturne-9-2"],
    relatedTrackIds: ["mozart-eine-kleine-1", "ravel-bolero"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "beethoven-symphony-5-1",
    title: "Symphony No. 5: I. Allegro con brio",
    titleKo: "교향곡 5번 1악장",
    composer: "Ludwig van Beethoven",
    composerKo: "루트비히 판 베토벤",
    work: "Symphony No. 5 in C minor, Op. 67",
    era: "classical-romantic",
    country: "독일",
    isKorean: false,
    genres: ["교향곡", "고전주의", "초기 낭만주의"],
    form: "symphony",
    instruments: ["오케스트라"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 7,
    oneLineIntro: "네 개의 짧은 음이 거대한 악장 전체로 발전하는 과정을 들을 수 있는 교향곡 입문곡이다.",
    background: "‘운명 교향곡’이라는 별칭으로 널리 알려져 있지만, 베토벤이 직접 붙인 공식 제목은 아니다. 1악장은 짧고 강한 동기를 끊임없이 변형하여 긴장과 추진력을 만든다. 작은 음악적 재료가 대규모 구조를 이루는 대표적인 사례다.",
    whyMustListen: "첫 동기를 누구나 쉽게 기억할 수 있어, 그 리듬이 현악기·목관·금관 사이를 이동하는 과정을 따라가기 좋다. 교향곡을 처음 들을 때 모든 악기를 한 번에 이해하려 하지 말고 이 짧은 리듬만 추적해도 충분하다.",
    listeningPoints: ["유명한 네 음의 첫 동기", "동기가 여러 악기군으로 이동하는 과정", "잠시 부드러워지는 두 번째 주제", "마지막으로 갈수록 커지는 긴장과 추진력"],
    timeline: unverifiedTimeline(["유명한 네 음의 첫 동기", "동기가 여러 악기군으로 이동하는 과정", "잠시 부드러워지는 두 번째 주제", "마지막으로 갈수록 커지는 긴장과 추진력"]),
    glossaryTerms: ["교향곡", "동기", "악기군"],
    nextTrackIds: ["dvorak-new-world-2", "tchaikovsky-swan-lake-scene"],
    relatedTrackIds: ["handel-water-music-hornpipe", "ravel-bolero"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "beethoven-moonlight-1",
    title: "Piano Sonata No. 14: I. Adagio sostenuto",
    titleKo: "월광 소나타 1악장",
    composer: "Ludwig van Beethoven",
    composerKo: "루트비히 판 베토벤",
    work: "Piano Sonata No. 14 in C-sharp minor, Op. 27 No. 2",
    era: "classical-romantic",
    country: "독일",
    isKorean: false,
    genres: ["피아노 소나타", "초기 낭만주의"],
    form: "solo",
    instruments: ["피아노"],
    difficulty: "easy",
    durationClass: "medium",
    durationSeconds: null,
    courseOrder: 8,
    oneLineIntro: "잔잔한 반복 음형 위에 느린 선율이 떠오르며 고요하고 어두운 분위기를 만드는 피아노곡이다.",
    background: "‘월광’이라는 별칭은 베토벤이 직접 붙인 것이 아니라 사후에 널리 퍼졌다. 정식 제목은 ‘환상곡풍 소나타’이며, 일반적인 빠른 첫 악장 대신 느리고 명상적인 음악으로 시작한다.",
    whyMustListen: "멜로디, 반복되는 반주와 낮은 베이스를 세 층으로 나누어 들을 수 있다. 피아노 한 대가 서로 다른 역할을 동시에 수행하는 방식과 느린 음악에서 긴장이 유지되는 이유를 이해하기 좋다.",
    listeningPoints: ["끊임없이 반복되는 셋잇단음 반주", "그 위에 길게 떠오르는 선율", "낮은 베이스가 만드는 어두운 분위기", "화음이 바뀔 때 미묘하게 달라지는 긴장"],
    timeline: unverifiedTimeline(["끊임없이 반복되는 셋잇단음 반주", "그 위에 길게 떠오르는 선율", "낮은 베이스가 만드는 어두운 분위기", "화음이 바뀔 때 미묘하게 달라지는 긴장"]),
    glossaryTerms: ["셋잇단음", "반주", "아다지오"],
    nextTrackIds: ["beethoven-fur-elise", "debussy-clair-de-lune"],
    relatedTrackIds: ["chopin-nocturne-9-2", "hong-nan-pa-bongsunhwa"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "beethoven-fur-elise",
    title: "Für Elise",
    titleKo: "엘리제를 위하여",
    composer: "Ludwig van Beethoven",
    composerKo: "루트비히 판 베토벤",
    work: "Bagatelle in A minor, WoO 59",
    era: "classical-romantic",
    country: "독일",
    isKorean: false,
    genres: ["피아노 소품", "바가텔"],
    form: "solo",
    instruments: ["피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 9,
    oneLineIntro: "매우 익숙한 첫 선율과 서로 다른 중간 부분을 통해 작은 피아노곡의 대비 구조를 배울 수 있다.",
    background: "베토벤이 남긴 짧은 피아노 소품으로, 정확히 누구를 위한 곡이었는지는 확정되지 않았다. 유명한 첫 부분만 알려진 경우가 많지만 전체를 들으면 밝고 활동적인 중간 부분과 더 극적인 부분이 나타난다.",
    whyMustListen: "잘 아는 멜로디에서 시작하므로 긴장 없이 클래식 형식을 관찰할 수 있다. 익숙한 A부분이 다른 분위기의 B·C부분 사이에서 돌아오는 론도와 유사한 구조를 쉽게 느낄 수 있다.",
    listeningPoints: ["반음으로 오가는 유명한 첫 동기", "부드러운 주제가 다시 반복되는 방식", "밝고 빠르게 움직이는 중간 부분", "낮은 음이 강하게 등장하는 극적인 부분"],
    timeline: unverifiedTimeline(["반음으로 오가는 유명한 첫 동기", "부드러운 주제가 다시 반복되는 방식", "밝고 빠르게 움직이는 중간 부분", "낮은 음이 강하게 등장하는 극적인 부분"]),
    glossaryTerms: ["바가텔", "론도", "반음"],
    nextTrackIds: ["chopin-nocturne-9-2", "schubert-trout-4"],
    relatedTrackIds: ["mozart-turkish-march", "beethoven-moonlight-1"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "schubert-trout-4",
    title: "Piano Quintet in A major ‘Trout’: IV. Theme and Variations",
    titleKo: "피아노 5중주 송어 4악장",
    composer: "Franz Schubert",
    composerKo: "프란츠 슈베르트",
    work: "Piano Quintet in A major, D. 667, Trout",
    era: "romantic",
    country: "오스트리아",
    isKorean: false,
    genres: ["낭만주의", "실내악", "변주곡"],
    form: "chamber",
    instruments: ["피아노", "바이올린", "비올라", "첼로", "더블베이스"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 10,
    oneLineIntro: "하나의 친근한 주제가 악기와 분위기를 바꾸며 반복되어 변주곡의 원리를 쉽게 들려준다.",
    background: "슈베르트의 가곡 《송어》 선율을 주제로 사용한 피아노 5중주다. 일반적인 피아노 5중주와 달리 더블베이스가 포함되어 밝고 풍성한 저음을 만든다. 4악장은 주제와 여러 변주로 구성된다.",
    whyMustListen: "같은 멜로디가 피아노, 현악기와 서로 다른 리듬으로 변하는 과정을 게임처럼 찾을 수 있다. 실내악에서 악기들이 경쟁하기보다 대화하고 역할을 바꾸는 방식을 배우기 좋다.",
    listeningPoints: ["처음 제시되는 단순한 송어 주제", "주제를 이어받는 악기 찾기", "빠르기와 반주가 달라지는 변주", "어두운 분위기로 바뀌는 변주와 밝은 귀환"],
    timeline: unverifiedTimeline(["처음 제시되는 단순한 송어 주제", "주제를 이어받는 악기 찾기", "빠르기와 반주가 달라지는 변주", "어두운 분위기로 바뀌는 변주와 밝은 귀환"]),
    glossaryTerms: ["실내악", "5중주", "주제와 변주"],
    nextTrackIds: ["chopin-nocturne-9-2", "dvorak-new-world-2"],
    relatedTrackIds: ["mozart-eine-kleine-1", "saint-saens-swan"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "chopin-nocturne-9-2",
    title: "Nocturne in E-flat major, Op. 9 No. 2",
    titleKo: "녹턴 작품 9-2",
    composer: "Frédéric Chopin",
    composerKo: "프레데리크 쇼팽",
    work: "Nocturne in E-flat major, Op. 9 No. 2",
    era: "romantic",
    country: "폴란드·프랑스",
    isKorean: false,
    genres: ["낭만주의", "피아노 독주", "녹턴"],
    form: "solo",
    instruments: ["피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 11,
    oneLineIntro: "노래하듯 장식되는 오른손 선율과 잔잔한 왼손 반주로 낭만주의 피아노의 표현을 보여 준다.",
    background: "녹턴은 밤의 분위기를 떠올리게 하는 서정적인 피아노 장르다. 쇼팽은 성악처럼 노래하는 선율과 섬세한 장식을 통해 피아노만으로 긴 호흡과 감정의 변화를 만들었다.",
    whyMustListen: "처음부터 끝까지 같은 선율이 조금씩 장식되고 변화하므로, 연주자가 악보의 음뿐 아니라 속도와 강약을 어떻게 표현하는지 듣기 좋다. 서로 다른 피아니스트의 버전을 비교하는 입문 콘텐츠로도 적합하다.",
    listeningPoints: ["오른손의 노래하는 첫 선율", "왼손이 만드는 규칙적인 왈츠형 반주", "선율에 장식음이 점점 늘어나는 과정", "마지막의 자유로운 장식과 조용한 마무리"],
    timeline: unverifiedTimeline(["오른손의 노래하는 첫 선율", "왼손이 만드는 규칙적인 왈츠형 반주", "선율에 장식음이 점점 늘어나는 과정", "마지막의 자유로운 장식과 조용한 마무리"]),
    glossaryTerms: ["녹턴", "장식음", "루바토"],
    nextTrackIds: ["tchaikovsky-swan-lake-scene", "debussy-clair-de-lune"],
    relatedTrackIds: ["beethoven-moonlight-1", "kim-dong-jin-gagopa"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "tchaikovsky-swan-lake-scene",
    title: "Swan Lake: Scene",
    titleKo: "백조의 호수 중 정경",
    composer: "Pyotr Ilyich Tchaikovsky",
    composerKo: "표트르 일리치 차이콥스키",
    work: "Swan Lake, Op. 20",
    era: "romantic",
    country: "러시아",
    isKorean: false,
    genres: ["낭만주의", "발레 음악", "관현악"],
    form: "ballet",
    instruments: ["오케스트라", "오보에", "현악기", "하프"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 12,
    oneLineIntro: "오보에의 쓸쓸한 선율과 물결처럼 움직이는 현악 반주가 발레의 장면과 감정을 선명하게 만든다.",
    background: "《백조의 호수》는 차이콥스키의 대표 발레 음악이다. ‘정경’에서는 오보에가 백조의 주제를 연주하고 현악기와 하프가 신비롭고 슬픈 호수의 분위기를 만든다.",
    whyMustListen: "특정 악기인 오보에의 음색을 기억하고, 선율과 반주가 장면을 만드는 과정을 이해하기 좋다. 발레 영상과 함께 본 뒤 음악만 다시 들으면 음악이 동작과 서사를 어떻게 지원하는지도 느낄 수 있다.",
    listeningPoints: ["오보에가 연주하는 백조의 주제", "현악기의 흔들리는 반주", "선율이 다른 악기로 확대되는 과정", "금관과 오케스트라가 더해지는 극적인 변화"],
    timeline: unverifiedTimeline(["오보에가 연주하는 백조의 주제", "현악기의 흔들리는 반주", "선율이 다른 악기로 확대되는 과정", "금관과 오케스트라가 더해지는 극적인 변화"]),
    glossaryTerms: ["발레 음악", "오보에", "주제 선율"],
    nextTrackIds: ["dvorak-new-world-2", "saint-saens-swan"],
    relatedTrackIds: ["vivaldi-spring-1", "ravel-bolero"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "dvorak-new-world-2",
    title: "Symphony No. 9 ‘From the New World’: II. Largo",
    titleKo: "교향곡 9번 신세계로부터 2악장",
    composer: "Antonín Dvořák",
    composerKo: "안토닌 드보르자크",
    work: "Symphony No. 9 in E minor, Op. 95",
    era: "romantic",
    country: "체코",
    isKorean: false,
    genres: ["낭만주의", "교향곡"],
    form: "symphony",
    instruments: ["오케스트라", "잉글리시 호른"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 13,
    oneLineIntro: "잉글리시 호른의 넓고 외로운 선율을 중심으로 오케스트라의 색채와 향수를 느낄 수 있다.",
    background: "드보르자크가 미국에 머물던 시기에 작곡한 교향곡이다. 미국의 음악과 자신의 보헤미아적 음악 언어가 함께 반영되었다고 설명되지만, 특정 민요를 그대로 인용한 작품으로 단정하지 않는다. 2악장의 주제는 잉글리시 호른이 연주한다.",
    whyMustListen: "독특한 잉글리시 호른 음색을 배우고, 조용한 주제가 오케스트라 전체로 확장되는 흐름을 따라가기 좋다. 느린 악장도 장면과 감정이 계속 변화한다는 사실을 보여 준다.",
    listeningPoints: ["처음의 낮고 장엄한 관악 화음", "잉글리시 호른의 유명한 선율", "중간의 조금 더 움직이는 현악 부분", "첫 선율이 돌아올 때 달라진 분위기"],
    timeline: unverifiedTimeline(["처음의 낮고 장엄한 관악 화음", "잉글리시 호른의 유명한 선율", "중간의 조금 더 움직이는 현악 부분", "첫 선율이 돌아올 때 달라진 분위기"]),
    glossaryTerms: ["잉글리시 호른", "라르고", "민족주의 음악"],
    nextTrackIds: ["debussy-clair-de-lune", "ravel-bolero"],
    relatedTrackIds: ["beethoven-symphony-5-1", "choi-sung-hwan-arirang-fantasy"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "debussy-clair-de-lune",
    title: "Suite bergamasque: Clair de lune",
    titleKo: "베르가마스크 모음곡 중 달빛",
    composer: "Claude Debussy",
    composerKo: "클로드 드뷔시",
    work: "Suite bergamasque, L. 75",
    era: "impressionist",
    country: "프랑스",
    isKorean: false,
    genres: ["인상주의", "피아노 독주"],
    form: "solo",
    instruments: ["피아노"],
    difficulty: "easy",
    durationClass: "medium",
    durationSeconds: null,
    courseOrder: 14,
    oneLineIntro: "선명한 박자보다 빛과 색이 번지는 듯한 화음으로 인상주의 음악에 쉽게 접근하게 해 주는 곡이다.",
    background: "드뷔시의 피아노 모음곡에 포함된 작품이다. 제목은 ‘달빛’을 뜻하며, 프랑스 시와 회화에서 느껴지는 모호한 빛과 분위기를 음악으로 떠올리게 한다. 드뷔시를 단순히 ‘인상주의’라는 한 단어로만 규정하지 않도록 안내한다.",
    whyMustListen: "멜로디만 따라가기보다 화음의 색, 쉼, 울림을 듣는 방법을 배울 수 있다. 고전주의의 규칙적인 구조와 다른 시간감과 분위기를 경험하는 좋은 출발점이다.",
    listeningPoints: ["조용히 떠오르는 첫 화음", "멜로디 사이에 남는 긴 여백", "중간에서 물결처럼 움직이는 빠른 음형", "처음의 고요함으로 돌아오는 마무리"],
    timeline: unverifiedTimeline(["조용히 떠오르는 첫 화음", "멜로디 사이에 남는 긴 여백", "중간에서 물결처럼 움직이는 빠른 음형", "처음의 고요함으로 돌아오는 마무리"]),
    glossaryTerms: ["인상주의", "화음", "페달"],
    nextTrackIds: ["ravel-bolero", "saint-saens-swan"],
    relatedTrackIds: ["beethoven-moonlight-1", "chopin-nocturne-9-2"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "ravel-bolero",
    title: "Boléro",
    titleKo: "볼레로",
    composer: "Maurice Ravel",
    composerKo: "모리스 라벨",
    work: "Boléro, M. 81",
    era: "modern",
    country: "프랑스",
    isKorean: false,
    genres: ["20세기 음악", "관현악", "발레 음악"],
    form: "orchestra",
    instruments: ["오케스트라", "스네어 드럼"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 15,
    oneLineIntro: "같은 리듬과 선율이 반복되지만 악기와 음량이 계속 바뀌어 오케스트라 음색을 익히기 좋은 곡이다.",
    background: "라벨은 거의 변하지 않는 리듬과 두 개의 선율을 반복하면서 악기 편성과 음량만 점차 확대하는 독특한 작품을 만들었다. 스네어 드럼의 리듬이 곡 전체를 유지하고 여러 독주 악기가 차례로 선율을 맡는다.",
    whyMustListen: "‘지금 어떤 악기가 연주하는가’를 맞히며 들을 수 있어 관현악기 입문에 매우 적합하다. 반복이 지루함이 아니라 음색과 크레셴도를 관찰하게 만드는 장치라는 점을 이해할 수 있다.",
    listeningPoints: ["처음부터 끝까지 이어지는 스네어 드럼 리듬", "플루트에서 시작해 바뀌는 독주 악기", "악기가 더해지며 커지는 음량", "마지막에 조성과 흐름이 갑자기 흔들리는 순간"],
    timeline: unverifiedTimeline(["처음부터 끝까지 이어지는 스네어 드럼 리듬", "플루트에서 시작해 바뀌는 독주 악기", "악기가 더해지며 커지는 음량", "마지막에 조성과 흐름이 갑자기 흔들리는 순간"]),
    glossaryTerms: ["오케스트레이션", "크레셴도", "스네어 드럼"],
    nextTrackIds: ["saint-saens-swan", "holst-jupiter"],
    relatedTrackIds: ["handel-water-music-hornpipe", "tchaikovsky-swan-lake-scene"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "saint-saens-swan",
    title: "The Carnival of the Animals: The Swan",
    titleKo: "동물의 사육제 중 백조",
    composer: "Camille Saint-Saëns",
    composerKo: "카미유 생상스",
    work: "The Carnival of the Animals: XIII. The Swan",
    era: "romantic",
    country: "프랑스",
    isKorean: false,
    genres: ["낭만주의", "실내악", "표제 음악"],
    form: "chamber",
    instruments: ["첼로", "피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 16,
    oneLineIntro: "첼로의 긴 선율과 피아노의 물결 같은 반주가 백조의 움직임을 우아하게 그린다.",
    background: "여러 동물을 익살스럽게 묘사한 《동물의 사육제》 가운데 가장 서정적인 곡이다. 첼로가 백조의 우아한 움직임을, 피아노가 물결을 떠올리게 하는 반주를 맡는다.",
    whyMustListen: "두 악기의 역할이 분명해 멜로디와 반주를 구분하는 연습에 좋다. 표제 음악이 구체적인 이미지와 동작을 어떻게 표현하는지도 쉽게 이해할 수 있다.",
    listeningPoints: ["첼로가 시작하는 길고 부드러운 선율", "피아노가 만드는 잔잔한 물결", "첼로 선율이 높아지며 커지는 감정", "마지막에 조용히 가라앉는 움직임"],
    timeline: unverifiedTimeline(["첼로가 시작하는 길고 부드러운 선율", "피아노가 만드는 잔잔한 물결", "첼로 선율이 높아지며 커지는 감정", "마지막에 조용히 가라앉는 움직임"]),
    glossaryTerms: ["표제 음악", "첼로", "멜로디와 반주"],
    nextTrackIds: ["holst-jupiter", "hong-nan-pa-bongsunhwa"],
    relatedTrackIds: ["bach-cello-suite-1-prelude", "tchaikovsky-swan-lake-scene"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "holst-jupiter",
    title: "The Planets: Jupiter, the Bringer of Jollity",
    titleKo: "행성 중 목성",
    composer: "Gustav Holst",
    composerKo: "구스타브 홀스트",
    work: "The Planets, Op. 32",
    era: "modern",
    country: "영국",
    isKorean: false,
    genres: ["20세기 음악", "관현악 모음곡"],
    form: "orchestra",
    instruments: ["대편성 오케스트라"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 17,
    oneLineIntro: "활기찬 리듬과 장대한 중간 선율이 대비되어 대편성 관현악의 즐거움과 스케일을 느끼게 한다.",
    background: "《행성》은 일곱 행성을 점성술적 성격과 연결한 관현악 모음곡이다. ‘목성’은 빠르고 축제 같은 부분과 넓고 장엄한 중간 선율이 대비된다. 행성의 과학적 특징을 묘사한 작품은 아니다.",
    whyMustListen: "한 악장 안에서 빠른 리듬, 민속 춤 같은 분위기와 장대한 선율을 모두 경험할 수 있다. 대편성 오케스트라의 악기군과 분위기 전환을 따라가는 입문곡으로 적합하다.",
    listeningPoints: ["처음의 빠르고 들뜬 현악 리듬", "금관이 더해지는 축제 분위기", "중간의 넓고 장엄한 선율", "마지막에 빠른 에너지가 돌아오는 과정"],
    timeline: unverifiedTimeline(["처음의 빠르고 들뜬 현악 리듬", "금관이 더해지는 축제 분위기", "중간의 넓고 장엄한 선율", "마지막에 빠른 에너지가 돌아오는 과정"]),
    glossaryTerms: ["관현악 모음곡", "금관악기", "대조"],
    nextTrackIds: ["choi-sung-hwan-arirang-fantasy", "hong-nan-pa-bongsunhwa"],
    relatedTrackIds: ["beethoven-symphony-5-1", "ravel-bolero"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "hong-nan-pa-bongsunhwa",
    title: "Bongsunhwa",
    titleKo: "봉선화",
    composer: "Hong Nan-pa",
    composerKo: "홍난파",
    work: "Bongsunhwa",
    era: "korean-modern",
    country: "대한민국",
    isKorean: true,
    genres: ["한국 가곡", "근대 음악"],
    form: "art-song",
    instruments: ["성악", "피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 18,
    oneLineIntro: "한국어 가사와 서정적인 선율을 통해 한국 근대 가곡의 시작을 살펴볼 수 있는 작품이다.",
    background: "《봉선화》는 한국 근대 가곡의 초기 대표작으로 널리 소개된다. 김형준의 시에 홍난파가 곡을 붙였다. 작품의 역사적 의미와 별개로, 서비스에 넣을 때는 소개하는 성악가와 반주자, 녹음 버전을 정확히 표시한다.",
    whyMustListen: "익숙한 한국어와 비교적 단순한 성악·피아노 편성이라 서양 예술가곡과 한국 가곡의 공통점과 차이를 부담 없이 들을 수 있다. 가사의 정서와 선율이 어떻게 연결되는지 따라가기 좋다.",
    listeningPoints: ["첫 구절의 차분한 성악 선율", "피아노가 보컬을 받치는 방식", "가사가 고조될 때 넓어지는 음역", "마지막의 여운과 피아노 마무리"],
    timeline: unverifiedTimeline(["첫 구절의 차분한 성악 선율", "피아노가 보컬을 받치는 방식", "가사가 고조될 때 넓어지는 음역", "마지막의 여운과 피아노 마무리"]),
    glossaryTerms: ["한국 가곡", "성악", "반주"],
    nextTrackIds: ["kim-dong-jin-gagopa", "choi-sung-hwan-arirang-fantasy"],
    relatedTrackIds: ["chopin-nocturne-9-2", "kim-dong-jin-sin-arirang"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "kim-dong-jin-gagopa",
    title: "Gagopa",
    titleKo: "가고파",
    composer: "Kim Dong-jin",
    composerKo: "김동진",
    work: "Gagopa",
    era: "korean-modern",
    country: "대한민국",
    isKorean: true,
    genres: ["한국 가곡", "성악"],
    form: "art-song",
    instruments: ["성악", "피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 19,
    oneLineIntro: "고향을 그리워하는 시와 넓게 흐르는 선율이 결합된 대표적인 한국 가곡이다.",
    background: "이은상의 시에 김동진이 곡을 붙인 한국 가곡이다. 바다와 고향을 그리는 언어가 성악 선율과 만나 긴 호흡을 만든다. 성악가의 성부와 편곡에 따라 분위기가 달라질 수 있으므로 소개 버전을 명시한다.",
    whyMustListen: "한국어 시의 리듬이 서양식 성악 선율과 어떻게 결합되는지 들을 수 있다. 가사 내용, 보컬의 긴 호흡과 피아노 반주를 함께 따라가며 예술가곡을 듣는 기본 방법을 익히기 좋다.",
    listeningPoints: ["고향을 부르는 첫 선율", "긴 호흡으로 이어지는 한국어 가사", "감정이 커지며 높아지는 음역", "피아노와 함께 가라앉는 마지막 여운"],
    timeline: unverifiedTimeline(["고향을 부르는 첫 선율", "긴 호흡으로 이어지는 한국어 가사", "감정이 커지며 높아지는 음역", "피아노와 함께 가라앉는 마지막 여운"]),
    glossaryTerms: ["예술가곡", "성부", "프레이즈"],
    nextTrackIds: ["choi-sung-hwan-arirang-fantasy", "vivaldi-spring-1"],
    relatedTrackIds: ["hong-nan-pa-bongsunhwa", "kim-dong-jin-sin-arirang"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "choi-sung-hwan-arirang-fantasy",
    title: "Arirang Fantasy",
    titleKo: "아리랑 환상곡",
    composer: "Choi Sung-hwan",
    composerKo: "최성환",
    work: "Arirang Fantasy",
    era: "korean-modern",
    country: "대한민국",
    isKorean: true,
    genres: ["한국 관현악", "민요 주제", "현대 클래식"],
    form: "orchestra",
    instruments: ["오케스트라"],
    difficulty: "easy",
    durationClass: "medium",
    durationSeconds: null,
    courseOrder: 20,
    oneLineIntro: "익숙한 아리랑 선율이 여러 관현악 음색으로 변주되어 한국적 주제와 오케스트라를 함께 만날 수 있다.",
    background: "아리랑 선율을 바탕으로 만든 관현악 작품이다. 여러 연주 단체와 판본이 존재할 수 있으므로 작곡자 표기, 편곡 여부와 채택 연주를 공식 출처로 확인한다. 익숙한 민요 주제가 오케스트라 안에서 확장되는 과정을 중심으로 소개한다.",
    whyMustListen: "이미 알고 있는 선율이 현악기, 목관과 금관 사이를 이동하므로 관현악 음색을 구분하기 쉽다. 한국 음악과 서양 관현악 기법이 만나는 방식을 입문자에게 자연스럽게 보여 준다.",
    listeningPoints: ["처음 제시되는 아리랑 주제", "선율을 이어받는 악기군 찾기", "리듬과 화음이 커지는 과정", "전체 오케스트라가 주제를 연주하는 절정"],
    timeline: unverifiedTimeline(["처음 제시되는 아리랑 주제", "선율을 이어받는 악기군 찾기", "리듬과 화음이 커지는 과정", "전체 오케스트라가 주제를 연주하는 절정"]),
    glossaryTerms: ["환상곡", "민요", "관현악 편곡"],
    nextTrackIds: ["vivaldi-spring-1", "beethoven-symphony-5-1"],
    relatedTrackIds: ["dvorak-new-world-2", "holst-jupiter"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("최종 채택 연주 버전 기준으로 연주자·지휘자·오케스트라·앨범 정보를 입력한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "pachelbel-canon-in-d",
    title: "Canon in D major",
    titleKo: "캐논 라장조",
    composer: "Johann Pachelbel",
    composerKo: "요한 파헬벨",
    work: "Canon and Gigue in D major, P. 37",
    era: "baroque",
    country: "독일",
    isKorean: false,
    genres: ["바로크", "실내악", "캐논"],
    form: "chamber",
    instruments: ["바이올린", "첼로", "통주저음"],
    difficulty: "easy",
    durationClass: "medium",
    durationSeconds: null,
    courseOrder: 21,
    oneLineIntro: "같은 선율이 시간차를 두고 겹쳐지는 과정을 쉽게 들을 수 있어 대위법 입문에 좋은 곡이다.",
    background: "파헬벨의 캐논은 반복되는 저음 진행 위에서 세 개의 바이올린 성부가 차례로 같은 선율을 모방하며 전개된다. 오늘날 결혼식과 광고 등에서 자주 들리지만, 원래 작품은 캐논과 지그가 한 쌍을 이루는 실내악곡이다.",
    whyMustListen: "익숙한 화음 진행 덕분에 부담 없이 시작할 수 있으며, 반복되는 베이스 위에서 바이올린 선율이 점점 촘촘해지는 과정을 따라가기 좋다. ‘반복’과 ‘모방’이 음악을 어떻게 풍성하게 만드는지 이해할 수 있다.",
    listeningPoints: ["처음부터 반복되는 낮은 베이스 진행", "첫 바이올린 선율을 다른 성부가 따라오는 과정", "음표가 점점 짧고 촘촘해지는 부분", "여러 성부가 겹치면서도 화음이 유지되는 방식"],
    timeline: unverifiedTimeline(["처음부터 반복되는 낮은 베이스 진행", "첫 바이올린 선율을 다른 성부가 따라오는 과정", "음표가 점점 짧고 촘촘해지는 부분", "여러 성부가 겹치면서도 화음이 유지되는 방식"]),
    glossaryTerms: ["캐논", "대위법", "통주저음"],
    nextTrackIds: ["bach-air", "vivaldi-spring-1"],
    relatedTrackIds: ["mozart-eine-kleine-1", "schubert-trout-4"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("원전 악기 또는 현대 현악 편성 중 입문자가 성부를 구분하기 쉬운 공식 연주를 선택한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "handel-messiah-hallelujah",
    title: "Messiah: Hallelujah",
    titleKo: "메시아 중 할렐루야",
    composer: "George Frideric Handel",
    composerKo: "게오르크 프리드리히 헨델",
    work: "Messiah, HWV 56",
    era: "baroque",
    country: "독일·영국",
    isKorean: false,
    genres: ["바로크", "오라토리오", "합창"],
    form: "orchestra",
    instruments: ["합창", "성악 독창", "오케스트라"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 22,
    oneLineIntro: "합창과 오케스트라가 짧은 주제를 쌓아 올리며 장대한 에너지를 만드는 대표적인 바로크 합창곡이다.",
    background: "《메시아》는 성서 내용을 바탕으로 한 영어 오라토리오다. ‘할렐루야’ 합창은 작품 제2부의 마지막에 등장한다. 오페라처럼 무대 연기와 의상을 중심으로 하기보다 합창·독창과 오케스트라가 이야기를 전달한다.",
    whyMustListen: "합창의 여러 성부와 오케스트라가 같은 단어와 짧은 선율을 주고받는 구조가 명확하다. 소프라노·알토·테너·베이스가 차례로 들어오는 순간을 찾으며 합창 음악을 듣는 방법을 익힐 수 있다.",
    listeningPoints: ["처음의 힘찬 합창 선언", "성부가 차례로 같은 선율을 이어받는 부분", "트럼펫과 팀파니가 더하는 축제 분위기", "긴 음과 짧은 음형이 겹치는 마지막 전개"],
    timeline: unverifiedTimeline(["처음의 힘찬 합창 선언", "성부가 차례로 같은 선율을 이어받는 부분", "트럼펫과 팀파니가 더하는 축제 분위기", "긴 음과 짧은 음형이 겹치는 마지막 전개"]),
    glossaryTerms: ["오라토리오", "합창", "성부"],
    nextTrackIds: ["mozart-symphony-40-1", "beethoven-symphony-9-4"],
    relatedTrackIds: ["handel-water-music-hornpipe", "holst-jupiter"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("합창단·오케스트라·지휘자가 명시된 공식 공연 또는 정규 음반 버전을 선택한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "mozart-symphony-40-1",
    title: "Symphony No. 40 in G minor: I. Molto allegro",
    titleKo: "교향곡 40번 1악장",
    composer: "Wolfgang Amadeus Mozart",
    composerKo: "볼프강 아마데우스 모차르트",
    work: "Symphony No. 40 in G minor, K. 550",
    era: "classical",
    country: "오스트리아",
    isKorean: false,
    genres: ["고전주의", "교향곡"],
    form: "symphony",
    instruments: ["오케스트라"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 23,
    oneLineIntro: "불안하게 움직이는 첫 주제와 균형 잡힌 형식을 통해 모차르트 음악의 밝음 이외의 모습을 만날 수 있다.",
    background: "모차르트의 후기 교향곡 가운데 하나로, 사단조의 긴장된 첫 주제가 널리 알려져 있다. 익숙한 선율이지만 전체 악장을 들으면 부드러운 두 번째 주제와 복잡하게 발전하는 중간 부분이 대비된다.",
    whyMustListen: "모차르트가 단순히 밝고 우아한 작곡가만은 아니라는 점을 보여 준다. 첫 주제의 짧은 리듬을 기억하고 그것이 반복·변형되는 과정을 따라가면 소나타 형식의 흐름을 쉽게 경험할 수 있다.",
    listeningPoints: ["현악기가 조용히 시작하는 불안한 첫 주제", "목관이 더해지는 부드러운 두 번째 주제", "주제 조각이 여러 조성으로 이동하는 전개부", "첫 주제가 돌아오며 긴장이 정리되는 부분"],
    timeline: unverifiedTimeline(["현악기가 조용히 시작하는 불안한 첫 주제", "목관이 더해지는 부드러운 두 번째 주제", "주제 조각이 여러 조성으로 이동하는 전개부", "첫 주제가 돌아오며 긴장이 정리되는 부분"]),
    glossaryTerms: ["교향곡", "사단조", "소나타 형식"],
    nextTrackIds: ["beethoven-symphony-5-1", "schubert-unfinished-1"],
    relatedTrackIds: ["mozart-eine-kleine-1", "dvorak-new-world-2"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("클라리넷 포함 개정판 여부와 오케스트라·지휘자를 명시한 공식 녹음을 선택한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "beethoven-symphony-9-4",
    title: "Symphony No. 9: IV. Finale",
    titleKo: "교향곡 9번 합창 4악장",
    composer: "Ludwig van Beethoven",
    composerKo: "루트비히 판 베토벤",
    work: "Symphony No. 9 in D minor, Op. 125",
    era: "classical-romantic",
    country: "독일",
    isKorean: false,
    genres: ["교향곡", "합창", "초기 낭만주의"],
    form: "symphony",
    instruments: ["오케스트라", "합창", "성악 독창"],
    difficulty: "medium",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 24,
    oneLineIntro: "오케스트라와 독창·합창이 함께 ‘환희’의 주제를 확장하는 클래식 역사상 가장 유명한 피날레 가운데 하나다.",
    background: "베토벤의 마지막 완성 교향곡으로, 4악장에서 실러의 시를 바탕으로 한 성악과 합창이 등장한다. 교향곡에 대규모 합창을 결합한 방식은 이후 작곡가들에게 큰 영향을 주었다.",
    whyMustListen: "처음부터 거대한 합창이 등장하지 않고 앞선 악장의 기억, 낮은 현악기의 레치타티보 같은 부분, 단순한 환희의 주제, 독창과 합창으로 단계적으로 확장된다. 긴 악장도 하나의 주제가 성장하는 과정으로 들을 수 있다.",
    listeningPoints: ["앞선 악장의 음악이 짧게 회상되는 시작", "낮은 현악기가 말하듯 연주하는 부분", "환희의 주제가 조용히 처음 나타나는 순간", "독창과 합창·오케스트라가 합쳐지는 절정"],
    timeline: unverifiedTimeline(["앞선 악장의 음악이 짧게 회상되는 시작", "낮은 현악기가 말하듯 연주하는 부분", "환희의 주제가 조용히 처음 나타나는 순간", "독창과 합창·오케스트라가 합쳐지는 절정"]),
    glossaryTerms: ["피날레", "레치타티보", "합창 교향곡"],
    nextTrackIds: ["holst-jupiter", "handel-messiah-hallelujah"],
    relatedTrackIds: ["beethoven-symphony-5-1", "dvorak-new-world-2"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("독창자·합창단·오케스트라·지휘자와 영상의 악장 시작 지점을 검수한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "schubert-ave-maria",
    title: "Ellens Gesang III, D. 839",
    titleKo: "아베 마리아",
    composer: "Franz Schubert",
    composerKo: "프란츠 슈베르트",
    work: "Ellens Gesang III, D. 839",
    era: "romantic",
    country: "오스트리아",
    isKorean: false,
    genres: ["낭만주의", "예술가곡", "성악"],
    form: "art-song",
    instruments: ["성악", "피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 25,
    oneLineIntro: "긴 호흡의 성악 선율과 잔잔한 피아노 반주로 예술가곡의 친밀한 매력을 느낄 수 있다.",
    background: "흔히 ‘슈베르트의 아베 마리아’로 알려졌지만 원래는 월터 스콧의 시를 독일어로 번역한 가사에 붙인 《엘렌의 노래 3번》이다. 이후 라틴어 기도문으로도 널리 불리게 되었다.",
    whyMustListen: "성악가의 호흡과 피아노 반주가 한 문장을 함께 만드는 방식을 들을 수 있다. 익숙한 제목 뒤에 있는 원래 작품의 맥락을 알게 되며, 같은 곡의 서로 다른 성부와 언어 버전을 비교하기도 좋다.",
    listeningPoints: ["피아노의 잔잔한 반복 반주", "성악이 길게 이어가는 첫 선율", "높은 음으로 올라가며 감정이 커지는 부분", "피아노가 조용히 여운을 남기는 마무리"],
    timeline: unverifiedTimeline(["피아노의 잔잔한 반복 반주", "성악이 길게 이어가는 첫 선율", "높은 음으로 올라가며 감정이 커지는 부분", "피아노가 조용히 여운을 남기는 마무리"]),
    glossaryTerms: ["예술가곡", "성부", "프레이즈"],
    nextTrackIds: ["kim-dong-jin-gagopa", "hong-nan-pa-bongsunhwa"],
    relatedTrackIds: ["chopin-nocturne-9-2", "kim-dong-jin-sin-arirang"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("원어 가사 또는 라틴어 버전, 성악가의 성부와 반주 편성을 명시한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "mendelssohn-violin-concerto-1",
    title: "Violin Concerto in E minor: I. Allegro molto appassionato",
    titleKo: "바이올린 협주곡 마단조 1악장",
    composer: "Felix Mendelssohn",
    composerKo: "펠릭스 멘델스존",
    work: "Violin Concerto in E minor, Op. 64",
    era: "romantic",
    country: "독일",
    isKorean: false,
    genres: ["낭만주의", "바이올린 협주곡"],
    form: "concerto",
    instruments: ["바이올린", "오케스트라"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 26,
    oneLineIntro: "독주 바이올린이 기다림 없이 바로 주제를 시작해 협주곡의 긴장과 대화를 빠르게 체험할 수 있다.",
    background: "고전 협주곡과 달리 긴 오케스트라 서주 없이 독주 바이올린이 초반부터 주제를 연주한다. 독주 카덴차가 악장 끝이 아니라 재현부 전에 놓이는 등 당시로서는 새로운 구성을 보여 준다.",
    whyMustListen: "바이올린의 노래하는 선율과 빠른 기교, 오케스트라의 반응을 한 악장에서 모두 들을 수 있다. 독주자가 단순히 반주 위에서 돋보이는 것이 아니라 오케스트라와 주제를 교환하는 과정을 따라가기 좋다.",
    listeningPoints: ["독주 바이올린이 바로 시작하는 첫 주제", "오케스트라가 주제를 받아 확장하는 부분", "반주 없이 독주자가 연주하는 카덴차", "독주와 오케스트라가 함께 달리는 마무리"],
    timeline: unverifiedTimeline(["독주 바이올린이 바로 시작하는 첫 주제", "오케스트라가 주제를 받아 확장하는 부분", "반주 없이 독주자가 연주하는 카덴차", "독주와 오케스트라가 함께 달리는 마무리"]),
    glossaryTerms: ["협주곡", "카덴차", "독주자"],
    nextTrackIds: ["vivaldi-spring-1", "tchaikovsky-swan-lake-scene"],
    relatedTrackIds: ["bach-cello-suite-1-prelude", "schubert-trout-4"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("독주자·지휘자·오케스트라와 카덴차 위치가 확인되는 공식 연주를 선택한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "brahms-hungarian-dance-5",
    title: "Hungarian Dance No. 5",
    titleKo: "헝가리 무곡 5번",
    composer: "Johannes Brahms",
    composerKo: "요하네스 브람스",
    work: "Hungarian Dance No. 5 in F-sharp minor",
    era: "romantic",
    country: "독일",
    isKorean: false,
    genres: ["낭만주의", "무곡", "관현악 편곡"],
    form: "orchestra",
    instruments: ["오케스트라"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 27,
    oneLineIntro: "빠르기와 강약이 갑자기 변하는 짧고 활기찬 곡으로 지휘와 루바토의 재미를 느끼기 좋다.",
    background: "브람스의 헝가리 무곡은 원래 피아노 연탄곡으로 출판되었고 이후 여러 관현악 편곡으로 널리 연주되었다. 5번은 특히 유명하며, 특정 민속 선율과 당시의 헝가리풍 대중 음악에서 영향을 받았다.",
    whyMustListen: "짧은 시간 안에 빠르기, 강약과 분위기가 자주 바뀐다. 지휘자와 연주 단체에 따라 템포를 밀고 당기는 방식이 달라 같은 곡의 여러 연주를 비교하는 첫 콘텐츠로 적합하다.",
    listeningPoints: ["강하게 시작하는 유명한 첫 주제", "갑자기 느려지며 선율을 늘이는 부분", "빠른 리듬으로 다시 돌아오는 순간", "마지막의 짧고 강한 마무리"],
    timeline: unverifiedTimeline(["강하게 시작하는 유명한 첫 주제", "갑자기 느려지며 선율을 늘이는 부분", "빠른 리듬으로 다시 돌아오는 순간", "마지막의 짧고 강한 마무리"]),
    glossaryTerms: ["무곡", "템포", "루바토"],
    nextTrackIds: ["smetana-vltava", "ravel-bolero"],
    relatedTrackIds: ["mozart-turkish-march", "holst-jupiter"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("원곡 피아노 연탄 또는 관현악 편곡 여부와 편곡자를 표시한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "smetana-vltava",
    title: "Má vlast: Vltava",
    titleKo: "나의 조국 중 몰다우",
    composer: "Bedřich Smetana",
    composerKo: "베드르지흐 스메타나",
    work: "Má vlast: II. Vltava",
    era: "romantic",
    country: "체코",
    isKorean: false,
    genres: ["낭만주의", "교향시", "표제 음악"],
    form: "orchestra",
    instruments: ["오케스트라","플루트","클라리넷","현악기"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 28,
    oneLineIntro: "작은 샘이 큰 강이 되어 흐르는 과정을 오케스트라로 묘사해 긴 관현악곡을 이야기처럼 들을 수 있다.",
    background: "연작 교향시 《나의 조국》의 두 번째 곡으로, 블타바강이 두 개의 샘에서 시작해 숲과 마을, 급류와 프라하를 지나 흐르는 장면을 음악으로 표현한다. 독일어식 명칭인 ‘몰다우’로도 널리 알려져 있다.",
    whyMustListen: "곡의 흐름에 구체적인 장면이 있어 긴 관현악곡을 부담 없이 따라갈 수 있다. 플루트와 클라리넷의 작은 물줄기, 넓은 현악 주제와 춤 장면을 구분해 들으며 표제 음악의 재미를 배울 수 있다.",
    listeningPoints: ["플루트와 클라리넷이 표현하는 두 개의 샘", "현악기가 연주하는 넓은 강의 주제", "사냥과 마을의 춤을 떠올리게 하는 장면", "급류를 지나 장엄하게 넓어지는 마지막"],
    timeline: unverifiedTimeline(["플루트와 클라리넷이 표현하는 두 개의 샘", "현악기가 연주하는 넓은 강의 주제", "사냥과 마을의 춤을 떠올리게 하는 장면", "급류를 지나 장엄하게 넓어지는 마지막"]),
    glossaryTerms: ["교향시", "표제 음악", "목관악기"],
    nextTrackIds: ["grieg-morning-mood", "dvorak-new-world-2"],
    relatedTrackIds: ["vivaldi-spring-1", "tchaikovsky-swan-lake-scene"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("연작 전체 또는 독립 트랙 여부와 오케스트라·지휘자를 명시한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "grieg-morning-mood",
    title: "Peer Gynt Suite No. 1: Morning Mood",
    titleKo: "페르 귄트 모음곡 1번 중 아침의 기분",
    composer: "Edvard Grieg",
    composerKo: "에드바르 그리그",
    work: "Peer Gynt Suite No. 1, Op. 46",
    era: "romantic",
    country: "노르웨이",
    isKorean: false,
    genres: ["낭만주의", "극음악", "관현악 모음곡"],
    form: "orchestra",
    instruments: ["오케스트라","플루트","오보에"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 29,
    oneLineIntro: "플루트와 오보에가 주고받는 선율로 해가 떠오르는 장면을 그리는 친숙한 표제 음악이다.",
    background: "입센의 희곡 《페르 귄트》를 위한 극음악에서 가져온 곡이다. 흔히 북유럽의 아침 풍경으로 받아들여지지만 극 중 장면의 배경은 북아프리카로 설정되어 있다. 작품의 실제 맥락과 오늘날의 익숙한 이미지를 함께 설명한다.",
    whyMustListen: "플루트와 오보에의 음색을 비교하고, 같은 선율이 악기를 바꾸며 커지는 과정을 따라가기 쉽다. 짧고 친숙해 어린이와 완전 초보자의 첫 관현악 감상곡으로도 적합하다.",
    listeningPoints: ["플루트가 시작하는 평온한 선율", "오보에가 같은 선율을 이어받는 부분", "현악기가 더해지며 풍경이 넓어지는 과정", "음악이 커졌다가 다시 부드러워지는 마무리"],
    timeline: unverifiedTimeline(["플루트가 시작하는 평온한 선율", "오보에가 같은 선율을 이어받는 부분", "현악기가 더해지며 풍경이 넓어지는 과정", "음악이 커졌다가 다시 부드러워지는 마무리"]),
    glossaryTerms: ["극음악", "플루트", "오보에"],
    nextTrackIds: ["smetana-vltava", "saint-saens-swan"],
    relatedTrackIds: ["vivaldi-spring-1", "debussy-clair-de-lune"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("극음악 원전 또는 모음곡 버전과 오케스트라·지휘자를 명시한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "kim-dong-jin-sin-arirang",
    title: "Sin Arirang",
    titleKo: "신아리랑",
    composer: "Kim Dong-jin",
    composerKo: "김동진",
    work: "Sin Arirang",
    era: "korean-modern",
    country: "대한민국",
    isKorean: true,
    genres: ["한국 가곡", "성악", "근현대 음악"],
    form: "art-song",
    instruments: ["성악", "피아노"],
    difficulty: "easy",
    durationClass: "short",
    durationSeconds: null,
    courseOrder: 30,
    oneLineIntro: "아리랑의 정서와 서양 예술가곡의 성악·피아노 형식이 만나는 한국 가곡이다.",
    background: "김동진의 대표적인 한국 가곡 가운데 하나다. 서비스 공개 전 작사자, 작곡·발표 정보와 채택한 성악가·반주자 버전을 공식 자료로 확인한다. 민요 아리랑과 제목이 비슷하지만 독립된 예술가곡으로 구분해 소개한다.",
    whyMustListen: "한국어 가사, 성악의 긴 호흡과 피아노 반주가 결합되는 방식을 들을 수 있다. 《가고파》, 《봉선화》와 함께 들으면 한국 가곡 안에서도 선율과 정서가 어떻게 달라지는지 비교할 수 있다.",
    listeningPoints: ["피아노가 제시하는 서정적인 분위기", "성악이 시작하는 긴 한국어 프레이즈", "음역이 높아지며 감정이 커지는 부분", "피아노와 보컬이 함께 남기는 마지막 여운"],
    timeline: unverifiedTimeline(["피아노가 제시하는 서정적인 분위기", "성악이 시작하는 긴 한국어 프레이즈", "음역이 높아지며 감정이 커지는 부분", "피아노와 보컬이 함께 남기는 마지막 여운"]),
    glossaryTerms: ["한국 가곡", "예술가곡", "프레이즈"],
    nextTrackIds: ["kim-dong-jin-gagopa", "hong-nan-pa-bongsunhwa"],
    relatedTrackIds: ["schubert-ave-maria", "choi-sung-hwan-arirang-fantasy"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("작사자·성악가·반주자와 공식 앨범 정보를 검수한 뒤 공개한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
  {
    id: "schubert-unfinished-1",
    title: "Symphony No. 8 ‘Unfinished’: I. Allegro moderato",
    titleKo: "교향곡 8번 미완성 1악장",
    composer: "Franz Schubert",
    composerKo: "프란츠 슈베르트",
    work: "Symphony No. 8 in B minor, D. 759, Unfinished",
    era: "romantic",
    country: "오스트리아",
    isKorean: false,
    genres: ["낭만주의", "교향곡"],
    form: "symphony",
    instruments: ["오케스트라"],
    difficulty: "easy",
    durationClass: "long",
    durationSeconds: null,
    courseOrder: 31,
    oneLineIntro: "낮은 현악의 어두운 시작과 노래하는 두 주제의 대비로 낭만주의 교향곡의 감정을 쉽게 느낄 수 있다.",
    background: "완성된 두 악장만 전해져 ‘미완성 교향곡’이라 불린다. 왜 완성하지 않았는지는 확정되지 않았다. 1악장은 낮은 현악의 신비로운 도입과 목관·현악이 연주하는 두 개의 서정적인 주제가 대비된다.",
    whyMustListen: "짧은 동기를 밀어붙이는 베토벤과 달리 슈베르트는 길고 노래하는 선율로 교향곡을 전개한다. 두 작곡가의 교향곡을 비교하면 고전주의에서 낭만주의로 이어지는 변화를 쉽게 느낄 수 있다.",
    listeningPoints: ["낮은 현악기가 시작하는 어두운 도입", "오보에와 클라리넷이 제시하는 첫 주제", "첼로가 노래하는 부드러운 두 번째 주제", "갑작스러운 강한 합주로 긴장이 커지는 부분"],
    timeline: unverifiedTimeline(["낮은 현악기가 시작하는 어두운 도입", "오보에와 클라리넷이 제시하는 첫 주제", "첼로가 노래하는 부드러운 두 번째 주제", "갑작스러운 강한 합주로 긴장이 커지는 부분"]),
    glossaryTerms: ["미완성 작품", "교향곡", "서정적 선율"],
    nextTrackIds: ["dvorak-new-world-2", "beethoven-symphony-5-1"],
    relatedTrackIds: ["mozart-symphony-40-1", "schubert-trout-4"],
    video: unverifiedVideo(),
    recording: unverifiedRecording("교향곡 번호 표기 체계와 지휘자·오케스트라를 공식 출처로 확인한다."),
    sources: [{ title: "작품 및 연주 정보 공식 출처 검수 필요", status: "TODO_VERIFY" }],
    status: "draft",
  },
];

/** 목록 필터 */
export const CLASSIC_FILTERS = {
  era: [
    "all", "baroque", "classical", "classical-romantic",
    "romantic", "impressionist", "modern", "korean-modern",
  ] as const,
  origin: ["all", "korean", "international"] as const,
  form: [
    "all", "solo", "chamber", "concerto",
    "symphony", "orchestra", "ballet", "art-song",
  ] as const,
  difficulty: ["all", "easy", "medium", "advanced"] as const,
  durationClass: ["all", "short", "medium", "long"] as const,
  completion: ["all", "completed", "not-completed"] as const,
};

export const CLASSIC_SORT_OPTIONS = [
  { value: "course", label: "입문 추천순" },
  { value: "era", label: "시대순" },
  { value: "title", label: "작품명순" },
  { value: "composer", label: "작곡가순" },
  { value: "duration", label: "짧은 곡부터" },
  { value: "recent", label: "최근 추가순" },
] as const;

export const getClassicTrackById = (id: string) =>
  CLASSIC_TRACKS.find((track) => track.id === id);

export const getKoreanClassicTracks = () =>
  CLASSIC_TRACKS.filter((track) => track.isKorean);

export const getClassicTracksByEra = (era: ClassicalEra) =>
  CLASSIC_TRACKS.filter((track) => track.era === era);

export const getClassicTracksByForm = (form: PerformanceForm) =>
  CLASSIC_TRACKS.filter((track) => track.form === form);

export const resolveClassicTracks = (ids: string[]) =>
  ids
    .map((id) => getClassicTrackById(id))
    .filter((track): track is ClassicTrack => Boolean(track));

export const toClassicTrackCard = (track: ClassicTrack) => ({
  id: track.id,
  title: track.title,
  titleKo: track.titleKo,
  composer: track.composer,
  composerKo: track.composerKo,
  era: track.era,
  originLabel: track.isKorean ? "한국 클래식" : track.country,
  form: track.form,
  instruments: track.instruments,
  difficulty: track.difficulty,
  oneLineIntro: track.oneLineIntro,
  favorite: false,
  completed: false,
  videoStatus: track.video.status,
});
```

---

# 부록 B — YouTube 작품 링크 및 영상 검수 가이드

> 파일명: `youtube_classic_guide.MD`  
> 대상 데이터: `class_traks.ts`의 클래식 입문 작품 31곡  
> 정리 기준일: 2026-10-04  
> 목적: 클래식 입문 웹앱에서 사용할 연주 영상 검색 링크와 채택 기준 정리

---

## 중요 안내

클래식은 같은 작품이라도 연주자, 지휘자, 오케스트라, 악기 편성, 판본과 녹음 시기에 따라 내용과 재생 시간이 크게 달라진다.

- 아래의 **YouTube 검색 링크**는 곡명·작곡가가 입력된 검색 결과 페이지다.
- 검색 링크를 `youtubeVideoId`로 사용하지 않는다.
- 실제 웹앱에는 검색 결과에서 최종 선택한 영상 하나의 ID만 입력한다.
- 공식 연주자, 오케스트라, 음악 기관, 레이블과 권리 보유 채널을 우선한다.
- 전체 작품 영상에서는 소개할 악장의 시작 시간을 반드시 확인한다.
- 자동 생성 Topic 채널을 사용할 때 앨범, 연주자와 레이블 정보를 확인한다.
- 어린이 연주, MIDI, 편곡, 악보 재생 영상은 별도 콘텐츠가 아니라면 기본 소개 영상으로 사용하지 않는다.
- 한국 가곡은 성악가의 성부, 반주자, 작사자와 앨범 정보를 함께 확인한다.
- 영상이 공식적이어도 iframe 임베드가 차단될 수 있으므로 배포 전에 다시 검사한다.

---

## 전체 링크 요약

| 번호 | 작곡가 | 작품 | 시대 | 편성 | YouTube |
|---:|---|---|---|---|---|
| 1 | 안토니오 비발디 | 사계 중 봄 1악장 | 바로크 | 바이올린 협주곡 | [검색](https://www.youtube.com/results?search_query=Antonio+Vivaldi+The+Four+Seasons+Spring+I+Allegro+official+performance) · [후보 1](https://www.youtube.com/watch?v=0FP9N2SbWn4) · [후보 2](https://www.youtube.com/watch?v=3LiztfE1X7E) |
| 2 | 요한 제바스티안 바흐 | 관현악 모음곡 3번 중 아리아 | 바로크 | 관현악곡 | [검색](https://www.youtube.com/results?search_query=Johann+Sebastian+Bach+Orchestral+Suite+No.+3+Air+BWV+1068+official+performance) |
| 3 | 요한 제바스티안 바흐 | 무반주 첼로 모음곡 1번 중 프렐류드 | 바로크 | 첼로 독주 | [검색](https://www.youtube.com/results?search_query=Johann+Sebastian+Bach+Cello+Suite+No.+1+Prelude+BWV+1007+official+performance) |
| 4 | 게오르크 프리드리히 헨델 | 수상 음악 중 알라 혼파이프 | 바로크 | 관현악곡 | [검색](https://www.youtube.com/results?search_query=George+Frideric+Handel+Water+Music+Alla+Hornpipe+HWV+349+official+performance) |
| 5 | 볼프강 아마데우스 모차르트 | 아이네 클라이네 나흐트무지크 1악장 | 고전주의 | 세레나데 | [검색](https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Eine+kleine+Nachtmusik+K+525+I+Allegro+official+performance) |
| 6 | 볼프강 아마데우스 모차르트 | 터키 행진곡 | 고전주의 | 피아노 독주 | [검색](https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Piano+Sonata+No.+11+Alla+Turca+K+331+official+performance) |
| 7 | 루트비히 판 베토벤 | 교향곡 5번 1악장 | 고전주의·초기 낭만주의 | 교향곡 | [검색](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+5+I+Allegro+con+brio+Op+67+official+performance) |
| 8 | 루트비히 판 베토벤 | 월광 소나타 1악장 | 고전주의·초기 낭만주의 | 피아노 독주 | [검색](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Piano+Sonata+No.+14+Moonlight+I+Adagio+sostenuto+official+performance) |
| 9 | 루트비히 판 베토벤 | 엘리제를 위하여 | 고전주의·초기 낭만주의 | 피아노 소품 | [검색](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+F%C3%BCr+Elise+WoO+59+official+performance) |
| 10 | 프란츠 슈베르트 | 피아노 5중주 송어 4악장 | 낭만주의 | 실내악 | [검색](https://www.youtube.com/results?search_query=Franz+Schubert+Trout+Quintet+IV+Theme+and+Variations+D+667+official+performance) |
| 11 | 프레데리크 쇼팽 | 녹턴 작품 9-2 | 낭만주의 | 피아노 독주 | [검색](https://www.youtube.com/results?search_query=Fr%C3%A9d%C3%A9ric+Chopin+Nocturne+Op+9+No+2+official+performance) |
| 12 | 표트르 일리치 차이콥스키 | 백조의 호수 중 정경 | 낭만주의 | 발레 음악 | [검색](https://www.youtube.com/results?search_query=Pyotr+Ilyich+Tchaikovsky+Swan+Lake+Scene+Op+20+official+performance) |
| 13 | 안토닌 드보르자크 | 교향곡 9번 신세계로부터 2악장 | 낭만주의 | 교향곡 | [검색](https://www.youtube.com/results?search_query=Anton%C3%ADn+Dvo%C5%99%C3%A1k+Symphony+No.+9+From+the+New+World+II+Largo+official+performance) |
| 14 | 클로드 드뷔시 | 달빛 | 인상주의 | 피아노 독주 | [검색](https://www.youtube.com/results?search_query=Claude+Debussy+Clair+de+lune+Suite+bergamasque+official+performance) |
| 15 | 모리스 라벨 | 볼레로 | 20세기 | 관현악곡 | [검색](https://www.youtube.com/results?search_query=Maurice+Ravel+Bol%C3%A9ro+official+performance) |
| 16 | 카미유 생상스 | 동물의 사육제 중 백조 | 낭만주의 | 첼로·피아노 | [검색](https://www.youtube.com/results?search_query=Camille+Saint-Sa%C3%ABns+The+Carnival+of+the+Animals+The+Swan+official+performance) |
| 17 | 구스타브 홀스트 | 행성 중 목성 | 20세기 | 관현악 모음곡 | [검색](https://www.youtube.com/results?search_query=Gustav+Holst+The+Planets+Jupiter+official+performance) |
| 18 | 홍난파 | 봉선화 | 한국 근대 | 한국 가곡 | [검색](https://www.youtube.com/results?search_query=Hong+Nan-pa+Bongsunhwa+%EB%B4%89%EC%84%A0%ED%99%94+official+performance) |
| 19 | 김동진 | 가고파 | 한국 근현대 | 한국 가곡 | [검색](https://www.youtube.com/results?search_query=Kim+Dong-jin+Gagopa+%EA%B0%80%EA%B3%A0%ED%8C%8C+official+performance) |
| 20 | 최성환 | 아리랑 환상곡 | 한국 현대 | 관현악곡 | [검색](https://www.youtube.com/results?search_query=Choi+Sung-hwan+Arirang+Fantasy+%EC%95%84%EB%A6%AC%EB%9E%91+%ED%99%98%EC%83%81%EA%B3%A1+official+performance) |
| 21 | 요한 파헬벨 | 캐논 라장조 | 바로크 | 실내악 | [검색](https://www.youtube.com/results?search_query=Johann+Pachelbel+Canon+in+D+major+P+37+official+performance) |
| 22 | 게오르크 프리드리히 헨델 | 메시아 중 할렐루야 | 바로크 | 오라토리오·합창 | [검색](https://www.youtube.com/results?search_query=George+Frideric+Handel+Messiah+Hallelujah+HWV+56+official+performance) |
| 23 | 볼프강 아마데우스 모차르트 | 교향곡 40번 1악장 | 고전주의 | 교향곡 | [검색](https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Symphony+No.+40+I+Molto+allegro+K+550+official+performance) |
| 24 | 루트비히 판 베토벤 | 교향곡 9번 합창 4악장 | 고전주의·초기 낭만주의 | 교향곡·합창 | [검색](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+9+IV+Finale+Ode+to+Joy+official+performance) |
| 25 | 프란츠 슈베르트 | 아베 마리아 | 낭만주의 | 예술가곡 | [검색](https://www.youtube.com/results?search_query=Franz+Schubert+Ellens+Gesang+III+Ave+Maria+D+839+official+performance) |
| 26 | 펠릭스 멘델스존 | 바이올린 협주곡 마단조 1악장 | 낭만주의 | 바이올린 협주곡 | [검색](https://www.youtube.com/results?search_query=Felix+Mendelssohn+Violin+Concerto+in+E+minor+I+Allegro+Op+64+official+performance) |
| 27 | 요하네스 브람스 | 헝가리 무곡 5번 | 낭만주의 | 무곡·관현악 | [검색](https://www.youtube.com/results?search_query=Johannes+Brahms+Hungarian+Dance+No.+5+official+performance) |
| 28 | 베드르지흐 스메타나 | 나의 조국 중 몰다우 | 낭만주의 | 교향시 | [검색](https://www.youtube.com/results?search_query=Bed%C5%99ich+Smetana+M%C3%A1+vlast+Vltava+The+Moldau+official+performance) |
| 29 | 에드바르 그리그 | 페르 귄트 중 아침의 기분 | 낭만주의 | 극음악·관현악 | [검색](https://www.youtube.com/results?search_query=Edvard+Grieg+Peer+Gynt+Morning+Mood+Op+46+official+performance) |
| 30 | 김동진 | 신아리랑 | 한국 근현대 | 한국 가곡 | [검색](https://www.youtube.com/results?search_query=Kim+Dong-jin+Sin+Arirang+%EC%8B%A0%EC%95%84%EB%A6%AC%EB%9E%91+official+performance) |
| 31 | 프란츠 슈베르트 | 교향곡 8번 미완성 1악장 | 낭만주의 | 교향곡 | [검색](https://www.youtube.com/results?search_query=Franz+Schubert+Symphony+No.+8+Unfinished+I+Allegro+moderato+D+759+official+performance) |

---

## 작품별 링크와 선정 기준

### 1. 안토니오 비발디 — 사계 중 봄 1악장

- **원어 검색어:** `Antonio Vivaldi The Four Seasons Spring I Allegro`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Antonio+Vivaldi+The+Four+Seasons+Spring+I+Allegro+official+performance)
- **우선 확인 채널:** Netherlands Bach Society, Voices of Music 등 시대악기 전문 채널
- **직접 영상 후보:** [Netherlands Bach Society — Vivaldi Spring](https://www.youtube.com/watch?v=0FP9N2SbWn4)
- **직접 영상 후보:** [Voices of Music — Vivaldi Spring](https://www.youtube.com/watch?v=3LiztfE1X7E)
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 2. 요한 제바스티안 바흐 — 관현악 모음곡 3번 중 아리아

- **원어 검색어:** `Johann Sebastian Bach Orchestral Suite No. 3 Air BWV 1068`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Johann+Sebastian+Bach+Orchestral+Suite+No.+3+Air+BWV+1068+official+performance)
- **우선 확인 채널:** Netherlands Bach Society, Voices of Music, 공식 오케스트라 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 3. 요한 제바스티안 바흐 — 무반주 첼로 모음곡 1번 중 프렐류드

- **원어 검색어:** `Johann Sebastian Bach Cello Suite No. 1 Prelude BWV 1007`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Johann+Sebastian+Bach+Cello+Suite+No.+1+Prelude+BWV+1007+official+performance)
- **우선 확인 채널:** 연주자·레이블 공식 채널 또는 검증된 공연 기관
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 4. 게오르크 프리드리히 헨델 — 수상 음악 중 알라 혼파이프

- **원어 검색어:** `George Frideric Handel Water Music Alla Hornpipe HWV 349`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=George+Frideric+Handel+Water+Music+Alla+Hornpipe+HWV+349+official+performance)
- **우선 확인 채널:** 공식 오케스트라·바로크 앙상블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 5. 볼프강 아마데우스 모차르트 — 아이네 클라이네 나흐트무지크 1악장

- **원어 검색어:** `Wolfgang Amadeus Mozart Eine kleine Nachtmusik K 525 I Allegro`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Eine+kleine+Nachtmusik+K+525+I+Allegro+official+performance)
- **우선 확인 채널:** 공식 실내악단·오케스트라·레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 6. 볼프강 아마데우스 모차르트 — 터키 행진곡

- **원어 검색어:** `Wolfgang Amadeus Mozart Piano Sonata No. 11 Alla Turca K 331`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Piano+Sonata+No.+11+Alla+Turca+K+331+official+performance)
- **우선 확인 채널:** 피아니스트·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 7. 루트비히 판 베토벤 — 교향곡 5번 1악장

- **원어 검색어:** `Ludwig van Beethoven Symphony No. 5 I Allegro con brio Op 67`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+5+I+Allegro+con+brio+Op+67+official+performance)
- **우선 확인 채널:** 공식 오케스트라 채널, hr-Sinfonieorchester, Deutsche Welle Classical Music
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 8. 루트비히 판 베토벤 — 월광 소나타 1악장

- **원어 검색어:** `Ludwig van Beethoven Piano Sonata No. 14 Moonlight I Adagio sostenuto`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Piano+Sonata+No.+14+Moonlight+I+Adagio+sostenuto+official+performance)
- **우선 확인 채널:** 피아니스트·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 9. 루트비히 판 베토벤 — 엘리제를 위하여

- **원어 검색어:** `Ludwig van Beethoven Für Elise WoO 59`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+F%C3%BCr+Elise+WoO+59+official+performance)
- **우선 확인 채널:** 피아니스트·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 10. 프란츠 슈베르트 — 피아노 5중주 송어 4악장

- **원어 검색어:** `Franz Schubert Trout Quintet IV Theme and Variations D 667`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Franz+Schubert+Trout+Quintet+IV+Theme+and+Variations+D+667+official+performance)
- **우선 확인 채널:** 공식 실내악단·음악제·레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 11. 프레데리크 쇼팽 — 녹턴 작품 9-2

- **원어 검색어:** `Frédéric Chopin Nocturne Op 9 No 2`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Fr%C3%A9d%C3%A9ric+Chopin+Nocturne+Op+9+No+2+official+performance)
- **우선 확인 채널:** Chopin Institute, 피아니스트·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 12. 표트르 일리치 차이콥스키 — 백조의 호수 중 정경

- **원어 검색어:** `Pyotr Ilyich Tchaikovsky Swan Lake Scene Op 20`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Pyotr+Ilyich+Tchaikovsky+Swan+Lake+Scene+Op+20+official+performance)
- **우선 확인 채널:** 공식 발레단·오케스트라·레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 13. 안토닌 드보르자크 — 교향곡 9번 신세계로부터 2악장

- **원어 검색어:** `Antonín Dvořák Symphony No. 9 From the New World II Largo`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Anton%C3%ADn+Dvo%C5%99%C3%A1k+Symphony+No.+9+From+the+New+World+II+Largo+official+performance)
- **우선 확인 채널:** 공식 오케스트라 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 14. 클로드 드뷔시 — 달빛

- **원어 검색어:** `Claude Debussy Clair de lune Suite bergamasque`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Claude+Debussy+Clair+de+lune+Suite+bergamasque+official+performance)
- **우선 확인 채널:** 피아니스트·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 15. 모리스 라벨 — 볼레로

- **원어 검색어:** `Maurice Ravel Boléro`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Maurice+Ravel+Bol%C3%A9ro+official+performance)
- **우선 확인 채널:** 공식 오케스트라·발레단 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 16. 카미유 생상스 — 동물의 사육제 중 백조

- **원어 검색어:** `Camille Saint-Saëns The Carnival of the Animals The Swan`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Camille+Saint-Sa%C3%ABns+The+Carnival+of+the+Animals+The+Swan+official+performance)
- **우선 확인 채널:** 첼리스트·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 17. 구스타브 홀스트 — 행성 중 목성

- **원어 검색어:** `Gustav Holst The Planets Jupiter`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Gustav+Holst+The+Planets+Jupiter+official+performance)
- **우선 확인 채널:** 공식 오케스트라·레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 18. 홍난파 — 봉선화

- **원어 검색어:** `Hong Nan-pa Bongsunhwa 봉선화`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Hong+Nan-pa+Bongsunhwa+%EB%B4%89%EC%84%A0%ED%99%94+official+performance)
- **우선 확인 채널:** KBS, 국립합창단, 성악가·음반사 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 19. 김동진 — 가고파

- **원어 검색어:** `Kim Dong-jin Gagopa 가고파`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Kim+Dong-jin+Gagopa+%EA%B0%80%EA%B3%A0%ED%8C%8C+official+performance)
- **우선 확인 채널:** KBS, 국립합창단, 성악가·음반사 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 20. 최성환 — 아리랑 환상곡

- **원어 검색어:** `Choi Sung-hwan Arirang Fantasy 아리랑 환상곡`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Choi+Sung-hwan+Arirang+Fantasy+%EC%95%84%EB%A6%AC%EB%9E%91+%ED%99%98%EC%83%81%EA%B3%A1+official+performance)
- **우선 확인 채널:** KBS교향악단, 서울시향, 공식 공연기관 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 21. 요한 파헬벨 — 캐논 라장조

- **원어 검색어:** `Johann Pachelbel Canon in D major P 37`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Johann+Pachelbel+Canon+in+D+major+P+37+official+performance)
- **우선 확인 채널:** 시대악기 앙상블·공식 레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 22. 게오르크 프리드리히 헨델 — 메시아 중 할렐루야

- **원어 검색어:** `George Frideric Handel Messiah Hallelujah HWV 56`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=George+Frideric+Handel+Messiah+Hallelujah+HWV+56+official+performance)
- **우선 확인 채널:** 공식 합창단·오케스트라·바로크 앙상블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 23. 볼프강 아마데우스 모차르트 — 교향곡 40번 1악장

- **원어 검색어:** `Wolfgang Amadeus Mozart Symphony No. 40 I Molto allegro K 550`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Symphony+No.+40+I+Molto+allegro+K+550+official+performance)
- **우선 확인 채널:** 공식 오케스트라 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 24. 루트비히 판 베토벤 — 교향곡 9번 합창 4악장

- **원어 검색어:** `Ludwig van Beethoven Symphony No. 9 IV Finale Ode to Joy`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+9+IV+Finale+Ode+to+Joy+official+performance)
- **우선 확인 채널:** 공식 오케스트라·합창단 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 25. 프란츠 슈베르트 — 아베 마리아

- **원어 검색어:** `Franz Schubert Ellens Gesang III Ave Maria D 839`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Franz+Schubert+Ellens+Gesang+III+Ave+Maria+D+839+official+performance)
- **우선 확인 채널:** 성악가·레이블 공식 채널, 원어/라틴어 버전 구분
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 26. 펠릭스 멘델스존 — 바이올린 협주곡 마단조 1악장

- **원어 검색어:** `Felix Mendelssohn Violin Concerto in E minor I Allegro Op 64`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Felix+Mendelssohn+Violin+Concerto+in+E+minor+I+Allegro+Op+64+official+performance)
- **우선 확인 채널:** 바이올리니스트·오케스트라·레이블 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 27. 요하네스 브람스 — 헝가리 무곡 5번

- **원어 검색어:** `Johannes Brahms Hungarian Dance No. 5`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Johannes+Brahms+Hungarian+Dance+No.+5+official+performance)
- **우선 확인 채널:** 공식 오케스트라 채널, 원곡/편곡 버전 구분
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 28. 베드르지흐 스메타나 — 나의 조국 중 몰다우

- **원어 검색어:** `Bedřich Smetana Má vlast Vltava The Moldau`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Bed%C5%99ich+Smetana+M%C3%A1+vlast+Vltava+The+Moldau+official+performance)
- **우선 확인 채널:** 체코 필하모닉 등 공식 오케스트라 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 29. 에드바르 그리그 — 페르 귄트 중 아침의 기분

- **원어 검색어:** `Edvard Grieg Peer Gynt Morning Mood Op 46`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Edvard+Grieg+Peer+Gynt+Morning+Mood+Op+46+official+performance)
- **우선 확인 채널:** 공식 오케스트라·레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 30. 김동진 — 신아리랑

- **원어 검색어:** `Kim Dong-jin Sin Arirang 신아리랑`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Kim+Dong-jin+Sin+Arirang+%EC%8B%A0%EC%95%84%EB%A6%AC%EB%9E%91+official+performance)
- **우선 확인 채널:** KBS, 국립합창단, 성악가·음반사 공식 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

### 31. 프란츠 슈베르트 — 교향곡 8번 미완성 1악장

- **원어 검색어:** `Franz Schubert Symphony No. 8 Unfinished I Allegro moderato D 759`
- **YouTube 검색:** [검색 결과 열기](https://www.youtube.com/results?search_query=Franz+Schubert+Symphony+No.+8+Unfinished+I+Allegro+moderato+D+759+official+performance)
- **우선 확인 채널:** 공식 오케스트라·레이블 채널
- **채택 전 확인:** 작품·악장 일치, 연주자 및 단체, 공식성, 전체/악장 영상 여부, 임베드 가능 여부

---

## 추천 영상 선정 우선순위

1. 연주자·오케스트라·합창단·음악 기관의 공식 채널
2. 음반사 또는 권리 보유자가 제공한 공식 영상·공식 오디오
3. 공연장·음악제·방송사의 공식 공연 영상
4. YouTube 자동 생성 Topic 영상 중 앨범과 권리 정보가 명확한 항목
5. 교육 목적의 검증된 전문 음악 채널

다음 영상은 기본 소개 영상으로 사용하지 않는다.

- 출처가 불분명한 재업로드
- 작곡가 또는 연주자가 잘못 표기된 영상
- 전체 작품 제목만 있고 해당 악장의 위치를 확인할 수 없는 영상
- MIDI·신시사이저 재생을 실제 악기 연주처럼 표시한 영상
- 과도하게 편집되거나 원곡과 다른 편곡 영상
- 배경음, 해설, 박수 또는 광고성 인트로가 지나치게 긴 영상

---

## 작품 유형별 추가 검수

### 교향곡과 관현악곡

- 전체 작품 영상이면 해당 악장의 시작 초를 기록한다.
- 지휘자와 오케스트라를 함께 저장한다.
- 악장 번호와 빠르기말이 일치하는지 확인한다.

### 협주곡

- 독주자, 지휘자와 오케스트라를 모두 기록한다.
- 여러 악장을 한 영상에 담았으면 소개 악장의 시작 시간을 확인한다.

### 피아노·첼로 독주

- 연주자와 앨범 또는 공연 정보를 기록한다.
- 편곡판이 아닌 원래 악기 버전인지 확인한다.

### 가곡과 합창

- 성악가의 성부, 합창단, 반주자와 언어를 확인한다.
- 《아베 마리아》는 원어 《엘렌의 노래 3번》과 라틴어 가사 버전을 구분한다.
- 한국 가곡은 작사자, 성악가와 반주자를 함께 기록한다.

### 한국 관현악

- 작품명, 작곡자, 편곡자와 판본을 확인한다.
- 오케스트라와 지휘자, 공연 주최 기관을 기록한다.

---

## TypeScript 적용 형식

```ts
export type ClassicVideoSource = {
  trackId: string;
  youtubeVideoId: string;
  title: string;
  channelName: string;
  performer?: string;
  conductor?: string;
  orchestra?: string;
  choir?: string;
  movementStartSeconds?: number;
  isOfficial: boolean;
  isEmbeddable: boolean;
  versionType: "performance" | "official-audio" | "topic";
  lastVerifiedAt: string;
  fallbackVideoId?: string;
  sourceNote?: string;
};
```

### 미검수 상태

```ts
video: {
  youtubeVideoId: "TODO_VERIFY_VIDEO_ID",
  title: "TODO_VERIFY_OFFICIAL_VIDEO",
  channelName: "TODO_VERIFY_CHANNEL",
  isOfficial: null,
  isEmbeddable: null,
  lastVerifiedAt: null,
  status: "TODO_VERIFY",
}
```

검색 결과 URL 자체를 `youtubeVideoId`나 iframe 주소로 저장하지 않는다.

---

## 최종 영상 검수 체크리스트

- [ ] 작곡가와 작품명이 정확한가?
- [ ] 소개하려는 악장과 빠르기말이 일치하는가?
- [ ] 원곡의 악기 편성인가?
- [ ] 연주자·지휘자·오케스트라·합창단이 표시되어 있는가?
- [ ] 공식 또는 권리 보유 채널인가?
- [ ] 영상이 현재 공개 상태인가?
- [ ] 로그인 없이 재생 가능한가?
- [ ] iframe 임베드가 허용되는가?
- [ ] 지역 제한이 없는가?
- [ ] 전체 작품 영상이라면 악장 시작 초를 기록했는가?
- [ ] 영상 기준으로 감상 타임라인을 검수했는가?
- [ ] fallback 영상 또는 검색 링크를 준비했는가?
- [ ] 제목과 설명에 소개하는 특정 연주 버전을 명시했는가?

---

## 우선 검수 권장 작품

다음 작품은 버전 차이 또는 메타데이터 확인이 특히 중요하다.

1. 바흐 — 관현악 모음곡 3번 중 아리아: 원곡과 ‘G선상의 아리아’ 편곡 구분
2. 헨델 — 수상 음악 중 알라 혼파이프: 모음곡 번호와 편성 확인
3. 모차르트 — 교향곡 40번: 클라리넷 포함 개정판 여부 확인
4. 슈베르트 — 아베 마리아: 원어와 라틴어 가사 버전 구분
5. 브람스 — 헝가리 무곡 5번: 피아노 연탄 원곡과 관현악 편곡 구분
6. 그리그 — 아침의 기분: 극음악 원전과 모음곡 버전 구분
7. 홍난파 — 봉선화: 작사자·성악가·반주자·앨범 정보 확인
8. 김동진 — 가고파·신아리랑: 작사자와 채택한 성악 버전 확인
9. 최성환 — 아리랑 환상곡: 작곡자 표기, 판본과 연주 단체 확인

---

# 부록 C — 최종 통합 완료 체크리스트

## 데이터

- [ ] `src/data/classTraks.ts`가 부록 A와 동일하다.
- [ ] `CLASSIC_TRACKS.length`가 31이다.
- [ ] 모든 `id`가 중복 없이 고유하다.
- [ ] 존재하지 않는 관련 작품 ID가 UI에서 안전하게 제외된다.
- [ ] 한국 클래식은 `isKorean === true`로 필터링된다.

## 작품 상세

- [ ] 작품명, 악장, 작곡가와 작품번호가 표시된다.
- [ ] 시대, 국가, 편성과 주요 악기가 표시된다.
- [ ] 한 줄 소개, 배경, 감상 이유와 감상 포인트가 표시된다.
- [ ] 관련 용어를 페이지 이탈 없이 확인할 수 있다.
- [ ] 다음 작품과 관련 작품을 탐색할 수 있다.

## YouTube

- [ ] 검색 URL을 영상 ID로 사용하지 않는다.
- [ ] 검수된 영상만 iframe에 연결한다.
- [ ] 연주자·지휘자·오케스트라·합창단 정보를 저장한다.
- [ ] 전체 작품 영상은 악장 시작 초를 기록한다.
- [ ] iframe 임베드 가능 여부를 확인한다.
- [ ] 영상 오류 시 fallback과 검색 링크를 제공한다.
- [ ] 최종 영상 기준으로 타임라인을 검수한다.

## 사용자 기능

- [ ] 찜, 최근 감상, 완료와 코스 진도가 localStorage에 저장된다.
- [ ] 정적 데이터와 사용자 상태가 분리된다.
- [ ] 새로고침 후 상태가 유지된다.
- [ ] 손상된 저장 데이터가 안전한 기본값으로 복구된다.

## 품질

- [ ] 모바일과 데스크톱 내비게이션이 작동한다.
- [ ] 키보드만으로 주요 기능을 사용할 수 있다.
- [ ] focus ring과 충분한 색상 대비가 유지된다.
- [ ] `prefers-reduced-motion`을 지원한다.
- [ ] lint가 성공한다.
- [ ] typecheck가 성공한다.
- [ ] production build가 성공한다.
