import type { MetadataRoute } from "next";
import { tracks } from "@/data/tracks";
import { artists } from "@/data/artists";
import { styles } from "@/data/styles";
import { eras } from "@/data/eras";
import { moods } from "@/data/moods";
import { courses } from "@/data/courses";
import { CLASSIC_TRACKS } from "@/data/classicTracks";
import { AUDIO_TEST_TRACKS } from "@/data/audioTestTracks";
import { symphonyList } from "@/lib/symphony";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/jazz",
    "/jazz/getting-started",
    "/jazz/must-listen",
    "/jazz/artists",
    "/jazz/eras",
    "/jazz/styles",
    "/jazz/moods",
    "/jazz/glossary",
    "/jazz/my-jazz",
    "/jazz/search",
    "/classic",
    "/classic/works",
    "/symphony",
    "/symphony/symphonies",
    "/audio-test",
    "/audio-test/tracks",
    "/audio-test/evaluation",
  ].map((path) => ({ url: `${siteUrl}${path}`, lastModified: now }));

  const trackRoutes = tracks.map((t) => ({
    url: `${siteUrl}/jazz/tracks/${t.slug}`,
    lastModified: new Date(t.contentReviewedAt),
  }));

  const artistRoutes = artists.map((a) => ({ url: `${siteUrl}/jazz/artists/${a.slug}`, lastModified: now }));
  const styleRoutes = styles.map((s) => ({ url: `${siteUrl}/jazz/styles/${s.slug}`, lastModified: now }));
  const eraRoutes = eras.map((e) => ({ url: `${siteUrl}/jazz/eras/${e.slug}`, lastModified: now }));
  const moodRoutes = moods.map((m) => ({ url: `${siteUrl}/jazz/moods/${m.slug}`, lastModified: now }));
  const courseRoutes = courses.map((c) => ({ url: `${siteUrl}/jazz/courses/${c.slug}`, lastModified: now }));

  const classicRoutes = CLASSIC_TRACKS.map((t) => ({
    url: `${siteUrl}/classic/works/${t.id}`,
    lastModified: now,
  }));
  const symphonyRoutes = symphonyList.map((s) => ({
    url: `${siteUrl}/symphony/symphonies/${s.id}`,
    lastModified: now,
  }));
  const audioRoutes = AUDIO_TEST_TRACKS.map((t) => ({
    url: `${siteUrl}/audio-test/tracks/${t.id}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...trackRoutes,
    ...artistRoutes,
    ...styleRoutes,
    ...eraRoutes,
    ...moodRoutes,
    ...courseRoutes,
    ...classicRoutes,
    ...symphonyRoutes,
    ...audioRoutes,
  ];
}
