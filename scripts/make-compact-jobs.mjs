#!/usr/bin/env node
/** video-jobs.json → compact JS literal (run_code 내장용) */
import { readFileSync, writeFileSync } from "node:fs";

const [inPath, outPath] = process.argv.slice(2);
const j = JSON.parse(readFileSync(inPath, "utf8"));
const EX = {
  classic: ["reaction", "tutorial", "lesson", "analysis", "sheet music", "synthesia", "karaoke", "cover"],
  audio: ["reaction", "tutorial", "karaoke", "8d audio", "slowed", "sped up", "nightcore", "1 hour", "instrumental cover", "music box"],
  symphony: ["reaction", "tutorial", "lesson", "analysis", "sheet music", "synthesia", "piano cover", "piano tutorial"],
};
const km = { classic: "c", audio: "a", symphony: "s" };
const exm = { c: EX.classic, a: EX.audio, s: EX.symphony };
const compact = j.map((x) => ({
  k: km[x.kind],
  r: x.refId,
  q: x.query,
  m: x.mustAny,
  c: x.composerTokens || [],
  mn: x.minSec,
  mx: x.maxSec,
  p: x.preferId || null,
  x: exm[km[x.kind]],
}));
writeFileSync(outPath, JSON.stringify(compact), "utf8");
console.log("compact bytes:", JSON.stringify(compact).length);
