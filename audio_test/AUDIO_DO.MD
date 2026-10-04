# Audio Test Guide 웹앱 개발 작업지시서

> 문서명: `AUDIO_DO.MD`  
> 프로젝트명: **Audio Test Guide — 귀로 확인하는 오디오 체크**  
> 대상 작업 도구: **Z.ai Coding Plan**  
> 서비스 형태: 반응형 웹앱  
> 기본 언어: 한국어  
> 핵심 사용자: 헤드폰·이어폰·스피커의 특성을 음악으로 비교하고 싶은 일반 사용자와 오디오 입문자

---


## 0. Z.ai Coding Plan 빠른 실행 지침 — 통합 파일 우선 적용

이 문서는 다음 3개 파일을 하나로 통합한 최종 작업지시서다.

1. `audio_do.MD` — 오디오 테스트 웹앱의 기능·UX·개발 요구사항
2. `audio_test_tracks.ts` — 해외 10곡과 한국 10곡, 총 20곡의 상세 데이터
3. `youtube_audio_test.MD` — 수록곡별 YouTube 후보 링크와 검수 기준

부록 A에는 `audio_test_tracks.ts` 전체 소스가, 부록 B에는 YouTube 링크 가이드가 포함되어 있다. Z.ai Coding Plan은 테스트 곡 데이터를 다시 만들지 말고 부록 A를 단일 데이터 소스로 사용한다.

### 단일 기준 데이터

- 원본 파일명: `audio_test_tracks.ts`
- 프로젝트 적용 경로: `src/data/audioTestTracks.ts`
- 필요하면 기존 파일 구조에 맞춰 `src/data/tracks.ts`에서 재내보내기한다.
- 수록 범위: 해외 10곡 + 한국 10곡, 총 20곡
- 데이터에 포함된 내용:
  - 목록 필터와 정렬 옵션
  - 카드 표시용 데이터
  - 곡별 주요·보조 테스트 항목
  - 곡별 상세 설명과 감상 포인트
  - 좋은 재생의 예와 주의 신호
  - 기기 평가 필드
  - 다음 추천곡과 비교곡 ID
  - 외부 서비스 검색 링크
  - 버전·출처·타임라인 검수 상태

### 가장 먼저 수행할 작업

1. 부록 A의 코드를 그대로 `src/data/audioTestTracks.ts`에 저장한다.
2. `AudioTestTrack`, `TestCategory`, `VocalType`, `SoundSourceType` 타입을 앱의 공통 타입과 연결한다.
3. `AUDIO_TEST_TRACKS`를 목록·상세·한국 곡·카테고리·검색 화면의 공통 데이터 소스로 사용한다.
4. `AUDIO_TEST_FILTERS`와 `AUDIO_TEST_SORT_OPTIONS`를 UI에 직접 연결한다.
5. `toTrackCard()`를 목록 카드용 view model의 출발점으로 사용한다.
6. `track.id`를 상세 페이지 slug, 즐겨찾기, 감상 완료, 평가와 메모 저장 키로 사용한다.
7. `isKorean === true`를 한국 곡 화면과 한국/해외 필터에 사용한다.
8. `primaryCategory`와 `secondaryCategories`를 카테고리 필터 및 관련 곡 추천에 사용한다.
9. `nextTrackIds`와 `comparisonTrackIds`는 존재하는 ID만 먼저 연결하고, 아직 수록되지 않은 ID는 UI에서 숨긴다.
10. `TODO_VERIFY`와 `seconds: null`은 오류가 아니라 의도적인 검수 대기 상태다. 임의 값으로 채우지 않는다.

### 구현 속도를 위한 금지 사항

- 동일한 20곡을 다른 형식으로 다시 하드코딩하지 않는다.
- 페이지 컴포넌트마다 별도의 곡 배열을 만들지 않는다.
- 미검증 재생 시간, 영상 ID, 직접 트랙 URL과 타임라인 초를 추측하지 않는다.
- 존재하지 않는 `nextTrackIds` 또는 `comparisonTrackIds` 때문에 빌드를 실패시키지 않는다.
- 상세 설명을 요약하거나 삭제하지 않는다.
- 한국 곡을 별도 복제 데이터로 만들지 않고 `isKorean` 필터로 구성한다.
- 사용자 상태인 `favorite`와 `completed`를 정적 데이터 파일에 직접 덮어쓰지 않는다.

### 권장 어댑터

```ts
// src/data/tracks.ts
export {
  AUDIO_TEST_TRACKS,
  AUDIO_TEST_FILTERS,
  AUDIO_TEST_SORT_OPTIONS,
  toTrackCard,
} from "./audioTestTracks";

export type {
  AudioTestTrack,
  TestCategory,
  VocalType,
  SoundSourceType,
} from "./audioTestTracks";
```

### 사용자 상태 결합 방식

```ts
type UserTrackState = {
  favorite: boolean;
  completed: boolean;
  lastPlayedAt?: string;
};

const getTrackViewModel = (
  track: AudioTestTrack,
  state?: UserTrackState,
) => ({
  ...toTrackCard(track),
  favorite: state?.favorite ?? false,
  completed: state?.completed ?? false,
});
```

### 상세 페이지 연결 방식

```ts
export const getTrackById = (id: string) =>
  AUDIO_TEST_TRACKS.find((track) => track.id === id);

export const getKoreanTracks = () =>
  AUDIO_TEST_TRACKS.filter((track) => track.isKorean);

export const getTracksByCategory = (category: TestCategory) =>
  AUDIO_TEST_TRACKS.filter(
    (track) =>
      track.primaryCategory === category ||
      track.secondaryCategories.includes(category),
  );

export const resolveExistingTracks = (ids: string[]) =>
  ids
    .map((id) => getTrackById(id))
    .filter((track): track is AudioTestTrack => Boolean(track));
```

### Phase 1에서 바로 완성할 화면

부록 A를 적용한 직후 아래 화면을 임시 데이터 없이 완성한다.

- `/tracks`: 20곡 전체 목록
- `/tracks/[id]`: 20곡 상세 화면
- `/korean-tracks`: 한국 곡 10곡
- `/categories/[category]`: 주요·보조 항목별 목록
- `/search`: 곡명·아티스트·앨범·장르 검색
- 홈의 `5곡 빠른 점검`
- 홈의 `한국 음악으로 테스트하기`

### 데이터 검수 상태 UI

- `durationSeconds === null`: `재생 시간 검수 중`
- `listeningGuide[].seconds === null`: 시간 이동 버튼을 숨기고 설명만 표시
- `versionInfo.timelineVerified === false`: `구간 시간 검수 전` 배지 표시
- `versionInfo.metadataStatus === "TODO_VERIFY"`: 관리자·개발 환경에서만 경고 표시
- 외부 서비스는 현재 검색 링크이므로 버튼 라벨을 `Spotify에서 검색`, `YouTube Music에서 검색`처럼 표시
- 실제 트랙 직접 링크로 오해하게 만드는 `바로 재생` 문구는 검증 전 사용하지 않는다.

### 데이터 관련 MVP 완료 조건

- 총 20곡이 중복 없이 렌더링된다.
- 한국 곡 10곡이 `isKorean` 필터로 정확히 표시된다.
- 목록과 상세 화면이 동일한 데이터 객체를 사용한다.
- 모든 필터와 정렬 옵션이 URL query parameter와 동기화된다.
- 존재하지 않는 추천 ID는 안전하게 제외된다.
- `TODO_VERIFY` 데이터 때문에 런타임 오류가 발생하지 않는다.
- 즐겨찾기와 감상 완료 상태가 정적 데이터와 분리되어 `localStorage`에 저장된다.
- 타임라인 초가 없는 곡에서도 상세 화면과 감상 가이드가 정상적으로 표시된다.

---

## 0.1 통합 파일 적용 순서

### Step 1 — 테스트 곡 데이터 적용

- 부록 A를 `src/data/audioTestTracks.ts`에 그대로 저장한다.
- `AUDIO_TEST_TRACKS` 20곡을 목록, 상세, 한국 곡, 카테고리, 검색과 코스의 단일 데이터 소스로 사용한다.
- 페이지마다 곡 배열을 복제하지 않는다.
- 즐겨찾기, 감상 완료, 최근 재생과 기기별 평가는 정적 데이터와 분리한다.
- `TODO_VERIFY`, `seconds: null`, `durationSeconds: null`은 의도적인 검수 대기 상태다.

### Step 2 — 텍스트 중심 MVP 완성

YouTube 영상 검수가 끝나지 않아도 다음 화면은 먼저 완성한다.

- 홈
- 테스트 시작
- 전체 테스트 곡
- 한국 테스트 곡
- 테스트 항목별 목록
- 곡 상세
- 5곡 빠른 점검
- 한국 곡 5곡 코스
- 기기 등록
- 기기별 평가
- A/B 비교
- 나의 테스트
- 검색

### Step 3 — YouTube 영상 연결

- 부록 B의 직접 영상 후보와 검색 링크를 사용한다.
- 공식 아티스트, 음반사, 유통사와 권리 보유 채널을 우선한다.
- YouTube 검색 결과 URL을 `youtubeVideoId`로 저장하지 않는다.
- 최종 검수한 영상의 11자리 ID만 곡 데이터 또는 별도 영상 데이터에 저장한다.
- 뮤직비디오, 공식 오디오, 라이브와 리마스터 버전을 구분한다.
- `audio_test_tracks.ts`의 권장 버전과 실제 영상 버전이 다르면 UI에 명시한다.

### Step 4 — 타임라인 검수

- 실제 타임라인은 최종 채택 영상 하나를 기준으로 작성한다.
- `seconds: null`인 항목은 설명만 표시하고 seek 버튼을 숨긴다.
- 다른 업로드나 스트리밍 서비스의 시간을 복사하지 않는다.
- 최종 영상이 변경되면 타임라인 전체를 다시 확인한다.

### Step 5 — 배포 전 영상 검증

- 영상 공개 상태
- 공식 또는 권리 보유 채널 여부
- 정확한 곡·앨범·버전
- iframe 임베드 가능 여부
- 지역 제한
- 영상 길이
- 대체 영상
- YouTube 검색 fallback
- 타임라인 일치 여부

---

## 0.2 세 파일의 충돌 해결 원칙

통합된 자료 사이에 내용이 다르면 아래 우선순위를 적용한다.

1. **곡 목록과 상세 설명:** 부록 A의 `audio_test_tracks.ts`
2. **YouTube 영상 후보와 검수 방법:** 부록 B
3. **화면·기능·UX 요구사항:** 본문 `AUDIO_DO.MD`
4. **검증되지 않은 데이터:** 추측하지 않고 `TODO_VERIFY`
5. **수록 범위:** 해외 10곡 + 한국 10곡, 총 20곡
6. **서비스 목적:** 오디오 기기의 절대 순위가 아니라 동일 사용자의 조건별 청취 비교

### 통합 과정에서 수정한 내용

- 오래된 중복 TypeScript 부록을 제거하고 첨부된 최신 `audio_test_tracks.ts`로 교체했다.
- YouTube 가이드를 별도 부록으로 추가했다.
- 검색 URL과 실제 영상 ID를 명확히 분리했다.
- 직접 영상 후보도 최종 적용 전에 채널·권리·임베드 상태를 재검수하도록 했다.
- 영상 미확정 상태에서도 텍스트, 필터, 평가와 비교 기능을 구현할 수 있도록 순서를 정리했다.
- YouTube 영상과 스트리밍 음원의 마스터 차이를 테스트 결과에 기록하도록 했다.

---

## 0.3 권장 영상 데이터 분리 구조

정적 곡 정보와 변동 가능성이 높은 YouTube 정보를 분리하는 방식을 권장한다.

```ts
export type AudioTrackVideo = {
  trackId: string;
  youtubeVideoId: string | null;
  title: string | null;
  channelName: string | null;
  version:
    | "official-video"
    | "official-audio"
    | "live"
    | "remaster"
    | "unknown";
  verificationStatus:
    | "VERIFIED_OFFICIAL"
    | "RECHECK_CHANNEL"
    | "SEARCH_ONLY"
    | "SELECT_VERSION";
  isOfficial: boolean | null;
  isEmbeddable: boolean | null;
  durationSeconds: number | null;
  lastVerifiedAt: string | null;
  fallbackVideoId?: string;
  searchUrl: string;
  note?: string;
};
```

파일 구조 예시:

```text
src/data/audioTestTracks.ts
src/data/audioTrackVideos.ts
```

이 구조를 사용하면 영상이 삭제되거나 변경되어도 곡 설명과 사용자 평가 데이터를 수정하지 않고 영상 정보만 교체할 수 있다.

---

## 1. 프로젝트 개요

오디오 기기를 비교할 때 단순히 “좋다/나쁘다”가 아니라 다음 특성을 실제 음악으로 확인할 수 있도록 돕는 웹앱을 개발한다.

- 저음이 깊게 내려가면서도 번지지 않는가?
- 보컬이 자연스럽고 치찰음이 과하지 않은가?
- 악기의 위치와 무대 크기가 잘 구분되는가?
- 빠른 드럼과 복잡한 편성을 흐리지 않고 재생하는가?
- 작은 음량에서도 세부 표현과 다이내믹이 살아 있는가?
- 오래 들어도 특정 대역이 피곤하지 않은가?
- 서로 다른 기기의 차이를 같은 조건에서 반복 비교할 수 있는가?

서비스의 핵심 흐름은 다음과 같다.

> 테스트 목적 선택 → 기준 곡 선택 → 동일 음량으로 감상 → 체크 포인트 기록 → 기기별 결과 비교

이 서비스는 측정 장비를 대체하지 않는다. 청취 테스트는 사용자의 청력, 음량, 착용 상태, 공간, 음원 버전과 마스터링에 영향을 받으므로 결과를 절대적인 성능 평가로 표현하지 않는다.

---

## 2. 프로젝트 목표

### 핵심 목표

1. 사용자가 테스트하려는 항목에 맞는 곡을 즉시 선택할 수 있게 한다.
2. 저음·중음·고음·공간감·해상도·다이내믹 등 평가 기준을 쉬운 한국어로 설명한다.
3. 각 곡에서 들어야 할 구간과 체크 포인트를 제공한다.
4. 해외 음악뿐 아니라 한국 음악을 충분히 포함한다.
5. 특정 스트리밍 서비스에 종속되지 않도록 검색 링크와 외부 서비스 연결 구조를 분리한다.
6. A/B 비교 시 음량 일치의 중요성과 청력 보호 지침을 명확히 안내한다.
7. 기기별 감상 메모와 평가 결과를 브라우저에 저장한다.
8. 모바일과 데스크톱에서 모두 빠르고 편안하게 사용할 수 있게 한다.

### 성공 기준

- 신규 사용자가 홈 화면에서 10초 안에 테스트 항목과 첫 곡을 선택할 수 있다.
- 각 곡 페이지에서 “왜 이 곡을 쓰는지”와 “무엇을 들어야 하는지”를 바로 이해할 수 있다.
- 한국 곡만 모아 보거나 테스트 항목별로 필터링할 수 있다.
- 같은 곡에 대한 여러 기기의 메모와 점수를 비교할 수 있다.
- 서비스가 음량 경쟁을 유도하지 않고 안전한 청취를 안내한다.
- 키보드 탐색, 명확한 대비, 모션 감소 설정 등 기본 접근성을 충족한다.

---

## 3. 서비스 원칙

### 반드시 지킬 원칙

- “고가 제품이 항상 더 좋다”는 식의 가격 중심 평가를 하지 않는다.
- 음질을 하나의 총점만으로 단정하지 않는다.
- 사람마다 선호하는 음색이 다름을 반복해서 안내한다.
- 테스트 전 좌우 착용, 이어팁 밀폐, EQ, 공간 음향, 음량 정규화 상태를 확인하게 한다.
- A/B 비교에서는 가능한 한 동일 음량을 사용하게 한다.
- 큰 음량으로 짧게 감탄하는 테스트보다 편안한 음량으로 반복 확인하는 방식을 권장한다.
- 청력 이상이나 통증이 느껴지면 즉시 재생을 멈추도록 안내한다.
- 무손실·고해상도 표기만으로 실제 청감 우위를 보장한다고 표현하지 않는다.
- YouTube, Spotify, Apple Music 등의 음원은 서비스·지역·업로드 버전에 따라 마스터가 다를 수 있음을 표시한다.
- 검증하지 않은 영상 ID, 앨범 정보, 발매 연도, 타임라인은 임의로 입력하지 않고 `TODO_VERIFY`로 남긴다.

---

## 4. 권장 기술 스택

### 프론트엔드

- Next.js 최신 안정 버전
- React
- TypeScript strict mode
- Tailwind CSS
- 접근성 높은 UI 컴포넌트
- Lucide React 아이콘
- React Context 또는 Zustand
- 정적 데이터 + Server Components 우선

### 데이터 및 저장

초기 MVP는 정적 TypeScript 데이터로 구현한다.

```text
src/data/tracks.ts
src/data/artists.ts
src/data/testCategories.ts
src/data/playlists.ts
src/data/glossary.ts
src/data/safetyGuides.ts
```

로그인 없는 MVP에서는 다음 정보를 `localStorage`에 저장한다.

- 등록한 오디오 기기
- 곡별 감상 메모
- 기기별 평가
- 즐겨찾기
- 최근 들은 곡
- 감상 완료 상태
- 테스트 세션
- 사용자 지정 플레이리스트
- 테스트 환경 설정

확장 버전에서는 Supabase 또는 PostgreSQL + Prisma를 사용할 수 있다.

---

## 5. 디자인 방향

### 시각적 콘셉트

- 오디오 측정기와 스튜디오 장비에서 영감을 얻되 지나치게 전문적으로 보이지 않게 한다.
- 어두운 차콜 또는 밝은 뉴트럴 테마를 모두 지원한다.
- 포인트 색상은 청록, 앰버 또는 바이올렛 중 하나를 사용한다.
- 파형과 주파수 그래프는 장식과 설명 용도로만 사용하고 실제 측정값처럼 오해하게 만들지 않는다.
- 앨범 커버를 무단 저장·재배포하지 않는다.
- 커버가 없을 때는 카테고리별 자체 그라디언트 이미지를 사용한다.

### 애니메이션

- 카드 hover 시 약한 상승 효과
- 페이지 전환은 짧은 fade
- 재생 중 상태에는 작은 레벨 미터 애니메이션
- 과도한 파형 이동, 회전 디스크, 번쩍임은 금지
- `prefers-reduced-motion`을 존중한다.

---

## 6. 전체 정보 구조와 메뉴

### 필수 메뉴

1. **홈**
2. **테스트 시작**
3. **테스트 곡**
4. **한국 테스트 곡**
5. **항목별 테스트**
6. **빠른 10곡 코스**
7. **기기 비교**
8. **오디오 용어**
9. **나의 테스트**
10. **검색**

### 권장 메뉴 구조

```text
홈
├─ 오늘의 테스트
├─ 5곡 빠른 점검
├─ 한국 음악 테스트
└─ 최근 사용한 기기

테스트 시작
├─ 테스트 전 설정
├─ 15분 빠른 테스트
├─ 30분 표준 테스트
├─ 장시간 피로도 테스트
└─ A/B 비교 방법

항목별 테스트
├─ 초저음과 저음
├─ 보컬과 중음
├─ 고음과 치찰음
├─ 공간감과 이미징
├─ 해상도와 분리도
├─ 다이내믹과 임팩트
├─ 속도와 트랜지언트
└─ 자연스러운 음색

나의 테스트
├─ 등록 기기
├─ 저장한 세션
├─ 곡별 메모
├─ 비교 결과
└─ 나만의 테스트 목록
```

---

## 7. 핵심 화면

## 7.1 홈 화면

홈 화면은 긴 설명보다 바로 테스트를 시작하는 데 집중한다.

### 구성 순서

1. 헤더와 통합 검색
2. 히어로 섹션
3. `5곡으로 빠르게 점검하기`
4. 테스트 항목 선택
5. 한국 음악으로 테스트하기
6. 15분 빠른 코스
7. 최근 등록 기기
8. 안전한 청취 안내
9. 오디오 용어 한 개
10. 푸터

### 히어로 문구 예시

**익숙한 음악으로 오디오의 차이를 확인해 보세요**

저음, 보컬, 공간감, 해상도와 다이내믹을 한 항목씩 들어보고  
헤드폰·이어폰·스피커의 특성을 같은 기준으로 기록할 수 있습니다.

CTA:

- `빠른 테스트 시작`
- `한국 곡으로 테스트`
- `기기 등록하기`

---

## 7.2 테스트 전 설정 화면

테스트 전에 아래 항목을 체크하게 한다.

- 좌우 채널이 올바른가?
- 이어폰과 헤드폰이 바르게 착용되었는가?
- 이어팁 또는 헤드밴드 밀폐가 안정적인가?
- EQ가 꺼져 있는가, 또는 비교 기기에 동일하게 적용되었는가?
- 공간 음향, Dolby Atmos, 음장 효과 상태가 동일한가?
- 스트리밍 음질과 음량 정규화 설정이 동일한가?
- 유선·무선 연결 방식과 코덱이 기록되었는가?
- 스피커 테스트라면 청취 위치와 좌우 거리가 고정되었는가?
- 주변 소음이 충분히 낮은가?
- 음량이 편안한 수준인가?

### 테스트 환경 데이터

```ts
export type TestEnvironment = {
  deviceId: string;
  sourceDevice?: string;
  connection: "wired" | "bluetooth" | "usb" | "speaker" | "other";
  codec?: string;
  streamingService?: string;
  qualitySetting?: string;
  normalization?: "on" | "off" | "unknown";
  eqPreset?: string;
  spatialAudio?: "on" | "off" | "unknown";
  volumeNote?: string;
  earTips?: string;
  roomNote?: string;
  testedAt: string;
};
```

---

## 7.3 테스트 곡 목록

### 필터

- 테스트 항목
- 한국/해외
- 장르
- 보컬/연주곡
- 남성/여성/혼성 보컬
- 어쿠스틱/전자음
- 편성 규모
- 재생 시간
- 테스트 난이도
- 감상 완료 여부

### 정렬

- 입문 추천순
- 빠른 테스트순
- 곡명순
- 아티스트순
- 짧은 곡부터
- 최근 추가순

### 카드 표시 정보

- 곡명
- 아티스트
- 앨범
- 국가 또는 한국 곡 표시
- 주요 테스트 항목
- 보조 테스트 항목
- 난이도
- 한 줄 선정 이유
- 예상 테스트 시간
- 즐겨찾기
- 감상 완료
- 외부 서비스에서 열기

---

## 7.4 곡 상세 화면

### 필수 영역

1. 곡명, 아티스트, 앨범, 발매 정보
2. 한국 곡 여부와 장르
3. 주요·보조 테스트 항목
4. 지원되는 외부 재생 서비스
5. 한 줄 선정 이유
6. 테스트에 적합한 이유
7. 집중해서 들을 요소
8. 구간별 감상 가이드
9. 좋은 재생의 예와 주의해서 들을 현상
10. 기기별 평가 입력
11. 자유 메모
12. 같은 항목의 다음 추천 곡
13. 비슷한 편성의 비교 곡
14. 즐겨찾기와 감상 완료
15. 음원 버전 및 출처 정보

### 설명 작성 규칙

- “정답 소리”라고 단정하지 않는다.
- “저음이 많다”와 “저음이 정확하다”를 구분한다.
- 녹음 자체의 특징과 재생 기기의 특징을 혼동하지 않도록 설명한다.
- 전문용어 뒤에는 쉬운 설명을 붙인다.
- 특정 구간은 최종 채택한 음원 버전을 확인한 뒤 입력한다.
- 스트리밍 서비스별 버전 차이가 있으면 별도로 기록한다.
- 곡당 본문은 약 500~1,000자 수준으로 시작한다.

### 타임라인 예시

```text
00:00  첫 악기의 위치와 잔향이 좌우 어디에서 시작하는지 확인합니다.
00:35  보컬이 중앙에 안정적으로 맺히는지 들어봅니다.
01:20  저음이 커질 때 보컬과 다른 악기를 가리지 않는지 확인합니다.
02:10  여러 악기가 동시에 연주될 때 각각의 윤곽이 유지되는지 들어봅니다.
```

실제 시간은 최종 채택한 음원 또는 영상 버전 기준으로 검수한다.

---

## 8. 평가 항목

각 항목은 1~5점과 메모를 함께 저장한다. 점수는 성능의 절대 순위가 아니라 동일 사용자의 비교 기록이다.

### 8.1 초저음 확장

- 아주 낮은 저음이 존재감만 남기지 않고 음정과 질감을 유지하는가?
- 볼륨을 과도하게 올리지 않아도 낮은 대역이 느껴지는가?
- 진동감과 실제 음의 윤곽을 구분할 수 있는가?

### 8.2 저음 제어력

- 킥 드럼과 베이스가 서로 구분되는가?
- 저음이 멈춰야 할 때 빠르게 멈추는가?
- 저음이 보컬과 중음을 가리지 않는가?

### 8.3 보컬과 중음

- 목소리의 몸통과 발음이 자연스러운가?
- 보컬이 너무 멀거나 과도하게 앞으로 나오지 않는가?
- 남성·여성 보컬 모두 얇거나 답답하게 들리지 않는가?

### 8.4 고음과 치찰음

- 심벌과 현악기의 끝이 선명하지만 날카롭지 않은가?
- `ㅅ`, `ㅆ`, `ㅈ` 발음이 과도하게 튀지 않는가?
- 고음이 밝은 것과 거칠거나 왜곡된 것을 구분할 수 있는가?

### 8.5 공간감과 이미징

- 무대의 폭, 깊이, 높이가 자연스럽게 느껴지는가?
- 중앙 보컬과 좌우 악기의 위치가 안정적인가?
- 소리가 단순히 머리 바깥으로 넓기만 한 것이 아니라 위치를 구분할 수 있는가?

### 8.6 해상도와 분리도

- 작은 호흡, 잔향, 손가락 움직임 같은 세부가 들리는가?
- 복잡한 구간에서도 악기들이 한 덩어리로 뭉치지 않는가?
- 세부음이 과도하게 강조되어 부자연스럽지는 않은가?

### 8.7 다이내믹과 임팩트

- 작은 소리와 큰 소리의 차이가 자연스럽게 표현되는가?
- 드럼의 첫 타격이 둔하지 않은가?
- 갑작스러운 합주에서도 압축되거나 답답해지지 않는가?

### 8.8 트랜지언트와 속도

- 짧고 빠른 타격음의 시작과 끝이 분명한가?
- 빠른 베이스와 드럼이 흐릿하게 이어지지 않는가?
- 리듬의 미세한 타이밍이 살아 있는가?

### 8.9 음색과 자연스러움

- 피아노, 기타, 현악기, 관악기의 고유한 질감이 납득 가능한가?
- 특정 대역이 강조되어 모든 악기가 비슷한 색으로 들리지 않는가?
- 오래 들어도 인위적인 강조가 피곤하지 않은가?

### 8.10 장시간 피로도

- 15~30분 감상 후 귀가 자극되거나 압박되는가?
- 고음, 저음 또는 보컬 대역 중 특정 부분이 계속 신경 쓰이는가?
- 편안한 음량에서도 음악의 핵심이 유지되는가?

---

## 9. 최초 수록 권장 곡

아래 목록은 오디오 테스트의 절대 표준이 아니라, 서로 다른 녹음 특성과 편성을 비교하기 위한 **입문용 큐레이션**이다. 서비스 수록 전 정확한 앨범 버전, 발매 정보, 제공 서비스, 공식 영상, 지역별 재생 가능 여부를 검수한다.

## 9.1 가장 먼저 들을 10곡

| 순서 | 곡 | 아티스트 | 주요 테스트 | 선정 이유 |
|---:|---|---|---|---|
| 1 | Hotel California (Hell Freezes Over 버전 권장) | Eagles | 공간감·기타·저음 | 라이브 공간과 타악기, 기타의 위치를 함께 확인하기 좋다. |
| 2 | Billie Jean | Michael Jackson | 저음 제어·리듬 | 반복되는 베이스와 킥의 분리, 리듬의 탄력을 듣기 쉽다. |
| 3 | Don't Know Why | Norah Jones | 여성 보컬·중음 | 가까운 보컬, 피아노와 기타의 자연스러운 질감을 확인하기 좋다. |
| 4 | Giorgio by Moroder | Daft Punk | 다이내믹·저음·분리도 | 내레이션에서 대규모 전자·어쿠스틱 편성으로 확장된다. |
| 5 | Keith Don't Go (라이브 버전 권장) | Nils Lofgren | 기타·트랜지언트·공간 | 어쿠스틱 기타의 타격, 현의 울림과 라이브 잔향이 뚜렷하다. |
| 6 | Take Five | Dave Brubeck Quartet | 이미징·드럼·색소폰 | 소규모 재즈 편성의 위치, 심벌, 드럼 솔로를 확인하기 쉽다. |
| 7 | Royals | Lorde | 초저음·보컬 중심 | 낮은 전자 저음과 중앙 보컬의 공존을 비교하기 좋다. |
| 8 | No Sanctuary Here | Chris Jones | 저음·남성 보컬·공간 | 깊은 저음과 굵은 보컬, 잔향의 균형을 확인하기 좋다. |
| 9 | Dreams | Fleetwood Mac | 밸런스·리듬·피로도 | 과도한 효과 없이 전체 대역의 균형과 장시간 편안함을 보기 좋다. |
| 10 | Mountains | Hans Zimmer | 다이내믹·레이어·스케일 | 작은 시작에서 거대한 음향으로 커질 때 압축과 분리도를 확인할 수 있다. |

---

## 9.2 한국 노래 필수 10곡

한국 곡은 특정 장르에 치우치지 않도록 보컬, 밴드, 전자음악, 국악 기반 음악, 대편성 녹음을 함께 포함한다.

| 순서 | 곡 | 아티스트 | 주요 테스트 | 선정 이유 |
|---:|---|---|---|---|
| 1 | 야생화 | 박효신 | 남성 보컬·다이내믹 | 작은 보컬에서 강한 고음과 대편성으로 커지는 흐름을 확인하기 좋다. |
| 2 | 좋은 날 | 아이유 | 여성 보컬·고음·분리도 | 보컬의 중심, 밝은 고역, 후반부 고음에서 자극과 압축 여부를 듣기 좋다. |
| 3 | Ditto | NewJeans | 공간 효과·저음·보컬 레이어 | 부드러운 보컬 레이어와 전자 저음, 잔향감의 균형을 비교하기 좋다. |
| 4 | INVU | 태연 | 여성 보컬·전자 저음·고음 | 중앙 보컬과 넓게 배치된 신스, 밝은 고역의 피로도를 확인하기 좋다. |
| 5 | TOMBOY | (여자)아이들 | 임팩트·기타·보컬 | 강한 킥과 베이스, 기타, 여러 보컬 톤이 겹칠 때 분리도를 듣기 좋다. |
| 6 | 사건의 지평선 | 윤하 | 밴드 합주·다이내믹 | 피아노와 보컬로 시작해 밴드가 확장될 때 밀도와 고역을 확인하기 좋다. |
| 7 | 첫눈처럼 너에게 가겠다 | 에일리 | 여성 보컬·피아노·현악 | 보컬의 힘과 호흡, 피아노 및 현악기의 배경 분리를 확인하기 좋다. |
| 8 | 그대 내 품에 | 유재하 | 자연스러운 음색·중음 | 보컬과 어쿠스틱 악기의 질감, 오래 들어도 편안한 중역을 평가하기 좋다. |
| 9 | 범 내려온다 | 이날치 | 리듬·베이스·보컬 분리 | 반복적인 베이스와 타악, 여러 보컬이 겹치는 구간의 속도와 분리도를 듣기 좋다. |
| 10 | Arirang Alone | 송소희 또는 검수된 국악 보컬 버전 | 보컬 음색·잔향·공간 | 한국 전통 보컬의 배음과 긴 호흡, 공간의 잔향을 확인하는 비교 곡으로 사용한다. |

> `Arirang Alone`은 서비스에 넣기 전에 정확한 곡명, 아티스트 표기, 앨범 및 공식 제공 버전을 반드시 검수한다. 검증 전 데이터에는 `TODO_VERIFY_METADATA`를 사용한다.

---

## 9.3 항목별 추가 권장 곡

### 초저음과 저음 제어

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| Limit to Your Love | James Blake | 낮은 저음이 내려갈 때 떨림만 남지 않고 단계와 질감이 구분되는지 확인한다. |
| Why So Serious? | Hans Zimmer | 반복되는 저역 펄스가 커질 때 왜곡과 압축을 확인한다. |
| bad guy | Billie Eilish | 킥과 베이스의 타격, 가까운 보컬이 저음에 묻히지 않는지 듣는다. |
| D (Half Moon) | DEAN feat. 개코 | 전자 저음의 부드러운 연결과 남성 보컬의 중심을 확인한다. |
| BIBI Vengeance | 비비 | 강한 저역과 보컬의 질감이 동시에 유지되는지 듣는다. |

### 보컬과 중음

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| Someone Like You | Adele | 피아노와 강한 여성 보컬의 중심, 거친 고음 여부를 확인한다. |
| The Moon Is a Harsh Mistress | Radka Toneff | 작은 호흡과 피아노 잔향, 보컬의 자연스러운 거리감을 듣는다. |
| Fast Car | Tracy Chapman | 낮은 여성 보컬과 기타의 몸통이 얇아지지 않는지 확인한다. |
| 바람이 불어오는 곳 | 김광석 | 남성 보컬과 어쿠스틱 기타의 친밀감, 중역의 자연스러움을 듣는다. |
| 어떻게 이별까지 사랑하겠어, 널 사랑하는 거지 | AKMU | 남녀 보컬의 음색 차이와 피아노·현악 배경의 분리를 확인한다. |

### 고음과 치찰음

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| So What | Miles Davis | 트럼펫과 심벌이 선명하면서도 날카롭게 찌르지 않는지 듣는다. |
| Spanish Harlem | Rebecca Pidgeon | 보컬 치찰음과 셰이커, 현악기의 고역 질감을 확인한다. |
| Dreams | The Cranberries | 밝은 기타와 여성 보컬의 고역이 거칠게 겹치지 않는지 듣는다. |
| 4 Walls | f(x) | 밝은 전자음과 보컬 자음이 피곤하지 않은지 확인한다. |
| Next Level | aespa | 밀도 높은 신스와 밝은 보컬이 겹칠 때 자극과 분리도를 듣는다. |

### 공간감과 이미징

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| Bubbles | Yosi Horikawa | 다양한 효과음의 좌우·상하·거리 위치를 추적한다. |
| Letter | Yosi Horikawa | 작은 물체음과 환경음의 방향, 거리, 잔향을 확인한다. |
| Stimela (라이브 버전 권장) | Hugh Masekela | 라이브 무대의 폭, 관객과 악기의 앞뒤 위치를 듣는다. |
| Nella Fantasia | 조수미 | 보컬 중심과 오케스트라의 깊이, 홀 잔향을 확인한다. |
| 한계령 | 정밀아 또는 검수된 어쿠스틱 버전 | 보컬, 현악기, 공간 잔향의 자연스러운 배치를 비교한다. |

### 해상도와 분리도

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| The Chain | Fleetwood Mac | 여러 보컬과 기타, 베이스가 겹칠 때 각 층이 유지되는지 듣는다. |
| Chocolate Chip Trip | Tool | 빠르게 이동하는 타악기의 위치와 잔향을 추적한다. |
| Lingus | Snarky Puppy | 복잡한 대편성에서 키보드, 관악, 드럼의 윤곽을 확인한다. |
| 소격동 | 서태지 | 전자음 레이어와 보컬이 섞일 때 미세한 배경 요소를 듣는다. |
| Supernova | aespa | 높은 밀도의 전자음과 리듬 변화에서 악기층이 뭉치지 않는지 확인한다. |

### 다이내믹과 트랜지언트

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| Liberty | Anette Askvik | 조용한 구간과 강한 색소폰·드럼 구간의 대비를 확인한다. |
| The Imperial March | John Williams, 검수된 오케스트라 버전 | 금관, 현악, 타악이 동시에 커질 때 스케일과 압축을 듣는다. |
| Fanfare for the Common Man | Aaron Copland, 검수된 버전 | 대형 타악기의 첫 타격과 홀의 잔향을 확인한다. |
| Lazenca, Save Us | N.EX.T | 록 밴드와 대편성 요소가 커질 때 임팩트와 분리도를 듣는다. |
| 나는 나비 | YB | 드럼과 기타의 타격, 후렴에서 밴드 에너지가 답답해지지 않는지 확인한다. |

### 자연스러운 악기 음색

| 곡 | 아티스트 | 감상 포인트 |
|---|---|---|
| Tin Pan Alley | Stevie Ray Vaughan | 일렉트릭 기타, 드럼, 베이스의 질감과 공간을 듣는다. |
| Song for Olabi | Quiet Winter Night / Hoff Ensemble | 피아노, 베이스, 타악기의 자연스러운 잔향을 확인한다. |
| Cello Suite No. 1 Prelude | 검수된 첼로 독주 버전 | 현의 마찰, 몸통 울림, 공간 잔향이 과장되지 않는지 듣는다. |
| 사랑 그 쓸쓸함에 대하여 | 양희은 | 성숙한 보컬의 질감과 반주의 자연스러운 중역을 확인한다. |
| 달빛 | 정재형, 검수된 피아노 중심 버전 | 피아노의 어택, 울림, 감쇠가 자연스럽게 이어지는지 듣는다. |

---

## 10. 빠른 테스트 코스

## 10.1 5곡 빠른 점검

1. **보컬:** Norah Jones — Don't Know Why
2. **저음:** Michael Jackson — Billie Jean
3. **공간감:** Yosi Horikawa — Bubbles
4. **복잡한 편성:** Daft Punk — Giorgio by Moroder
5. **다이내믹:** 박효신 — 야생화

각 단계는 다음 형식으로 제공한다.

```text
테스트 시간: 약 60~90초
오늘 확인할 것: 2개
비교 질문: 기기 A와 B 중 어느 쪽이 더 크다가 아니라, 어느 쪽이 더 잘 구분되는가?
메모 입력
다음 곡
```

## 10.2 한국 곡 5곡 코스

1. **중음과 자연스러움:** 유재하 — 그대 내 품에
2. **저음과 공간 효과:** NewJeans — Ditto
3. **고음과 보컬:** 아이유 — 좋은 날
4. **복잡한 리듬과 분리도:** 이날치 — 범 내려온다
5. **대규모 다이내믹:** 박효신 — 야생화

## 10.3 15분 표준 코스

- 채널과 중앙 이미지 확인
- 남성 보컬
- 여성 보컬
- 초저음
- 저음 제어
- 고음과 치찰음
- 공간감
- 복잡한 편성
- 다이내믹
- 2분 자유 감상

## 10.4 장시간 피로도 코스

최소 20~30분 동안 한두 곡의 하이라이트만 반복하지 말고 다양한 곡을 평소 음량으로 이어 듣는다.

- 어쿠스틱 보컬 2곡
- 팝 또는 K-pop 2곡
- 재즈 또는 클래식 2곡
- 사용자가 평소 가장 자주 듣는 곡 3곡
- 마지막에 귀의 피로, 압박, 특정 대역의 자극을 기록

---

## 11. A/B 비교 기능

### 비교 방식

- 기기 A와 기기 B를 등록한다.
- 동일한 소스 기기와 음원을 사용한다.
- 가능한 범위에서 음량을 맞춘다.
- 30~90초 이내의 짧은 구간을 번갈아 듣는다.
- 한 번에 한 평가 항목만 비교한다.
- 3회 이상 반복한 뒤 기록한다.
- “더 크게 들리는 기기”를 “더 좋은 기기”로 판단하지 않도록 안내한다.
- 빠른 전환이 불가능하면 청각 기억의 한계를 안내하고 결과 확신도를 낮게 표시한다.

### 평가 데이터

```ts
export type TrackEvaluation = {
  id: string;
  trackId: string;
  deviceId: string;
  environmentId: string;
  scores: {
    subBass?: number;
    bassControl?: number;
    midrange?: number;
    treble?: number;
    imaging?: number;
    detail?: number;
    dynamics?: number;
    transient?: number;
    timbre?: number;
    comfort?: number;
  };
  strengths: string[];
  concerns: string[];
  note: string;
  confidence: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
};
```

### 결과 화면 원칙

- 레이더 차트만 제공하지 말고 텍스트 표를 함께 제공한다.
- 종합 점수는 기본적으로 생성하지 않는다.
- 사용자 선호 가중치를 적용한 선택적 요약만 제공한다.
- 동일 사용자의 동일 환경 결과만 직접 비교하도록 유도한다.
- 다른 사용자의 점수와 절대 비교하지 않는다.

---

## 12. 곡 데이터 모델

```ts
export type AudioTestCategory =
  | "sub-bass"
  | "bass-control"
  | "midrange"
  | "treble"
  | "imaging"
  | "detail"
  | "dynamics"
  | "transient"
  | "timbre"
  | "comfort";

export type StreamingLink = {
  provider: "youtube" | "spotify" | "apple-music" | "tidal" | "melon" | "bugs" | "genie";
  url?: string;
  verifiedAt?: string;
  status: "verified" | "todo" | "unavailable";
};

export type AudioTestTrack = {
  id: string;
  slug: string;
  title: string;
  titleKo?: string;
  artist: string;
  artistKo?: string;
  album?: string;
  releaseYear?: number;
  country: string;
  isKorean: boolean;
  genres: string[];
  vocalType: "instrumental" | "male" | "female" | "mixed";
  primaryCategory: AudioTestCategory;
  secondaryCategories: AudioTestCategory[];
  difficulty: "beginner" | "intermediate" | "advanced";
  reason: string;
  listeningPoints: string[];
  cautionNotes?: string[];
  timeline: {
    seconds: number;
    label: string;
    description: string;
    verifiedFor?: string;
  }[];
  streamingLinks: StreamingLink[];
  sources: ContentSource[];
  status: "draft" | "reviewed" | "published";
};

export type ContentSource = {
  title: string;
  publisher?: string;
  url: string;
  accessedAt: string;
  note?: string;
};
```

---

## 13. 외부 재생 서비스 요구사항

### 기본 정책

- 음원을 직접 호스팅하거나 다운로드 기능을 제공하지 않는다.
- 공식 아티스트·음반사·권리 보유자 페이지를 우선한다.
- 재생 가능한 경우 공식 임베드 또는 공식 딥링크를 사용한다.
- 자동 재생을 기본값으로 사용하지 않는다.
- 목록 화면에서 여러 iframe을 동시에 불러오지 않는다.
- 사용자가 선택한 시점에만 플레이어를 로드한다.
- 외부 서비스 계정이 필요한 경우 사전에 표시한다.
- 지역 제한과 서비스별 음원 버전 차이를 표시한다.

### YouTube 선정 우선순위

1. 아티스트 공식 채널
2. 음반사 또는 배급사 공식 채널
3. 권리 보유자가 제공한 공식 오디오
4. 검증된 라이선스 파트너
5. 그 외 영상은 관리자 검수 후 제한적으로 사용

### 미검증 데이터 처리

```ts
youtubeVideoId: "TODO_VERIFY_VIDEO_ID"
spotifyUrl: "TODO_VERIFY_SPOTIFY_URL"
timelineStatus: "TODO_VERIFY_FOR_SELECTED_VERSION"
```

임의의 영상 ID나 URL을 생성하지 않는다.

---

## 14. 한국 음악 큐레이션 원칙

- K-pop만으로 구성하지 않는다.
- 발라드, 록, 포크, 재즈, 클래식, 국악 기반 음악, 전자음악을 함께 다룬다.
- 남성·여성·혼성 보컬과 연주곡을 균형 있게 포함한다.
- 1980년대 이전부터 최신 세대까지 시기를 넓힌다.
- 스트리밍에서 실제 접근 가능한 버전을 우선한다.
- 리마스터와 원본 마스터가 함께 있을 때 소개 버전을 명확히 표시한다.
- 라이브 버전은 공연장 잔향과 관객음이 테스트 결과에 영향을 줄 수 있음을 안내한다.
- 한국어 자음의 치찰음 평가가 녹음과 발성에 크게 좌우됨을 설명한다.
- 국악 음원은 전통 악기와 창법을 서구 악기 기준으로 단순 평가하지 않는다.

---

## 15. 오디오 용어 사전

### 최초 등록 용어

- 주파수 대역
- 초저음
- 중저음
- 중음
- 고음
- 치찰음
- 음색
- 해상도
- 분리도
- 이미징
- 사운드스테이지
- 깊이감
- 다이내믹
- 마이크로다이내믹
- 트랜지언트
- 어택
- 디케이
- 잔향
- 저음 번짐
- 마스킹
- 왜곡
- 클리핑
- 음량 정규화
- 다이내믹 레인지
- 마스터링
- 리마스터
- EQ
- 크로스피드
- 공간 음향
- 코덱
- 비트레이트
- 샘플레이트
- 임피던스
- 감도
- 밀폐
- 청취 피로

### 용어 설명 형식

```text
용어
한 줄 설명
쉬운 비유
테스트할 때의 의미
이 항목을 확인하기 좋은 곡
관련 용어
```

---

## 16. 검색 기능

### 통합 검색 대상

- 곡
- 아티스트
- 앨범
- 테스트 항목
- 장르
- 국가
- 한국 곡
- 오디오 용어
- 사용자 등록 기기
- 저장한 메모

### 검색 UX

- 한글과 영문명을 모두 검색 가능하게 한다.
- 초성 검색은 선택 기능으로 구현한다.
- 최근 검색어를 로컬에 저장한다.
- 검색 결과가 없으면 테스트 항목과 추천 키워드를 보여 준다.
- `/search?q=저음` 형태로 URL 공유가 가능해야 한다.
- 결과를 곡·아티스트·항목·용어로 구분한다.

---

## 17. 공통 컴포넌트

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
TestCategoryCard
KoreanTrackBadge
StreamingLinkGroup
LiteMediaEmbed
PlaybackErrorFallback
ListeningTimeline
ListeningPointCard
DeviceSelector
DeviceForm
EnvironmentChecklist
VolumeMatchNotice
ScoreInput
ConfidenceSelector
EvaluationForm
ComparisonTable
ComparisonChart
FavoriteButton
CompletionButton
ShareButton
SessionProgress
CourseCard
GlossaryPopover
SourceList
SafetyNotice
EmptyState
ErrorState
SkeletonLoader
AppFooter
```

---

## 18. 접근성과 반응형 요구사항

### 접근성

- 키보드만으로 메뉴, 필터, 평가 폼, 타임라인을 조작할 수 있게 한다.
- focus ring을 제거하지 않는다.
- 색상만으로 점수와 상태를 구분하지 않는다.
- 차트의 모든 정보를 표와 텍스트로도 제공한다.
- 모든 버튼에 명확한 accessible name을 제공한다.
- 재생 중 상태를 스크린 리더에 알린다.
- 타임라인의 시간과 설명을 텍스트로 제공한다.
- `prefers-reduced-motion`을 지원한다.
- 터치 타깃은 최소 44px을 권장한다.

### 모바일

- 하단 내비게이션 제공
- 곡은 세로 리스트 중심
- 필터는 bottom sheet로 표시
- 비교 점수 입력은 큰 버튼 또는 stepper 사용
- 재생 링크와 메모 입력을 엄지손가락으로 쉽게 조작 가능하게 한다.

### 데스크톱

- 목록과 평가 패널을 2열로 배치할 수 있다.
- 기기 A/B 비교표를 동시에 표시한다.
- 긴 메모와 그래프가 가로로 과도하게 늘어나지 않게 최대 폭을 제한한다.

---

## 19. 안전한 청취 안내

서비스 전역에서 다음 메시지를 쉽게 확인할 수 있게 한다.

- 테스트를 위해 평소보다 큰 음량을 사용할 필요는 없다.
- 귀가 아프거나 먹먹하거나 이명이 느껴지면 즉시 중단한다.
- 큰 음량일수록 더 선명하고 저음이 풍부하게 느껴질 수 있으므로 음량이 다른 비교는 공정하지 않다.
- 장시간 테스트에는 정기적인 휴식을 포함한다.
- 청력 상태가 걱정되면 전문 의료인 또는 청각 전문가와 상담한다.
- 웹앱은 의료 진단이나 청력 검사를 제공하지 않는다.

앱이 실제 음압을 측정할 수 없는 환경에서는 “안전한 dB”를 측정했다고 표시하지 않는다.

---

## 20. 콘텐츠 출처와 검수

### 콘텐츠 작성 원칙

- 공식 아티스트 사이트, 음반사, 앨범 라이너 노트, 공식 스트리밍 메타데이터를 우선한다.
- 발매 연도와 녹음 연도, 원곡과 리마스터 발매를 구분한다.
- 같은 제목의 라이브·리마스터·컴필레이션 버전을 혼동하지 않는다.
- 테스트 설명은 해당 녹음 버전의 실제 특징을 확인한 뒤 작성한다.
- 서비스별 음량과 마스터 차이를 확인한다.
- Wikipedia 한 곳만을 출처로 사용하지 않는다.
- AI가 생성한 설명은 편집 검수 전 `draft`로 관리한다.
- 외부 리뷰 문장을 복사하지 않고 직접 요약한다.
- “오디오 테스트 명곡”이라는 관습만으로 넣지 말고 실제 선정 이유를 기록한다.

---

## 21. 성능·보안·저작권 요구사항

### 성능

- 외부 플레이어 lazy loading
- 목록 화면에는 실제 iframe을 렌더링하지 않는다.
- 초기 번들 크기를 최소화한다.
- 불필요한 클라이언트 컴포넌트를 피한다.
- 로딩 skeleton을 제공한다.
- 이미지 크기를 미리 지정해 layout shift를 방지한다.
- 저속 모바일 네트워크에서도 핵심 텍스트를 먼저 표시한다.

### 보안

- API 키를 저장소에 커밋하지 않는다.
- 외부 URL은 허용 도메인 목록으로 검증한다.
- 사용자 메모를 표시할 때 XSS 방어를 적용한다.
- 외부 영상 ID와 URL 형식을 검증한다.
- 손상된 localStorage 데이터는 안전한 기본 상태로 복구한다.

### 저작권

- 음원 파일을 직접 저장·재배포하지 않는다.
- 다운로드, 녹음 추출, 오프라인 음원 저장 기능을 만들지 않는다.
- 앨범 커버를 권한 없이 저장하거나 재배포하지 않는다.
- 가사를 전체 또는 장문으로 제공하지 않는다.
- 공식 임베드와 합법적인 외부 서비스 링크만 사용한다.

---

## 22. 권장 파일 구조

```text
src/
├─ app/
│  ├─ page.tsx
│  ├─ getting-started/
│  ├─ tracks/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ korean-tracks/
│  ├─ categories/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ courses/
│  │  ├─ quick-5/
│  │  ├─ korean-5/
│  │  ├─ standard-15/
│  │  └─ fatigue/
│  ├─ compare/
│  ├─ devices/
│  ├─ glossary/
│  ├─ my-tests/
│  ├─ search/
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ error.tsx
│  └─ not-found.tsx
├─ components/
│  ├─ layout/
│  ├─ tracks/
│  ├─ player/
│  ├─ categories/
│  ├─ evaluation/
│  ├─ comparison/
│  ├─ devices/
│  ├─ courses/
│  ├─ glossary/
│  └─ ui/
├─ data/
│  ├─ tracks.ts
│  ├─ artists.ts
│  ├─ testCategories.ts
│  ├─ courses.ts
│  ├─ glossary.ts
│  └─ safetyGuides.ts
├─ hooks/
├─ lib/
│  ├─ streaming.ts
│  ├─ search.ts
│  ├─ storage.ts
│  ├─ scoring.ts
│  ├─ validation.ts
│  └─ utils.ts
├─ types/
└─ styles/
```

---

## 23. 개발 단계

## Phase 1 — 설계와 기반

- Next.js + TypeScript + Tailwind 프로젝트 생성
- 디자인 토큰과 전역 레이아웃 구현
- 헤더, 내비게이션, 푸터 구현
- 데이터 타입 정의
- 부록 A의 해외 10곡 + 한국 10곡, 총 20곡 데이터를 `src/data/audioTestTracks.ts`에 적용
- 테스트 카테고리 데이터 작성
- 라우팅과 기본 SEO 설정

### 완료 조건

- 모든 주요 경로에 접근 가능
- 모바일과 데스크톱 내비게이션 작동
- 한국 곡 필터 작동
- TypeScript 오류 없음

## Phase 2 — 곡 탐색과 상세 정보

- 곡 목록
- 필터와 정렬
- 곡 상세 페이지
- 외부 재생 서비스 연결
- 오류 fallback
- 감상 포인트와 타임라인
- 관련 테스트 곡 추천

### 완료 조건

- 부록 A의 20곡 전체에 대해 완전한 목록·상세 사용자 흐름 제공
- 미검증 링크가 실제 링크처럼 노출되지 않음
- 타임라인이 선택된 음원 버전과 연결됨
- 한국 곡 전용 목록 제공

## Phase 3 — 기기 평가와 비교

- 기기 등록
- 테스트 환경 체크리스트
- 항목별 점수와 메모
- A/B 비교표
- 비교 차트와 텍스트 대안
- 테스트 세션 저장

### 완료 조건

- 동일 곡에 대해 두 기기의 평가를 나란히 비교 가능
- 새로고침 후에도 데이터 유지
- 손상된 저장 데이터 안전 복구
- 종합 점수 없이 항목별 결과 제공

## Phase 4 — 코스와 학습 기능

- 5곡 빠른 코스
- 한국 곡 5곡 코스
- 15분 표준 코스
- 장시간 피로도 코스
- 오디오 용어 사전
- 용어 팝오버
- 안전한 청취 안내

### 완료 조건

- 코스 진행 상태 저장
- 곡에서 관련 용어 확인 가능
- 모든 테스트 시작 화면에서 음량 일치와 청력 보호 안내 확인 가능

## Phase 5 — 품질 개선

- 접근성 테스트
- Lighthouse 점검
- 외부 임베드 성능 최적화
- 콘텐츠와 링크 출처 검수
- 모바일 브라우저 테스트
- 오류 화면과 빈 상태 개선
- README와 배포 문서 작성

---

## 24. 테스트 요구사항

### 단위 테스트

- 필터 조합
- 한국 곡 필터
- 검색 결과
- 재생 시간 형식 변환
- 점수 범위 검증
- localStorage 직렬화와 복구
- 비교 데이터 계산
- 외부 URL과 영상 ID 검증

### 컴포넌트 테스트

- TrackCard
- TrackFilters
- KoreanTrackBadge
- EnvironmentChecklist
- EvaluationForm
- ScoreInput
- ComparisonTable
- ListeningTimeline
- PlaybackErrorFallback
- SafetyNotice

### E2E 테스트

1. 홈에서 5곡 빠른 테스트 시작
2. 테스트 전 체크리스트 완료
3. 곡 상세에서 공식 재생 링크 열기
4. 기기 A 평가 저장
5. 같은 곡에서 기기 B 평가 저장
6. 비교 화면에서 두 결과 확인
7. 한국 곡만 필터링
8. 한국 곡 5곡 코스 진행
9. 새로고침 후 저장 데이터 확인
10. 잘못된 외부 링크의 fallback 확인
11. 모바일 하단 메뉴와 필터 사용
12. 키보드만으로 평가 입력 완료

### 지원 브라우저

- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

---

## 25. MVP 완료 기준

다음 조건을 모두 충족해야 MVP가 완료된 것으로 본다.

- 반응형 홈 화면
- 테스트 전 설정 안내
- 테스트 곡 목록
- 한국 테스트 곡 전용 화면
- 최소 10개의 검수된 곡 상세 페이지
- 해외 곡 최소 5개, 한국 곡 최소 5개
- 공식 재생 링크 또는 임베드
- 재생 오류 fallback
- 곡별 선정 이유와 감상 포인트
- 테스트 항목별 필터
- 기기 등록
- 기기별 점수와 메모
- A/B 비교표
- 5곡 빠른 코스
- 한국 곡 5곡 코스
- 오디오 용어 20개 이상
- 즐겨찾기, 최근 감상, 완료 상태 저장
- 기본 SEO
- 접근성 점검
- 안전한 청취 안내
- 콘텐츠 및 링크 출처 데이터
- README와 실행 방법
- lint, typecheck, production build 성공

---

## 26. Z.ai Coding Plan 실행 지침

1. 먼저 전체 구현 계획과 파일 구조를 제안한다.
2. 계획 승인 대기 없이 MVP 기준의 기본 프로젝트를 구성한다.
3. 기능 단위 컴포넌트로 분리하고 거대한 단일 파일을 만들지 않는다.
4. UI, 데이터 모델, 평가 로직을 분리한다.
5. 부록 A의 해외 10곡과 한국 10곡, 총 20곡으로 전체 사용자 흐름을 바로 완성한다.
6. 검증된 공식 재생 링크만 데이터에 입력한다.
7. 실제 링크를 확인하지 못했으면 `TODO_VERIFY`로 남긴다.
8. 실제 타임라인은 최종 채택 음원별로 검수한다.
9. 각 Phase 종료 시 변경 파일, 구현 기능, 테스트 결과, 남은 TODO를 요약한다.
10. 모든 코드에 TypeScript 타입을 적용한다.
11. lint, typecheck, build를 실행하고 오류를 수정한다.
12. 접근성, 모바일 UX, 청력 보호 안내를 완료 조건에 포함한다.
13. `.env.example`을 제공하되 실제 API 키는 넣지 않는다.
14. README에 설치, 실행, 빌드, 배포, 콘텐츠 추가 방법을 작성한다.
15. 음원 다운로드나 추출 기능을 만들지 않는다.
16. 가격, 브랜드 인지도, 코덱 표기만으로 기기 우열을 자동 판정하지 않는다.

---

## 27. Z.ai에 전달할 최종 프롬프트

```text
이 문서에 정의된 요구사항에 따라 “Audio Test Guide — 귀로 확인하는 오디오 체크” 반응형 웹앱을 구현해 주세요.

핵심 사용자는 헤드폰, 이어폰, 스피커의 특성을 음악으로 비교하고 싶은 오디오 입문자입니다. 사용자가 저음, 보컬, 고음, 공간감, 이미징, 해상도, 다이내믹, 트랜지언트, 음색과 장시간 피로도를 한 항목씩 확인할 수 있도록 테스트 곡과 쉬운 감상 포인트를 제공해야 합니다.

해외 음악뿐 아니라 한국 음악을 핵심 큐레이션에 포함하세요. 첫 MVP부터 부록 A의 해외 10곡과 한국 10곡, 총 20곡을 사용하여 홈 → 테스트 전 설정 → 곡 목록 → 곡 상세 → 외부 서비스 검색 → 감상 포인트 → 기기별 평가 → A/B 비교 → 결과 저장의 전체 흐름을 완성하세요. 곡 데이터를 다시 작성하지 말고 부록 A를 `src/data/audioTestTracks.ts`로 그대로 적용하세요.

Next.js, React, TypeScript, Tailwind CSS를 사용하세요. 초기 데이터는 정적 TypeScript 데이터로 분리하고 나중에 DB로 이전하기 쉬운 타입 구조를 만드세요. 기기, 테스트 환경, 점수, 메모, 즐겨찾기, 최근 감상, 완료 상태와 코스 진도는 MVP에서 localStorage에 저장하세요.

음원을 직접 호스팅하거나 다운로드 기능을 만들지 마세요. 공식 아티스트, 음반사, 권리 보유자의 임베드 또는 합법적인 스트리밍 링크를 우선하세요. 검증하지 않은 영상 ID, URL, 앨범 정보, 발매 연도와 타임라인을 임의로 만들지 말고 TODO_VERIFY로 남기세요.

A/B 비교에서는 동일 음량의 중요성을 안내하고, 더 크게 들리는 기기를 더 좋은 기기로 판정하지 마세요. 종합 점수보다 항목별 평가와 사용자 메모를 우선하세요. 앱이 실제 음압을 측정할 수 없다면 안전한 dB를 측정했다고 표시하지 마세요.

모바일 우선 반응형 디자인, 키보드 접근성, 명확한 focus 상태, 충분한 색상 대비, 차트의 텍스트 대안, prefers-reduced-motion과 안전한 청취 안내를 포함하세요.

작업은 Phase 1부터 순서대로 진행하고 각 Phase 종료 시 구현 내용, 변경 파일, 테스트 결과와 남은 TODO를 보고하세요. 마지막에 lint, typecheck, production build를 실행하고 모든 오류를 수정하세요.
```

---

## 28. 향후 확장 아이디어

- 블라인드 A/B 또는 ABX 테스트
- 외부 측정 마이크와 연동한 별도 측정 모드
- 좌우 채널 및 위상 확인용 합법적 자체 테스트 신호
- 사용자 소유 로컬 파일의 브라우저 내 일시 재생
- 기기별 이어팁·패드·케이블·EQ 프리셋 기록
- 룸 및 스피커 위치 메모
- 기기 비교 결과 PDF 내보내기
- 사용자의 주 장르에 맞춘 테스트 코스
- 같은 곡의 원본과 리마스터 비교
- 한국 인디·국악·재즈·클래식 큐레이션 확장
- 청취 세션 통계
- 다국어 지원
- PWA
- 관리자 CMS

로컬 파일 기능을 추가하더라도 파일을 서버에 업로드하거나 저장하지 않고 브라우저 세션 안에서만 처리하는 방식을 우선 검토한다.

---

## 29. 최종 UX 원칙

1. 첫 화면에서 바로 테스트를 시작할 수 있어야 한다.
2. 사용자는 “좋은 소리의 정답”보다 “어떤 차이를 들었는지”를 기록한다.
3. 곡마다 선정 이유와 구체적인 감상 포인트를 제공한다.
4. 한국 음악은 부가 목록이 아니라 핵심 큐레이션으로 다룬다.
5. 음량 차이, 착용 상태, EQ와 음원 버전이 결과에 미치는 영향을 명확히 알린다.
6. 모든 평가는 사용자의 환경과 취향에 종속된다는 점을 숨기지 않는다.
7. 큰 음량을 유도하지 않고 장시간 테스트에는 휴식을 권장한다.
8. 외부 음원의 권리와 플랫폼 약관을 존중한다.
9. 검증하지 않은 메타데이터와 링크를 임의로 만들지 않는다.
10. 사용자가 자신의 기기와 음악을 더 잘 이해하도록 돕는 것을 최우선으로 한다.

---

# 부록 A — `audio_test_tracks.ts` 전체 소스

> 아래 코드를 `src/data/audioTestTracks.ts`에 저장한다.  
> 해외 10곡과 한국 10곡, 총 20곡의 목록·상세·평가·추천 데이터가 포함되어 있다.

```ts
/**
 * Audio Test Guide - 핵심 테스트 곡 데이터
 *
 * 생성 기준일: 2026-10-04
 * 수록 범위: 최초 추천 해외 10곡 + 한국 10곡
 *
 * 중요:
 * 1. 타임라인은 최종 채택한 스트리밍/영상 버전을 확인하기 전까지 seconds=null로 둔다.
 * 2. 외부 링크는 안전하게 검색 URL로 제공한다. 실제 트랙/영상 ID는 별도 검증 후 추가한다.
 * 3. 앨범, 발매 정보와 권리 제공 상태는 서비스 공개 전 공식 출처로 재검수한다.
 * 4. 평가는 절대적인 '정답 소리'가 아니라 동일 사용자의 기기 비교를 위한 기준이다.
 */

export type TestCategory =
  | "sub-bass"
  | "bass-control"
  | "midrange"
  | "treble"
  | "imaging"
  | "detail"
  | "dynamics"
  | "transient"
  | "timbre"
  | "comfort";

export type VocalType =
  | "instrumental"
  | "male"
  | "female"
  | "mixed"
  | "female-group"
  | "mixed-group";

export type SoundSourceType =
  | "acoustic"
  | "electronic"
  | "acoustic-mixed"
  | "electronic-mixed";

export type VerificationStatus = "TODO_VERIFY" | "VERIFIED";

export interface ListeningGuide {
  seconds: number | null;
  timeLabel: string;
  title: string;
  description: string;
  status: VerificationStatus;
}

export interface ExternalService {
  provider: "YouTube Music" | "Spotify" | "Apple Music" | "Melon";
  kind: "search";
  url: string;
  status: "SEARCH_LINK";
  note: string;
}

export interface AudioTestTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  releaseInfo: string;
  country: string;
  isKorean: boolean;
  genres: string[];
  vocalType: VocalType;
  performanceType: SoundSourceType;
  ensembleSize: "small" | "medium" | "large" | "variable";
  durationClass: "short" | "medium" | "long" | "unknown";
  durationSeconds: number | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  primaryCategory: TestCategory;
  secondaryCategories: TestCategory[];
  oneLineReason: string;
  estimatedTestTime: string;
  favoriteDefault: false;
  completedDefault: false;
  whySuitable: string;
  listeningFocus: string[];
  listeningGuide: ListeningGuide[];
  goodPlaybackExamples: string[];
  warningSigns: string[];
  evaluationFields: TestCategory[];
  freeMemoDefault: "";
  nextTrackIds: string[];
  comparisonTrackIds: string[];
  externalServices: ExternalService[];
  versionInfo: {
    preferredVersion: string;
    timelineVerified: false;
    metadataStatus: VerificationStatus;
    serviceVersionNote: string;
  };
  sources: {
    status: VerificationStatus;
    required: string[];
  };
  addedAt: "2026-10-04";
}

const serviceSearchLinks = (artist: string, title: string): ExternalService[] => {
  const query = encodeURIComponent(`${artist} ${title}`);
  return [
    {
      provider: "YouTube Music",
      kind: "search",
      url: `https://music.youtube.com/search?q=${query}`,
      status: "SEARCH_LINK",
      note: "공식 아티스트·음반사·권리 보유자 제공 버전을 우선 선택",
    },
    {
      provider: "Spotify",
      kind: "search",
      url: `https://open.spotify.com/search/${query}`,
      status: "SEARCH_LINK",
      note: "앨범명과 발매 버전을 확인한 뒤 재생",
    },
    {
      provider: "Apple Music",
      kind: "search",
      url: `https://music.apple.com/us/search?term=${query}`,
      status: "SEARCH_LINK",
      note: "국가별 제공 여부와 Dolby Atmos 버전 적용 여부 확인",
    },
    {
      provider: "Melon",
      kind: "search",
      url: `https://www.melon.com/search/total/index.htm?q=${query}`,
      status: "SEARCH_LINK",
      note: "한국 서비스 검색 링크이며 음원 버전과 앨범 정보를 확인",
    },
  ];
};

const unverifiedGuide = (focus: string[]): ListeningGuide[] =>
  focus.map((item, index) => ({
    seconds: null,
    timeLabel: "TODO",
    title: `체크 포인트 ${index + 1}`,
    description: item,
    status: "TODO_VERIFY",
  }));

export const AUDIO_TEST_TRACKS: AudioTestTrack[] = [

  {
    id: "eagles-hotel-california-hell-freezes-over",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hell Freezes Over",
    releaseInfo: "1994 · 라이브 버전",
    country: "미국",
    isKorean: false,
    genres: ["록", "어쿠스틱 록", "라이브"],
    vocalType: "male",
    performanceType: "acoustic-mixed",
    ensembleSize: "large",
    durationClass: "long",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "imaging",
    secondaryCategories: ["bass-control", "timbre", "dynamics"],
    oneLineReason: "라이브 공간, 기타의 위치, 타악기와 저음의 층을 한 번에 확인하기 좋은 곡이다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "도입부의 기타와 타악기는 좌우 위치와 무대 깊이를 비교하기 쉽고, 본 편성이 들어오면 보컬 중심과 여러 기타의 층, 저음의 제어력을 함께 확인할 수 있다. 넓게 들리는 것만으로 공간 표현이 정확하다고 단정하지 말고, 각 소리의 위치가 안정적으로 이어지는지 살핀다. 저음이 풍성한 기기와 킥·베이스의 시작과 끝을 분명하게 표현하는 기기는 다를 수 있다. 라이브 녹음의 관객음과 잔향은 원래 음원에 포함된 정보이므로, 이를 모두 기기의 착색으로 오해하지 않는다.",
    listeningFocus: ["도입부 타악기의 좌우 위치와 잔향", "어쿠스틱 기타 현의 어택과 몸통 울림", "보컬이 중앙에 안정적으로 맺히는지", "후반 합주에서 기타·베이스·드럼의 분리"],
    listeningGuide: unverifiedGuide(["도입부 타악기의 좌우 위치와 잔향", "어쿠스틱 기타 현의 어택과 몸통 울림", "보컬이 중앙에 안정적으로 맺히는지", "후반 합주에서 기타·베이스·드럼의 분리"]),
    goodPlaybackExamples: ["타악기와 기타의 위치가 또렷하지만 서로 단절되지 않는다.", "저음이 충분히 내려가면서도 보컬과 기타를 가리지 않는다."],
    warningSigns: ["무대가 넓기만 하고 중앙 이미지가 비어 보인다.", "저음 잔향이 길게 남아 다음 타격과 겹친다."],
    evaluationFields: ["imaging", "bass-control", "timbre", "dynamics"],
    freeMemoDefault: "",
    nextTrackIds: ["yosi-horikawa-bubbles", "hugh-masekela-stimela"],
    comparisonTrackIds: ["nils-lofgren-keith-dont-go", "dave-brubeck-take-five"],
    externalServices: serviceSearchLinks("Eagles", "Hotel California"),
    versionInfo: {
      preferredVersion: "Hell Freezes Over 수록 라이브 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "michael-jackson-billie-jean",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    releaseInfo: "1982",
    country: "미국",
    isKorean: false,
    genres: ["팝", "펑크", "R&B"],
    vocalType: "male",
    performanceType: "electronic-mixed",
    ensembleSize: "medium",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "bass-control",
    secondaryCategories: ["transient", "midrange", "detail"],
    oneLineReason: "반복되는 베이스와 킥을 통해 저음의 양보다 제어력과 리듬 탄력을 비교하기 쉽다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "곡 전체에 반복되는 베이스와 킥은 기기 간 저음 차이를 빠르게 드러낸다. 핵심은 저음이 크게 들리는지가 아니라 킥의 타격과 베이스 음정이 분리되고, 각 박자의 시작과 끝이 흐려지지 않는지 확인하는 것이다. 보컬이 들어온 뒤에도 저역이 중음을 덮지 않아야 하며 손뼉, 하이햇과 작은 효과음이 리듬 속에서 자연스럽게 보여야 한다. 원래 믹스의 단단하고 건조한 성격을 기기의 공간감 부족으로 단정하지 않는다.",
    listeningFocus: ["킥과 베이스 라인의 분리", "베이스 음정 변화의 추적", "중앙 보컬의 선명도", "손뼉과 하이햇의 짧은 어택"],
    listeningGuide: unverifiedGuide(["킥과 베이스 라인의 분리", "베이스 음정 변화의 추적", "중앙 보컬의 선명도", "손뼉과 하이햇의 짧은 어택"]),
    goodPlaybackExamples: ["킥은 단단하게 치고 베이스는 별도의 선율로 따라갈 수 있다.", "낮은 음이 커져도 보컬의 발음과 리듬이 유지된다."],
    warningSigns: ["킥과 베이스가 하나의 둔한 덩어리로 들린다.", "고역 타격음이 지나치게 날카롭거나 금속적으로 튄다."],
    evaluationFields: ["bass-control", "transient", "midrange", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["lorde-royals", "dean-half-moon"],
    comparisonTrackIds: ["fleetwood-mac-dreams", "newjeans-ditto"],
    externalServices: serviceSearchLinks("Michael Jackson", "Billie Jean"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "norah-jones-dont-know-why",
    title: "Don't Know Why",
    artist: "Norah Jones",
    album: "Come Away with Me",
    releaseInfo: "2002",
    country: "미국",
    isKorean: false,
    genres: ["재즈 팝", "보컬 재즈", "포크"],
    vocalType: "female",
    performanceType: "acoustic",
    ensembleSize: "small",
    durationClass: "short",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "midrange",
    secondaryCategories: ["timbre", "detail", "comfort"],
    oneLineReason: "가까운 여성 보컬과 소규모 어쿠스틱 편성으로 중음의 자연스러움과 질감을 확인하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "보컬이 과도하게 자극적이지 않은 편이라 중음의 두께, 호흡, 발음과 피아노·기타의 질감을 차분히 비교할 수 있다. 좋은 재생은 목소리를 무조건 앞으로 밀어내기보다 악기 사이에서 안정적으로 중심을 잡고, 입 모양과 호흡의 세부를 자연스럽게 보여 준다. 고해상도처럼 들리게 하려고 치찰음이나 기타 현의 마찰음을 과장하는 기기는 처음에는 선명하지만 오래 들으면 피곤할 수 있다. 녹음 자체의 친밀한 보컬 배치를 모든 곡에 적용되는 기기 특성으로 일반화하지 않는다.",
    listeningFocus: ["보컬의 입 모양과 호흡", "피아노 어택과 잔향의 연결", "기타 현의 질감", "작은 음량에서 가사 전달력"],
    listeningGuide: unverifiedGuide(["보컬의 입 모양과 호흡", "피아노 어택과 잔향의 연결", "기타 현의 질감", "작은 음량에서 가사 전달력"]),
    goodPlaybackExamples: ["보컬에 몸통과 온기가 있으면서 발음이 뭉개지지 않는다.", "악기의 세부가 들리지만 보컬보다 과도하게 튀지 않는다."],
    warningSigns: ["보컬이 얇고 치찰음만 강조된다.", "피아노와 기타가 같은 질감으로 평평하게 들린다."],
    evaluationFields: ["midrange", "timbre", "detail", "comfort"],
    freeMemoDefault: "",
    nextTrackIds: ["radka-toneff-moon-harsh-mistress", "akmu-how-can-i-love-heartbreak"],
    comparisonTrackIds: ["kim-kwang-seok-wind-blows", "yoo-jae-ha-because-i-love-you"],
    externalServices: serviceSearchLinks("Norah Jones", "Don't Know Why"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "daft-punk-giorgio-by-moroder",
    title: "Giorgio by Moroder",
    artist: "Daft Punk",
    album: "Random Access Memories",
    releaseInfo: "2013",
    country: "프랑스",
    isKorean: false,
    genres: ["일렉트로닉", "디스코", "펑크"],
    vocalType: "male",
    performanceType: "electronic-mixed",
    ensembleSize: "large",
    durationClass: "long",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "dynamics",
    secondaryCategories: ["detail", "bass-control", "transient"],
    oneLineReason: "내레이션에서 대규모 전자·어쿠스틱 편성으로 확장되어 복잡한 구간의 여유와 분리도를 확인하기 좋다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "초반 내레이션의 위치와 배경 노이즈, 이어지는 신시사이저·베이스·드럼·현악 레이어를 단계적으로 비교할 수 있다. 곡이 커질수록 소리가 단순히 시끄러워지는지, 각 층의 윤곽과 리듬이 유지되는지를 확인한다. 다이내믹은 최대 음량만을 뜻하지 않으며 작은 구간과 큰 구간의 대비, 타격의 순간적인 변화까지 포함한다. 저음이 많은 기기가 반드시 빠른 베이스를 정확히 표현하는 것은 아니다. 선택한 스트리밍 버전의 음량 정규화 여부도 결과에 영향을 줄 수 있다.",
    listeningFocus: ["초반 음성의 중앙 위치와 주변 배경음", "신시사이저와 베이스가 추가되는 층의 변화", "드럼 타격의 시작과 멈춤", "후반 대편성에서 악기별 윤곽"],
    listeningGuide: unverifiedGuide(["초반 음성의 중앙 위치와 주변 배경음", "신시사이저와 베이스가 추가되는 층의 변화", "드럼 타격의 시작과 멈춤", "후반 대편성에서 악기별 윤곽"]),
    goodPlaybackExamples: ["편성이 커져도 리듬과 주요 악기의 위치를 계속 따라갈 수 있다.", "강한 타격에서 소리가 눌리거나 거칠어지지 않는다."],
    warningSigns: ["후반부가 하나의 큰 소음처럼 뭉친다.", "저음이 길게 번져 빠른 리듬의 속도를 늦춘다."],
    evaluationFields: ["dynamics", "detail", "bass-control", "transient"],
    freeMemoDefault: "",
    nextTrackIds: ["snarky-puppy-lingus", "aespa-supernova"],
    comparisonTrackIds: ["hans-zimmer-mountains", "park-hyo-shin-wild-flower"],
    externalServices: serviceSearchLinks("Daft Punk", "Giorgio by Moroder"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "nils-lofgren-keith-dont-go",
    title: "Keith Don't Go",
    artist: "Nils Lofgren",
    album: "Acoustic Live",
    releaseInfo: "1997 · 라이브 버전",
    country: "미국",
    isKorean: false,
    genres: ["어쿠스틱 록", "라이브"],
    vocalType: "male",
    performanceType: "acoustic",
    ensembleSize: "small",
    durationClass: "long",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "transient",
    secondaryCategories: ["imaging", "timbre", "detail"],
    oneLineReason: "어쿠스틱 기타의 빠른 어택, 현의 울림과 공연장 잔향을 세밀하게 비교하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "강한 스트로크와 빠른 피킹은 트랜지언트, 즉 소리가 시작되는 순간의 속도와 선명도를 확인하는 데 유용하다. 기타 현의 금속성만 강조되는지, 나무 몸통의 울림과 공연장 잔향까지 균형 있게 이어지는지 살핀다. 세부가 많이 들린다고 항상 자연스러운 것은 아니며, 손가락 마찰음이 음악보다 앞서면 고역이 과장되었을 수 있다. 라이브 녹음의 넓은 공간과 관객 반응은 원본에 포함된 요소다. 음량을 높이면 어택이 더 인상적으로 느껴지므로 A/B 비교에서는 음량을 맞춘다.",
    listeningFocus: ["첫 스트로크의 즉각적인 반응", "현과 기타 몸통 울림의 비율", "연주자의 위치와 공연장 잔향", "빠른 피킹에서 음이 겹치지 않는지"],
    listeningGuide: unverifiedGuide(["첫 스트로크의 즉각적인 반응", "현과 기타 몸통 울림의 비율", "연주자의 위치와 공연장 잔향", "빠른 피킹에서 음이 겹치지 않는지"]),
    goodPlaybackExamples: ["현의 시작이 빠르면서 몸통 울림과 잔향이 자연스럽게 이어진다.", "빠른 연주에서도 각 음의 윤곽이 유지된다."],
    warningSigns: ["현의 마찰음만 날카롭게 튀고 몸통이 비어 보인다.", "잔향이 과장되어 연속 음이 흐려진다."],
    evaluationFields: ["transient", "imaging", "timbre", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["eagles-hotel-california-hell-freezes-over", "yosi-horikawa-letter"],
    comparisonTrackIds: ["kim-kwang-seok-wind-blows", "stevie-ray-vaughan-tin-pan-alley"],
    externalServices: serviceSearchLinks("Nils Lofgren", "Keith Don't Go"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "dave-brubeck-take-five",
    title: "Take Five",
    artist: "The Dave Brubeck Quartet",
    album: "Time Out",
    releaseInfo: "1959",
    country: "미국",
    isKorean: false,
    genres: ["재즈", "쿨 재즈"],
    vocalType: "instrumental",
    performanceType: "acoustic",
    ensembleSize: "small",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "imaging",
    secondaryCategories: ["treble", "transient", "timbre"],
    oneLineReason: "소규모 재즈 편성의 위치, 색소폰 음색, 심벌과 드럼 솔로를 쉽게 구분할 수 있다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "색소폰, 피아노, 베이스와 드럼의 역할이 명확해 악기 위치와 음색을 배우기 좋은 곡이다. 심벌이 밝고 선명하더라도 얇고 모래알처럼 거칠게 부서지지 않는지, 색소폰이 중앙 부근에서 충분한 몸통을 유지하는지 확인한다. 드럼 솔로에서는 타격 위치와 북의 크기, 잔향 차이가 느껴지는지 들어본다. 오래된 녹음의 특성과 현대 음원의 극저역·초고역 확장을 같은 기준으로 비교하지 않는다. 리마스터에 따라 음색과 음량이 달라질 수 있으므로 버전을 기록한다.",
    listeningFocus: ["색소폰의 중심 위치와 몸통", "심벌의 금속성 및 감쇠", "피아노·베이스의 좌우 배치", "드럼 솔로의 타격 위치와 크기"],
    listeningGuide: unverifiedGuide(["색소폰의 중심 위치와 몸통", "심벌의 금속성 및 감쇠", "피아노·베이스의 좌우 배치", "드럼 솔로의 타격 위치와 크기"]),
    goodPlaybackExamples: ["각 악기가 분리되면서도 하나의 밴드처럼 자연스럽게 연결된다.", "심벌의 끝이 길게 이어져도 날카롭거나 입자감이 거칠지 않다."],
    warningSigns: ["색소폰이 지나치게 얇거나 비음만 강조된다.", "드럼 솔로의 여러 북이 비슷한 한 가지 소리로 들린다."],
    evaluationFields: ["imaging", "treble", "transient", "timbre"],
    freeMemoDefault: "",
    nextTrackIds: ["miles-davis-so-what", "hugh-masekela-stimela"],
    comparisonTrackIds: ["norah-jones-dont-know-why", "hoff-ensemble-song-for-olabi"],
    externalServices: serviceSearchLinks("The Dave Brubeck Quartet", "Take Five"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "lorde-royals",
    title: "Royals",
    artist: "Lorde",
    album: "Pure Heroine",
    releaseInfo: "2013",
    country: "뉴질랜드",
    isKorean: false,
    genres: ["팝", "일렉트로팝"],
    vocalType: "female",
    performanceType: "electronic",
    ensembleSize: "small",
    durationClass: "short",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "sub-bass",
    secondaryCategories: ["midrange", "imaging", "bass-control"],
    oneLineReason: "낮은 전자 저음과 중앙 보컬의 공존을 통해 초저음 확장과 중음 마스킹을 확인하기 좋다.",
    estimatedTestTime: "약 1분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "편성이 비교적 단순해 낮은 전자 저음과 보컬의 관계를 집중해서 들을 수 있다. 초저음은 단순히 진동이 강한지가 아니라 낮은 음의 시작, 지속, 감쇠가 구분되고 보컬을 가리지 않는지가 중요하다. 중앙 보컬과 겹쳐지는 코러스의 폭도 확인한다. 작은 이어폰에서는 가장 낮은 대역이 약하게 느껴질 수 있지만 이것만으로 전체 음질이 낮다고 판단하지 않는다. 반대로 저음이 크게 부풀어 오르면 처음에는 풍성해도 박자와 보컬의 명료도가 손상될 수 있다.",
    listeningFocus: ["초저음의 시작과 감쇠", "중앙 리드 보컬과 코러스 폭", "저음이 보컬 자음을 가리는지", "작은 타격음의 위치"],
    listeningGuide: unverifiedGuide(["초저음의 시작과 감쇠", "중앙 리드 보컬과 코러스 폭", "저음이 보컬 자음을 가리는지", "작은 타격음의 위치"]),
    goodPlaybackExamples: ["낮은 대역이 느껴지면서도 각 박자의 윤곽과 보컬이 유지된다.", "리드 보컬은 중앙, 코러스는 주변으로 자연스럽게 펼쳐진다."],
    warningSigns: ["저음이 한 음처럼 웅웅거리며 길게 남는다.", "보컬이 저음 뒤로 밀리거나 자음만 날카롭게 남는다."],
    evaluationFields: ["sub-bass", "midrange", "imaging", "bass-control"],
    freeMemoDefault: "",
    nextTrackIds: ["james-blake-limit-to-your-love", "bibi-vengeance"],
    comparisonTrackIds: ["newjeans-ditto", "billie-eilish-bad-guy"],
    externalServices: serviceSearchLinks("Lorde", "Royals"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "chris-jones-no-sanctuary-here",
    title: "No Sanctuary Here",
    artist: "Chris Jones",
    album: "Roadhouses & Automobiles",
    releaseInfo: "2003",
    country: "미국",
    isKorean: false,
    genres: ["블루스", "포크 록", "오디오파일"],
    vocalType: "male",
    performanceType: "acoustic-mixed",
    ensembleSize: "medium",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "bass-control",
    secondaryCategories: ["midrange", "imaging", "timbre"],
    oneLineReason: "깊은 저음, 굵은 남성 보컬과 공간 잔향의 균형을 빠르게 확인할 수 있다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "낮고 묵직한 반주와 굵은 남성 보컬이 함께 있어 저음의 양, 제어력, 중음의 몸통을 구분하는 데 유용하다. 좋은 재생에서는 저역이 충분한 무게를 주면서도 보컬의 발음과 기타 질감이 사라지지 않는다. 녹음 자체가 풍성하고 입체적으로 들리도록 제작된 편이므로, 이 곡 하나만으로 모든 음원의 공간감이나 저음 성능을 일반화하지 않는다. 특히 더 큰 음량은 저음과 디테일을 더 인상적으로 느끼게 하므로 비교 전 음량을 맞춰야 한다.",
    listeningFocus: ["낮은 반주의 무게와 음정", "남성 보컬의 가슴 울림과 발음", "기타와 타악기의 위치", "잔향이 저음과 겹치는 정도"],
    listeningGuide: unverifiedGuide(["낮은 반주의 무게와 음정", "남성 보컬의 가슴 울림과 발음", "기타와 타악기의 위치", "잔향이 저음과 겹치는 정도"]),
    goodPlaybackExamples: ["저음이 깊지만 보컬의 중심과 기타의 결이 선명하다.", "공간의 잔향이 악기 뒤로 펼쳐지고 전면을 흐리지 않는다."],
    warningSigns: ["저음과 보컬의 낮은 성분이 겹쳐 답답하게 들린다.", "공간 효과가 과장되어 모든 소리가 멀게 느껴진다."],
    evaluationFields: ["bass-control", "midrange", "imaging", "timbre"],
    freeMemoDefault: "",
    nextTrackIds: ["tracy-chapman-fast-car", "hugh-masekela-stimela"],
    comparisonTrackIds: ["michael-jackson-billie-jean", "dean-half-moon"],
    externalServices: serviceSearchLinks("Chris Jones", "No Sanctuary Here"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "fleetwood-mac-dreams",
    title: "Dreams",
    artist: "Fleetwood Mac",
    album: "Rumours",
    releaseInfo: "1977",
    country: "영국·미국",
    isKorean: false,
    genres: ["록", "소프트 록"],
    vocalType: "female",
    performanceType: "acoustic-mixed",
    ensembleSize: "medium",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "timbre",
    secondaryCategories: ["bass-control", "comfort", "midrange"],
    oneLineReason: "보컬, 드럼, 베이스와 기타가 과장되지 않게 어우러져 전체 밸런스와 장시간 편안함을 보기 좋다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "반복되는 드럼과 베이스, 차분한 여성 보컬, 기타 레이어가 균형 있게 배치되어 특정 대역이 지나치게 튀는지 살피기 좋다. 저음은 리듬을 지탱하지만 보컬을 압도해서는 안 되고, 고역 타악은 선명하되 계속 신경 쓰일 정도로 날카롭지 않아야 한다. 이 곡은 극단적인 초저음이나 대규모 다이내믹보다 전반적인 음색 균형과 피로도 확인에 적합하다. 원본과 여러 리마스터의 음색 및 음량 차이가 있을 수 있으므로 최종 채택 버전을 기록한다.",
    listeningFocus: ["드럼과 베이스의 반복 리듬", "여성 보컬의 자연스러운 두께", "기타 레이어의 좌우 배치", "2분 이상 들었을 때 고역 피로"],
    listeningGuide: unverifiedGuide(["드럼과 베이스의 반복 리듬", "여성 보컬의 자연스러운 두께", "기타 레이어의 좌우 배치", "2분 이상 들었을 때 고역 피로"]),
    goodPlaybackExamples: ["어느 한 대역도 음악 전체를 지배하지 않고 리듬이 편안하게 이어진다.", "보컬과 악기가 부드럽지만 세부가 지나치게 흐려지지 않는다."],
    warningSigns: ["저음이 부풀어 박자가 느슨해진다.", "고역 타악과 보컬 자음이 반복적으로 귀를 찌른다."],
    evaluationFields: ["timbre", "bass-control", "comfort", "midrange"],
    freeMemoDefault: "",
    nextTrackIds: ["cranberries-dreams", "yoo-jae-ha-because-i-love-you"],
    comparisonTrackIds: ["michael-jackson-billie-jean", "norah-jones-dont-know-why"],
    externalServices: serviceSearchLinks("Fleetwood Mac", "Dreams"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "hans-zimmer-mountains",
    title: "Mountains",
    artist: "Hans Zimmer",
    album: "Interstellar: Original Motion Picture Soundtrack",
    releaseInfo: "2014",
    country: "독일",
    isKorean: false,
    genres: ["영화 음악", "오케스트라", "앰비언트"],
    vocalType: "instrumental",
    performanceType: "acoustic-mixed",
    ensembleSize: "large",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "dynamics",
    secondaryCategories: ["sub-bass", "detail", "imaging"],
    oneLineReason: "작은 시작에서 거대한 음향으로 확장될 때 다이내믹, 저역 여유와 레이어 유지 능력을 확인할 수 있다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "반복되는 작은 리듬 위에 오르간과 오케스트라 층이 점차 더해져 기기의 다이내믹 여유와 복잡한 구간의 분리도를 확인하기 좋다. 큰 소리가 단순히 거칠어지거나 납작하게 눌리지 않고, 낮은 대역의 압력과 중·고역의 선율이 함께 유지되는지 듣는다. 영화 음악의 거대한 스케일은 음량을 높이고 싶게 만들지만, 큰 음량 자체가 기기의 성능 차이처럼 느껴질 수 있으므로 편안한 수준을 유지한다. 원래 녹음의 강한 저역과 잔향을 기기 왜곡과 구분한다.",
    listeningFocus: ["초반 작은 반복음의 선명도", "오르간 저역의 확장과 안정성", "편성이 커질 때 선율 레이어", "최대 구간에서 압축과 거친 고역"],
    listeningGuide: unverifiedGuide(["초반 작은 반복음의 선명도", "오르간 저역의 확장과 안정성", "편성이 커질 때 선율 레이어", "최대 구간에서 압축과 거친 고역"]),
    goodPlaybackExamples: ["작은 시작과 큰 절정의 차이가 크면서도 절정에서 정보가 무너지지 않는다.", "저역의 스케일이 커져도 중역 선율을 계속 따라갈 수 있다."],
    warningSigns: ["절정에서 전체 소리가 납작하고 답답해진다.", "저역이 과도하게 흔들리거나 고역이 거칠게 찢어진다."],
    evaluationFields: ["dynamics", "sub-bass", "detail", "imaging"],
    freeMemoDefault: "",
    nextTrackIds: ["aaron-copland-fanfare", "park-hyo-shin-wild-flower"],
    comparisonTrackIds: ["daft-punk-giorgio-by-moroder", "next-lazenca-save-us"],
    externalServices: serviceSearchLinks("Hans Zimmer", "Mountains"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "park-hyo-shin-wild-flower",
    title: "야생화",
    artist: "박효신",
    album: "야생화",
    releaseInfo: "2014 · 싱글",
    country: "대한민국",
    isKorean: true,
    genres: ["발라드", "팝"],
    vocalType: "male",
    performanceType: "acoustic-mixed",
    ensembleSize: "large",
    durationClass: "long",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "dynamics",
    secondaryCategories: ["midrange", "treble", "detail"],
    oneLineReason: "작은 보컬에서 강한 고음과 대편성으로 확장되어 보컬 다이내믹과 혼잡도를 확인하기 좋다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "초반의 비교적 절제된 보컬과 피아노에서 후반의 강한 보컬, 현악과 밴드 편성으로 확대되는 흐름이 뚜렷하다. 보컬이 커질 때 단순히 소리만 커지는 것이 아니라 호흡, 발음과 감정의 미세한 변화가 유지되는지 확인한다. 후반부에서 고음이 자극적으로 찢어지거나 반주가 한 덩어리로 뭉치지 않는지도 중요하다. 원래 가창과 믹스에 포함된 강한 에너지를 모두 기기의 고역 과장으로 판단하지 말고, 같은 구간을 여러 음량에서 비교한다.",
    listeningFocus: ["초반 보컬의 호흡과 피아노 잔향", "보컬 음량이 커질 때 중심 유지", "현악과 드럼이 추가될 때 분리", "후반 고음의 자극과 압축 여부"],
    listeningGuide: unverifiedGuide(["초반 보컬의 호흡과 피아노 잔향", "보컬 음량이 커질 때 중심 유지", "현악과 드럼이 추가될 때 분리", "후반 고음의 자극과 압축 여부"]),
    goodPlaybackExamples: ["작은 보컬의 세부와 큰 보컬의 힘이 모두 자연스럽게 이어진다.", "후반부가 커져도 보컬, 현악, 드럼의 층을 구분할 수 있다."],
    warningSigns: ["고음에서 목소리가 얇고 날카롭게 변한다.", "대편성 구간이 한 덩어리로 뭉치고 피아노가 사라진다."],
    evaluationFields: ["dynamics", "midrange", "treble", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["ailee-i-will-go-to-you-like-first-snow", "younha-event-horizon"],
    comparisonTrackIds: ["hans-zimmer-mountains", "adele-someone-like-you"],
    externalServices: serviceSearchLinks("박효신", "야생화"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "iu-good-day",
    title: "좋은 날",
    artist: "아이유",
    album: "Real",
    releaseInfo: "2010",
    country: "대한민국",
    isKorean: true,
    genres: ["K-pop", "팝", "오케스트라 팝"],
    vocalType: "female",
    performanceType: "acoustic-mixed",
    ensembleSize: "large",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "treble",
    secondaryCategories: ["midrange", "detail", "dynamics"],
    oneLineReason: "밝은 여성 보컬과 밀도 높은 반주, 후반 고음에서 자극·압축·분리도를 확인하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "밝은 보컬과 여러 악기가 촘촘하게 배치되어 중·고역의 균형과 혼잡도를 비교하기 좋다. 핵심은 높은 음이 얼마나 크게 들리는지가 아니라 음정과 발음이 유지되고, 반주가 함께 커져도 보컬이 거칠게 찢어지지 않는지 확인하는 것이다. 치찰음은 `ㅅ`과 같은 자음이 과도하게 튀는 현상으로, 녹음과 발성에도 영향을 받는다. 한 구간의 자극만으로 기기를 단정하지 말고 다른 여성 보컬 곡과 함께 비교한다. 스트리밍의 리마스터 여부를 기록한다.",
    listeningFocus: ["밝은 보컬의 자음과 모음 균형", "현악·브라스·리듬 악기의 분리", "후렴에서 보컬 중심 유지", "후반 고음의 거칠음과 압축"],
    listeningGuide: unverifiedGuide(["밝은 보컬의 자음과 모음 균형", "현악·브라스·리듬 악기의 분리", "후렴에서 보컬 중심 유지", "후반 고음의 거칠음과 압축"]),
    goodPlaybackExamples: ["고음이 시원하게 올라가면서도 자음이 칼날처럼 튀지 않는다.", "밀도 높은 반주에서도 보컬과 주요 악기를 따라갈 수 있다."],
    warningSigns: ["고음이 얇고 금속적으로 변한다.", "반주가 커질 때 보컬이 묻히거나 전체가 납작해진다."],
    evaluationFields: ["treble", "midrange", "detail", "dynamics"],
    freeMemoDefault: "",
    nextTrackIds: ["taeyeon-invu", "ailee-i-will-go-to-you-like-first-snow"],
    comparisonTrackIds: ["park-hyo-shin-wild-flower", "f-x-4-walls"],
    externalServices: serviceSearchLinks("아이유", "좋은 날"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "newjeans-ditto",
    title: "Ditto",
    artist: "NewJeans",
    album: "OMG",
    releaseInfo: "2022 · 선공개 싱글",
    country: "대한민국",
    isKorean: true,
    genres: ["K-pop", "팝", "볼티모어 클럽"],
    vocalType: "female-group",
    performanceType: "electronic",
    ensembleSize: "medium",
    durationClass: "short",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "imaging",
    secondaryCategories: ["bass-control", "midrange", "detail"],
    oneLineReason: "부드러운 보컬 레이어, 전자 저음과 잔향 효과의 균형을 비교하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "리드 보컬과 겹쳐지는 코러스, 부드러운 전자 저음, 넓게 퍼지는 공간 효과가 함께 있어 레이어와 중앙 이미지의 안정성을 확인하기 좋다. 공간감이 넓다는 이유만으로 위치 표현이 정확하다고 판단하지 말고, 리드 보컬이 중앙에 유지되는지와 주변 보컬·효과음의 거리를 구분한다. 저음은 둥글고 부드러운 성격이지만 보컬의 낮은 부분을 덮거나 리듬을 느리게 만들 정도로 번져서는 안 된다. 원래 믹스의 몽환적인 질감을 기기의 흐림과 구분한다.",
    listeningFocus: ["리드 보컬의 중앙 위치", "주변 코러스의 폭과 거리", "전자 저음의 둥근 질감과 제어", "작은 효과음과 잔향의 층"],
    listeningGuide: unverifiedGuide(["리드 보컬의 중앙 위치", "주변 코러스의 폭과 거리", "전자 저음의 둥근 질감과 제어", "작은 효과음과 잔향의 층"]),
    goodPlaybackExamples: ["중앙 보컬은 또렷하고 코러스와 효과는 주변에 자연스럽게 펼쳐진다.", "저음이 부드러우면서 박자의 시작과 끝을 구분할 수 있다."],
    warningSigns: ["공간 효과 때문에 보컬 중심이 흔들리거나 비어 보인다.", "저음과 잔향이 겹쳐 전체가 흐릿해진다."],
    evaluationFields: ["imaging", "bass-control", "midrange", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["taeyeon-invu", "lorde-royals"],
    comparisonTrackIds: ["dean-half-moon", "aespa-supernova"],
    externalServices: serviceSearchLinks("NewJeans", "Ditto"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "taeyeon-invu",
    title: "INVU",
    artist: "태연",
    album: "INVU",
    releaseInfo: "2022",
    country: "대한민국",
    isKorean: true,
    genres: ["K-pop", "신스팝", "댄스 팝"],
    vocalType: "female",
    performanceType: "electronic",
    ensembleSize: "medium",
    durationClass: "short",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "treble",
    secondaryCategories: ["imaging", "midrange", "sub-bass"],
    oneLineReason: "중앙 여성 보컬과 넓게 배치된 신스, 밝은 고역과 전자 저음의 균형을 확인하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "리드 보컬은 중앙에 비교적 선명하게 배치되고 신시사이저와 코러스는 넓게 펼쳐져 중앙과 주변의 대비를 확인할 수 있다. 밝은 고역이 선명하면서도 자음과 숨소리가 과도하게 날카롭지 않은지, 전자 저음이 보컬의 몸통을 가리지 않는지 듣는다. 신스의 넓은 배치는 원래 믹스의 특징이므로, 무대가 넓게 들린다는 사실만으로 기기의 이미징이 정확하다고 단정하지 않는다. 다른 어쿠스틱 보컬 곡과 함께 비교해야 음색 특성을 더 잘 구분할 수 있다.",
    listeningFocus: ["중앙 보컬의 고정감", "신스와 코러스의 좌우 확장", "고역 자음과 숨소리의 자극", "전자 저음과 보컬 몸통의 분리"],
    listeningGuide: unverifiedGuide(["중앙 보컬의 고정감", "신스와 코러스의 좌우 확장", "고역 자음과 숨소리의 자극", "전자 저음과 보컬 몸통의 분리"]),
    goodPlaybackExamples: ["보컬 중심이 안정되고 주변 신스가 넓지만 위치가 흐려지지 않는다.", "고역이 밝아도 오래 들을 때 자극이 누적되지 않는다."],
    warningSigns: ["자음과 숨소리가 음악보다 앞서 튄다.", "넓은 신스가 중앙 보컬까지 흐리게 만든다."],
    evaluationFields: ["treble", "imaging", "midrange", "sub-bass"],
    freeMemoDefault: "",
    nextTrackIds: ["f-x-4-walls", "aespa-next-level"],
    comparisonTrackIds: ["iu-good-day", "newjeans-ditto"],
    externalServices: serviceSearchLinks("태연", "INVU"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "gidle-tomboy",
    title: "TOMBOY",
    artist: "(여자)아이들",
    album: "I NEVER DIE",
    releaseInfo: "2022",
    country: "대한민국",
    isKorean: true,
    genres: ["K-pop", "얼터너티브 록", "팝 펑크"],
    vocalType: "female-group",
    performanceType: "electronic-mixed",
    ensembleSize: "medium",
    durationClass: "short",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "transient",
    secondaryCategories: ["bass-control", "midrange", "detail"],
    oneLineReason: "강한 킥·베이스와 기타, 여러 보컬 톤이 겹칠 때 타격과 분리도를 비교하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "짧고 강한 리듬 타격, 왜곡 기타, 전자 저음과 서로 다른 보컬 톤이 함께 등장해 속도와 분리도를 확인하기 좋다. 타격음이 크다고 트랜지언트가 정확한 것은 아니며, 시작이 빠르고 멈춤이 분명한지 들어야 한다. 보컬이 거칠게 표현되는 부분은 곡의 제작 의도일 수 있으므로 모든 거친 질감을 기기 왜곡으로 판단하지 않는다. 후렴에서 기타와 저음이 보컬을 가리지 않고, 여러 보컬의 음색 차이가 유지되는지 비교한다.",
    listeningFocus: ["킥의 첫 타격과 감쇠", "베이스와 왜곡 기타의 분리", "멤버별 보컬 음색 차이", "후렴의 높은 밀도에서 중심 유지"],
    listeningGuide: unverifiedGuide(["킥의 첫 타격과 감쇠", "베이스와 왜곡 기타의 분리", "멤버별 보컬 음색 차이", "후렴의 높은 밀도에서 중심 유지"]),
    goodPlaybackExamples: ["강한 타격이 빠르고 단단하지만 잔향이 다음 박자를 덮지 않는다.", "보컬, 기타와 저음이 겹쳐도 각 층을 구분할 수 있다."],
    warningSigns: ["타격이 크기만 하고 둔하게 번진다.", "왜곡 기타와 고역 보컬이 합쳐져 거친 소음처럼 들린다."],
    evaluationFields: ["transient", "bass-control", "midrange", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["aespa-supernova", "yb-flying-butterfly"],
    comparisonTrackIds: ["michael-jackson-billie-jean", "bibi-vengeance"],
    externalServices: serviceSearchLinks("(여자)아이들", "TOMBOY"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "younha-event-horizon",
    title: "사건의 지평선",
    artist: "윤하",
    album: "END THEORY : Final Edition",
    releaseInfo: "2022",
    country: "대한민국",
    isKorean: true,
    genres: ["팝 록", "K-pop"],
    vocalType: "female",
    performanceType: "acoustic-mixed",
    ensembleSize: "large",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "dynamics",
    secondaryCategories: ["treble", "midrange", "detail"],
    oneLineReason: "피아노와 보컬에서 밴드 편성으로 확장될 때 밀도, 고역 자극과 보컬 중심을 확인하기 좋다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "초반의 피아노와 보컬, 이후 드럼·기타·베이스가 더해지는 흐름을 통해 작은 편성과 큰 편성의 차이를 비교할 수 있다. 후렴에서 보컬이 강해질 때 자음이 날카롭게 튀지 않고 몸통과 음정이 유지되는지, 심벌과 기타가 보컬을 덮지 않는지 확인한다. 밝고 에너지 있는 믹스 자체를 기기의 고역 과장으로 즉시 판단하지 말고, 잔잔한 어쿠스틱 곡과 교차 비교한다. 음량이 조금만 달라도 후렴의 인상이 크게 달라질 수 있다.",
    listeningFocus: ["초반 피아노 어택과 보컬 거리", "밴드가 들어오는 순간의 다이내믹", "후렴 보컬과 심벌의 고역 균형", "기타·베이스·드럼의 분리"],
    listeningGuide: unverifiedGuide(["초반 피아노 어택과 보컬 거리", "밴드가 들어오는 순간의 다이내믹", "후렴 보컬과 심벌의 고역 균형", "기타·베이스·드럼의 분리"]),
    goodPlaybackExamples: ["편성이 커질수록 스케일이 증가하지만 보컬과 피아노의 핵심이 유지된다.", "심벌이 선명하면서 보컬 자음과 충돌하지 않는다."],
    warningSigns: ["후렴에서 전체가 한꺼번에 앞으로 몰려 답답하다.", "보컬 고음과 심벌이 겹쳐 지속적인 자극을 만든다."],
    evaluationFields: ["dynamics", "treble", "midrange", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["park-hyo-shin-wild-flower", "yb-flying-butterfly"],
    comparisonTrackIds: ["iu-good-day", "akmu-how-can-i-love-heartbreak"],
    externalServices: serviceSearchLinks("윤하", "사건의 지평선"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "ailee-i-will-go-to-you-like-first-snow",
    title: "첫눈처럼 너에게 가겠다",
    artist: "에일리",
    album: "도깨비 OST Part 9",
    releaseInfo: "2017",
    country: "대한민국",
    isKorean: true,
    genres: ["OST", "발라드"],
    vocalType: "female",
    performanceType: "acoustic-mixed",
    ensembleSize: "large",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "beginner",
    primaryCategory: "midrange",
    secondaryCategories: ["dynamics", "timbre", "treble"],
    oneLineReason: "강한 여성 보컬과 피아노·현악 배경을 통해 보컬의 힘, 호흡과 반주 분리를 확인하기 좋다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "초반의 보컬과 피아노는 중음의 자연스러움과 호흡을 보기 좋고, 후반 현악과 타악이 더해지는 구간은 다이내믹과 혼잡도를 확인하기 좋다. 보컬이 강해질 때 음량만 커지는 것이 아니라 발음, 몸통과 공간의 잔향이 함께 유지되는지 듣는다. 밝은 고음이 시원하게 들리는 것과 치찰음이나 거친 왜곡이 생기는 것은 구분해야 한다. OST 특유의 감정적 대편성은 원래 녹음의 특징이므로, 다른 단순 편성 보컬 곡과 함께 비교한다.",
    listeningFocus: ["초반 호흡과 발음의 자연스러움", "피아노와 보컬의 거리", "현악이 추가될 때 층의 분리", "강한 고음에서 거칠음과 압축"],
    listeningGuide: unverifiedGuide(["초반 호흡과 발음의 자연스러움", "피아노와 보컬의 거리", "현악이 추가될 때 층의 분리", "강한 고음에서 거칠음과 압축"]),
    goodPlaybackExamples: ["보컬의 힘과 두께가 유지되고 피아노·현악이 뒤에서 자연스럽게 받친다.", "고음이 커져도 자음과 모음의 균형이 무너지지 않는다."],
    warningSigns: ["보컬이 얇아지고 자음만 앞으로 튄다.", "현악과 잔향이 보컬 주변을 덮어 위치가 흐려진다."],
    evaluationFields: ["midrange", "dynamics", "timbre", "treble"],
    freeMemoDefault: "",
    nextTrackIds: ["iu-good-day", "park-hyo-shin-wild-flower"],
    comparisonTrackIds: ["norah-jones-dont-know-why", "adele-someone-like-you"],
    externalServices: serviceSearchLinks("에일리", "첫눈처럼 너에게 가겠다"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "yoo-jae-ha-because-i-love-you",
    title: "그대 내 품에",
    artist: "유재하",
    album: "사랑하기 때문에",
    releaseInfo: "1987",
    country: "대한민국",
    isKorean: true,
    genres: ["발라드", "팝", "싱어송라이터"],
    vocalType: "male",
    performanceType: "acoustic-mixed",
    ensembleSize: "medium",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "timbre",
    secondaryCategories: ["midrange", "comfort", "detail"],
    oneLineReason: "남성 보컬과 어쿠스틱 악기의 질감, 오래 들어도 편안한 중역과 녹음 시대의 특성을 확인하기 좋다.",
    estimatedTestTime: "약 2분",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "보컬과 어쿠스틱 악기의 중역이 중심이 되는 곡으로, 목소리의 몸통과 악기 음색이 자연스럽게 이어지는지 확인하기 좋다. 현대 팝처럼 극단적인 초저음과 초고역을 기대하기보다, 녹음 시대의 특성을 존중하면서 보컬의 감정과 반주의 결이 유지되는지 듣는다. 리마스터 버전에 따라 밝기, 저음 양과 전체 음량이 달라질 수 있으므로 버전을 반드시 기록한다. 세부를 강조하는 기기가 오래된 녹음의 노이즈까지 부각할 수 있지만, 노이즈가 많이 들린다고 해상도가 항상 더 높다고 단정할 수 없다.",
    listeningFocus: ["남성 보컬의 몸통과 발음", "피아노·현악 등 반주의 자연스러운 음색", "잔향과 녹음 노이즈의 정도", "2분 이상 감상했을 때 편안함"],
    listeningGuide: unverifiedGuide(["남성 보컬의 몸통과 발음", "피아노·현악 등 반주의 자연스러운 음색", "잔향과 녹음 노이즈의 정도", "2분 이상 감상했을 때 편안함"]),
    goodPlaybackExamples: ["보컬이 얇거나 답답하지 않고 반주와 자연스럽게 섞인다.", "오래된 녹음의 질감을 보여 주면서 음악적 중심을 잃지 않는다."],
    warningSigns: ["고역 노이즈와 자음만 과도하게 강조된다.", "중저음이 부풀어 보컬과 반주가 답답하게 겹친다."],
    evaluationFields: ["timbre", "midrange", "comfort", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["kim-kwang-seok-wind-blows", "yang-hee-eun-love-loneliness"],
    comparisonTrackIds: ["fleetwood-mac-dreams", "norah-jones-dont-know-why"],
    externalServices: serviceSearchLinks("유재하", "그대 내 품에"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "leenalchi-tiger-is-coming",
    title: "범 내려온다",
    artist: "이날치",
    album: "수궁가",
    releaseInfo: "2020",
    country: "대한민국",
    isKorean: true,
    genres: ["얼터너티브 팝", "국악 크로스오버", "전자음악"],
    vocalType: "mixed-group",
    performanceType: "electronic-mixed",
    ensembleSize: "medium",
    durationClass: "medium",
    durationSeconds: null,
    difficulty: "intermediate",
    primaryCategory: "detail",
    secondaryCategories: ["bass-control", "transient", "midrange"],
    oneLineReason: "반복적인 베이스, 빠른 리듬과 여러 보컬이 겹치는 구간에서 속도와 분리도를 확인하기 좋다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "반복되는 베이스와 타악적 리듬 위에 여러 보컬이 교차해 빠른 소리의 시작과 끝, 보컬 분리와 리듬의 탄력을 확인할 수 있다. 판소리 기반 발성은 일반 팝 보컬과 배음과 강세가 다르므로, 서구 팝의 부드러운 보컬 기준만으로 거칠다고 평가하지 않는다. 저음이 많게 들리는 것보다 반복 패턴의 음정과 박자가 또렷하고, 보컬이 겹쳐도 각 목소리의 움직임을 따라갈 수 있는지가 중요하다. 기기 특성과 장르 고유의 음색을 분리해서 기록한다.",
    listeningFocus: ["반복 베이스의 음정과 멈춤", "여러 보컬의 교차와 위치", "빠른 자음과 리듬의 선명도", "후렴의 높은 밀도에서 분리"],
    listeningGuide: unverifiedGuide(["반복 베이스의 음정과 멈춤", "여러 보컬의 교차와 위치", "빠른 자음과 리듬의 선명도", "후렴의 높은 밀도에서 분리"]),
    goodPlaybackExamples: ["베이스가 강해도 박자와 음정이 흐려지지 않는다.", "여러 보컬이 동시에 나와도 각 흐름과 발음을 따라갈 수 있다."],
    warningSigns: ["베이스가 웅웅거리며 리듬을 느리게 만든다.", "강한 발성이 모두 날카롭고 같은 위치에서 겹쳐 들린다."],
    evaluationFields: ["detail", "bass-control", "transient", "midrange"],
    freeMemoDefault: "",
    nextTrackIds: ["aespa-supernova", "gidle-tomboy"],
    comparisonTrackIds: ["snarky-puppy-lingus", "dean-half-moon"],
    externalServices: serviceSearchLinks("이날치", "범 내려온다"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
  {
    id: "song-sohee-arirang",
    title: "아리랑",
    artist: "송소희",
    album: "TODO_VERIFY_METADATA",
    releaseInfo: "TODO_VERIFY_RELEASE",
    country: "대한민국",
    isKorean: true,
    genres: ["국악", "민요", "보컬"],
    vocalType: "female",
    performanceType: "acoustic-mixed",
    ensembleSize: "variable",
    durationClass: "unknown",
    durationSeconds: null,
    difficulty: "advanced",
    primaryCategory: "timbre",
    secondaryCategories: ["midrange", "imaging", "detail"],
    oneLineReason: "전통 창법의 배음, 긴 호흡과 공간 잔향을 통해 보컬 음색과 자연스러움을 비교하기 위한 검수 예정 곡이다.",
    estimatedTestTime: "약 1분 30초",
    favoriteDefault: false,
    completedDefault: false,
    whySuitable: "한국 전통 창법은 일반 팝 보컬과 다른 배음, 발성 강도와 장식음을 포함하므로 기기가 복잡한 보컬 질감을 얼마나 자연스럽게 표현하는지 확인하는 데 의미가 있다. 다만 여러 공연·방송·앨범 버전의 편성, 음질과 잔향이 크게 다르므로 최종 버전을 확정하기 전에는 실제 타임라인과 세부 평가를 공개하지 않는다. 강한 배음을 단순한 치찰음이나 왜곡으로 오해하지 말고, 목소리의 중심·호흡·공간 잔향이 분리되는지 듣는다. 국악을 서구 악기 중심의 기준 하나로 순위를 매기지 않는다.",
    listeningFocus: ["긴 호흡과 음정의 연결", "전통 창법의 배음과 목소리 중심", "반주 악기와 보컬의 거리", "공연장 또는 스튜디오 잔향"],
    listeningGuide: unverifiedGuide(["긴 호흡과 음정의 연결", "전통 창법의 배음과 목소리 중심", "반주 악기와 보컬의 거리", "공연장 또는 스튜디오 잔향"]),
    goodPlaybackExamples: ["강한 배음이 선명하면서 목소리의 중심과 호흡이 유지된다.", "잔향이 길어도 발음과 반주 악기의 위치를 구분할 수 있다."],
    warningSigns: ["배음이 얇고 날카로운 소리로만 재생된다.", "잔향이 보컬을 덮어 발음과 음정 변화가 흐려진다."],
    evaluationFields: ["timbre", "midrange", "imaging", "detail"],
    freeMemoDefault: "",
    nextTrackIds: ["sumi-jo-nella-fantasia", "yang-hee-eun-love-loneliness"],
    comparisonTrackIds: ["ailee-i-will-go-to-you-like-first-snow", "yoo-jae-ha-because-i-love-you"],
    externalServices: serviceSearchLinks("송소희", "아리랑"),
    versionInfo: {
      preferredVersion: "명시된 앨범의 공식 음원 버전",
      timelineVerified: false,
      metadataStatus: "TODO_VERIFY",
      serviceVersionNote: "서비스별 마스터, 음량 정규화, 리마스터 및 공간 음향 적용 여부를 비교 전에 기록",
    },
    sources: {
      status: "TODO_VERIFY",
      required: ["아티스트 또는 음반사 공식 디스코그래피", "공식 스트리밍 앨범 메타데이터", "최종 채택 음원의 제공 페이지"],
    },
    addedAt: "2026-10-04",
  },
];

/** 7.3 목록 화면에서 사용할 필터 정의 */
export const AUDIO_TEST_FILTERS = {
  testCategories: [
    "sub-bass",
    "bass-control",
    "midrange",
    "treble",
    "imaging",
    "detail",
    "dynamics",
    "transient",
    "timbre",
    "comfort",
  ] satisfies TestCategory[],
  origin: ["all", "korean", "international"] as const,
  vocalType: [
    "all",
    "instrumental",
    "male",
    "female",
    "mixed",
    "female-group",
    "mixed-group",
  ] as const,
  performanceType: [
    "all",
    "acoustic",
    "electronic",
    "acoustic-mixed",
    "electronic-mixed",
  ] as const,
  ensembleSize: ["all", "small", "medium", "large", "variable"] as const,
  durationClass: ["all", "short", "medium", "long", "unknown"] as const,
  difficulty: ["all", "beginner", "intermediate", "advanced"] as const,
  completion: ["all", "completed", "not-completed"] as const,
};

/** 7.3 목록 정렬 옵션 */
export const AUDIO_TEST_SORT_OPTIONS = [
  { value: "recommended", label: "입문 추천순" },
  { value: "quick-test", label: "빠른 테스트순" },
  { value: "title", label: "곡명순" },
  { value: "artist", label: "아티스트순" },
  { value: "duration", label: "짧은 곡부터" },
  { value: "recent", label: "최근 추가순" },
] as const;

/**
 * 카드 UI 참고:
 * favorite/completed는 사용자 상태 저장소에서 track.id 기준으로 결합한다.
 * durationSeconds가 null인 곡은 검수 전까지 '재생 시간 미확인'으로 표시한다.
 */
export const toTrackCard = (track: AudioTestTrack) => ({
  id: track.id,
  title: track.title,
  artist: track.artist,
  album: track.album,
  originLabel: track.isKorean ? "한국 곡" : track.country,
  primaryCategory: track.primaryCategory,
  secondaryCategories: track.secondaryCategories,
  difficulty: track.difficulty,
  oneLineReason: track.oneLineReason,
  estimatedTestTime: track.estimatedTestTime,
  favorite: track.favoriteDefault,
  completed: track.completedDefault,
  externalServices: track.externalServices,
});

/**
 * 공개 전 필수 검수:
 * - durationSeconds 입력
 * - 공식 음원/영상 직접 링크 확정
 * - 앨범 및 발매 정보 공식 출처 확인
 * - 선택한 음원 버전별 타임라인 초 단위 입력
 * - 실제로 존재하지 않는 nextTrackIds/comparisonTrackIds는 추가 데이터와 연결하거나 제거
 */
```

---

# 부록 B — YouTube 오디오 테스트 곡 링크 및 검수 가이드

> 파일명: `youtube_audio_test.MD`  
> 대상 데이터: `audio_test_tracks.ts` 수록 20곡  
> 정리 기준일: 2026-10-04  
> 목적: 오디오 테스트 웹앱에 사용할 YouTube 후보 링크와 검수 상태 정리

---

## 사용 전 주의사항

- 직접 링크는 가능한 경우 공식 아티스트·음반사·유통사 채널을 우선했다.
- 일부 곡은 공식 업로드 또는 정확한 권리 채널을 확정하기 어려워 **YouTube 검색 링크만 제공**한다.
- 검색 링크는 직접 트랙 링크가 아니므로 웹앱의 `youtubeVideoId`에 넣지 않는다.
- `공식 채널 재확인 필요` 항목은 영상 페이지에서 채널명, 설명란의 권리 표기와 앨범 버전을 확인한다.
- 뮤직비디오, 공식 오디오, 라이브, 리마스터는 시작 시간과 믹스가 다를 수 있다.
- 실제 감상 타임라인은 최종 채택 영상 하나를 확정한 뒤 작성한다.
- 지역 제한, 연령 제한, 비공개 전환과 임베드 차단 여부는 배포 직전에 다시 확인한다.
- YouTube 영상이나 음원을 다운로드·재배포하지 않고 공식 임베드 또는 외부 링크만 사용한다.

---

## 링크 요약

| 번호 | 곡 | 아티스트 | 상태 | 링크 |
|---:|---|---|---|---|
| 1 | Hotel California | Eagles | 대체 공식 영상 | [직접 영상](https://www.youtube.com/watch?v=09839DpTctU) · [YouTube 검색](https://www.youtube.com/results?search_query=Eagles+Hotel+California+official) |
| 2 | Billie Jean | Michael Jackson | 공식 링크 확인 | [직접 영상](https://www.youtube.com/watch?v=Zi_XLOBDo_Y) · [YouTube 검색](https://www.youtube.com/results?search_query=Michael+Jackson+Billie+Jean+official) |
| 3 | Don't Know Why | Norah Jones | 공식 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=tO4dxvguQDk) · [YouTube 검색](https://www.youtube.com/results?search_query=Norah+Jones+Don%27t+Know+Why+official) |
| 4 | Giorgio by Moroder | Daft Punk | 공식 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=zhl-Cs1-sG4) · [YouTube 검색](https://www.youtube.com/results?search_query=Daft+Punk+Giorgio+by+Moroder+official) |
| 5 | Keith Don't Go | Nils Lofgren | 검색 링크 제공 | [YouTube 검색](https://www.youtube.com/results?search_query=Nils+Lofgren+Keith+Don%27t+Go+official) |
| 6 | Take Five | The Dave Brubeck Quartet | 권리 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=vmDDOFXSgAs) · [YouTube 검색](https://www.youtube.com/results?search_query=The+Dave+Brubeck+Quartet+Take+Five+official) |
| 7 | Royals | Lorde | 공식 링크 확인 | [직접 영상](https://www.youtube.com/watch?v=nlcIKh6sBtc) · [YouTube 검색](https://www.youtube.com/results?search_query=Lorde+Royals+official) |
| 8 | No Sanctuary Here | Chris Jones | 검색 링크 제공 | [YouTube 검색](https://www.youtube.com/results?search_query=Chris+Jones+No+Sanctuary+Here+official) |
| 9 | Dreams | Fleetwood Mac | 공식 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=mrZRURcb1cM) · [YouTube 검색](https://www.youtube.com/results?search_query=Fleetwood+Mac+Dreams+official) |
| 10 | Mountains | Hans Zimmer | 권리 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=o_Ay_iDRAbc) · [YouTube 검색](https://www.youtube.com/results?search_query=Hans+Zimmer+Mountains+official) |
| 11 | 야생화 | 박효신 | 공식 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=OxgiiyLp5pk) · [YouTube 검색](https://www.youtube.com/results?search_query=%EB%B0%95%ED%9A%A8%EC%8B%A0+%EC%95%BC%EC%83%9D%ED%99%94+official) |
| 12 | 좋은 날 | 아이유 | 공식 링크 확인 | [직접 영상](https://www.youtube.com/watch?v=jeqdYqsrsA0) · [YouTube 검색](https://www.youtube.com/results?search_query=%EC%95%84%EC%9D%B4%EC%9C%A0+%EC%A2%8B%EC%9D%80+%EB%82%A0+official) |
| 13 | Ditto | NewJeans | 공식 링크 확인 | [직접 영상](https://www.youtube.com/watch?v=pSUydWEqKwE) · [YouTube 검색](https://www.youtube.com/results?search_query=NewJeans+Ditto+official) |
| 14 | INVU | 태연 | 공식 링크 확인 | [직접 영상](https://www.youtube.com/watch?v=AbZH7XWDW_k) · [YouTube 검색](https://www.youtube.com/results?search_query=%ED%83%9C%EC%97%B0+INVU+official) |
| 15 | TOMBOY | (여자)아이들 | 공식 링크 확인 | [직접 영상](https://www.youtube.com/watch?v=Jh4QFaPmdss) · [YouTube 검색](https://www.youtube.com/results?search_query=%28%EC%97%AC%EC%9E%90%29%EC%95%84%EC%9D%B4%EB%93%A4+TOMBOY+official) |
| 16 | 사건의 지평선 | 윤하 | 공식 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=BBdC1rl5sKY) · [YouTube 검색](https://www.youtube.com/results?search_query=%EC%9C%A4%ED%95%98+%EC%82%AC%EA%B1%B4%EC%9D%98+%EC%A7%80%ED%8F%89%EC%84%A0+official) |
| 17 | 첫눈처럼 너에게 가겠다 | 에일리 | 검색 링크 제공 | [YouTube 검색](https://www.youtube.com/results?search_query=%EC%97%90%EC%9D%BC%EB%A6%AC+%EC%B2%AB%EB%88%88%EC%B2%98%EB%9F%BC+%EB%84%88%EC%97%90%EA%B2%8C+%EA%B0%80%EA%B2%A0%EB%8B%A4+official) |
| 18 | 그대 내 품에 | 유재하 | 검색 링크 제공 | [YouTube 검색](https://www.youtube.com/results?search_query=%EC%9C%A0%EC%9E%AC%ED%95%98+%EA%B7%B8%EB%8C%80+%EB%82%B4+%ED%92%88%EC%97%90+official) |
| 19 | 범 내려온다 | 이날치 | 공식 채널 재확인 필요 | [직접 영상](https://www.youtube.com/watch?v=SmTRaSg2fTQ) · [YouTube 검색](https://www.youtube.com/results?search_query=%EC%9D%B4%EB%82%A0%EC%B9%98+%EB%B2%94+%EB%82%B4%EB%A0%A4%EC%98%A8%EB%8B%A4+official) |
| 20 | 아리랑 | 송소희 | 곡·버전 선정 필요 | [YouTube 검색](https://www.youtube.com/results?search_query=%EC%86%A1%EC%86%8C%ED%9D%AC+%EC%95%84%EB%A6%AC%EB%9E%91+official) |

---

## 곡별 상세

### 1. Eagles — Hotel California

- **권장 버전:** Hell Freezes Over 버전 권장
- **검수 상태:** 대체 공식 영상
- **직접 영상:** [Eagles 공식 채널의 1977 라이브 영상](https://www.youtube.com/watch?v=09839DpTctU)
- **검색 링크:** [YouTube에서 `Eagles Hotel California` 검색](https://www.youtube.com/results?search_query=Eagles+Hotel+California+official)
- **검수 메모:** 오디오 테스트 데이터가 권장한 Hell Freezes Over 버전과는 다른 공식 라이브다. Hell Freezes Over 공식 업로드를 찾지 못하면 검색 링크에서 권리 보유자 제공 영상을 추가 검수한다.

### 2. Michael Jackson — Billie Jean

- **권장 버전:** 공식 뮤직비디오
- **검수 상태:** 공식 링크 확인
- **직접 영상:** [Michael Jackson 공식 뮤직비디오](https://www.youtube.com/watch?v=Zi_XLOBDo_Y)
- **검색 링크:** [YouTube에서 `Michael Jackson Billie Jean` 검색](https://www.youtube.com/results?search_query=Michael+Jackson+Billie+Jean+official)
- **검수 메모:** 공식 채널 영상. 목록에 사용할 때 임베드 가능 여부를 별도로 확인한다.

### 3. Norah Jones — Don't Know Why

- **권장 버전:** Come Away with Me 정규 음원 또는 공식 영상
- **검수 상태:** 공식 채널 재확인 필요
- **직접 영상:** [Norah Jones 공식 영상 후보](https://www.youtube.com/watch?v=tO4dxvguQDk)
- **검색 링크:** [YouTube에서 `Norah Jones Don't Know Why` 검색](https://www.youtube.com/results?search_query=Norah+Jones+Don%27t+Know+Why+official)
- **검수 메모:** 영상 제목, 채널 소유자와 지역별 재생 가능 여부를 최종 적용 전에 확인한다.

### 4. Daft Punk — Giorgio by Moroder

- **권장 버전:** Random Access Memories 공식 오디오
- **검수 상태:** 공식 채널 재확인 필요
- **직접 영상:** [Daft Punk 공식 오디오 후보](https://www.youtube.com/watch?v=zhl-Cs1-sG4)
- **검색 링크:** [YouTube에서 `Daft Punk Giorgio by Moroder` 검색](https://www.youtube.com/results?search_query=Daft+Punk+Giorgio+by+Moroder+official)
- **검수 메모:** 앨범 버전과 전체 재생 시간을 확인한 뒤 타임라인을 작성한다.

### 5. Nils Lofgren — Keith Don't Go

- **권장 버전:** Acoustic Live 버전 권장
- **검수 상태:** 검색 링크 제공
- **검색 링크:** [YouTube에서 `Nils Lofgren Keith Don't Go` 검색](https://www.youtube.com/results?search_query=Nils+Lofgren+Keith+Don%27t+Go+official)
- **검수 메모:** 비공식 재업로드가 많다. Nils Lofgren 또는 음반 권리 보유자가 제공한 Acoustic Live 버전을 우선 검수한다.

### 6. The Dave Brubeck Quartet — Take Five

- **권장 버전:** Time Out 수록 버전
- **검수 상태:** 권리 채널 재확인 필요
- **직접 영상:** [Take Five 공식 또는 라이선스 음원 후보](https://www.youtube.com/watch?v=vmDDOFXSgAs)
- **검색 링크:** [YouTube에서 `The Dave Brubeck Quartet Take Five` 검색](https://www.youtube.com/results?search_query=The+Dave+Brubeck+Quartet+Take+Five+official)
- **검수 메모:** Dave Brubeck 또는 Sony/Columbia 계열 권리 보유 채널인지 확인한다.

### 7. Lorde — Royals

- **권장 버전:** 공식 뮤직비디오
- **검수 상태:** 공식 링크 확인
- **직접 영상:** [Lorde 공식 뮤직비디오](https://www.youtube.com/watch?v=nlcIKh6sBtc)
- **검색 링크:** [YouTube에서 `Lorde Royals` 검색](https://www.youtube.com/results?search_query=Lorde+Royals+official)
- **검수 메모:** 뮤직비디오와 앨범 음원은 시작·종료 시간이 다를 수 있으므로 타임라인 기준 버전을 고정한다.

### 8. Chris Jones — No Sanctuary Here

- **권장 버전:** Roadhouses & Automobiles 수록 버전
- **검수 상태:** 검색 링크 제공
- **검색 링크:** [YouTube에서 `Chris Jones No Sanctuary Here` 검색](https://www.youtube.com/results?search_query=Chris+Jones+No+Sanctuary+Here+official)
- **검수 메모:** Stockfisch Records 등 음반 권리 보유자가 제공한 버전을 우선 검수한다.

### 9. Fleetwood Mac — Dreams

- **권장 버전:** Rumours 수록 버전
- **검수 상태:** 공식 채널 재확인 필요
- **직접 영상:** [Fleetwood Mac 공식 오디오 후보](https://www.youtube.com/watch?v=mrZRURcb1cM)
- **검색 링크:** [YouTube에서 `Fleetwood Mac Dreams` 검색](https://www.youtube.com/results?search_query=Fleetwood+Mac+Dreams+official)
- **검수 메모:** 원본·리마스터·라이브 버전을 혼동하지 않도록 앨범 표기를 확인한다.

### 10. Hans Zimmer — Mountains

- **권장 버전:** Interstellar OST 수록 버전
- **검수 상태:** 권리 채널 재확인 필요
- **직접 영상:** [Interstellar OST 공식 음원 후보](https://www.youtube.com/watch?v=o_Ay_iDRAbc)
- **검색 링크:** [YouTube에서 `Hans Zimmer Mountains` 검색](https://www.youtube.com/results?search_query=Hans+Zimmer+Mountains+official)
- **검수 메모:** WaterTower Music 또는 권리 보유 레이블의 공식 업로드인지 확인한다.

### 11. 박효신 — 야생화

- **권장 버전:** 공식 뮤직비디오 또는 공식 오디오
- **검수 상태:** 공식 채널 재확인 필요
- **직접 영상:** [박효신 야생화 공식 영상 후보](https://www.youtube.com/watch?v=OxgiiyLp5pk)
- **검색 링크:** [YouTube에서 `박효신 야생화` 검색](https://www.youtube.com/results?search_query=%EB%B0%95%ED%9A%A8%EC%8B%A0+%EC%95%BC%EC%83%9D%ED%99%94+official)
- **검수 메모:** 소속사·유통사 공식 채널과 음원 버전을 확인한다.

### 12. 아이유 — 좋은 날

- **권장 버전:** 공식 뮤직비디오
- **검수 상태:** 공식 링크 확인
- **직접 영상:** [1theK 공식 뮤직비디오](https://www.youtube.com/watch?v=jeqdYqsrsA0)
- **검색 링크:** [YouTube에서 `아이유 좋은 날` 검색](https://www.youtube.com/results?search_query=%EC%95%84%EC%9D%B4%EC%9C%A0+%EC%A2%8B%EC%9D%80+%EB%82%A0+official)
- **검수 메모:** 공식 유통 채널 영상. 앨범 음원과 뮤직비디오의 시작 시간을 구분한다.

### 13. NewJeans — Ditto

- **권장 버전:** Official MV side A 또는 공식 오디오
- **검수 상태:** 공식 링크 확인
- **직접 영상:** [HYBE LABELS 공식 MV side A](https://www.youtube.com/watch?v=pSUydWEqKwE)
- **검색 링크:** [YouTube에서 `NewJeans Ditto` 검색](https://www.youtube.com/results?search_query=NewJeans+Ditto+official)
- **검수 메모:** side A·side B·퍼포먼스·공식 오디오 중 하나를 타임라인 기준으로 고정한다.

### 14. 태연 — INVU

- **권장 버전:** 공식 뮤직비디오
- **검수 상태:** 공식 링크 확인
- **직접 영상:** [SMTOWN 공식 뮤직비디오](https://www.youtube.com/watch?v=AbZH7XWDW_k)
- **검색 링크:** [YouTube에서 `태연 INVU` 검색](https://www.youtube.com/results?search_query=%ED%83%9C%EC%97%B0+INVU+official)
- **검수 메모:** 뮤직비디오 도입부가 앨범 음원과 같은지 확인한 뒤 타임라인을 작성한다.

### 15. (여자)아이들 — TOMBOY

- **권장 버전:** 공식 뮤직비디오
- **검수 상태:** 공식 링크 확인
- **직접 영상:** [(여자)아이들 공식 뮤직비디오](https://www.youtube.com/watch?v=Jh4QFaPmdss)
- **검색 링크:** [YouTube에서 `(여자)아이들 TOMBOY` 검색](https://www.youtube.com/results?search_query=%28%EC%97%AC%EC%9E%90%29%EC%95%84%EC%9D%B4%EB%93%A4+TOMBOY+official)
- **검수 메모:** 뮤직비디오 버전과 앨범 버전의 효과음·도입부 차이를 확인한다.

### 16. 윤하 — 사건의 지평선

- **권장 버전:** 공식 뮤직비디오 또는 공식 라이브
- **검수 상태:** 공식 채널 재확인 필요
- **직접 영상:** [윤하 사건의 지평선 공식 영상 후보](https://www.youtube.com/watch?v=BBdC1rl5sKY)
- **검색 링크:** [YouTube에서 `윤하 사건의 지평선` 검색](https://www.youtube.com/results?search_query=%EC%9C%A4%ED%95%98+%EC%82%AC%EA%B1%B4%EC%9D%98+%EC%A7%80%ED%8F%89%EC%84%A0+official)
- **검수 메모:** 스튜디오 음원과 라이브 영상을 구분한다. 오디오 테스트에는 정규 앨범 음원을 우선한다.

### 17. 에일리 — 첫눈처럼 너에게 가겠다

- **권장 버전:** 도깨비 OST 공식 오디오
- **검수 상태:** 검색 링크 제공
- **검색 링크:** [YouTube에서 `에일리 첫눈처럼 너에게 가겠다` 검색](https://www.youtube.com/results?search_query=%EC%97%90%EC%9D%BC%EB%A6%AC+%EC%B2%AB%EB%88%88%EC%B2%98%EB%9F%BC+%EB%84%88%EC%97%90%EA%B2%8C+%EA%B0%80%EA%B2%A0%EB%8B%A4+official)
- **검수 메모:** Stone Music Entertainment, CJ ENM 또는 OST 권리 보유 채널의 공식 오디오를 우선 검수한다.

### 18. 유재하 — 그대 내 품에

- **권장 버전:** 사랑하기 때문에 수록 버전
- **검수 상태:** 검색 링크 제공
- **검색 링크:** [YouTube에서 `유재하 그대 내 품에` 검색](https://www.youtube.com/results?search_query=%EC%9C%A0%EC%9E%AC%ED%95%98+%EA%B7%B8%EB%8C%80+%EB%82%B4+%ED%92%88%EC%97%90+official)
- **검수 메모:** 공식 유통사의 앨범 음원 또는 Topic 채널을 우선한다. 리마스터 여부를 기록한다.

### 19. 이날치 — 범 내려온다

- **권장 버전:** 공식 뮤직비디오 또는 공식 라이브
- **검수 상태:** 공식 채널 재확인 필요
- **직접 영상:** [이날치 공식 영상 후보](https://www.youtube.com/watch?v=SmTRaSg2fTQ)
- **검색 링크:** [YouTube에서 `이날치 범 내려온다` 검색](https://www.youtube.com/results?search_query=%EC%9D%B4%EB%82%A0%EC%B9%98+%EB%B2%94+%EB%82%B4%EB%A0%A4%EC%98%A8%EB%8B%A4+official)
- **검수 메모:** 공식 뮤직비디오와 라이브 버전의 편곡·재생 시간이 다를 수 있다.

### 20. 송소희 — 아리랑

- **권장 버전:** 최종 수록 버전 미확정
- **검수 상태:** 곡·버전 선정 필요
- **검색 링크:** [YouTube에서 `송소희 아리랑` 검색](https://www.youtube.com/results?search_query=%EC%86%A1%EC%86%8C%ED%9D%AC+%EC%95%84%EB%A6%AC%EB%9E%91+official)
- **검수 메모:** 동일 제목의 공연 영상이 많다. 정확한 곡명, 공연·앨범, 편곡자와 공식 제공 채널을 먼저 확정해야 한다.

---

## 개발 데이터 적용 예시

직접 영상이 최종 검수된 경우에만 ID를 저장한다.

```ts
export type YouTubeCandidate = {
  trackId: string;
  youtubeVideoId: string | null;
  url: string | null;
  searchUrl: string;
  version: string;
  verificationStatus:
    | "VERIFIED_OFFICIAL"
    | "RECHECK_CHANNEL"
    | "SEARCH_ONLY"
    | "SELECT_VERSION";
  isEmbeddable: boolean | null;
  lastVerifiedAt: string;
  note: string;
};
```

### 상태 변환 권장

| 문서 상태 | 코드 상태 |
|---|---|
| 공식 링크 확인 | `VERIFIED_OFFICIAL` |
| 공식 채널 재확인 필요 / 권리 채널 재확인 필요 | `RECHECK_CHANNEL` |
| 검색 링크 제공 | `SEARCH_ONLY` |
| 곡·버전 선정 필요 | `SELECT_VERSION` |

### 영상 ID 추출 예시

```ts
const getYouTubeVideoId = (url: string) => new URL(url).searchParams.get("v");
```

---

## 최종 검수 체크리스트

- [ ] 영상 제목에 곡명과 아티스트가 정확히 표시되는가?
- [ ] 아티스트·음반사·유통사·권리 보유자의 공식 채널인가?
- [ ] `audio_test_tracks.ts`에 명시한 앨범 또는 권장 버전과 일치하는가?
- [ ] 영상이 현재 공개 상태인가?
- [ ] 로그인 없이 재생 가능한가?
- [ ] 외부 사이트 iframe 임베드가 허용되는가?
- [ ] 지역 제한 여부를 확인했는가?
- [ ] 영상 시작 전 대화·광고성 인트로·효과음이 있는가?
- [ ] 최종 영상 길이를 `durationSeconds`에 기록했는가?
- [ ] 최종 영상 기준으로 감상 타임라인을 다시 작성했는가?
- [ ] 대체 영상 또는 검색 fallback을 준비했는가?

---

## 우선 검수가 필요한 곡

다음 곡은 검색 결과가 많거나 권장 버전이 명확하지 않아 우선 검수가 필요하다.

1. Eagles — Hotel California: Hell Freezes Over 공식 버전
2. Nils Lofgren — Keith Don't Go: Acoustic Live 공식·권리 보유 버전
3. Chris Jones — No Sanctuary Here: Stockfisch Records 계열 공식 버전
4. 에일리 — 첫눈처럼 너에게 가겠다: 도깨비 OST 공식 오디오
5. 유재하 — 그대 내 품에: 공식 유통 앨범 버전 및 리마스터 구분
6. 송소희 — 아리랑: 정확한 곡·공연·앨범 버전 자체를 먼저 확정

---

# 부록 C — Z.ai Coding Plan 최종 완료 체크리스트

## 데이터

- [ ] `src/data/audioTestTracks.ts`가 부록 A와 동일하다.
- [ ] `AUDIO_TEST_TRACKS.length`가 20이다.
- [ ] 모든 곡 ID가 중복 없이 고유하다.
- [ ] 한국 곡 10개가 `isKorean === true`로 표시된다.
- [ ] 존재하지 않는 추천 ID는 UI에서 안전하게 제외된다.
- [ ] 사용자 상태가 정적 곡 데이터와 분리된다.

## 목록과 필터

- [ ] 테스트 항목 필터가 작동한다.
- [ ] 한국·해외 필터가 작동한다.
- [ ] 장르와 보컬 유형 필터가 작동한다.
- [ ] 어쿠스틱·전자음 필터가 작동한다.
- [ ] 편성 규모, 재생 시간과 난이도 필터가 작동한다.
- [ ] 감상 완료 필터가 작동한다.
- [ ] 모든 정렬 옵션이 작동한다.
- [ ] 필터와 정렬 상태가 URL query parameter에 유지된다.

## 곡 상세

- [ ] 곡명, 아티스트, 앨범과 발매 정보가 표시된다.
- [ ] 주요·보조 테스트 항목이 표시된다.
- [ ] 선정 이유와 상세 설명이 표시된다.
- [ ] 집중해서 들을 요소가 표시된다.
- [ ] 좋은 재생의 예와 주의 현상이 표시된다.
- [ ] 기기별 평가와 자유 메모를 입력할 수 있다.
- [ ] 다음 추천곡과 비교곡을 표시한다.
- [ ] 미검수 타임라인에서도 화면 오류가 발생하지 않는다.

## YouTube

- [ ] 검색 URL을 `youtubeVideoId`로 사용하지 않는다.
- [ ] 직접 영상 후보의 채널과 권리를 재확인한다.
- [ ] 권장 앨범·라이브·리마스터 버전을 구분한다.
- [ ] iframe 임베드 가능 여부를 확인한다.
- [ ] 지역 제한과 공개 상태를 확인한다.
- [ ] 영상 오류 fallback을 제공한다.
- [ ] 대체 영상 또는 YouTube 검색 링크를 제공한다.
- [ ] 최종 영상 기준으로 재생 시간과 타임라인을 검수한다.

## 평가와 비교

- [ ] 동일 곡·동일 버전으로 기기 A/B를 비교한다.
- [ ] 동일 음량의 중요성을 안내한다.
- [ ] 종합 점수보다 항목별 평가를 우선한다.
- [ ] 더 크게 들리는 기기를 더 좋은 기기로 자동 판정하지 않는다.
- [ ] 기기, 연결, 코덱, EQ, 공간 음향과 정규화 상태를 기록한다.
- [ ] 평가와 메모가 localStorage에 저장된다.
- [ ] 손상된 저장 데이터가 안전하게 복구된다.

## 안전과 접근성

- [ ] 큰 음량을 테스트 조건으로 권장하지 않는다.
- [ ] 통증·먹먹함·이명 발생 시 중단 안내를 제공한다.
- [ ] 키보드만으로 주요 기능을 조작할 수 있다.
- [ ] focus ring을 유지한다.
- [ ] 색상 외의 상태 표현을 제공한다.
- [ ] 차트 정보를 표와 텍스트로도 제공한다.
- [ ] `prefers-reduced-motion`을 지원한다.
- [ ] 모바일 터치 타깃이 충분히 크다.

## 최종 품질

- [ ] lint가 성공한다.
- [ ] typecheck가 성공한다.
- [ ] production build가 성공한다.
- [ ] Chrome, Safari, Firefox와 Edge에서 확인한다.
- [ ] iOS Safari와 Android Chrome에서 확인한다.
- [ ] README에 설치·실행·콘텐츠 추가·영상 검수 방법을 작성한다.
