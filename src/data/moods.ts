import type { Mood } from "@/types";

export const moods: Mood[] = [
  { id: "relaxed-night", slug: "relaxed-night", label: "편안한 밤", emoji: "🌙", description: "하루를 내려놓고 어깨를 푸는 밤에 어울립니다.", trackIds: [] },
  { id: "rainy-day", slug: "rainy-day", label: "비 오는 날", emoji: "🌧️", description: "창밖의 빗소리와 어우러지는 서정적인 곡들.", trackIds: [] },
  { id: "cafe", slug: "cafe", label: "카페", emoji: "☕", description: "커피 한 잔과 책상에 두고 싶은 배경음.", trackIds: [] },
  { id: "focus", slug: "focus", label: "집중할 때", emoji: "🎧", description: "방해하지 않으면서 흐름을 만들어 주는 곡들.", trackIds: [] },
  { id: "drive", slug: "drive", label: "드라이브", emoji: "🚗", description: "도로 위 풍경과 잘 맞는 리듬감 있는 곡들.", trackIds: [] },
  { id: "romantic", slug: "romantic", label: "로맨틱", emoji: "💐", description: "두 사람의 거리를 좁혀 주는 달콤한 곡들.", trackIds: [] },
  { id: "energetic", slug: "energetic", label: "활기찬", emoji: "🔥", description: "심장 박동을 끌어올리는 신나는 곡들.", trackIds: [] },
  { id: "melancholy", slug: "melancholy", label: "쓸쓸한", emoji: "🌫️", description: "적당한 아련함을 곁들인 곡들.", trackIds: [] },
  { id: "warm", slug: "warm", label: "따뜻한", emoji: "🧣", description: "포근한 음색이 마음을 감싸는 곡들.", trackIds: [] },
  { id: "tense", slug: "tense", label: "긴장감 있는", emoji: "🎬", description: "영화의 한 장면 같은 긴장감을 주는 곡들.", trackIds: [] },
  { id: "experimental", slug: "experimental", label: "실험적인", emoji: "🧪", description: "익숙한 틀을 깨는 도전적인 연주.", trackIds: [] },
  { id: "morning", slug: "morning", label: "아침에 듣기 좋은", emoji: "🌅", description: "하루를 부드럽게 여는 밝은 곡들.", trackIds: [] },
  { id: "late-night", slug: "late-night", label: "늦은 밤 혼자 듣기 좋은", emoji: "🌃", description: "모두 잠든 시간에 어울리는 깊은 곡들.", trackIds: [] },
];

export const moodMap = new Map(moods.map((m) => [m.id, m]));
