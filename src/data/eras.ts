import type { Era } from "@/types";

export const eras: Era[] = [
  {
    id: "roots",
    slug: "roots",
    name: "재즈의 뿌리와 초기 재즈",
    period: "1900년대 이전~1910년대",
    summary:
      "재즈는 미국 남부, 특히 뉴올리언스의 아프리카계 미국인 공동체에서 블루스, 래그타임, 군악대 음악이 섞여 태어났습니다. 여러 악기가 동시에 즉흥적으로 노래하던 집단 즉흥연주가 초기 재즈의 큰 특징입니다.",
    keyFeatures: [
      "블루스와 래그타임에서 나온 리듬과 선율",
      "여러 악기가 함께 즉흥연주하는 집합 즉흥",
      "뉴올리언스 거리와 소극장에서 자란 음악",
    ],
    styleIds: ["swing"],
    trackIds: [],
  },
  {
    id: "1920s",
    slug: "1920s",
    name: "1920년대: 뉴올리언스와 초기 재즈",
    period: "1920년대",
    summary:
      "루이 암스트롱 등 거장들이 등장하며 재즈가 녹음과 라디오를 통해 전국으로 퍼진 시기입니다. 솔로 즉흥연주가 본격적으로 주인공이 되기 시작했습니다.",
    keyFeatures: ["솔로 즉흥연주의 부상", "레코드 산업과 함께 성장", "뉴올리언스에서 시카고·뉴욕으로 이동"],
    styleIds: ["swing"],
    trackIds: [],
  },
  {
    id: "1930s",
    slug: "1930s",
    name: "1930년대: 스윙과 빅밴드",
    period: "1930년대",
    summary:
      "빅밴드가 미국 대중음악의 중심이 된 시대입니다. 춤추기 좋은 스윙 리듬과 화려한 앙상블, 베니 굿맨·듀크 엘링턴 같은 리더들이 재즈의 첫 전성기를 만들었습니다.",
    keyFeatures: ["춤추기 좋은 스윙 리듬", "10여 명 이상의 빅밴드 편곡", "재즈가 대중 스타가 된 시기"],
    styleIds: ["swing", "big-band"],
    trackIds: ["sing-sing-sing"],
  },
  {
    id: "1940s",
    slug: "1940s",
    name: "1940년대: 비밥",
    period: "1940년대",
    summary:
      "소규모 콤보가 빅밴드를 대신하며 비밥이 등장했습니다. 빠른 템포, 복잡한 화성, 화려한 즉흥연주로 재즈를 '듣는 음악'으로 바꾼 시기입니다.",
    keyFeatures: ["빠른 템포와 어려운 멜로디", "소규모 콤보 중심", "즉흥연주가 기술의 무대로"],
    styleIds: ["bebop", "swing", "big-band"],
    trackIds: ["c-jam-blues", "take-the-a-train", "ko-ko"],
  },
  {
    id: "1950s",
    slug: "1950s",
    name: "1950년대: 쿨 재즈와 하드 밥",
    period: "1950년대",
    summary:
      "비밥 이후 재즈는 두 갈래로 갈라집니다. 서해안에서는 차분하고 세련된 쿨 재즈가, 동해안에서는 블루스의 열기를 되살린 하드 밥이 유행했습니다. 이 시기 명반들이 오늘날 재즈 입문의 표준이 되었습니다.",
    keyFeatures: ["차분한 쿨 재즈 vs 뜨거운 하드 밥", "재즈 명반 러시 (Kind of Blue 등)", "LP 앨범이 예술 작품으로 자리 잡음"],
    styleIds: ["cool-jazz", "hard-bop", "modal-jazz", "soul-jazz", "vocal-jazz"],
    trackIds: ["take-five", "so-what", "blue-in-green", "moanin", "autumn-leaves", "cheek-to-cheek"],
  },
  {
    id: "1960s",
    slug: "1960s",
    name: "1960년대: 모달과 프리 재즈",
    period: "1960년대",
    summary:
      "코드에서 벗어나 음계(모드) 위에서 노래하는 모달 재즈가 전성기를 맞고, 한편으로는 형식 자체를 해체한 프리 재즈가 등장했습니다. 보사노바와의 만남도 이 시기의 일입니다.",
    keyFeatures: ["모달 재즈의 전성기", "프리 재즈라는 급진적 실험", "보사노바와의 결합"],
    styleIds: ["modal-jazz", "free-jazz", "bossa-nova", "soul-jazz", "cool-jazz", "vocal-jazz"],
    trackIds: ["my-favorite-things", "waltz-for-debby", "what-a-wonderful-world", "the-girl-from-ipanema", "cantaloupe-island"],
  },
  {
    id: "1970s",
    slug: "1970s",
    name: "1970년대: 퓨전",
    period: "1970년대",
    summary:
      "일렉트릭 악기와 록, 펑크의 리듬을 받아들인 퓨전이 주류가 되었습니다. 재즈가 대중음악의 전기적 사운드와 만난 시기입니다.",
    keyFeatures: ["일렉트릭 피아노와 일렉 기타", "록·펑크 리듬과의 결합", "대중적 인기의 회복"],
    styleIds: ["jazz-fusion", "contemporary-jazz"],
    trackIds: ["birdland"],
  },
  {
    id: "1980s-90s",
    slug: "1980s-90s",
    name: "1980~1990년대",
    period: "1980~1990년대",
    summary:
      "전통 재즈의 회복과 신선한 스타일의 공존이 이어진 시기입니다. 스윙의 부흥, 네오밥, 스무드 재즈 등 다양한 흐름이 나타났습니다.",
    keyFeatures: ["어쿠스틱 재즈의 부흥", "다양한 하위 장르의 공존", "음악대학 출신 연주자들의 대거 등장"],
    styleIds: ["contemporary-jazz"],
    trackIds: [],
  },
  {
    id: "2000s",
    slug: "2000s",
    name: "2000년대 이후 현대 재즈",
    period: "2000년대~현재",
    summary:
      "힙합, R&B, 월드뮤직과 자유롭게 섞이는 현대 재즈 시대입니다. 스트리밍 덕분에 지구 반대편의 신진 연주자도 같은 시청자를 만나게 되었습니다.",
    keyFeatures: ["힙합·R&B와의 경계 허물기", "다양한 배경의 젊은 연주자들", "스트리밍 시대의 재즈"],
    styleIds: ["contemporary-jazz", "jazz-fusion"],
    trackIds: [],
  },
];

export const eraMap = new Map(eras.map((e) => [e.id, e]));
