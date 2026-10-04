#!/usr/bin/env node
/**
 * YouTube 영상 ID 검증 스크립트
 *
 * 사용법: npm run verify-videos
 *
 * src/data/tracks.ts에서 youtubeVideoId를 추출해 YouTube oEmbed 엔드포인트로
 * 존재 여부(삭제/비공개 여부)를 확인한다. 임베드 가능 여부는 이 API로 알 수 없으므로
 * 실제 재생 테스트는 별도로 수행해야 한다.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tracksPath = join(__dirname, "..", "src", "data", "tracks.ts");

const source = readFileSync(tracksPath, "utf-8");

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

// 각 트랙 블록을 대략 분리해 slug와 videoId를 짝지은다
const blocks = source.split(/\{\s*\n\s*id:\s*"/).slice(1);
const entries = blocks
  .map((block) => {
    const slug = block.match(/^([\w-]+)"/)?.[1];
    const videoId = block.match(/youtubeVideoId:\s*"([^"]*)"/)?.[1] ?? "";
    return { slug, videoId };
  })
  .filter((e) => e.slug);

console.log(`총 ${entries.length}개 곡의 영상 ID를 검증합니다...\n`);

let ok = 0;
let fail = 0;
let todo = 0;

for (const { slug, videoId } of entries) {
  if (videoId === "TODO_VERIFY_VIDEO_ID" || !ID_PATTERN.test(videoId)) {
    todo++;
    console.log(`⚠ TODO   /tracks/${slug} — 영상 ID 미확정 (검색 링크 fallback으로 동작)`);
    continue;
  }
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${videoId}&format=json`,
    );
    if (res.ok) {
      const data = await res.json();
      ok++;
      console.log(`✓ OK      /tracks/${slug} — ${data.title} (${data.author_name})`);
    } else {
      fail++;
      console.log(`✗ FAIL    /tracks/${slug} — HTTP ${res.status} (삭제·비공개 또는 잘못된 ID: ${videoId})`);
    }
  } catch (err) {
    fail++;
    console.log(`? ERROR   /tracks/${slug} — 네트워크 오류: ${err.message}`);
  }
}

console.log(`\n결과: OK ${ok} / FAIL ${fail} / TODO ${todo}`);
if (todo > 0) {
  console.log("TODO 항목은 공식 채널 등 신뢰할 수 있는 출처에서 ID를 확정한 뒤 데이터에 반영하세요.");
}
if (fail > 0) process.exitCode = 1;
