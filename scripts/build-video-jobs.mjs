#!/usr/bin/env node
/**
 * 영상이 없는 곡들의 YouTube 검색 작업 목록 생성
 * 출력: <temp>/video-jobs.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = process.argv[2];

const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));

const GENERIC = new Set([
  "official","performance","performance.","full","youtube","music","video","audio","orchestral","orchestra","complete","version","hd","4k","mv","m/v","topic","the","of","in","no.","op","op.","no","i","ii","iii","iv","i.","allegro","andante","feat","ft","리마스터","remastered",
]);

function tokensFromQuery(query, composerWords) {
  return query
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}.'-]/gu, "").toLowerCase())
    .filter((t) => t.length >= 2 && !GENERIC.has(t) && !composerWords.includes(t));
}

// ── 클래식 31: CLASS_DO.MD 링크 테이블에서 검색 쿼리 추출 ──
const classMd = readFileSync(join(root, "class_guide", "CLASS_DO.MD"), "utf-8");
const classicTracksSrc = readFileSync(join(root, "src", "data", "classicTracks.ts"), "utf-8");
const classicIds = Array.from(classicTracksSrc.matchAll(/^\s{4}id: "([\w-]+)",/gm)).map((m) => m[1]);

const classicRows = Array.from(
  classMd.matchAll(/^\|\s*(\d+)\s*\|([^|]+)\|([^|]+)\|[^|]+\|[^|]+\|(.*)\|\s*$/gm),
).map((m) => ({
  no: Number(m[1]),
  composer: m[2].trim(),
  work: m[3].trim(),
  links: m[4],
}));

const classicJobs = classicRows
  .filter((row) => row.no <= classicIds.length)
  .map((row) => {
    const refId = classicIds[row.no - 1];
    const qMatch = row.links.match(/search_query=([^)\s]+)/);
    const query = qMatch ? decode(qMatch[1]) : `${row.composer} ${row.work}`;
    const composerTokens = row.composer.replace(/\s+/g, " ").toLowerCase().split(" ");
    const mustAny = tokensFromQuery(query, composerTokens).filter((t) => t.length >= 3);
    return {
      kind: "classic",
      refId,
      query,
      mustAny,
      composerTokens,
      exclude: ["reaction", "tutorial", "lesson", "analysis", "sheet music", "synthesia", "karaoke", "cover"],
      minSec: 45,
      maxSec: 60 * 60,
    };
  });

// ── 오디오 테스트 20: 데이터(아티스트/제목) + MD의 직접 영상 후보 ──
const audioMd = readFileSync(join(root, "audio_test", "AUDIO_DO.MD"), "utf-8");
const audioSrc = readFileSync(join(root, "src", "data", "audioTestTracks.ts"), "utf-8");
const audioEntries = Array.from(
  audioSrc.matchAll(/\{\s*\r?\n\s*id: "([\w-]+)",\s*\r?\n\s*title: "([^"]+)",\s*\r?\n\s*artist: "([^"]+)"/g),
).map((m) => ({ id: m[1], title: m[2], artist: m[3] }));

const audioCurated = new Map();
for (const row of audioMd.matchAll(/\|\s*\d+\s*\|([^|]+)\|([^|]+)\|[^|]+\|[^']*?\[직접 영상\]\(https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})\)/g)) {
  audioCurated.set(row[1].trim(), row[3]);
}

const audioJobs = audioEntries.map((entry) => {
  const titleTokens = entry.title
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}'-]/gu, ""))
    .filter((t) => t.length >= 2);
  const composerTokens = entry.artist.toLowerCase().split(/\s+/);
  return {
    kind: "audio",
    refId: entry.id,
    query: `${entry.artist} ${entry.title} official`,
    mustAny: titleTokens.length ? titleTokens : [entry.title.toLowerCase()],
    composerTokens,
    exclude: ["reaction", "tutorial", "karaoke", "8d audio", "slowed", "sped up", "nightcore", "1 hour", "instrumental cover", "lys", "music box"],
    minSec: 60,
    maxSec: 40 * 60,
    preferId: audioCurated.get(entry.title) ?? null,
    preferNote: audioCurated.has(entry.title) ? "스펙 큐레이션 후보" : null,
  };
});

// ── 교향곡 30: youtube_symphony_guide.MD 테이블의 검색 쿼리 (검증 완료 2편 제외) ──
const symMd = readFileSync(join(root, "symphony_guide", "youtube_symphony_guide.MD"), "utf-8");
const symSrc = readFileSync(join(root, "src", "data", "symphonyTimelines.ts"), "utf-8");
const draftBlock = symSrc.slice(symSrc.indexOf("export const timelineDrafts"));
const draftIds = Array.from(draftBlock.matchAll(/^\s{4}symphonyId: "([\w-]+)",/gm)).map((m) => m[1]);
const verifiedIds = new Set(["beethoven-symphony-5", "beethoven-symphony-3"]);

const symRows = Array.from(
  symMd.matchAll(/^\|\s*(\d+)\s*\|([^|]+)\|([^|]+)\|([^|]+)\|(.*)\|\s*$/gm),
).map((m) => ({
  no: Number(m[1]),
  composer: m[2].trim(),
  work: m[3].trim(),
  movement: m[4].trim(),
  links: m[5],
}));

const symJobs = [];
symRows.forEach((row, i) => {
  const refId = draftIds[i];
  if (!refId || verifiedIds.has(refId)) return;
  const qMatch = row.links.match(/search_query=([^)\s]+)/);
  const query = qMatch ? decode(qMatch[1]) : `${row.composer} ${row.work} symphony full`;
  const composerTokens = row.composer.replace(/\s+/g, " ").toLowerCase().split(" ");
  const mustAny = tokensFromQuery(query, composerTokens).filter((t) => t.length >= 3);
  symJobs.push({
    kind: "symphony",
    refId,
    query,
    mustAny,
    composerTokens,
    exclude: ["reaction", "tutorial", "lesson", "analysis", "sheet music", "synthesia", "piano cover", "piano tutorial"],
    minSec: 300,
    maxSec: 2 * 60 * 60,
  });
});

const jobs = [...classicJobs, ...audioJobs, ...symJobs];
writeFileSync(outPath, JSON.stringify(jobs, null, 1), "utf-8");
console.log(
  `jobs: ${jobs.length} (classic ${classicJobs.length}, audio ${audioJobs.length}, symphony ${symJobs.length})`,
);
