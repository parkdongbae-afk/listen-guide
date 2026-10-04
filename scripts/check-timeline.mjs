#!/usr/bin/env node
/**
 * 타임라인/길이 정합성 검증
 * - durationSeconds가 존재하고 0보다 큰지
 * - timeline의 초 단위가 오름차순이며 duration 안에 있는지 (끝 여유 3초)
 * - 각 트랙의 관련 id 참조(tracks 내)가 실제 존재하는지
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, "..", "src", "data", "tracks.ts"), "utf-8");

const blocks = src.split(/\{\s*\r?\n\s*id:\s*"/).slice(1);
let problems = 0;
const rows = [];

for (const block of blocks) {
  const slug = block.match(/^([\w-]+)"/)?.[1];
  const dur = Number(block.match(/durationSeconds:\s*(\d+)/)?.[1]);
  const times = Array.from(block.matchAll(/\bseconds:\s*(\d+)/g)).map((m) => Number(m[1]));
  const next = block.match(/nextTrackId:\s*"([\w-]+)"/)?.[1];
  const related = Array.from(block.matchAll(/relatedTrackIds:\s*\[([^\]]*)\]/g))
    .flatMap((m) => Array.from(m[1].matchAll(/"([\w-]+)"/g)).map((x) => x[1]));

  const issues = [];
  if (!dur || dur <= 0) issues.push("durationSeconds 없음");
  const last = times.at(-1);
  if (times.some((t, i) => i > 0 && t <= times[i - 1])) issues.push("초 단위 비오름차순");
  if (dur && last >= dur - 3) issues.push(`마지막 구간(${last}s)이 길이(${dur}s)에 너무 인접`);
  const allIds = new Set([...blocks.map((b) => b.match(/^([\w-]+)"/)?.[1])].filter(Boolean));
  if (next && !allIds.has(next)) issues.push(`nextTrackId 미존재: ${next}`);
  for (const r of related) if (!allIds.has(r)) issues.push(`relatedTrackIds 미존재: ${r}`);

  if (issues.length) problems++;
  rows.push(`${issues.length ? "✗" : "✓"} ${slug.padEnd(24)} 길이 ${dur}s, 구간 ${times.length}개(최종 ${last}s)${issues.length ? " → " + issues.join(", ") : ""}`);
}

console.log(rows.join("\n"));
console.log(`\n결과: ${blocks.length}곡 중 문제 ${problems}곡`);
if (problems) process.exitCode = 1;
