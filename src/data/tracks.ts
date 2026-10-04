import type { Track } from "@/types";

/**
 * 곡 데이터
 *
 * ⚠️ TODO_VERIFY_VIDEO_ID: YouTube 영상 ID와 타임라인 초 단위는
 * 실제 채택한 영상 기준으로 검수 후 확정해야 합니다.
 * scripts/verify-videos.mjs (npm run verify-videos)로 oEmbed 존재 여부를 확인할 수 있습니다.
 *
 * 영상 ID는 librarian 조사 + oEmbed 검증을 거친 값 (lastVerifiedAt: 2026-10-04).
 * 각 영상의 길이(durationSeconds)는 2026-10-04 YouTube IFrame API getDuration() 실측으로 검증했다.
 * 타임라인 "구간 위치"(초 단위)는 초안값이다 — 실제 청취 검수가 필요하다 (각 timeline 위 TODO 주석 참고).
 */
export const tracks: Track[] = [
  {
    id: "take-five",
    slug: "take-five",
    title: "Take Five",
    titleKo: "테이크 파이브",
    artistIds: ["dave-brubeck", "paul-desmond"],
    primaryArtistName: "The Dave Brubeck Quartet",

    composerNames: ["Paul Desmond"],
    albumTitle: "Time Out",
    recordingYear: 1959,
    releaseYear: 1959,

    eraId: "1950s",
    styleIds: ["cool-jazz"],
    moodIds: ["cafe", "drive", "morning"],
    instrumentIds: ["alto-sax", "piano", "drums", "bass"],

    durationSeconds: 325,
    hasVocals: false,
    difficulty: "very-easy",

    shortDescription: "익숙한 멜로디와 독특한 5박자 리듬 덕분에 재즈를 처음 듣는 사람도 쉽게 기억할 수 있는 곡이다.",
    introduction:
      "대부분의 대중음악이 4박자를 사용하는 것과 달리 이 곡은 다섯 박이 한 묶음으로 움직인다. 하지만 복잡하게 계산하며 들을 필요는 없다. 반복되는 피아노 리듬과 색소폰 멜로디를 따라가다 보면 자연스럽게 독특한 박자를 느낄 수 있다.",
    historicalContext:
      "1959년, 데이브 브루벡 콰르텟은 미국 정부의 문화 사절단 프로그램을 통해 유라시아를 순회 공연했다. 폴 데즈먼드는 투어에서 들은 발칸 지역의 민속 리듬에서 영감을 받아 이 곡을 작곡했다. 같은 해 발매된 앨범 Time Out은 5박·9박자 곡들을 담은 실험적 작품이었지만, 예상을 뛰어넘는 성공을 거두며 재즈 사상 가장 잘 팔린 앨범 중 하나가 되었다. 'Take Five'라는 제목은 5박자라는 뜻과 '5분간 쉬어 가자'는 말장난을 함께 담고 있다.",
    whyItMatters:
      "재즈가 어렵고 낯설다는 인상을 깨는 데 이만한 곡이 없다. 다섯 박이라는 조금 특별한 리듬 덕분에 '재즈는 자유분방하다'는 느낌을 주면서도, 멜로디는 너무나 단순하고 친절해서 한 번 들면 따라 부르게 된다. 백만 장 이상 판매된 싱글로, 재즈 입문 큐레이션에서 거의 빠지지 않는 첫 번째 곡이다.",
    listeningPoints: [
      { title: "피아노의 반복 리듬", description: "피아노가 같은 짧은 리듬을 계속 반복하며 곡의 바닥을 만든다. 이 리듬이 5박자의 길을 잡아 준다." },
      { title: "담백한 알토 색소폰", description: "폴 데즈먼드의 색소폰은 부드럽고 건조하다. 과장 없이 멜로디를 노래하는 방식이 쿨 재즈의 미학이다." },
      { title: "드럼 솔로 속의 박자", description: "드럼 솔로 구간에서도 5박자의 뼈대가 흔들리지 않는다. 복잡해 보여도 계속 같은 리듬이 돌고 있다." },
      { title: "멜로디의 귀환", description: "솔로가 끝나고 처음 멜로디로 돌아오는 순간이 이 곡의 가장 만족스러운 지점이다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "피아노가 5박자 리듬 패턴을 제시하며 곡의 바닥을 깐다.", instrumentIds: ["piano", "drums"] },
      { seconds: 20, label: "주제(헤드)", description: "알토 색소폰이 익숙한 주제 멜로디를 연주한다.", instrumentIds: ["alto-sax"] },
      { seconds: 96, label: "색소폰 솔로", description: "주제를 확장한 폴 데즈먼드의 솔로가 시작된다.", instrumentIds: ["alto-sax"] },
      { seconds: 183, label: "드럼 솔로", description: "드럼 솔로가 등장하지만 5박자 뼈대는 그대로 유지된다.", instrumentIds: ["drums"] },
      { seconds: 258, label: "주제로 귀환", description: "다시 색소폰의 주제 멜로디로 돌아와 곡을 닫는다.", instrumentIds: ["alto-sax", "piano"] },
    ],
    glossaryTermIds: ["head", "swing", "solo"],

    video: {
      youtubeVideoId: "ryA6eHZNnXY",
      title: "Take Five",
      channelName: "Dave Brubeck Quartet - Topic (Columbia/Legacy)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["so-what", "blue-in-green", "take-the-a-train"],
    nextTrackId: "so-what",

    featured: true,
    mustListenRank: 1,
    editorialTags: ["입문 필수 10곡", "5곡으로 시작하기"],

    sources: [
      {
        title: "Time Out — 앨범 라이너 정보",
        publisher: "Columbia/Legacy Recordings",
        url: "https://www.legacyrecordings.com/",
        accessedAt: "2026-10-04",
        note: "녹음·발매 연도 및 크레딧 검수 보강 필요",
      },
      {
        title: "Dave Brubeck 공식 웹사이트",
        publisher: "Brubeck Estate",
        url: "https://www.davebrubeck.com/",
        accessedAt: "2026-10-04",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "so-what",
    slug: "so-what",
    title: "So What",
    titleKo: "소 왓",
    artistIds: ["miles-davis", "john-coltrane", "bill-evans"],
    primaryArtistName: "Miles Davis",

    composerNames: ["Miles Davis"],
    albumTitle: "Kind of Blue",
    recordingYear: 1959,
    releaseYear: 1959,

    eraId: "1950s",
    styleIds: ["modal-jazz", "cool-jazz"],
    moodIds: ["late-night", "focus", "rainy-day"],
    instrumentIds: ["trumpet", "tenor-sax", "alto-sax", "piano", "bass", "drums"],

    durationSeconds: 564,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "많은 음을 빠르게 연주하기보다 여백, 음색, 분위기가 얼마나 강한 인상을 만들 수 있는지 보여주는 모달 재즈의 대표곡이다.",
    introduction:
      "복잡한 코드가 빠르게 바뀌는 비밥과 달리 이 곡은 비교적 제한된 화음 공간 안에서 연주자들이 멜로디를 만들어 간다. 초보자는 이론보다 각 연주자의 소리와 문장 길이가 어떻게 다른지 비교해 들으면 된다.",
    historicalContext:
      "1959년 3월 뉴욕의 컬럼비아 30번가 스튜디오에서 단 하루 만에 녹음되었다. 피아니스트 빌 에번스의 화음 접근법에서 영감을 받은 마일스 데이비스가 밴드에 단 몇 장의 스케치만 들려 주고 나머지는 녹음 순간의 즉흥에 맡겼다는 일화가 유명하다. Kind of Blue는 모달 재즈라는 방식을 대중 앞에 내놓은 앨범으로, 오늘날까지 역사상 가장 널리 팔린 재즈 앨범으로 남아 있다.",
    whyItMatters:
      "'적게 연주하지만 많이 말한다'는 재즈 미학의 기준점이다. 코드가 거의 변하지 않는 좁은 화로 위에서 존 콜트레인, 캐넌볼 애더리, 마일스가 서로 다른 언어로 노래하는 과정은, 같은 곡이 사람마다 다르게 들리는 재즈의 본질을 가장 압축적으로 보여 준다. 이후 등장하는 모달 재즈와 프리 재즈를 이해하는 문이기도 하다.",
    listeningPoints: [
      { title: "신비로운 인트로", description: "피아노와 베이스가 조용히 대화하듯 곡을 연다. 서스펜스 영화의 한 장면 같은 분위기다." },
      { title: "질문과 대답", description: "베이스가 질문을 던지면 관악기들이 한 목소리로 대답하는 주제 구간이 이 곡의 상징이다." },
      { title: "마일스의 여백", description: "마일스의 트럼펫은 음이 적다. 쉼표까지 포함해 연주한다는 것이 무슨 뜻인지 들어 보자." },
      { title: "콜트레인의 밀도", description: "마일스 다음 솔로의 존 콜트레인은 반대로 촘촘하게 음을 쏟아낸다. 같은 무대 위 두 가지 말투의 대비가 백미다." },
      { title: "연주자별 표현", description: "같은 화음 배경 위에서 색소폰·피아노가 차례로 솔로를 이어가며, 사람마다 문장이 어떻게 다른지 비교할 수 있다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "피아노와 베이스, 드럼이 조용히 분위기를 만든다.", instrumentIds: ["piano", "bass", "drums"] },
      { seconds: 90, label: "주제(헤드)", description: "베이스 질문에 관악기가 대답하는 주제가 등장한다.", instrumentIds: ["trumpet", "alto-sax", "tenor-sax"] },
      { seconds: 205, label: "트럼펫 솔로", description: "마일스 데이비스가 여백 많은 솔로로 곡의 정서를 연다.", instrumentIds: ["trumpet"] },
      { seconds: 320, label: "테너 색소폰 솔로", description: "존 콜트레인이 밀도 높은 솔로로 이어받는다.", instrumentIds: ["tenor-sax"] },
      { seconds: 430, label: "알토 색소폰 솔로", description: "캐넌볼 애더리의 알토 색소폰 솔로가 이어진다.", instrumentIds: ["alto-sax"] },
      { seconds: 500, label: "주제로 귀환", description: "다시 주제가 등장해 곡을 닫는다.", instrumentIds: ["trumpet"] },
    ],
    glossaryTermIds: ["mode", "improvisation", "comping", "head"],

    video: {
      youtubeVideoId: "ylXk1LBvIqU",
      title: "So What (Official Audio)",
      channelName: "MilesDavisVEVO",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["blue-in-green", "my-favorite-things", "take-five"],
    nextTrackId: "blue-in-green",

    featured: true,
    mustListenRank: 2,
    editorialTags: ["입문 필수 10곡", "5곡으로 시작하기"],

    sources: [
      {
        title: "Kind of Blue — 앨범 정보",
        publisher: "Columbia/Legacy Recordings",
        url: "https://www.legacyrecordings.com/",
        accessedAt: "2026-10-04",
        note: "녹음 일자 및 크레딧 검수 보강 필요",
      },
      {
        title: "Miles Davis 공식 웹사이트",
        publisher: "Miles Davis Estate",
        url: "https://www.milesdavis.com/",
        accessedAt: "2026-10-04",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "what-a-wonderful-world",
    slug: "what-a-wonderful-world",
    title: "What a Wonderful World",
    titleKo: "왓 어 원더풀 월드",
    artistIds: ["louis-armstrong"],
    primaryArtistName: "Louis Armstrong",

    composerNames: ["Bob Thiele", "George David Weiss"],
    albumTitle: "What a Wonderful World",
    recordingYear: 1967,
    releaseYear: 1968,

    eraId: "1960s",
    styleIds: ["vocal-jazz"],
    moodIds: ["warm", "morning", "relaxed-night"],
    instrumentIds: ["vocals", "piano", "drums"],

    durationSeconds: 139,
    hasVocals: true,
    difficulty: "very-easy",

    shortDescription: "전 세계가 사랑하는 노래. 루이 암스트롱의 거칠지만 따뜻한 목소리가 세상의 아름다움을 노래한다.",
    introduction:
      "초록 나무와 붉은 장미, 친구들이 손 흔드는 거리 — 세상의 아름다움을 목록처럼 노래하는 곡이다. 재즈를 한 번도 들어 본 적 없는 사람도 이 노래는 이미 알고 있을 것이다. 재즈가 낯설지 않다는 사실을 확인하는 가장 빠른 방법이 이 곡이다.",
    historicalContext:
      "1967년, 당시 60대가 넘은 루이 암스트롱을 위해 작곡가 조지 데이비드 와이스 등이 만든 노래다. 미국에서는 처음에 큰 주목을 받지 못했지만 영국에서 1위에 오르며 세계적인 히트가 되었고, 이후 영화와 광고에 수없이 쓰이며 '세상에서 가장 잘 알려진 재즈 노래'가 되었다. 그의 목소리가 나이 들어 더 깊어진 시기의 녹음이라는 점도 이 곡의 따뜻함에 큰 몫을 한다.",
    whyItMatters:
      "재즈 입문의 첫 관문은 '재즈는 어렵다'는 선입견을 지우는 일이다. 이 곡은 그 일을 가장 확실하게 해낸다. 또한 목소리가 하나의 악기처럼 리듬을 흔들고 문장을 늘였다 줄였다 하는 과정을 보여 주는데, 이것이 보컬 재즈의 핵심 미학이다.",
    listeningPoints: [
      { title: "목소리의 리듬", description: "암스트롱은 박자를 정확히 치지 않고 살짝 뒤로 늘어뜨리며 노래한다. 이 여유가 재즈 특유의 숨 쉬는 느낌을 만든다." },
      { title: "거칠지만 따뜻한 톤", description: "갈라지는 듯한 그의 음색이 오히려 진심 어린 위로처럼 들리는 이유에 주목해 보자." },
      { title: "말하듯 시작하는 엔딩", description: "노래 끝에 아이들 목소리에 대고 말하듯 덧붙이는 대사가 이 곡의 메시지를 요약한다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "조용한 현악과 피아노가 노래를 받칠 분위기를 만든다.", instrumentIds: ["piano"] },
      { seconds: 8, label: "1절", description: "\"I see trees of green…\" — 가장 익숙한 시작이다.", instrumentIds: ["vocals"] },
      { seconds: 60, label: "2절", description: "손을 흔드는 사람들 이야기로 이어지며 감정이 고조된다.", instrumentIds: ["vocals"] },
      { seconds: 110, label: "엔딩", description: "말하듯 덧붙이는 마지막 대사로 곡을 닫는다.", instrumentIds: ["vocals"] },
    ],
    glossaryTermIds: ["standard", "swing"],

    video: {
      youtubeVideoId: "rBrd_3VMC3c",
      title: "What A Wonderful World (Official Video)",
      channelName: "LouisArmstrongVEVO",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["cheek-to-cheek", "sing-sing-sing", "take-five"],
    nextTrackId: "c-jam-blues",

    featured: true,
    mustListenRank: 3,
    editorialTags: ["입문 필수 10곡", "5곡으로 시작하기"],

    sources: [
      {
        title: "Louis Armstrong 공식 웹사이트",
        publisher: "Armstrong Estate",
        url: "https://www.louisarmstronghouse.org/",
        accessedAt: "2026-10-04",
        note: "녹음 연도 및 작곡 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "cheek-to-cheek",
    slug: "cheek-to-cheek",
    title: "Cheek to Cheek",
    titleKo: "칵 투 칵",
    artistIds: ["ella-fitzgerald", "louis-armstrong"],
    primaryArtistName: "Ella Fitzgerald & Louis Armstrong",

    composerNames: ["Irving Berlin"],
    albumTitle: "Ella and Louis",
    recordingYear: 1956,
    releaseYear: 1956,

    eraId: "1950s",
    styleIds: ["vocal-jazz", "swing"],
    moodIds: ["romantic", "warm", "cafe"],
    instrumentIds: ["vocals", "trumpet", "piano", "bass", "drums"],

    durationSeconds: 352,
    hasVocals: true,
    difficulty: "very-easy",

    shortDescription: "남녀 보컬의 대화. 엘라의 맑은 목소리와 루이의 거친 목소리, 그리고 그의 트럼펫이 번갈아 사랑을 노래한다.",
    introduction:
      "\"Heaven, I'm in heaven…\" — 댄스 플로어에서 볼에 볼을 대고 춤추는 기쁨을 노래하는 곡이다. 재즈 보컬 역사상 가장 유명한 남녀 듀엣으로, 두 목소리가 서로를 받아 치는 과정 자체가 하나의 연주다.",
    historicalContext:
      "1935년 영화 『탑 햇(Top Hat)』을 위해 어빙 벌린이 쓴 노래로, 프레드 아스테어가 처음 불러 크게 알려졌다. 1956년 벌브 레코드는 재즈 보컬의 여왕 엘라 피츠제럴드와 트럼펫의 신 루이 암스트롱을 한 스튜디오에 세워 앨범 『Ella and Louis』를 만들었고, 이 곡은 그 앨범의 심장이 되었다. 두 사람은 무대 위 친구 사이였고, 그 편안함이 녹음에 그대로 남아 있다.",
    whyItMatters:
      "재즈 보컬이 '노래'를 넘어 '대화'라는 것을 가장 쉽게 보여 주는 곡이다. 엘라가 우아하게 문장을 던지면 루이가 갈라진 목소리로 화답하고, 그가 트럼펫을 들면 엘라가 휴식을 취한다. 주고받음(call and response)의 감각을 이 곡 하나로 익힐 수 있다.",
    listeningPoints: [
      { title: "두 목소리의 온도차", description: "맑고 매끈한 엘라와 거칠고 따뜻한 루이. 같은 문장이 두 사람에게서 전혀 다르게 들리는 것을 비교해 보자." },
      { title: "루이의 트럼펫", description: "노래 사이사이 루이가 트럼펫로 화답하는 구간에서 목소리와 악기가 같은 사람의 것처럼 들린다." },
      { title: "느긋한 스윙", description: "빠르게 몰아치지 않고 춤추듯 흐르는 반주. 스윙이 반드시 빠를 필요는 없다는 것을 보여 준다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "반주가 춤추는 듯한 리듬을 제시한다.", instrumentIds: ["piano", "bass", "drums"] },
      { seconds: 10, label: "엘라의 첫 문장", description: "엘라가 \"Heaven…\"으로 노래를 연다.", instrumentIds: ["vocals"] },
      { seconds: 100, label: "루이의 대답", description: "루이의 목소리가 이어받으며 두 사람의 대화가 시작된다.", instrumentIds: ["vocals"] },
      { seconds: 200, label: "트럼펫 솔로", description: "루이의 트럼펫이 가사 없이 사랑을 노래한다.", instrumentIds: ["trumpet"] },
      { seconds: 290, label: "함께 마무리", description: "두 목소리가 겹치며 곡을 닫는다.", instrumentIds: ["vocals"] },
    ],
    glossaryTermIds: ["standard", "swing", "call-and-response"],

    video: {
      youtubeVideoId: "20iOlPwz0J0",
      title: "Cheek To Cheek (Official Video)",
      channelName: "EllaFitzgeraldVEVO",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["what-a-wonderful-world", "the-girl-from-ipanema", "sing-sing-sing"],
    nextTrackId: "what-a-wonderful-world",

    featured: true,
    mustListenRank: 4,
    editorialTags: ["입문 필수 10곡", "5곡으로 시작하기"],

    sources: [
      {
        title: "Verve Records",
        publisher: "Verve",
        url: "https://www.ververecords.com/",
        accessedAt: "2026-10-04",
        note: "녹음 연도 및 원곡 정보(1935, Irving Berlin) 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "my-favorite-things",
    slug: "my-favorite-things",
    title: "My Favorite Things",
    titleKo: "마이 페이버릿 띵스",
    artistIds: ["john-coltrane"],
    primaryArtistName: "John Coltrane",

    composerNames: ["Richard Rodgers", "Oscar Hammerstein II"],
    albumTitle: "My Favorite Things",
    recordingYear: 1960,
    releaseYear: 1961,

    eraId: "1960s",
    styleIds: ["modal-jazz"],
    moodIds: ["late-night", "experimental", "focus"],
    instrumentIds: ["soprano-sax", "piano", "bass", "drums"],

    durationSeconds: 825,
    hasVocals: false,
    difficulty: "medium",

    shortDescription: "뮤지컬의 친숙한 노래가 반복과 즉흥연주로 확장되며 강렬하고 몰입감 있는 재즈로 변하는 과정을 들을 수 있다.",
    introduction:
      "뮤지컬 『사운드 오브 뮤직』의 사랑받는 노래가 13분 길이의 재즈 여정으로 변신한다. 원곡 멜로디를 이미 알고 있다면, 그 멜로디가 점점 멀리 나아갔다가 돌아오는 과정을 따라가는 것만으로 충분히 즐겁다.",
    historicalContext:
      "존 콜트레인은 1960년 자신의 밴드로 이 노래를 녹음했고, 1961년 앨범 타이틀곡으로 발표했다. 원곡은 3/4박자 왈츠인데 콜트레인은 이를 자신만의 방식으로 풀어, 코드가 끊임없이 바뀌는 대신 일정한 음계(모드) 위에서 자유롭게 노래하는 모달 재즈 접근을 보여 주었다. 이 녹음은 소프라노 색소폰이 재즈의 주인공 악기로 자리 잡는 계기가 되었다.",
    whyItMatters:
      "'익숙한 멜로디가 즉흥연주로 확장되는 과정'을 가장 극적으로 보여 주는 곡이다. 즉흥연주가 무엇인지 설명보다 귀로 이해하게 만들어 주고, 긴 연주를 구조(주제-확장-귀환)로 듣는 훈련이 된다. 재즈를 듣는 지구력을 기르고 싶다면 이 곡이 첫 단계다.",
    listeningPoints: [
      { title: "알아볼 수 있는 주제", description: "피아노가 반복하는 왈츠 리듬 위에 소프라노 색소폰이 원곡 멜로디를 연주한다. 여기서 출발점을 기억하자." },
      { title: "소프라노 색소폰의 음색", description: "테너보다 높고 직선적인 소프라노의 소리가 주는 날카롭고 맑은 인상에 집중해 보자." },
      { title: "멀어졌다 돌아오기", description: "솔로가 원곡에서 멀어져 보이는 구간이 온다. 겁먹지 말고 흐름을 느끼다 보면 주제의 그림자가 계속 보인다." },
      { title: "주제의 귀환", description: "긴 여정 끝에 처음 멜로디가 돌아왔을 때의 안도감과 만족감이 이 곡의 결승점이다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "피아노와 드럼이 왈츠 리듬의 바닥을 만든다.", instrumentIds: ["piano", "drums"] },
      { seconds: 40, label: "주제(헤드)", description: "소프라노 색소폰이 원곡 멜로디를 연주한다.", instrumentIds: ["soprano-sax"] },
      { seconds: 180, label: "콜트레인 솔로", description: "주제를 확장하며 점점 먼 곳으로 나아간다.", instrumentIds: ["soprano-sax"] },
      { seconds: 500, label: "피아노 솔로", description: "맥코이 타이너의 피아노 솔로가 이어받는다.", instrumentIds: ["piano"] },
      { seconds: 720, label: "주제로 귀환", description: "다시 알아볼 수 있는 멜로디로 돌아와 곡을 닫는다.", instrumentIds: ["soprano-sax"] },
    ],
    glossaryTermIds: ["mode", "improvisation", "head"],

    video: {
      youtubeVideoId: "sypK9CkzXM4",
      title: "My Favorite Things",
      channelName: "John Coltrane - Topic (Atlantic)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["so-what", "blue-in-green", "ko-ko"],
    nextTrackId: "waltz-for-debby",

    featured: true,
    mustListenRank: 5,
    editorialTags: ["입문 필수 10곡", "5곡으로 시작하기"],

    sources: [
      {
        title: "John Coltrane 공식 웹사이트",
        publisher: "Coltrane Estate",
        url: "https://www.johncoltrane.com/",
        accessedAt: "2026-10-04",
        note: "녹음(1960)/발매(1961) 구분 및 편성 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "blue-in-green",
    slug: "blue-in-green",
    title: "Blue in Green",
    titleKo: "블루 인 그린",
    artistIds: ["miles-davis", "bill-evans"],
    primaryArtistName: "Miles Davis",

    composerNames: ["Miles Davis", "Bill Evans"],
    albumTitle: "Kind of Blue",
    recordingYear: 1959,
    releaseYear: 1959,

    eraId: "1950s",
    styleIds: ["modal-jazz", "cool-jazz"],
    moodIds: ["melancholy", "late-night", "rainy-day"],
    instrumentIds: ["trumpet", "piano", "alto-sax", "bass", "drums"],

    durationSeconds: 339,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "느리고 서정적인 재즈의 대표곡. 뮤트를 씌운 나팔 같은 트럼펫이 고요한 슬픔을 노래한다.",
    introduction:
      "Kind of Blue 앨범에서 가장 잔잔하고 서정적인 곡이다. 10마디의 짧은 화음 진행이 계속 도는 안에서 연주자들이 아주 적은 음으로 깊은 감정을 만들어 낸다. 비 오는 날, 늦은 밤 어울리는 재즈를 찾는다면 이 곡이다.",
    historicalContext:
      "1959년 녹음된 Kind of Blue 수록곡이다. 작곡 표기는 마일스 데이비스 단독으로 되어 있지만, 피아니스트 빌 에번스가 자신이 공동 작곡했다고 밝힌 일이 있어 여러 견해가 있는 곡이기도 하다. 앨범 전체가 그러하듯 이 곡도 스케치 몇 장만을 들려 준 채 녹음 순간의 즉흥으로 완성되었다.",
    whyItMatters:
      "재즈가 '빠르고 화려한 음악'이 아니라는 것을 증명하는 곡이다. 소리를 최대한 아끼면서 감정을 최대한 담는 연주 미학, 그리고 뮤트를 씌운 트럼펫이라는 독특한 음색을 여기서 경험할 수 있다. 조용한 재즈부터 듣고 싶은 사람의 첫 곡으로 적격이다.",
    listeningPoints: [
      { title: "마일스의 뮤트 톤", description: "나팔처럼 멀리 울리는 트럼펫 소리는 마일스가 하모니 뮤트를 쓰기 때문이다. 그의 상징적인 음색이다." },
      { title: "10마디의 순환", description: "짧은 화음 진행이 계속 돌아온다는 것을 느끼며 들으면 긴 곡이 아닌 숨환하는 숨결처럼 들린다." },
      { title: "빌 에번스의 보이싱", description: "피아노가 화음을 가늘고 투명하게 얹는 방식이 곡의 물빛 감성을 만든다." },
      { title: "브러시 드럼", description: "드럼 스틱 대신 솔로 쓸어 만드는 바람 같은 소리도 들어 보자." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "피아노가 물결처럼 화음을 깔며 곡을 연다.", instrumentIds: ["piano"] },
      { seconds: 15, label: "트럼펫 주제", description: "뮤트 트럼펫이 곡의 얼굴인 주제 멜로디를 연주한다.", instrumentIds: ["trumpet"] },
      { seconds: 60, label: "색소폰 솔로", description: "캐넌볼 애더리의 알토 색소폰이 서정적으로 이어받는다.", instrumentIds: ["alto-sax"] },
      { seconds: 140, label: "피아노 솔로", description: "빌 에번스의 절제된 피아노 솔로가 흐른다.", instrumentIds: ["piano"] },
      { seconds: 290, label: "주제로 귀환", description: "트럼펫의 주제가 돌아와 고요하게 끝난다.", instrumentIds: ["trumpet"] },
    ],
    glossaryTermIds: ["mode", "voicing", "brushes"],

    video: {
      youtubeVideoId: "TLDflhhdPCg",
      title: "Blue In Green (Official Audio)",
      channelName: "MilesDavisVEVO",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["so-what", "waltz-for-debby", "autumn-leaves"],
    nextTrackId: "my-favorite-things",

    featured: true,
    mustListenRank: 6,
    editorialTags: ["입문 필수 10곡"],

    sources: [
      {
        title: "Kind of Blue — 앨범 정보",
        publisher: "Columbia/Legacy Recordings",
        url: "https://www.legacyrecordings.com/",
        accessedAt: "2026-10-04",
        note: "작곡자 표기(마일스 단독 vs 에번스 공동)에 여러 견해가 있음 — 검수 시 병기 권장",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "c-jam-blues",
    slug: "c-jam-blues",
    title: "C Jam Blues",
    titleKo: "씨 잼 블루스",
    artistIds: ["duke-ellington"],
    primaryArtistName: "Duke Ellington and His Orchestra",

    composerNames: ["Duke Ellington"],
    recordingYear: 1942,
    releaseYear: 1942,

    eraId: "1940s",
    styleIds: ["swing", "big-band"],
    moodIds: ["energetic", "drive"],
    instrumentIds: ["clarinet", "trumpet", "piano", "bass", "drums"],

    durationSeconds: 159,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "단 두 음의 멜로디로 만든 블루스. 멜로디가 단순할수록 즉흥연주와 편곡이 주인공이 된다는 것을 보여준다.",
    introduction:
      "이 곡의 주제 멜로디는 딱 두 음이다. 그런데 그 두 음이 반복되는 동안 밴드의 각 연주자가 차례차례 자기만의 이야기를 얹는다. '즉흥연주가 무엇인가'를 설명할 필요 없이 보여 주는 곡이다.",
    historicalContext:
      "듀크 엘링턴 오케스트라가 1942년에 녹음한 블루스 곡이다. 원래 밴드 멤버들의 잼 세션에서 태어난 곡으로, 단순한 구조 덕분에 누구나 따라 부를 수 있었고 스윙 시대의 대표적인 블루스 레퍼토리가 되었다. 이 시기 재즈가 춤과 함께했던 시절의 에너지가 그대로 담겨 있다.",
    whyItMatters:
      "블루스 구조(12마디)와 스윙 리듬이라는 재즈의 두 뿌리를 한 번에 들을 수 있는 곡이다. 또한 '멜로디는 얼마든지 단순해도 된다'는 재즈의 사고방식을 가르쳐 준다. 워킹 베이스를 듣는 연습곡으로도 최적이다.",
    listeningPoints: [
      { title: "두 음의 주제", description: "트럼펫과 클라리넷이 번갈아 부는 두 음 멜로디가 곡의 출발점이다." },
      { title: "워킹 베이스", description: "베이스가 한 박에 한 음씩 걸어가는 소리를 찾아보자. 박자의 길잡이다." },
      { title: "연주자 교대하기", description: "누가 지금 솔로하는지 귀로 쫓아보자. 클라리넷, 트럼펫, 색소폰이 차례로 주인공이 된다." },
      { title: "블루스의 감각", description: "12마디가 한 바퀴 돌 때마다 느껴지는 '푹 쉬어 가는' 느낌이 블루스 구조의 즐거움이다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "주제(헤드)", description: "두 음 멜로디가 관악기들에 의해 제시된다.", instrumentIds: ["trumpet", "clarinet"] },
      { seconds: 30, label: "블루스 순환 시작", description: "워킹 베이스 위로 첫 솔로가 시작된다.", instrumentIds: ["bass"] },
      { seconds: 70, label: "피아노 솔로", description: "엘링턴의 피아노가 짧게 등장한다.", instrumentIds: ["piano"] },
      { seconds: 120, label: "합주로 마무리", description: "밴드 전체가 다시 주제를 힘차게 부르며 끝낸다.", instrumentIds: ["trumpet", "clarinet"] },
    ],
    glossaryTermIds: ["blues", "walking-bass", "improvisation"],

    video: {
      youtubeVideoId: "A568momP8N8",
      title: "C Jam Blues (1942 Take)",
      channelName: "Duke Ellington - Topic",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["sing-sing-sing", "take-the-a-train", "moanin"],
    nextTrackId: "sing-sing-sing",

    featured: true,
    mustListenRank: 7,
    editorialTags: ["입문 필수 10곡"],

    sources: [
      {
        title: "Duke Ellington 공식 웹사이트",
        publisher: "Ellington Estate",
        url: "https://www.dukeellington.com/",
        accessedAt: "2026-10-04",
        note: "녹음 연도(1942) 및 편성 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "moanin",
    slug: "moanin",
    title: "Moanin'",
    titleKo: "모아닌",
    artistIds: ["art-blakey"],
    primaryArtistName: "Art Blakey and the Jazz Messengers",

    composerNames: ["Bobby Timmons"],
    albumTitle: "Moanin'",
    recordingYear: 1958,
    releaseYear: 1959,

    eraId: "1950s",
    styleIds: ["hard-bop", "soul-jazz"],
    moodIds: ["energetic", "warm"],
    instrumentIds: ["piano", "trumpet", "tenor-sax", "bass", "drums"],

    durationSeconds: 571,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "가스펠과 블루스의 느낌, 힘 있는 드럼, 질문과 대답 구조가 결합된 하드 밥 입문곡.",
    introduction:
      "피아노가 짧게 질문을 던지면 관악기들이 힘차게 대답한다. 몸이 절로 움직이는 그루브 위에 블루스의 열기가 가득한, 하드 밥이라는 스타일을 소개하기에 가장 좋은 곡이다.",
    historicalContext:
      "피아니스트 바비 티먼스가 작곡한 이 곡은 1958년 아트 블래키와 재즈 메신저스가 블루 노트에서 녹음했고, 이듬해 앨범 발매와 함께 하드 밥의 상징이 되었다. 'Moanin''이라는 제목은 신음하듯 노래하는 블루스·가스펠 전통을 가리키며, 실제로 곡 안에서 밴드가 후렴을 소리 내어 부르는 구간이 있을 정도로 교회 음악의 뿌리가 드러난다.",
    whyItMatters:
      "재즈가 클럽과 거리의 음악이었던 시절의 체온을 그대로 지닌 곡이다. 재즈가 '조용히 듣는 음악'만은 아님을 보여 주며, 질문과 대답(call and response)이라는 재즈의 대화 방식을 누구나 알아들을 수 있게 들려 준다. 리듬에 반응하는 귀를 기르는 첫 곡으로 최적이다.",
    listeningPoints: [
      { title: "질문과 대답", description: "피아노의 짧은 문구(질문)에 관악기들이 무리 지어 화답하는 구조를 쫓아 보자." },
      { title: "아트 블래키의 드럼", description: "2박과 4박을 강하게 치는 백비트가 곡을 앞으로 밀어붙인다. 드럼 솔로의 폭발력도 명장면이다." },
      { title: "부르는 듯한 연주", description: "중반에 밴드가 후렴을 합창하듯 연주하는 구간이 있다. 가스펠의 뿌리가 들리는 부분이다." },
      { title: "솔로와 합주의 교대", description: "각자의 솔로와 힘찬 합주가 번갈아 등장하며 지루할 틈이 없다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "드럼의 신호 뒤 피아노가 주제를 질문처럼 던진다.", instrumentIds: ["drums", "piano"] },
      { seconds: 25, label: "주제(헤드)", description: "관악기의 대답과 피아노의 질문이 번갈아 오가는 주제가 펼쳐진다.", instrumentIds: ["trumpet", "tenor-sax"] },
      { seconds: 130, label: "트럼펫 솔로", description: "리 모건의 트럼펫 솔로가 열기를 더한다.", instrumentIds: ["trumpet"] },
      { seconds: 300, label: "합창 구간", description: "밴드가 후렴을 소리 내어 부르는 듯 연주한다.", instrumentIds: ["piano"] },
      { seconds: 420, label: "드럼 솔로", description: "아트 블래키의 폭발적인 드럼 솔로가 등장한다.", instrumentIds: ["drums"] },
      { seconds: 530, label: "주제로 귀환", description: "질문과 대답의 주제가 돌아오며 곡을 닫는다.", instrumentIds: ["trumpet", "tenor-sax"] },
    ],
    glossaryTermIds: ["call-and-response", "blues", "rhythm-section", "trading-fours"],

    video: {
      youtubeVideoId: "fsJ3JjpZyoA",
      title: "Moanin'",
      channelName: "Art Blakey - Topic (Blue Note)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["cantaloupe-island", "c-jam-blues", "sing-sing-sing"],
    nextTrackId: "autumn-leaves",

    featured: true,
    mustListenRank: 8,
    editorialTags: ["입문 필수 10곡"],

    sources: [
      {
        title: "Blue Note Records",
        publisher: "Blue Note",
        url: "https://www.bluenote.com/",
        accessedAt: "2026-10-04",
        note: "녹음(1958)/발매(1959) 구분 및 편성 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "autumn-leaves",
    slug: "autumn-leaves",
    title: "Autumn Leaves",
    titleKo: "오텀 리브스",
    artistIds: ["cannonball-adderley", "miles-davis"],
    primaryArtistName: "Cannonball Adderley",

    composerNames: ["Joseph Kosma", "Jacques Prévert", "Johnny Mercer"],
    albumTitle: "Somethin' Else",
    recordingYear: 1958,
    releaseYear: 1958,

    eraId: "1950s",
    styleIds: ["cool-jazz", "hard-bop"],
    moodIds: ["melancholy", "rainy-day", "cafe"],
    instrumentIds: ["alto-sax", "trumpet", "piano", "bass", "drums"],

    durationSeconds: 662,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "가장 사랑받는 재즈 스탠더드. 마일스 데이비스가 게스트로 참여한 희귀한 세션의 서정적인 연주.",
    introduction:
      "이 페이지는 캐넌볼 애더리의 앨범 『Somethin' Else』(1958) 수록 버전을 설명합니다. 낙엽과 이별을 노래하는 서정적인 멜로디가, 마일스 데이비스와 캐넌볼 애더리라는 두 거장의 대화 속에서 펼쳐진다.",
    historicalContext:
      "원곡은 1945년 프랑스 샹송 'Les Feuilles mortes'(죽은 나뭇잎)로, 조셉 코스마가 작곡하고 자크 프레베르가 가사를 썼다. 이후 영어 가사(조니 머서)가 붙으며 세계적인 스탠더드가 되었다. 이 버전은 평소 마일스의 밴드 멤버였던 캐넌볼이 리더로서 마일스를 게스트로 불러낸 드문 세션 『Somethin' Else』의 하이라이트다. 11분이 넘는 연주 동안 한 멜로디가 여러 색으로 변한다.",
    whyItMatters:
      "재즈 스탠더드란 무엇인지, 그리고 '같은 곡이 연주자마다 다르다'는 재즈의 핵심 즐거움을 이해하게 해 주는 곡이다. 또한 마일스의 절제된 트럼펫과 캐넌볼의 따뜻한 색소폰이라는 두 음색의 대비를 비교하며 듣는 훈련이 된다.",
    listeningPoints: [
      { title: "주제의 인상", description: "두 연주자가 주제를 나눠 부르는 도입부에서 각자의 음색 차이를 기억해 두자." },
      { title: "마일스의 절제", description: "마일스는 적은 음으로 큰 인상을 만든다. 쉼표의 미학을 들어 보자." },
      { title: "캐넌볼의 따뜻함", description: "캐넌볼의 알토 색소폰은 같은 멜로디를 훨씬 풍성하게 노래한다." },
      { title: "버전 비교", description: "Bill Evans Trio(1960, 왈츠 느낌), Erroll Garner(1955, 화려한 피아노), Nat King Cole(보컬) 버전과 비교하면 '스탠더드'의 의미가 확실히 잡힌다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "호른 섹션의 짧은 화음이 가을의 정경을 연다." },
      { seconds: 15, label: "주제(헤드)", description: "마일스와 캐넌볼이 주제를 나눠 연주한다.", instrumentIds: ["trumpet", "alto-sax"] },
      { seconds: 130, label: "캐넌볼 솔로", description: "캐넌볼의 알토 색소폰 솔로가 시작된다.", instrumentIds: ["alto-sax"] },
      { seconds: 320, label: "마일스 솔로", description: "마일스의 절제된 트럼펫 솔로가 이어진다.", instrumentIds: ["trumpet"] },
      { seconds: 500, label: "피아노 솔로", description: "행콕의 피아노 솔로가 잔잔히 흐른다.", instrumentIds: ["piano"] },
      { seconds: 600, label: "주제로 귀환", description: "주제가 돌아오고 짧은 코다로 끝난다." },
    ],
    glossaryTermIds: ["standard", "chorus", "comping"],

    video: {
      youtubeVideoId: "uNKGgghZTok",
      title: "Somethin' Else: Autumn Leaves",
      channelName: "Cannonball Adderley - Topic (Blue Note)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["blue-in-green", "so-what", "moanin"],
    nextTrackId: "cantaloupe-island",

    featured: true,
    mustListenRank: 9,
    editorialTags: ["입문 필수 10곡"],

    sources: [
      {
        title: "Blue Note Records",
        publisher: "Blue Note",
        url: "https://www.bluenote.com/",
        accessedAt: "2026-10-04",
        note: "원곡(1945 Les Feuilles mortes) 및 세션 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "sing-sing-sing",
    slug: "sing-sing-sing",
    title: "Sing, Sing, Sing",
    titleKo: "싱 싱 싱",
    artistIds: ["benny-goodman"],
    primaryArtistName: "Benny Goodman and His Orchestra",

    composerNames: ["Louis Prima"],
    recordingYear: 1937,
    releaseYear: 1937,

    eraId: "1930s",
    styleIds: ["swing", "big-band"],
    moodIds: ["energetic", "drive", "morning"],
    instrumentIds: ["clarinet", "trumpet", "piano", "bass", "drums"],

    durationSeconds: 522,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "스윙 시대의 국가. 루이 프리마의 곡을 베니 굿맨 밴드가 화려한 편곡으로 완성한 스윙의 정점.",
    introduction:
      "드럼이 폭죽처럼 터지고 클라리넷이 날아오르면, 이제 재즈 역사상 가장 신나는 8분이 시작된다. 춤추는 사람이 없던 시대가 없었을 스윙의 에너지를 한 번에 느낄 수 있는 곡이다.",
    historicalContext:
      "원래 루이 프리마가 만든 곡을 베니 굿맨의 트롬본 연주자였던 제임스 먼디가 확장 편곡하면서 굿맨 밴드의 시그니처가 되었다. 1937년 스튜디오 녹음과 1938년 카네기 홀 라이브가 유명한데, 특히 카네기 홀 공연은 재즈가 미국 예술의 전당에 입성한 역사적 사건으로 기록된다. 진 크루파의 드럼이 이 곡의 또 다른 주인공이다.",
    whyItMatters:
      "재즈가 한 시대 전체를 풍미했던 스윙 시대의 정체성을 가장 강렬하게 전달하는 곡이다. 또한 편곡과 즉흥연주가 어떻게 결합하는지(짜인 부분과 즉석 부분의 교대) 보여 준다. '재즈가 왜 그렇게 인기가 많았지?'라는 질문의 답이 여기 있다.",
    listeningPoints: [
      { title: "라틴 리듬 인트로", description: "드럼과 베이스가 만드는 독특한 도입 리듬이 곡의 긴장을 쌓는다." },
      { title: "클라리넷의 비행", description: "굿맨의 클라리넷이 높은 음역을 날아다니는 주제가 스윙의 상징적인 순간이다." },
      { title: "진 크루파의 드럼", description: "드럼이 반주를 넘어 솔로 주인공이 되는 드문 시대의 소리다." },
      { title: "짧은 보컬", description: "중간에 스캣처럼 던져지는 보컬도 들어 보자." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "드럼과 베이스의 라틴풍 리듬이 곡을 연다.", instrumentIds: ["drums", "bass"] },
      { seconds: 40, label: "주제(헤드)", description: "클라리넷과 밴드가 주요 멜로디를 힘차게 연주한다.", instrumentIds: ["clarinet"] },
      { seconds: 150, label: "트럼펫 솔로", description: "해리 제임스의 트럼펫이 밝게 울린다.", instrumentIds: ["trumpet"] },
      { seconds: 300, label: "드럼 솔로", description: "진 크루파의 드럼이 곡의 에너지를 최고조로 끌어올린다.", instrumentIds: ["drums"] },
      { seconds: 450, label: "클라이맥스", description: "밴드가 다시 합류해 주제로 돌아와 폭발적으로 끝난다.", instrumentIds: ["clarinet", "trumpet"] },
    ],
    glossaryTermIds: ["swing", "big-band", "riff", "solo"],

    video: {
      youtubeVideoId: "u_E0UVNtJ9Y",
      title: "Sing, Sing, Sing (Audio)",
      channelName: "BennyGoodmanVEVO",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["take-the-a-train", "c-jam-blues", "cheek-to-cheek"],
    nextTrackId: "take-the-a-train",

    featured: true,
    mustListenRank: 10,
    editorialTags: ["입문 필수 10곡"],

    sources: [
      {
        title: "Britannica: Benny Goodman",
        publisher: "Encyclopaedia Britannica",
        url: "https://www.britannica.com/biography/Benny-Goodman",
        accessedAt: "2026-10-04",
        note: "1937 스튜디오 녹음 기준. 1938 카네기 홀 라이브 버전과의 구분 검수 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "take-the-a-train",
    slug: "take-the-a-train",
    title: "Take the \"A\" Train",
    titleKo: "테이크 더 에이 트레인",
    artistIds: ["duke-ellington"],
    primaryArtistName: "Duke Ellington and His Famous Orchestra",

    composerNames: ["Billy Strayhorn"],
    recordingYear: 1941,
    releaseYear: 1941,

    eraId: "1940s",
    styleIds: ["swing", "big-band"],
    moodIds: ["morning", "drive", "energetic"],
    instrumentIds: ["trumpet", "piano", "tenor-sax", "bass", "drums"],

    durationSeconds: 177,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "듀크 엘링턴 오케스트라의 테마곡. 뉴욕 지하철 A호선에서 출발한, 빅밴드 편곡의 즐거움이 가득한 곡.",
    introduction:
      "밝은 트럼펫이 부르는 주제 멜로디는 하루를 여는 아침 햇살 같다. 뉴욕의 지하철 노선에서 이름을 가져온 이 곡은, 빅밴드 편곡이 얼마나 재치 있고 즐거울 수 있는지 보여 주는 완성형이다.",
    historicalContext:
      "작곡은 엘링턴의 오른팔이었던 피아니스트·작곡가 빌리 스트레이혼의 것이다. 엘링턴의 집으로 가는 길이 하얀 승강장 재개발로 바뀌자, 스트레이혼이 '옛 길로 오지 말고 A호선을 타라'는 조언에서 영감을 얻어 썼다는 이야기가 널리 전해진다. 1941년 녹음 이후 이 곡은 오케스트라의 테마곡이 되어 수십 년간 무대를 열었다.",
    whyItMatters:
      "빅밴드 음악의 '편곡 미학'을 가장 깔끔하게 경험할 수 있는 곡이다. 주제—솔로—합주의 짜임이 3분 안에 압축되어 있어, 긴 곡이 부담스러운 입문자에게 구조를 배우는 교재가 된다. 재치 있는 제목과 함께, 재즈가 일상의 이야기에서 나왔다는 것도 보여 준다.",
    listeningPoints: [
      { title: "트럼펫 주제", description: "레이 낸스의 트럼펫이 부르는 아침 같은 주제 멜로디가 이 곡의 얼굴이다." },
      { title: "섹션 합주", description: "색소폰·트럼펫 섹션이 서로 화답하듯 얹는 화려한 합주를 들어 보자." },
      { title: "피아노의 등장", description: "엘링턴의 피아노가 짧게 지나가는 구간에서 그의 독특한 화음 감각이 엿보인다." },
      { title: "종착역", description: "주제가 돌아와 개운하게 끝나는 마무리가 지하철 여정 같아서 재미있다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "피아노 인트로", description: "엘링턴의 피아노가 출발 신호를 보낸다.", instrumentIds: ["piano"] },
      { seconds: 10, label: "주제(헤드)", description: "트럼펫이 유명한 주제 멜로디를 연주한다.", instrumentIds: ["trumpet"] },
      { seconds: 60, label: "섹션 합주", description: "색소폰 섹션이 주제 위에 화려한 대답을 얹는다.", instrumentIds: ["tenor-sax"] },
      { seconds: 110, label: "솔로 구간", description: "테너 색소폰 솔로가 주제를 자기 색으로 바꾼다.", instrumentIds: ["tenor-sax"] },
      { seconds: 150, label: "종착역", description: "주제가 돌아와 힘차게 끝난다.", instrumentIds: ["trumpet"] },
    ],
    glossaryTermIds: ["big-band", "riff", "head"],

    video: {
      youtubeVideoId: "r2G1fKYFgVU",
      title: "Take the \"A\" Train (Audio)",
      channelName: "DukeEllingtonVEVO",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["c-jam-blues", "sing-sing-sing", "take-five"],
    nextTrackId: "ko-ko",

    featured: true,
    mustListenRank: undefined,
    editorialTags: ["에디터 추천"],

    sources: [
      {
        title: "Duke Ellington 공식 웹사이트",
        publisher: "Ellington Estate",
        url: "https://www.dukeellington.com/",
        accessedAt: "2026-10-04",
        note: "작곡자(빌리 스트레이혼) 및 1941년 녹음 정보 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "waltz-for-debby",
    slug: "waltz-for-debby",
    title: "Waltz for Debby",
    titleKo: "왈츠 포 데비",
    artistIds: ["bill-evans"],
    primaryArtistName: "Bill Evans Trio",

    composerNames: ["Bill Evans"],
    albumTitle: "Waltz for Debby",
    recordingYear: 1961,
    releaseYear: 1962,

    eraId: "1960s",
    styleIds: ["cool-jazz", "modal-jazz"],
    moodIds: ["warm", "morning", "cafe"],
    instrumentIds: ["piano", "bass", "drums"],

    durationSeconds: 414,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "피아노 트리오가 하나의 생명체처럼 숨 쉬는 법을 보여주는, 서정의 정점에 있는 왈츠.",
    introduction:
      "3박자 왈츠 리듬 위에 피아노가 수채화 같은 화음을 얹으며 흐르는 곡이다. 무엇보다 들을 거리는 피아노·베이스·드럼 세 사람이 대화하듯 주고받는 연주 방식이다. 조용하고 따뜻한 재즈를 찾는다면 이 곡이 답이다.",
    historicalContext:
      "빌 에번스가 어린 조카에게 바랐다는 이 곡은, 1961년 6월 25일 뉴욕 빌리지 뱅가드에서의 라이브 녹음으로 널리 알려졌다. 스콧 라파로(베이스), 폴 모티안(드럼)과의 이 트리오는 '리듬 섹션이 반주자가 아니라 대등한 대화 상대'라는 새로운 트리오상을 제시했으며, 그 라이브 녹음은 재즈 역사상 가장 사랑받는 피아노 트리오 명반 중 하나가 되었다.",
    whyItMatters:
      "재즈 피아노 트리오의 이상형을 보여 주는 곡이자, '여백과 터치'로 감정을 만드는 연주의 정점이다. 베이스가 멜로디를 받아 올리고 드럼이 브러시로 숨을 불어넣는 과정을 들으면, 재즈의 반주와 솔로 경계가 얼마나 유연한지 이해하게 된다.",
    listeningPoints: [
      { title: "피아노의 터치", description: "두껍지 않고 투명한 화음이 이 곡의 물빛 감성을 만든다. 빌 에번스 보이싱의 정수다." },
      { title: "베이스의 노래", description: "스콧 라파로의 베이스는 박을 잡는 것을 넘어 멜로디로 대답한다. 대화 상대로서의 베이스에 주목하자." },
      { title: "브러시 드럼", description: "폴 모티안의 브러시가 물결처럼 곡을 떠받친다." },
      { title: "라이브의 숨", description: "관객의 웃음소리와 잔잔한 기척이 남아 있는 라이브 녹음이라, 1961년 클럽의 공기가 함께 전해진다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "피아노와 베이스가 왈츠 리듬을 나눠 준비한다.", instrumentIds: ["piano", "bass"] },
      { seconds: 15, label: "주제(헤드)", description: "피아노가 서정적인 주제 멜로디를 연주한다.", instrumentIds: ["piano"] },
      { seconds: 90, label: "트리오의 대화", description: "베이스와 피아노가 주제를 주고받으며 화답한다.", instrumentIds: ["bass"] },
      { seconds: 250, label: "피아노 솔로", description: "에번스의 즉흥이 주제의 그림자를 드리우듯 흐른다.", instrumentIds: ["piano"] },
      { seconds: 380, label: "주제로 귀환", description: "주제가 돌아와 따뜻하게 끝맺는다.", instrumentIds: ["piano", "bass"] },
    ],
    glossaryTermIds: ["voicing", "brushes", "rhythm-section"],

    video: {
      youtubeVideoId: "wCINvavqFXk",
      title: "Waltz For Debby (Official Visualizer)",
      channelName: "Bill Evans (공식 채널)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["blue-in-green", "so-what", "the-girl-from-ipanema"],
    nextTrackId: "cheek-to-cheek",

    featured: true,
    mustListenRank: undefined,
    editorialTags: ["에디터 추천"],

    sources: [
      {
        title: "AllMusic: Bill Evans",
        publisher: "AllMusic",
        url: "https://www.allmusic.com/artist/bill-evans-mn0000164420",
        accessedAt: "2026-10-04",
        note: "1961-06-25 Village Vanguard 라이브 기준. 채택 버전(라이브/스튜디오) 최종 확인 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "ko-ko",
    slug: "ko-ko",
    title: "Ko-Ko",
    titleKo: "코코",
    artistIds: ["charlie-parker"],
    primaryArtistName: "Charlie Parker",

    composerNames: ["Charlie Parker"],
    recordingYear: 1945,
    releaseYear: 1946,

    eraId: "1940s",
    styleIds: ["bebop"],
    moodIds: ["tense", "experimental"],
    instrumentIds: ["alto-sax", "piano", "bass", "drums"],

    durationSeconds: 178,
    hasVocals: false,
    difficulty: "advanced",

    shortDescription: "비밥의 탄생을 들려주는 곡. 빠르고 복잡한 즉흥연주의 원류를 만나는, 조금 도전적인 명연주.",
    introduction:
      "2분 50초 동안 쉼 없이 쏟아지는 음표들 — 재즈 역사에서 가장 중요한 문법적 혁명인 비밥(bebop)이 어떤 소리였는지 압축해서 보여 주는 곡이다. 처음엔 어렵게 느껴질 수 있지만, 듣는 방법이 있다.",
    historicalContext:
      "1945년 11월 26일 사보이 레코드에서 녹음되었다. 흥미로운 사실로, 이 세션에서 디지 길레스피는 트럼펫이 아니라 피아노를 쳤고 맥스 로치가 드럼을 연주했다. 당시 비밥 음악가들의 모임이 얼마나 자유분방한 즉흥의 자리였는지 보여 주는 일화다. 찰리 파커의 알토 색소폰이 곡 전체를 이끄는 이 연주는 이후 모든 재즈 연주자들의 교과서가 되었다.",
    whyItMatters:
      "현대 재즈 즉흥연주의 문법 자체가 여기서 나왔다. 모달 재즈나 프리 재즈를 포함한 이후 모든 흐름은 비밥이 만든 긴장감과 기술의 반대편에서 출발했다. 어려운 곡을 듣는 근육을 키우면 재즈 감상의 폭이 한 번에 넓어진다.",
    listeningPoints: [
      { title: "먼저 색소폰만", description: "첫 번째 듣기에서는 파커의 알토 색소폰 소리만 쫓아보자. 빠르지만 하나의 노래다." },
      { title: "두 번째는 드럼과의 대화", description: "맥스 로치의 드럼이 파커에게 화답하는 순간들을 찾아보자." },
      { title: "피아노의 숨은 이야기", description: "길레스피가 친 피아노가 트럼펫리스트의 손에서 나왔다는 사실을 알고 들으면 재미가 배가된다." },
      { title: "속도의 감각", description: "이 속도를 기억해 두면 이후 다른 재즈가 얼마나 '느긋한지' 비교할 수 있다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "드럼 신호와 함께 곡의 긴장이 시작된다.", instrumentIds: ["drums"] },
      { seconds: 8, label: "주제(헤드)", description: "파커와 길레스피가 어긋나듯 주제를 연주한다.", instrumentIds: ["alto-sax"] },
      { seconds: 40, label: "파커 솔로", description: "파커의 밀도 높은 즉흥연주가 시작된다.", instrumentIds: ["alto-sax"] },
      { seconds: 100, label: "드럼과의 대화", description: "로치의 드럼이 파커의 프레이즈에 화답한다.", instrumentIds: ["drums"] },
      { seconds: 150, label: "주제로 귀환", description: "주제가 돌아와 짧고 강렬하게 끝난다.", instrumentIds: ["alto-sax"] },
    ],
    glossaryTermIds: ["improvisation", "chorus", "jam-session"],

    video: {
      youtubeVideoId: "0ajJBNodEYs",
      title: "Ko-Ko",
      channelName: "Charlie Parker - Topic (Savoy)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["my-favorite-things", "moanin", "c-jam-blues"],
    nextTrackId: "moanin",

    featured: true,
    mustListenRank: undefined,
    editorialTags: ["명연주"],

    sources: [
      {
        title: "Britannica: Charlie Parker",
        publisher: "Encyclopaedia Britannica",
        url: "https://www.britannica.com/biography/Charlie-Parker",
        accessedAt: "2026-10-04",
        note: "1945-11-26 Savoy 녹음 기준. 길레스피 피아노 참여 등 세션 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "the-girl-from-ipanema",
    slug: "the-girl-from-ipanema",
    title: "The Girl from Ipanema",
    titleKo: "걸 프롬 이파네마",
    artistIds: ["stan-getz", "joao-gilberto"],
    primaryArtistName: "Stan Getz & João Gilberto",

    composerNames: ["Antônio Carlos Jobim", "Vinicius de Moraes", "Norman Gimbel"],
    albumTitle: "Getz/Gilberto",
    recordingYear: 1963,
    releaseYear: 1964,

    eraId: "1960s",
    styleIds: ["bossa-nova", "vocal-jazz"],
    moodIds: ["morning", "cafe", "warm", "romantic"],
    instrumentIds: ["vocals", "tenor-sax", "guitar", "piano", "bass", "drums"],

    durationSeconds: 168,
    hasVocals: true,
    difficulty: "very-easy",

    shortDescription: "브라질 보사노바와 미국 재즈의 만남. 해변을 걷는 소녀를 노래한, 세계에서 가장 유명한 보사노바.",
    introduction:
      "리우데자네이루 이파네마 해변을 걸어가는 소녀를 바라보며 쓴 노래다. 주앙 지우베르투의 속삭이는 포르투갈어 보컬, 아스트루드 지우베르투의 영어 보컬, 스탠 게츠의 서정적인 색소폰이 만나는 이 곡은 보사노바와 재즈의 가장 유명한 만남이다.",
    historicalContext:
      "토빙과 드 모라에스가 쓴 노래를 1963년 뉴욕에서 녹음해 1964년 앨범 『Getz/Gilberto』로 발표했다. 싱글로 발매된 이 버전은 미국 차트 5위까지 오르며 보사노바 열풍을 일으켰고, 앨범은 그해 그래미 어워드 최고 앨범을 수상했다. 재즈가 브라질의 리듬과 화성을 흡수한 역사적 순간이다.",
    whyItMatters:
      "재즈가 세계의 음악과 만나 어떻게 새로운 스타일을 낳는지 보여 주는 대표 사례다. 또한 '부드러운 리듬'의 즐거움 — 스윙이 아니라도 재즈의 리듬은 충분히 매력적이라는 것 — 을 경험하게 해 준다. 카페에서 자주 들리는 이유를 알게 될 것이다.",
    listeningPoints: [
      { title: "보사노바 리듬", description: "기타가 만드는 부드럽게 기울어진 리듬이 이 음악의 바닥이다. 삼바의 다운템포 버전 같은 감각이다." },
      { title: "두 개의 목소리", description: "주앙의 포르투갈어 속삭임과 아스트루드의 담백한 영어 보컬이 이어지는 구조를 들어 보자." },
      { title: "게츠의 색소폰", description: "가사가 쉬는 자리마다 스탠 게츠의 테너 색소폰이 바닷바람처럼 지나간다." },
      { title: "화성의 세련미", description: "가볍게 들리지만 화음은 매우 정교하다. 쉬운 듯 어려운 이 음악의 비밀이다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "기타의 보사노바 리듬과 플루트가 여름 바닷가를 연다.", instrumentIds: ["guitar"] },
      { seconds: 15, label: "주앙의 보컬", description: "주앙 지우베르투가 포르투갈어로 노래한다.", instrumentIds: ["vocals"] },
      { seconds: 60, label: "아스트루드의 보컬", description: "영어 가사로 이어지며 곡의 가장 유명한 구간이 온다.", instrumentIds: ["vocals"] },
      { seconds: 105, label: "게츠의 색소폰", description: "스탠 게츠의 서정적인 색소폰이 곡을 장식한다.", instrumentIds: ["tenor-sax"] },
      { seconds: 140, label: "마무리", description: "다시 보컬로 돌아와 나른하게 끝난다.", instrumentIds: ["vocals"] },
    ],
    glossaryTermIds: ["standard", "comping"],

    video: {
      youtubeVideoId: "s61-e29Vr6Q",
      title: "The Girl From Ipanema (Official Video)",
      channelName: "Verve Records",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["waltz-for-debby", "cheek-to-cheek", "what-a-wonderful-world"],
    nextTrackId: "birdland",

    featured: true,
    mustListenRank: undefined,
    editorialTags: ["에디터 추천"],

    sources: [
      {
        title: "Verve Records",
        publisher: "Verve",
        url: "https://www.ververecords.com/",
        accessedAt: "2026-10-04",
        note: "싱글 에디트(약 2:48) 기준. 앨범 풀버전과의 구분 검수 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "cantaloupe-island",
    slug: "cantaloupe-island",
    title: "Cantaloupe Island",
    titleKo: "칸탈로프 아일랜드",
    artistIds: ["herbie-hancock"],
    primaryArtistName: "Herbie Hancock",

    composerNames: ["Herbie Hancock"],
    albumTitle: "Empyrean Isles",
    recordingYear: 1964,
    releaseYear: 1964,

    eraId: "1960s",
    styleIds: ["soul-jazz", "hard-bop"],
    moodIds: ["focus", "drive", "energetic"],
    instrumentIds: ["piano", "trumpet", "bass", "drums"],

    durationSeconds: 335,
    hasVocals: false,
    difficulty: "easy",

    shortDescription: "반복되는 리프 하나로 관객을 사로잡는 소울 재즈의 교과서. 단순함의 무서운 힘을 들려주는 곡.",
    introduction:
      "퉁명퉁명 떨어지는 기억하기 쉬운 리프 하나가 5분 동안 계속 돈다. 그런데 지루할 틈이 없다. 리프는 그대로인데 그 위에서 연주자들이 매번 다른 이야기를 하기 때문이다. '그루브'라는 단어의 뜻을 알려 주는 곡이다.",
    historicalContext:
      "허비 행콕이 1964년 블루 노트에서 녹음한 앨범 『Empyrean Isles』의 수록곡이다. 프레디 허버드의 트럼펫이 참여한 이 세션은 하드 밥과 소울 재즈의 경계에 서 있는 명반이 되었고, 이 곡은 1998년 US3의 'Cantaloop'으로 샘플링되며 한 세대를 건너 다시 유명해졌다.",
    whyItMatters:
      "'단순한 반복 + 다양한 즉흥'이라는 재즈의 또 다른 얼굴을 보여 준다. 비밥처럼 빠를 필요도, 모달처럼 길 필요도 없다는 것. 리프 하나를 기억하고 나면 이 곡은 평생 곁에 있는 음악이 된다. 집중할 때 듣는 재즈로도 최고다.",
    listeningPoints: [
      { title: "기억되는 리프", description: "도입부의 피아노 리프를 따라 부를 수 있게 되면 이 곡의 절반은 성공이다." },
      { title: "프레디 허버드의 트럼펫", description: "리프 위에서 트럼펫이 만드는 긴장감 넘치는 솔로를 들어 보자." },
      { title: "그루브의 결", description: "베이스와 드럼이 만드는 딱딱 맞아떨어지는 느낌. 몸으로 느껴지는 부분이다." },
      { title: "솔로마다 색다른 리프", description: "같은 리프인데 솔로가 바뀔 때마다 완전히 다르게 들리는 마법에 주목하자." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "리프 시작", description: "베이스와 피아노가 기억에 남는 리프를 제시한다.", instrumentIds: ["piano", "bass"] },
      { seconds: 30, label: "트럼펫 솔로", description: "프레디 허버드의 트럼펫이 리프 위에서 노래하기 시작한다.", instrumentIds: ["trumpet"] },
      { seconds: 140, label: "피아노 솔로", description: "행콕의 피아노 솔로가 리프를 새로운 색으로 물들인다.", instrumentIds: ["piano"] },
      { seconds: 260, label: "리프로 귀환", description: "다시 리프가 돌아와 개운하게 끝난다.", instrumentIds: ["piano", "trumpet"] },
    ],
    glossaryTermIds: ["riff", "syncopation", "rhythm-section"],

    video: {
      youtubeVideoId: "K5-yUUE6_oo",
      title: "Cantaloupe Island",
      channelName: "Herbie Hancock - Topic (Blue Note)",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["moanin", "birdland", "c-jam-blues"],
    nextTrackId: "birdland",

    featured: true,
    mustListenRank: undefined,
    editorialTags: ["에디터 추천"],

    sources: [
      {
        title: "Herbie Hancock 공식 웹사이트",
        publisher: "Herbie Hancock",
        url: "https://www.herbiehancock.com/",
        accessedAt: "2026-10-04",
        note: "1964년 Blue Note 녹음 기준. 편성 크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
  {
    id: "birdland",
    slug: "birdland",
    title: "Birdland",
    titleKo: "버드랜드",
    artistIds: ["weather-report"],
    primaryArtistName: "Weather Report",

    composerNames: ["Joe Zawinul"],
    albumTitle: "Heavy Weather",
    recordingYear: 1977,
    releaseYear: 1977,

    eraId: "1970s",
    styleIds: ["jazz-fusion", "contemporary-jazz"],
    moodIds: ["energetic", "drive", "morning"],
    instrumentIds: ["piano", "tenor-sax", "bass", "drums"],

    durationSeconds: 359,
    hasVocals: false,
    difficulty: "medium",

    shortDescription: "퓨전의 정점. 신디사이저와 일렉 베이스가 만든 이 세계는, 재즈가 30년 만에 얼마나 달라졌는지 보여준다.",
    introduction:
      "기계음 같은 신디사이저가 마을을 그리기 시작하고, 일렉 베이스가 폭풍처럼 달린다. 이 문서의 다른 곡들과 비교해 들어 보라 — 같은 재즈인데 완전히 다른 행성처럼 들린다. 그 30년의 거리가 이 곡의 매력이다.",
    historicalContext:
      "조 자비눌이 뉴욕의 전설적인 재즈 클럽 '버드랜드'(찰리 파커의 별명 '버드'에서 유래)와 그 시절의 감동을 추모하며 쓴 곡이다. 웨더 리포트의 1977년 앨범 『Heavy Weather』의 오프닝 트랙으로, 자코 파스토리우스의 일렉 베이스와 함께 퓨전 시대 최대의 히트곡이 되었다. 재즈가 일렉트릭 사운드와 만난 1970년대의 정점을 보여 준다.",
    whyItMatters:
      "재즈의 역사가 멈추지 않았다는 것을 증명하는 곡이다. 비밥의 파커를 추모하는 곡이 신디사이저로 만들어졌다는 점 자체가 재즈의 계속되는 변신을 요약한다. 이 곡을 듣고 '재즈의 경계'에 대한 궁금증이 생겼다면 입문은 이미 절반쯤 성공이다.",
    listeningPoints: [
      { title: "신디사이저 마을", description: "도입부의 신시사이저가 작은 마을의 풍경을 그린다. 자비눌의 서정성이 돋보인다." },
      { title: "자코의 베이스", description: "일렉 베이스가 리드 악기처럼 폭발하는 구간에서 퓨전의 화력을 느껴 보자." },
      { title: "웨인 쇼터의 색소폰", description: "기계적 사운드 위에 날아드는 아날로그적 색소폰의 대비가 이 곡의 재미다." },
      { title: "시대 비교", description: "Sing, Sing, Sing(1937) → So What(1959) → Birdland(1977) 순서로 들으면 재즈의 40년이 한눈에 보인다." },
    ],
    timeline: [
      // TODO(청취 검수): 구간 위치(초)는 초안값이다. 영상 길이는 실측 반영됨.
      { seconds: 0, label: "인트로", description: "신디사이저가 주제의 풍경을 그린다.", instrumentIds: ["piano"] },
      { seconds: 20, label: "주제(헤드)", description: "밴드가 기억에 남는 주제 멜로디를 힘차게 연주한다.", instrumentIds: ["piano", "tenor-sax"] },
      { seconds: 100, label: "색소폰 솔로", description: "웨인 쇼터의 색소폰 솔로가 이어진다.", instrumentIds: ["tenor-sax"] },
      { seconds: 200, label: "베이스 솔로", description: "자코 파스토리우스의 일렉 베이스가 폭발한다.", instrumentIds: ["bass"] },
      { seconds: 320, label: "주제로 귀환", description: "주제가 돌아와 승리자처럼 끝난다.", instrumentIds: ["piano", "tenor-sax"] },
    ],
    glossaryTermIds: ["riff", "head", "solo"],

    video: {
      youtubeVideoId: "JI1QCXIXlp8",
      title: "Birdland (Album Version)",
      channelName: "Weather Report - Topic",
      isOfficial: true,
      isEmbeddable: true,
      fallbackVideoId: undefined,
      lastVerifiedAt: "2026-10-04",
    },

    relatedTrackIds: ["cantaloupe-island", "moanin", "sing-sing-sing"],
    nextTrackId: "take-five",

    featured: true,
    mustListenRank: undefined,
    editorialTags: ["에디터 추천"],

    sources: [
      {
        title: "Legacy Recordings",
        publisher: "Sony Music",
        url: "https://www.legacyrecordings.com/",
        accessedAt: "2026-10-04",
        note: "Heavy Weather(1977) 수록 버전 기준. 작곡·크레딧 검수 보강 필요",
      },
    ],
    contentReviewedAt: "2026-10-04",
  },
];
