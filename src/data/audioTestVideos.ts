import type { AudioTestVideo } from "@/types/audioTestVideo";

/**
 * 오디오 테스트 곡의 YouTube 영상 선택 (조회수 정렬 검색 기반, 2026-10-04)
 * ⚠️ 일부는 라이브/커버 영상일 수 있다. 음질 비교용 원본 음원은 externalServices(음원 서비스) 우선.
 */
export const audioTestVideos: Record<string, AudioTestVideo> = {
  "eagles-hotel-california-hell-freezes-over": { youtubeVideoId: "09839DpTctU", title: "Eagles - Hotel California (Live 1977) Official Video", channel: "Eagles", length: "6:45", lastVerifiedAt: "2026-10-04" },
  "michael-jackson-billie-jean": { youtubeVideoId: "Zi_XLOBDo_Y", title: "Michael Jackson - Billie Jean (Official Video)", channel: "Michael Jackson", length: "4:56", lastVerifiedAt: "2026-10-04" },
  "norah-jones-dont-know-why": { youtubeVideoId: "tO4dxvguQDk", title: "Norah Jones - Don't Know Why", channel: "Norah Jones", length: "3:03", lastVerifiedAt: "2026-10-04" },
  "daft-punk-giorgio-by-moroder": { youtubeVideoId: "zhl-Cs1-sG4", title: "Daft Punk - Giorgio by Moroder (Official Audio)", channel: "Daft Punk", length: "9:04", lastVerifiedAt: "2026-10-04" },
  "nils-lofgren-keith-dont-go": { youtubeVideoId: "s6_B1AB9nu8", title: "Nils Lofgren - Keith Don't Go [CD Quality]", channel: "Oisín Fahy", length: "6:51", lastVerifiedAt: "2026-10-04" },
  "dave-brubeck-take-five": { youtubeVideoId: "vmDDOFXSgAs", title: "Dave Brubeck - Take Five", channel: "buckinny", length: "5:30", lastVerifiedAt: "2026-10-04" },
  "lorde-royals": { youtubeVideoId: "nlcIKh6sBtc", title: "Lorde - Royals (US Version)", channel: "Lorde", length: "3:21", lastVerifiedAt: "2026-10-04" },
  "chris-jones-no-sanctuary-here": { youtubeVideoId: "6z11VNEgVl4", title: "Chris Jones - No Sanctuary Here", channel: "Maxim Konovalov", length: "3:47", lastVerifiedAt: "2026-10-04" },
  "fleetwood-mac-dreams": { youtubeVideoId: "swJOIjjW69U", title: "Fleetwood Mac - Dreams (2004 Remaster)", channel: "Fleetwood Mac", length: "4:18", lastVerifiedAt: "2026-10-04" },
  "hans-zimmer-mountains": { youtubeVideoId: "o_Ay_iDRAbc", title: "Hans Zimmer - Interstellar OST", channel: "", length: "", lastVerifiedAt: "2026-10-04" },
  "park-hyo-shin-wild-flower": { youtubeVideoId: "OxgiiyLp5pk", title: "박효신 - 야생화 Special Video", channel: "Jellyfishenter", length: "5:40", lastVerifiedAt: "2026-10-04" },
  "iu-good-day": { youtubeVideoId: "jeqdYqsrsA0", title: "아이유 - 좋은 날 MV", channel: "1theK (원더케이)", length: "5:58", lastVerifiedAt: "2026-10-04" },
  "newjeans-ditto": { youtubeVideoId: "V6TEcoNUmc8", title: "NewJeans - Ditto", channel: "NewJeans", length: "3:06", lastVerifiedAt: "2026-10-04" },
  "taeyeon-invu": { youtubeVideoId: "AbZH7XWDW_k", title: "태연 - INVU MV", channel: "SMTOWN", length: "3:38", lastVerifiedAt: "2026-10-04" },
  "gidle-tomboy": { youtubeVideoId: "Jh4QFaPmdss", title: "(여자)아이들 - TOMBOY Official MV", channel: "i-dle (아이들)", length: "3:18", lastVerifiedAt: "2026-10-04" },
  "younha-event-horizon": { youtubeVideoId: "BBdC1rl5sKY", title: "윤하 - 사건의 지평선 M/V", channel: "YOUNHA OFFICIAL", length: "5:28", lastVerifiedAt: "2026-10-04" },
  "ailee-i-will-go-to-you-like-first-snow": { youtubeVideoId: "6rS7OUGXUik", title: "에일리 - 첫눈처럼 너에게 가겠다 (Official Audio)", channel: "STONE MUSIC", length: "3:51", lastVerifiedAt: "2026-10-04" },
  "yoo-jae-ha-because-i-love-you": { youtubeVideoId: "pqY3tP-kpk0", title: "그대 내 품에 - 하동균 (유재하 작)", channel: "kpopparazzime", length: "6:19", lastVerifiedAt: "2026-10-04" },
  "leenalchi-tiger-is-coming": { youtubeVideoId: "SmTRaSg2fTQ", title: "이날치 - 범 내려온다 (온스테이지2.0)", channel: "온스테이지ONSTAGE", length: "5:37", lastVerifiedAt: "2026-10-04" },
  "song-sohee-arirang": { youtubeVideoId: "H_2yhCjGQuQ", title: "송소희 - 아리랑 (열린음악회)", channel: "KBS Kpop", length: "3:53", lastVerifiedAt: "2026-10-04" },
};
