/**
 * Symphony Guide — YouTube 감상 타임라인 데이터
 *
 * Z.ai Coding Plan 적용 경로:
 *   src/data/symphonyTimelines.ts
 *
 * 원칙:
 * - verifiedSymphonyTimelines의 seconds 값만 seek에 사용한다.
 * - timelineDrafts의 events는 편집 초안이며 seek 버튼을 만들지 않는다.
 * - 최종 영상이 바뀌면 해당 영상의 타임라인을 전부 다시 검수한다.
 * - 검색 URL은 youtubeVideoId가 아니다.
 */

export type TimelineVerificationStatus =
  | "TODO_SELECT_FINAL_VIDEO"
  | "TODO_VERIFY_TIMELINE"
  | "MOVEMENT_STARTS_VERIFIED"
  | "PARTIAL_TIMELINE_VERIFIED"
  | "FULLY_VERIFIED";

export type TimelineItemStatus = "TODO_VERIFY" | "VERIFIED";

export interface VerifiedTimelineItem {
  id: string;
  movementNumber: number;
  seconds: number;
  timeLabel: string;
  title: string;
  description: string;
  status: "VERIFIED";
}

export interface VerifiedSymphonyTimeline {
  symphonyId: string;
  titleKo: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  conductor: string;
  orchestra: string;
  performanceYear: number | null;
  status:
    | "MOVEMENT_STARTS_VERIFIED"
    | "PARTIAL_TIMELINE_VERIFIED"
    | "FULLY_VERIFIED";
  lastVerifiedAt: string;
  items: VerifiedTimelineItem[];
}

export interface TimelineDraft {
  symphonyId: string;
  titleKo: string;
  recommendedStart: string;
  youtubeSearchUrl: string;
  videoStatus: "TODO_SELECT_FINAL_VIDEO";
  timelineStatus: "TODO_VERIFY_TIMELINE";
  events: {
    id: string;
    order: number;
    seconds: null;
    timeLabel: "시간 미확정";
    description: string;
    status: "TODO_VERIFY";
  }[];
}

export const formatTimelineSeconds = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return hours > 0
    ? [hours, minutes, remainingSeconds]
        .map((value) => String(value).padStart(2, "0"))
        .join(":")
    : [minutes, remainingSeconds]
        .map((value) => String(value).padStart(2, "0"))
        .join(":");
};

export const verifiedSymphonyTimelines: VerifiedSymphonyTimeline[] = [

  {
    symphonyId: "beethoven-symphony-5",
    titleKo: "베토벤 교향곡 5번",
    youtubeVideoId: "yKl4T5BnhOA",
    youtubeUrl: "https://www.youtube.com/watch?v=yKl4T5BnhOA",
    conductor: "Herbert von Karajan",
    orchestra: "Berliner Philharmoniker",
    performanceYear: 1977,
    status: "MOVEMENT_STARTS_VERIFIED",
    lastVerifiedAt: "2026-10-04",
    items: [
      {
        id: "beethoven-symphony-5-1",
        movementNumber: 1,
        seconds: 0,
        timeLabel: "00:00",
        title: "1악장 시작",
        description: "Allegro con brio가 시작됩니다. 유명한 네 음의 동기를 먼저 기억합니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-5-2",
        movementNumber: 2,
        seconds: 427,
        timeLabel: "07:07",
        title: "2악장 시작",
        description: "Andante con moto가 시작됩니다. 비올라와 첼로가 제시하는 차분한 주제와 변주를 따라갑니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-5-3",
        movementNumber: 3,
        seconds: 996,
        timeLabel: "16:36",
        title: "3악장 시작",
        description: "Scherzo가 시작됩니다. 낮은 현악기의 어두운 움직임 뒤 호른이 강한 리듬을 제시합니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-5-4",
        movementNumber: 4,
        seconds: 1272,
        timeLabel: "21:12",
        title: "4악장 시작",
        description: "4악장이 쉼 없이 이어집니다. 다장조의 밝은 금관과 전체 오케스트라가 새로운 공간을 엽니다.",
        status: "VERIFIED",
      },
    ],
  },
  {
    symphonyId: "beethoven-symphony-3",
    titleKo: "베토벤 교향곡 3번 ‘영웅’",
    youtubeVideoId: "fhHcty9OM-0",
    youtubeUrl: "https://www.youtube.com/watch?v=fhHcty9OM-0",
    conductor: "Andrés Orozco-Estrada",
    orchestra: "hr-Sinfonieorchester",
    performanceYear: null,
    status: "PARTIAL_TIMELINE_VERIFIED",
    lastVerifiedAt: "2026-10-04",
    items: [
      {
        id: "beethoven-symphony-3-1",
        movementNumber: 1,
        seconds: 20,
        timeLabel: "00:20",
        title: "두 개의 시작 화음",
        description: "오케스트라 전체가 두 개의 강한 화음을 연주하며 1악장을 엽니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-2",
        movementNumber: 1,
        seconds: 23,
        timeLabel: "00:23",
        title: "첫 번째 주제",
        description: "첼로가 첫 번째 주제를 제시합니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-3",
        movementNumber: 1,
        seconds: 36,
        timeLabel: "00:36",
        title: "목관의 응답",
        description: "목관악기가 첫 주제를 다시 이어받습니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-4",
        movementNumber: 1,
        seconds: 46,
        timeLabel: "00:46",
        title: "예상 밖의 강세",
        description: "강세가 예상과 다른 위치에 놓이며 리듬이 흔들리는 느낌을 만듭니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-5",
        movementNumber: 1,
        seconds: 59,
        timeLabel: "00:59",
        title: "첫 주제의 강화",
        description: "첫 주제가 더 강한 에너지로 돌아옵니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-6",
        movementNumber: 1,
        seconds: 68,
        timeLabel: "01:08",
        title: "목관 전환",
        description: "목관악기가 다음 구간으로 연결하는 전환을 시작합니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-7",
        movementNumber: 1,
        seconds: 87,
        timeLabel: "01:27",
        title: "현악 전환",
        description: "현악기가 또 다른 전환 구간을 이어갑니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-8",
        movementNumber: 1,
        seconds: 108,
        timeLabel: "01:48",
        title: "두 번째 주제",
        description: "첫 주제와 대조되는 두 번째 주제가 나타납니다.",
        status: "VERIFIED",
      },
      {
        id: "beethoven-symphony-3-9",
        movementNumber: 4,
        seconds: 2277,
        timeLabel: "37:57",
        title: "4악장 시작",
        description: "Finale가 시작됩니다. 짧은 베이스 재료에서 변주가 확장되는 과정을 따라갑니다.",
        status: "VERIFIED",
      },
    ],
  },
];

export const timelineDrafts: TimelineDraft[] = [
  {
    symphonyId: "beethoven-symphony-5",
    titleKo: "베토벤 교향곡 5번",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+5+Op.+67+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "beethoven-symphony-5-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "유명한 네 음의 동기",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-5-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "동기가 다른 악기군으로 이동하는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-5-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "부드러운 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-5-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "1악장의 코다와 강한 마무리",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "dvorak-symphony-9",
    titleKo: "드보르자크 교향곡 9번 ‘신세계로부터’",
    recommendedStart: "2악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Anton%C3%ADn+Dvo%C5%99%C3%A1k+Symphony+No.+9+From+the+New+World+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "dvorak-symphony-9-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "낮고 장엄한 관악 화음",
        status: "TODO_VERIFY",
      },
      {
        id: "dvorak-symphony-9-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "잉글리시 호른의 유명한 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "dvorak-symphony-9-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기가 더 움직이는 중간 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "dvorak-symphony-9-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첫 주제가 돌아오는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "mozart-symphony-40",
    titleKo: "모차르트 교향곡 40번",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Symphony+No.+40+K.+550+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "mozart-symphony-40-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 불안한 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "mozart-symphony-40-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관이 더해지는 부드러운 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "mozart-symphony-40-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주제가 여러 조성으로 흔들리는 전개부",
        status: "TODO_VERIFY",
      },
      {
        id: "mozart-symphony-40-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첫 주제가 돌아오는 재현부",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "beethoven-symphony-6",
    titleKo: "베토벤 교향곡 6번 ‘전원’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+6+Pastoral+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "beethoven-symphony-6-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "시골에 도착한 듯한 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-6-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관과 현악이 주고받는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-6-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "반복 리듬 위에서 분위기가 넓어지는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-6-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첫 주제가 편안하게 돌아오는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "haydn-symphony-94",
    titleKo: "하이든 교향곡 94번 ‘놀람’",
    recommendedStart: "2악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Joseph+Haydn+Symphony+No.+94+Surprise+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "haydn-symphony-94-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "조용하고 단순한 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-94-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "갑작스럽게 큰 화음이 등장하는 순간",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-94-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주제가 다른 악기와 화음으로 변주되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-94-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "마지막의 가벼운 정리",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "schubert-symphony-8",
    titleKo: "슈베르트 교향곡 8번 ‘미완성’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Franz+Schubert+Symphony+No.+8+Unfinished+D.759+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "schubert-symphony-8-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "낮은 현악기의 어두운 도입",
        status: "TODO_VERIFY",
      },
      {
        id: "schubert-symphony-8-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "오보에와 클라리넷의 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "schubert-symphony-8-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첼로가 노래하는 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "schubert-symphony-8-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "강한 합주로 긴장이 커지는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "beethoven-symphony-9",
    titleKo: "베토벤 교향곡 9번 ‘합창’",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+9+Op.125+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "beethoven-symphony-9-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "앞선 악장들이 짧게 회상되는 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-9-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "낮은 현악기의 레치타티보",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-9-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "환희의 주제가 조용히 등장하는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-9-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "독창과 합창이 합쳐지는 절정",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "mendelssohn-symphony-4",
    titleKo: "멘델스존 교향곡 4번 ‘이탈리아’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Felix+Mendelssohn+Symphony+No.+4+Italian+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "mendelssohn-symphony-4-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "빠르고 밝은 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "mendelssohn-symphony-4-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관이 제시하는 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "mendelssohn-symphony-4-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "리듬이 긴장되며 전개되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "mendelssohn-symphony-4-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첫 주제가 돌아오는 활기찬 마무리",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "brahms-symphony-1",
    titleKo: "브람스 교향곡 1번",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Johannes+Brahms+Symphony+No.+1+Op.68+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "brahms-symphony-1-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "어두운 서주와 긴장",
        status: "TODO_VERIFY",
      },
      {
        id: "brahms-symphony-1-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "호른이 멀리서 들려오는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "brahms-symphony-1-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 넓고 노래하는 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "brahms-symphony-1-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "금관과 전체 오케스트라의 결말",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "tchaikovsky-symphony-5",
    titleKo: "차이콥스키 교향곡 5번",
    recommendedStart: "2악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Pyotr+Ilyich+Tchaikovsky+Symphony+No.+5+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "tchaikovsky-symphony-5-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 조용한 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-5-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "호른의 긴 서정적 선율",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-5-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "운명 주제가 갑자기 개입하는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-5-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "호른 주제가 다시 확대되는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "haydn-symphony-45",
    titleKo: "하이든 교향곡 45번 ‘고별’",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Joseph+Haydn+Symphony+No.+45+Farewell+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "haydn-symphony-45-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "빠른 피날레의 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-45-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "음악이 갑자기 느려지는 아다지오",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-45-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "연주자들이 차례로 빠지는 과정",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-45-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "소수의 현악기만 남는 마지막",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "haydn-symphony-101",
    titleKo: "하이든 교향곡 101번 ‘시계’",
    recommendedStart: "2악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Joseph+Haydn+Symphony+No.+101+Clock+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "haydn-symphony-101-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "바순과 현악의 규칙적인 시계 리듬",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-101-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주제가 부드럽게 전개되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-101-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "강한 단조 분위기로 바뀌는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "haydn-symphony-101-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "처음의 시계 리듬이 돌아오는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "mozart-symphony-41",
    titleKo: "모차르트 교향곡 41번 ‘주피터’",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Wolfgang+Amadeus+Mozart+Symphony+No.+41+Jupiter+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "mozart-symphony-41-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "짧고 단순한 첫 동기",
        status: "TODO_VERIFY",
      },
      {
        id: "mozart-symphony-41-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "여러 주제가 차례로 소개되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "mozart-symphony-41-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주제들이 모방하며 겹치는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "mozart-symphony-41-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "여러 주제가 동시에 결합되는 코다",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "beethoven-symphony-3",
    titleKo: "베토벤 교향곡 3번 ‘영웅’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Ludwig+van+Beethoven+Symphony+No.+3+Eroica+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "beethoven-symphony-3-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "두 개의 강한 시작 화음",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-3-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첼로가 제시하는 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-3-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관이 주제를 이어받는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "beethoven-symphony-3-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "대조적인 두 번째 주제",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "schumann-symphony-3",
    titleKo: "슈만 교향곡 3번 ‘라인’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Robert+Schumann+Symphony+No.+3+Rhenish+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "schumann-symphony-3-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "힘차고 넓은 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "schumann-symphony-3-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "리듬이 흔들리며 추진력을 만드는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "schumann-symphony-3-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관과 현악의 부드러운 대비",
        status: "TODO_VERIFY",
      },
      {
        id: "schumann-symphony-3-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첫 주제가 장대하게 돌아오는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "brahms-symphony-4",
    titleKo: "브람스 교향곡 4번",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Johannes+Brahms+Symphony+No.+4+Op.98+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "brahms-symphony-4-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "반복되는 베이스 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "brahms-symphony-4-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "변주마다 악기와 리듬이 달라지는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "brahms-symphony-4-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "플루트의 조용한 독주",
        status: "TODO_VERIFY",
      },
      {
        id: "brahms-symphony-4-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "전체 오케스트라의 비극적 결말",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "tchaikovsky-symphony-4",
    titleKo: "차이콥스키 교향곡 4번",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Pyotr+Ilyich+Tchaikovsky+Symphony+No.+4+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "tchaikovsky-symphony-4-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "금관이 제시하는 운명 동기",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-4-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 불안한 왈츠형 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-4-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관의 부드러운 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-4-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "운명 동기가 다시 덮쳐오는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "tchaikovsky-symphony-6",
    titleKo: "차이콥스키 교향곡 6번 ‘비창’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Pyotr+Ilyich+Tchaikovsky+Symphony+No.+6+Path%C3%A9tique+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "tchaikovsky-symphony-6-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "바순의 낮고 어두운 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-6-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 서정적인 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-6-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "갑작스럽게 폭발하는 발전부",
        status: "TODO_VERIFY",
      },
      {
        id: "tchaikovsky-symphony-6-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첫 선율이 어둡게 돌아오는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "dvorak-symphony-8",
    titleKo: "드보르자크 교향곡 8번",
    recommendedStart: "3악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Anton%C3%ADn+Dvo%C5%99%C3%A1k+Symphony+No.+8+Op.88+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "dvorak-symphony-8-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 우아한 왈츠 선율",
        status: "TODO_VERIFY",
      },
      {
        id: "dvorak-symphony-8-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관이 더 밝게 대답하는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "dvorak-symphony-8-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "중간 트리오의 민속 춤 같은 변화",
        status: "TODO_VERIFY",
      },
      {
        id: "dvorak-symphony-8-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "빠른 코다로 전환되는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "sibelius-symphony-2",
    titleKo: "시벨리우스 교향곡 2번",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Jean+Sibelius+Symphony+No.+2+Op.43+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "sibelius-symphony-2-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "3악장에서 쉼 없이 이어지는 전환",
        status: "TODO_VERIFY",
      },
      {
        id: "sibelius-symphony-2-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기의 장대한 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "sibelius-symphony-2-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관의 부드럽고 쓸쓸한 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "sibelius-symphony-2-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "금관과 팀파니가 확대하는 결말",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "mahler-symphony-1",
    titleKo: "말러 교향곡 1번 ‘거인’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Gustav+Mahler+Symphony+No.+1+Titan+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "mahler-symphony-1-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "아주 작은 자연의 소리와 지속음",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-1-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "멀리서 들리는 듯한 관악 신호",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-1-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "첼로가 시작하는 밝은 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-1-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "전체 오케스트라가 깨어나는 절정",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "mahler-symphony-2",
    titleKo: "말러 교향곡 2번 ‘부활’",
    recommendedStart: "5악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Gustav+Mahler+Symphony+No.+2+Resurrection+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "mahler-symphony-2-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "거대한 충격으로 시작하는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-2-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "무대 밖 금관과 멀리 있는 소리",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-2-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "합창이 아주 작게 등장하는 순간",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-2-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "합창·오르간·오케스트라의 최종 절정",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "mahler-symphony-5",
    titleKo: "말러 교향곡 5번",
    recommendedStart: "4악장 아다지에토",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Gustav+Mahler+Symphony+No.+5+Adagietto+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "mahler-symphony-5-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "현악기와 하프의 조용한 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-5-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "바이올린 선율이 길게 이어지는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-5-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "중간에서 강약과 화음이 커지는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "mahler-symphony-5-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "처음의 고요함으로 돌아오는 마무리",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "shostakovich-symphony-5",
    titleKo: "쇼스타코비치 교향곡 5번",
    recommendedStart: "4악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Dmitri+Shostakovich+Symphony+No.+5+Op.47+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "shostakovich-symphony-5-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "타악기와 금관의 강한 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "shostakovich-symphony-5-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "빠른 리듬이 밀어붙이는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "shostakovich-symphony-5-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "느리고 어두운 중간 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "shostakovich-symphony-5-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "반복되는 음과 금관의 거대한 결말",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "shostakovich-symphony-7",
    titleKo: "쇼스타코비치 교향곡 7번 ‘레닌그라드’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Dmitri+Shostakovich+Symphony+No.+7+Leningrad+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "shostakovich-symphony-7-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "평온한 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "shostakovich-symphony-7-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "스네어 드럼 위에서 행진 주제가 시작되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "shostakovich-symphony-7-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "악기가 계속 추가되며 커지는 반복",
        status: "TODO_VERIFY",
      },
      {
        id: "shostakovich-symphony-7-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "행진 뒤 남는 어둡고 조용한 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "prokofiev-symphony-1",
    titleKo: "프로코피예프 교향곡 1번 ‘고전’",
    recommendedStart: "1악장",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Sergei+Prokofiev+Symphony+No.+1+Classical+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "prokofiev-symphony-1-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "재치 있고 빠른 첫 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "prokofiev-symphony-1-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "목관이 제시하는 가벼운 두 번째 주제",
        status: "TODO_VERIFY",
      },
      {
        id: "prokofiev-symphony-1-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주제가 예상 밖의 조성으로 이동하는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "prokofiev-symphony-1-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "짧고 활기찬 코다",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "isang-yun-symphony-1",
    titleKo: "윤이상 교향곡 1번",
    recommendedStart: "검수 대상",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Isang+Yun+Symphony+No.+1+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "isang-yun-symphony-1-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "작은 음향층이 형성되는 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-1-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "관악기와 현악기의 긴장 관계",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-1-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "강한 타악과 관현악 밀도가 커지는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-1-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "음향이 정리되며 다음 구조로 이동하는 부분",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "isang-yun-symphony-2",
    titleKo: "윤이상 교향곡 2번",
    recommendedStart: "검수 대상",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Isang+Yun+Symphony+No.+2+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "isang-yun-symphony-2-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주요 음향 재료가 제시되는 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-2-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "악기군 사이의 음색 이동",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-2-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "큰 음향 덩어리로 확대되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-2-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "대조적인 정적 또는 약음 구간",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "isang-yun-symphony-4",
    titleKo: "윤이상 교향곡 4번 ‘어둠 속에서 노래하다’",
    recommendedStart: "검수 대상",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Isang+Yun+Symphony+No.+4+Im+Dunkeln+singen+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "isang-yun-symphony-4-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "어두운 음색의 시작",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-4-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "독주적 선율과 오케스트라의 대화",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-4-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "밀도 높은 중심부",
        status: "TODO_VERIFY",
      },
      {
        id: "isang-yun-symphony-4-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "마지막으로 이어지는 음향의 변화",
        status: "TODO_VERIFY",
      },
    ],
  },
  {
    symphonyId: "choi-sung-hwan-arirang-fantasy",
    titleKo: "최성환 아리랑 환상곡",
    recommendedStart: "검수 대상",
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Choi+Sung-hwan+Arirang+Fantasy+orchestra+full+official+orchestra",
    videoStatus: "TODO_SELECT_FINAL_VIDEO",
    timelineStatus: "TODO_VERIFY_TIMELINE",
    events: [
      {
        id: "choi-sung-hwan-arirang-fantasy-draft-1",
        order: 1,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "아리랑 주제가 처음 제시되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "choi-sung-hwan-arirang-fantasy-draft-2",
        order: 2,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "주제를 다른 악기군이 이어받는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "choi-sung-hwan-arirang-fantasy-draft-3",
        order: 3,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "리듬과 화음이 확대되는 부분",
        status: "TODO_VERIFY",
      },
      {
        id: "choi-sung-hwan-arirang-fantasy-draft-4",
        order: 4,
        seconds: null,
        timeLabel: "시간 미확정",
        description: "전체 오케스트라의 절정",
        status: "TODO_VERIFY",
      },
    ],
  },
];


const verifiedTimelineMap = new Map(
  verifiedSymphonyTimelines.map((timeline) => [
    timeline.symphonyId,
    timeline,
  ]),
);

const timelineDraftMap = new Map(
  timelineDrafts.map((draft) => [draft.symphonyId, draft]),
);

export const getVerifiedSymphonyTimeline = (symphonyId: string) =>
  verifiedTimelineMap.get(symphonyId);

export const getSymphonyTimelineDraft = (symphonyId: string) =>
  timelineDraftMap.get(symphonyId);

export const hasSeekableTimeline = (symphonyId: string): boolean =>
  verifiedTimelineMap.has(symphonyId);

export const getTimelineViewModel = (symphonyId: string) => {
  const verified = getVerifiedSymphonyTimeline(symphonyId);

  if (verified) {
    return {
      kind: "verified" as const,
      seekEnabled: true,
      timeline: verified,
    };
  }

  const draft = getSymphonyTimelineDraft(symphonyId);

  return {
    kind: "draft" as const,
    seekEnabled: false,
    timeline: draft ?? null,
  };
};

export const validateVerifiedTimelines = () => {
  const errors: string[] = [];

  for (const timeline of verifiedSymphonyTimelines) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(timeline.youtubeVideoId)) {
      errors.push(
        `${timeline.symphonyId}: YouTube ID 형식이 올바르지 않습니다.`,
      );
    }

    const sorted = [...timeline.items].sort(
      (a, b) => a.seconds - b.seconds,
    );

    if (
      sorted.some(
        (item, index) =>
          index > 0 &&
          item.seconds <= sorted[index - 1].seconds,
      )
    ) {
      errors.push(
        `${timeline.symphonyId}: 타임라인 시간이 오름차순이 아닙니다.`,
      );
    }

    if (
      timeline.items.some(
        (item) =>
          item.status !== "VERIFIED" ||
          item.seconds < 0,
      )
    ) {
      errors.push(
        `${timeline.symphonyId}: 검수되지 않은 항목이 verified 배열에 있습니다.`,
      );
    }
  }

  return errors;
};

/**
 * React 사용 예시
 *
 * const viewModel = getTimelineViewModel(symphonyId);
 *
 * if (viewModel.kind === "verified") {
 *   return viewModel.timeline.items.map((item) => (
 *     <button
 *       key={item.id}
 *       onClick={() => player.seekTo(item.seconds, true)}
 *     >
 *       {item.timeLabel} {item.description}
 *     </button>
 *   ));
 * }
 *
 * return viewModel.timeline?.events.map((event) => (
 *   <div key={event.id}>
 *     <span>{event.timeLabel}</span>
 *     <p>{event.description}</p>
 *     <span>시간 검수 전</span>
 *   </div>
 * ));
 */
