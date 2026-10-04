import type { SymphonyVideo } from "@/types/symphonyVideo";

/**
 * 교향곡 초안 작품의 YouTube 영상 선택 (조회수 정렬 검색 기반, 2026-10-04)
 * ⚠️ partial: true는 전체가 아닌 일부 악장만 수록된 영상임을 뜻한다.
 * 악장 시작점(초)은 이 영상 기준으로 재검수가 필요하다 (symphonyTimelines.ts의 초안 유지).
 */
export const symphonyVideos: Record<string, SymphonyVideo> = {
  "dvorak-symphony-9": { youtubeVideoId: "O_tPb4JFgmw", title: "Dvořák Symphony No. 9 From the New World", channel: "zevnikov", length: "43:51", partial: false, lastVerifiedAt: "2026-10-04" },
  "mozart-symphony-40": { youtubeVideoId: "JTc1mDieQI8", title: "Mozart Symphony No. 40 [complete]", channel: "Am4d3usM0z4rt", length: "26:25", partial: false, lastVerifiedAt: "2026-10-04" },
  "beethoven-symphony-6": { youtubeVideoId: "iMJPZ-mu-Ts", title: "Beethoven 6th Symphony - Pastoral", channel: "2minstral", length: "10:50", partial: true, lastVerifiedAt: "2026-10-04" },
  "haydn-symphony-94": { youtubeVideoId: "tF5kr251BRs", title: "Haydn Surprise Symphony No. 94", channel: "SybeleCorp", length: "6:13", partial: true, lastVerifiedAt: "2026-10-04" },
  "schubert-symphony-8": { youtubeVideoId: "uWnKMzAedK4", title: "Schubert Symphony No.8 Unfinished - Bernstein", channel: "HarpsichordA6", length: "26:43", partial: false, lastVerifiedAt: "2026-10-04" },
  "beethoven-symphony-9": { youtubeVideoId: "_-mvutiDRvQ", title: "Beethoven's Ninth Symphony", channel: "DecimusAquila", length: "6:15", partial: true, lastVerifiedAt: "2026-10-04" },
  "mendelssohn-symphony-4": { youtubeVideoId: "k_4Byb4DGtA", title: "Mendelssohn Symphony No.4 Italian - 1st Movement", channel: "The Wicked North", length: "8:25", partial: true, lastVerifiedAt: "2026-10-04" },
  "brahms-symphony-1": { youtubeVideoId: "BRdEgS_OHAk", title: "Brahms Symphony No 1 - Järvi", channel: "Classical Vault 1", length: "46:50", partial: false, lastVerifiedAt: "2026-10-04" },
  "tchaikovsky-symphony-5": { youtubeVideoId: "JUk0WZVCnk4", title: "Tchaikovsky Symphony No. 5 - Petrenko/Oslo Phil", channel: "Oslo Philharmonic", length: "46:05", partial: false, lastVerifiedAt: "2026-10-04" },
  "haydn-symphony-45": { youtubeVideoId: "KXctarOxRz8", title: "Haydn Symphony No. 45 Farewell - Mackerras", channel: "scrymgeour34", length: "34:20", partial: false, lastVerifiedAt: "2026-10-04" },
  "haydn-symphony-101": { youtubeVideoId: "i1L6p4B2hBs", title: "Haydn The Clock Symphony No.101 - Mov.2", channel: "EAST56123", length: "7:50", partial: true, lastVerifiedAt: "2026-10-04" },
  "schumann-symphony-3": { youtubeVideoId: "kYW12JpWvkc", title: "Schumann Symphony No. 3 Rhenish", channel: "Mateus Pereira", length: "33:38", partial: false, lastVerifiedAt: "2026-10-04" },
  "brahms-symphony-4": { youtubeVideoId: "ckuUq7im8H4", title: "Brahms Symphony No.4 - Bernstein/Wiener Phil", channel: "fur bru", length: "46:07", partial: false, lastVerifiedAt: "2026-10-04" },
  "tchaikovsky-symphony-6": { youtubeVideoId: "9gQbXeJI7vM", title: "Tchaikovsky Symphony No.6 Pathétique - Ozawa/BPO", channel: "Korean.neri92", length: "59:05", partial: false, lastVerifiedAt: "2026-10-04" },
  "dvorak-symphony-8": { youtubeVideoId: "wIBtWyKj-vA", title: "Dvořák Symphony No 8 - Karajan/Wiener Phil", channel: "joaquin miranda", length: "37:11", partial: false, lastVerifiedAt: "2026-10-04" },
  "sibelius-symphony-2": { youtubeVideoId: "2lHncn68uyQ", title: "Sibelius Symphony No. 2 - Paavo Järvi/Orchestre de Paris", channel: "wocomoMUSIC", length: "46:40", partial: false, lastVerifiedAt: "2026-10-04" },
  "mahler-symphony-2": { youtubeVideoId: "4MPuoOj5TIw", title: "Mahler Symphony No. 2 Resurrection - Abbado/Lucerne", channel: "EuroArtsChannel", length: "1:26:28", partial: false, lastVerifiedAt: "2026-10-04" },
  "mahler-symphony-5": { youtubeVideoId: "VWPACef2_eY", title: "Mahler - Adagietto from Symphony No. 5", channel: "cmonclair27", length: "9:46", partial: true, lastVerifiedAt: "2026-10-04" },
  "shostakovich-symphony-5": { youtubeVideoId: "34tCtfa9JIk", title: "Shostakovich Symphony No.5 - Feuerwerk Philharmoniker", channel: "Feuerwerk Philharmoniker", length: "11:04", partial: true, lastVerifiedAt: "2026-10-04" },
  "shostakovich-symphony-7": { youtubeVideoId: "W2f1G7qCSm8", title: "Shostakovich Symphony No.7 Leningrad 4th Movement", channel: "DrNguyenVanThoc", length: "9:33", partial: true, lastVerifiedAt: "2026-10-04" },
  "prokofiev-symphony-1": { youtubeVideoId: "WLT55kPIFCo", title: "Prokofiev Symphony no.1 Classical (complete)", channel: "jenny", length: "14:06", partial: false, lastVerifiedAt: "2026-10-04" },
  "isang-yun-symphony-1": { youtubeVideoId: "9Mi6Lg3sK6Q", title: "Isang Yun Symphony No.1 (1983)", channel: "hscherchen", length: "44:23", partial: false, lastVerifiedAt: "2026-10-04" },
  "isang-yun-symphony-4": { youtubeVideoId: "ZH5nRddppY0", title: "Isang Yun Symphonie IV Im Dunkeln singen - I. Satz", channel: "Internationale Isang Yun Gesellschaft", length: "12:40", partial: true, lastVerifiedAt: "2026-10-04" },
  "choi-sung-hwan-arirang-fantasy": { youtubeVideoId: "oD6inlRkAhE", title: "최성환 Arirang Fantasy - 장윤성/KBS교향악단", channel: "KBS교향악단", length: "8:35", partial: false, lastVerifiedAt: "2026-10-04" },
};
