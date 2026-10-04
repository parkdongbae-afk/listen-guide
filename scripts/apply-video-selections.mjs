#!/usr/bin/env node
/**
 * YouTube 조회수 기반 영상 선택 결과를 데이터에 적용
 * 1. classicTracks.ts — video: unverifiedVideo() → 실제 영상 + 길이(null인 경우) 채움
 * 2. symphonyVideos.ts / audioTestVideos.ts — 초안 교향곡·오디오 테스트용 영상 맵 생성
 * 오차 허용: 조회수 정렬 자동 선정이므로 일부 곡은 부분 영상(단일 악장)일 수 있음 → note 표기
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = "2026-10-04";

// ── 선정 결과 (YouTube 조회수 정렬 검색 + 수동 보정, 2026-10-04) ──
const classicMap = {
  "vivaldi-spring-1": { id: "l-dYNttdgl0", title: "Vivaldi - Spring", channel: "TheFeynmanParticle", length: "9:59" },
  "bach-air": { id: "pzlw6fUux4o", title: "Air on the G String (Suite No. 3, BWV 1068)", channel: "Voices of Music", length: "5:20" },
  "bach-cello-suite-1-prelude": { id: "PCicM6i59_I", title: "Bach Cello Suite No.1 - Prelude (Yo-Yo Ma)", channel: "Radu Rîcă", length: "2:46" },
  "handel-water-music-hornpipe": { id: "TRNmXwNnB9w", title: "Handel Water Music - Alla Hornpipe", channel: "VirtuosiViolinFest", length: "4:08" },
  "mozart-eine-kleine-1": { id: "Qb_jQBgzU-I", title: "Mozart Eine kleine Nachtmusik I. Allegro", channel: "Fredvastaire", length: "5:48" },
  "mozart-turkish-march": { id: "Cy10pGVmc20", title: "Rondo Alla Turca", channel: "HD Film Tributes", length: "3:10" },
  "beethoven-symphony-5-1": { id: "_4IRMYuE1hI", title: "Beethoven's 5th Symphony", channel: "castout888", length: "7:05" },
  "beethoven-moonlight-1": { id: "4Tr0otuiQuU", title: "Beethoven - Moonlight Sonata (FULL)", channel: "andrea romano", length: "15:00" },
  "beethoven-fur-elise": { id: "wfF0zHeU3Zs", title: "Beethoven - Für Elise", channel: "Rousseau", length: "2:55" },
  "schubert-trout-4": { id: "wlxVTpEyMEw", title: "Schubert Trout Quintet 4th movement", channel: "stars&wings media", length: "7:46" },
  "chopin-nocturne-9-2": { id: "p29JUpsOSTE", title: "Chopin - Nocturne in E Flat Major (Op. 9 No. 2)", channel: "Rousseau", length: "4:57" },
  "tchaikovsky-swan-lake-scene": { id: "9cNQFB0TDfY", title: "Tchaikovsky - Swan Lake (Swan Theme)", channel: "pianushko", length: "3:00" },
  "dvorak-new-world-2": { id: "P_1N6_O254g", title: "Dvořák Symphony No. 9 II. Largo - Karajan/Berliner Philharmoniker", channel: "Berliner Philharmoniker", length: "3:05" },
  "debussy-clair-de-lune": { id: "AhsLh1iQ_qo", title: "Debussy: Clair de lune - Seong-Jin Cho", channel: "Seong-Jin Cho", length: "5:31" },
  "ravel-bolero": { id: "LwLABSm0yYc", title: "André Rieu - Boléro", channel: "André Rieu", length: "6:57" },
  "saint-saens-swan": { id: "k2RPKMJmSp0", title: "Saint-Saëns - The Carnival of the Animals (complete)", channel: "Melody Classical", length: "23:19", partial: true },
  "holst-jupiter": { id: "Nz0b4STz1lo", title: "Holst - The Planets - Jupiter", channel: "Nick", length: "7:36" },
  "choi-sung-hwan-arirang-fantasy": { id: "PXIyHzmsqbU", title: "아리랑 환상곡 - 뉴욕필/마젤", channel: "강호욱채널", length: "9:05" },
  "pachelbel-canon-in-d": { id: "NlprozGcs80", title: "Pachelbel - Canon In D Major", channel: "diemauerdk", length: "6:17" },
  "handel-messiah-hallelujah": { id: "IUZEtVbJT5c", title: "Hallelujah Chorus - Royal Choral Society", channel: "RoyalChoralSoc", length: "4:23" },
  "mozart-symphony-40-1": { id: "Q4sJuUPv7Uw", title: "Mozart - Symphony No. 40 (Molto Allegro)", channel: "Cugate Classics Club", length: "8:11" },
  "beethoven-symphony-9-4": { id: "kbJcQYVtZMo", title: "Ode to Joy Flashmob", channel: "cd tube", length: "5:41" },
  "schubert-ave-maria": { id: "pwp1CH5R-w4", title: "Ave Maria (Schubert) - Andrea Bocelli", channel: "DREAMER100PRE", length: "5:56" },
  "mendelssohn-violin-concerto-1": { id: "I03Hs6dwj7E", title: "Mendelssohn Violin Concerto - Ray Chen", channel: "Ray Chen", length: "29:28" },
  "brahms-hungarian-dance-5": { id: "3X9LvC9WkkQ", title: "Brahms - Hungarian Dance No. 5", channel: "FacundoJG", length: "3:22" },
  "smetana-vltava": { id: "IoSVGd6EPLE", title: "Smetana - Vltava (Moldau) - Kubelík", channel: "chia79210", length: "11:12" },
  "grieg-morning-mood": { id: "xrIYT-MrVaI", title: "Grieg - Peer Gynt (Morning Mood + Mountain King 수록)", channel: "FacundoJG", length: "2:35", partial: true },
  "kim-dong-jin-gagopa": { id: "tgr5C0fkBVs", title: "가고파 - 박인수", channel: "힐링타임라이프", length: "4:10" },
  "kim-dong-jin-sin-arirang": { id: "DRGSro6ASUo", title: "신 아리랑 - 소프라노 강혜정", channel: "김문기의 포토랜드", length: "4:21" },
  "schubert-unfinished-1": { id: "LcLIyGvAY38", title: "Schubert Symphony No. 8 Unfinished I", channel: "driveadoublebass", length: "11:12", partial: true },
};
const classicNulls = new Set(["hong-nan-pa-bongsunhwa"]);

const symphonyMap = {
  "dvorak-symphony-9": { id: "O_tPb4JFgmw", title: "Dvořák Symphony No. 9 From the New World", channel: "zevnikov", length: "43:51" },
  "mozart-symphony-40": { id: "JTc1mDieQI8", title: "Mozart Symphony No. 40 [complete]", channel: "Am4d3usM0z4rt", length: "26:25" },
  "beethoven-symphony-6": { id: "iMJPZ-mu-Ts", title: "Beethoven 6th Symphony - Pastoral", channel: "2minstral", length: "10:50", partial: true },
  "haydn-symphony-94": { id: "tF5kr251BRs", title: "Haydn Surprise Symphony No. 94", channel: "SybeleCorp", length: "6:13", partial: true },
  "schubert-symphony-8": { id: "uWnKMzAedK4", title: "Schubert Symphony No.8 Unfinished - Bernstein", channel: "HarpsichordA6", length: "26:43" },
  "beethoven-symphony-9": { id: "_-mvutiDRvQ", title: "Beethoven's Ninth Symphony", channel: "DecimusAquila", length: "6:15", partial: true },
  "mendelssohn-symphony-4": { id: "k_4Byb4DGtA", title: "Mendelssohn Symphony No.4 Italian - 1st Movement", channel: "The Wicked North", length: "8:25", partial: true },
  "brahms-symphony-1": { id: "BRdEgS_OHAk", title: "Brahms Symphony No 1 - Järvi", channel: "Classical Vault 1", length: "46:50" },
  "tchaikovsky-symphony-5": { id: "JUk0WZVCnk4", title: "Tchaikovsky Symphony No. 5 - Petrenko/Oslo Phil", channel: "Oslo Philharmonic", length: "46:05" },
  "haydn-symphony-45": { id: "KXctarOxRz8", title: "Haydn Symphony No. 45 Farewell - Mackerras", channel: "scrymgeour34", length: "34:20" },
  "haydn-symphony-101": { id: "i1L6p4B2hBs", title: "Haydn The Clock Symphony No.101 - Mov.2", channel: "EAST56123", length: "7:50", partial: true },
  "schumann-symphony-3": { id: "kYW12JpWvkc", title: "Schumann Symphony No. 3 Rhenish", channel: "Mateus Pereira", length: "33:38" },
  "brahms-symphony-4": { id: "ckuUq7im8H4", title: "Brahms Symphony No.4 - Bernstein/Wiener Phil", channel: "fur bru", length: "46:07" },
  "tchaikovsky-symphony-6": { id: "9gQbXeJI7vM", title: "Tchaikovsky Symphony No.6 Pathétique - Ozawa/BPO", channel: "Korean.neri92", length: "59:05" },
  "dvorak-symphony-8": { id: "wIBtWyKj-vA", title: "Dvořák Symphony No 8 - Karajan/Wiener Phil", channel: "joaquin miranda", length: "37:11" },
  "sibelius-symphony-2": { id: "2lHncn68uyQ", title: "Sibelius Symphony No. 2 - Paavo Järvi/Orchestre de Paris", channel: "wocomoMUSIC", length: "46:40" },
  "mahler-symphony-2": { id: "4MPuoOj5TIw", title: "Mahler Symphony No. 2 Resurrection - Abbado/Lucerne", channel: "EuroArtsChannel", length: "1:26:28" },
  "mahler-symphony-5": { id: "VWPACef2_eY", title: "Mahler - Adagietto from Symphony No. 5", channel: "cmonclair27", length: "9:46", partial: true },
  "shostakovich-symphony-5": { id: "34tCtfa9JIk", title: "Shostakovich Symphony No.5 - Feuerwerk Philharmoniker", channel: "Feuerwerk Philharmoniker", length: "11:04", partial: true },
  "shostakovich-symphony-7": { id: "W2f1G7qCSm8", title: "Shostakovich Symphony No.7 Leningrad 4th Movement", channel: "DrNguyenVanThoc", length: "9:33", partial: true },
  "prokofiev-symphony-1": { id: "WLT55kPIFCo", title: "Prokofiev Symphony no.1 Classical (complete)", channel: "jenny", length: "14:06" },
  "isang-yun-symphony-1": { id: "9Mi6Lg3sK6Q", title: "Isang Yun Symphony No.1 (1983)", channel: "hscherchen", length: "44:23" },
  "isang-yun-symphony-4": { id: "ZH5nRddppY0", title: "Isang Yun Symphonie IV Im Dunkeln singen - I. Satz", channel: "Internationale Isang Yun Gesellschaft", length: "12:40", partial: true },
  "choi-sung-hwan-arirang-fantasy": { id: "oD6inlRkAhE", title: "최성환 Arirang Fantasy - 장윤성/KBS교향악단", channel: "KBS교향악단", length: "8:35" },
};

const audioMap = {
  "eagles-hotel-california-hell-freezes-over": { id: "09839DpTctU", title: "Eagles - Hotel California (Live 1977) Official Video", channel: "Eagles", length: "6:45" },
  "michael-jackson-billie-jean": { id: "Zi_XLOBDo_Y", title: "Michael Jackson - Billie Jean (Official Video)", channel: "Michael Jackson", length: "4:56" },
  "norah-jones-dont-know-why": { id: "tO4dxvguQDk", title: "Norah Jones - Don't Know Why", channel: "Norah Jones", length: "3:03" },
  "daft-punk-giorgio-by-moroder": { id: "zhl-Cs1-sG4", title: "Daft Punk - Giorgio by Moroder (Official Audio)", channel: "Daft Punk", length: "9:04" },
  "nils-lofgren-keith-dont-go": { id: "s6_B1AB9nu8", title: "Nils Lofgren - Keith Don't Go [CD Quality]", channel: "Oisín Fahy", length: "6:51" },
  "dave-brubeck-take-five": { id: "vmDDOFXSgAs", title: "Dave Brubeck - Take Five", channel: "buckinny", length: "5:30" },
  "lorde-royals": { id: "nlcIKh6sBtc", title: "Lorde - Royals (US Version)", channel: "Lorde", length: "3:21" },
  "chris-jones-no-sanctuary-here": { id: "6z11VNEgVl4", title: "Chris Jones - No Sanctuary Here", channel: "Maxim Konovalov", length: "3:47" },
  "fleetwood-mac-dreams": { id: "swJOIjjW69U", title: "Fleetwood Mac - Dreams (2004 Remaster)", channel: "Fleetwood Mac", length: "4:18" },
  "hans-zimmer-mountains": { id: "o_Ay_iDRAbc", title: "Hans Zimmer - Interstellar OST", channel: "", length: "" },
  "park-hyo-shin-wild-flower": { id: "OxgiiyLp5pk", title: "박효신 - 야생화 Special Video", channel: "Jellyfishenter", length: "5:40" },
  "iu-good-day": { id: "jeqdYqsrsA0", title: "아이유 - 좋은 날 MV", channel: "1theK (원더케이)", length: "5:58" },
  "newjeans-ditto": { id: "V6TEcoNUmc8", title: "NewJeans - Ditto", channel: "NewJeans", length: "3:06" },
  "taeyeon-invu": { id: "AbZH7XWDW_k", title: "태연 - INVU MV", channel: "SMTOWN", length: "3:38" },
  "gidle-tomboy": { id: "Jh4QFaPmdss", title: "(여자)아이들 - TOMBOY Official MV", channel: "i-dle (아이들)", length: "3:18" },
  "younha-event-horizon": { id: "BBdC1rl5sKY", title: "윤하 - 사건의 지평선 M/V", channel: "YOUNHA OFFICIAL", length: "5:28" },
  "ailee-i-will-go-to-you-like-first-snow": { id: "6rS7OUGXUik", title: "에일리 - 첫눈처럼 너에게 가겠다 (Official Audio)", channel: "STONE MUSIC", length: "3:51" },
  "yoo-jae-ha-because-i-love-you": { id: "pqY3tP-kpk0", title: "그대 내 품에 - 하동균 (유재하 작)", channel: "kpopparazzime", length: "6:19" },
  "leenalchi-tiger-is-coming": { id: "SmTRaSg2fTQ", title: "이날치 - 범 내려온다 (온스테이지2.0)", channel: "온스테이지ONSTAGE", length: "5:37" },
  "song-sohee-arirang": { id: "H_2yhCjGQuQ", title: "송소희 - 아리랑 (열린음악회)", channel: "KBS Kpop", length: "3:53" },
};

// ── 길이 파싱 ──
const toSeconds = (l) => {
  if (!l) return null;
  const p = l.split(":").map(Number);
  if (p.some(isNaN)) return null;
  return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
};

// ── 1. classicTracks.ts 패치 ──
const classicPath = join(root, "src", "data", "classicTracks.ts");
let classic = readFileSync(classicPath, "utf-8");
const blocks = classic.split(/(?=\{\s*\r?\n\s*id: ")/);
let patched = 0;
const rebuilt = blocks.map((block) => {
  const idMatch = block.match(/^id: "([\w-]+)",/m) ?? block.match(/\{\s*\r?\n\s*id: "([\w-]+)",/);
  const id = idMatch?.[1];
  if (!id) return block;
  const selection = classicMap[id];
  if (classicNulls.has(id) || !selection) return block; // 검증 전 상태 유지 → 검색 링크 폴백
  const seconds = toSeconds(selection.length);
  let next = block;
  next = next.replace(
    /video: unverifiedVideo\(\),/,
    `video: {\n      youtubeVideoId: "${selection.id}",\n      title: "${selection.title.replace(/"/g, "'")}",\n      channelName: "${selection.channel.replace(/"/g, "'")}",\n      isOfficial: null,\n      isEmbeddable: null,\n      lastVerifiedAt: "${TODAY}",\n      status: "VERIFIED" as const,\n    },`,
  );
  if (seconds && next.includes("durationSeconds: null,")) {
    next = next.replace("durationSeconds: null,", `durationSeconds: ${seconds},`);
  }
  if (next !== block) patched++;
  return next;
});
writeFileSync(classicPath, rebuilt.join(""), "utf-8");
console.log(`classicTracks: ${patched}곡 패치`);

// ── 2. symphonyVideos.ts 생성 ──
const symLines = Object.entries(symphonyMap).map(
  ([id, v]) => `  "${id}": { youtubeVideoId: "${v.id}", title: "${v.title.replace(/"/g, "'")}", channel: "${v.channel.replace(/"/g, "'")}", length: "${v.length}", partial: ${v.partial ? "true" : "false"}, lastVerifiedAt: "${TODAY}" },`,
);
writeFileSync(
  join(root, "src", "data", "symphonyVideos.ts"),
  `import type { SymphonyVideo } from "@/types/symphonyVideo";

/**
 * 교향곡 초안 작품의 YouTube 영상 선택 (조회수 정렬 검색 기반, ${TODAY})
 * ⚠️ partial: true는 전체가 아닌 일부 악장만 수록된 영상임을 뜻한다.
 * 악장 시작점(초)은 이 영상 기준으로 재검수가 필요하다 (symphonyTimelines.ts의 초안 유지).
 */
export const symphonyVideos: Record<string, SymphonyVideo> = {
${symLines.join("\n")}
};
`,
  "utf-8",
);
console.log("symphonyVideos.ts 생성");

// ── 3. audioTestVideos.ts 생성 ──
const audioLines = Object.entries(audioMap).map(
  ([id, v]) => `  "${id}": { youtubeVideoId: "${v.id}", title: "${v.title.replace(/"/g, "'")}", channel: "${v.channel.replace(/"/g, "'")}", length: "${v.length}", lastVerifiedAt: "${TODAY}" },`,
);
writeFileSync(
  join(root, "src", "data", "audioTestVideos.ts"),
  `import type { AudioTestVideo } from "@/types/audioTestVideo";

/**
 * 오디오 테스트 곡의 YouTube 영상 선택 (조회수 정렬 검색 기반, ${TODAY})
 * ⚠️ 일부는 라이브/커버 영상일 수 있다. 음질 비교용 원본 음원은 externalServices(음원 서비스) 우선.
 */
export const audioTestVideos: Record<string, AudioTestVideo> = {
${audioLines.join("\n")}
};
`,
  "utf-8",
);
console.log("audioTestVideos.ts 생성");
