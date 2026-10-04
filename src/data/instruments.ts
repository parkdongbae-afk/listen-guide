import type { Instrument } from "@/types";

export const instruments: Instrument[] = [
  { id: "vocals", slug: "vocals", name: "Vocals", nameKo: "보컬", role: "노래로 이야기를 전합니다.", trackIds: [] },
  { id: "trumpet", slug: "trumpet", name: "Trumpet", nameKo: "트럼펫", role: "밝고 힘찬 소리부터 나팔 같은 신호음까지 담당합니다.", trackIds: [] },
  { id: "alto-sax", slug: "alto-sax", name: "Alto Saxophone", nameKo: "알토 색소폰", role: "맑고 부드러운 음색의 색소폰입니다.", trackIds: [] },
  { id: "tenor-sax", slug: "tenor-sax", name: "Tenor Saxophone", nameKo: "테너 색소폰", role: "따뜻하고 깊은 음색의 색소폰입니다.", trackIds: [] },
  { id: "soprano-sax", slug: "soprano-sax", name: "Soprano Saxophone", nameKo: "소프라노 색소폰", role: "직선처럼 날카롭고 맑은 가장 높은 색소폰입니다.", trackIds: [] },
  { id: "piano", slug: "piano", name: "Piano", nameKo: "피아노", role: "화음을 깔고 솔로를 연주하며 곡의 뼈대를 세웁니다.", trackIds: [] },
  { id: "guitar", slug: "guitar", name: "Guitar", nameKo: "기타", role: "부드러운 화음과 리듬을 담당합니다.", trackIds: [] },
  { id: "bass", slug: "bass", name: "Double Bass", nameKo: "베이스", role: "걸어가는 듯한 저음으로 곡의 바닥을 만듭니다.", trackIds: [] },
  { id: "drums", slug: "drums", name: "Drums", nameKo: "드럼", role: "곡의 숨결과 흥을 책임집니다.", trackIds: [] },
  { id: "vibraphone", slug: "vibraphone", name: "Vibraphone", nameKo: "비브라폰", role: "금속 음이 몽환적으로 울리는 건반 타악기입니다.", trackIds: [] },
  { id: "clarinet", slug: "clarinet", name: "Clarinet", nameKo: "클라리넷", role: "스윙 시대의 애교 넘치는 목관 악기입니다.", trackIds: [] },
  { id: "trombone", slug: "trombone", name: "Trombone", nameKo: "트롬본", role: "빅밴드에서 낮은 관음을 채웁니다.", trackIds: [] },
  { id: "organ", slug: "organ", name: "Organ", nameKo: "오르간", role: "두터운 화음으로 소울 재즈의 뿌리를 담당합니다.", trackIds: [] },
];

export const instrumentMap = new Map(instruments.map((i) => [i.id, i]));
