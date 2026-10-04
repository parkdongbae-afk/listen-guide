// ─── 곡 공통 ───────────────────────────────────────────────

export type Difficulty = "very-easy" | "easy" | "medium" | "advanced";

export type VideoSource = {
  youtubeVideoId: string;
  title: string;
  channelName: string;
  isOfficial: boolean;
  isEmbeddable: boolean;
  startSeconds?: number;
  fallbackVideoId?: string;
  lastVerifiedAt: string;
};

export type ListeningPoint = {
  title: string;
  description: string;
};

export type TimelinePoint = {
  seconds: number;
  label: string;
  description: string;
  instrumentIds?: string[];
};

export type ContentSource = {
  title: string;
  publisher?: string;
  url: string;
  accessedAt: string;
  note?: string;
};

export type Track = {
  id: string;
  slug: string;
  title: string;
  titleKo?: string;
  artistIds: string[];
  primaryArtistName: string;

  composerNames: string[];
  albumTitle?: string;
  recordingYear?: number;
  releaseYear?: number;

  eraId: string;
  styleIds: string[];
  moodIds: string[];
  instrumentIds: string[];

  durationSeconds?: number;
  hasVocals: boolean;
  difficulty: Difficulty;

  shortDescription: string;
  introduction: string;
  historicalContext: string;
  whyItMatters: string;
  listeningPoints: ListeningPoint[];
  timeline: TimelinePoint[];
  glossaryTermIds: string[];

  video: VideoSource;
  alternateVideos?: VideoSource[];

  albumImageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageLicense?: string;

  relatedTrackIds: string[];
  nextTrackId?: string;

  featured: boolean;
  mustListenRank?: number;
  editorialTags: string[];

  sources: ContentSource[];
  contentReviewedAt: string;
};

// ─── 아티스트 ──────────────────────────────────────────────

export type Artist = {
  id: string;
  slug: string;
  name: string;
  nameKo?: string;
  birthYear?: number;
  deathYear?: number;
  country?: string;
  primaryInstrumentIds: string[];
  activeEraIds: string[];
  styleIds: string[];
  shortBio: string;
  biography: string;
  musicalTraits: string[];
  firstTrackIds: string[];
  keyAlbums: string[];
  collaborators: string[];
  keyTrackIds: string[];
  imageUrl?: string;
  imageAlt?: string;
  sources: ContentSource[];
};

// ─── 시대 / 스타일 / 분위기 / 악기 ─────────────────────────

export type Era = {
  id: string;
  slug: string;
  name: string;
  period: string;
  summary: string;
  keyFeatures: string[];
  styleIds: string[];
  trackIds: string[];
};

export type JazzStyle = {
  id: string;
  slug: string;
  name: string;
  nameKo: string;
  definition: string;
  keyFeatures: string[];
  instrumentIds: string[];
  firstTrackIds: string[];
  deepTrackIds: string[];
  artistIds: string[];
  beforeStyleId?: string;
  afterStyleId?: string;
  eraIds: string[];
};

export type Mood = {
  id: string;
  slug: string;
  label: string;
  emoji: string;
  description: string;
  trackIds: string[];
};

export type Instrument = {
  id: string;
  slug: string;
  name: string;
  nameKo: string;
  role: string;
  trackIds: string[];
};

// ─── 용어 / 코스 ───────────────────────────────────────────

export type GlossaryTerm = {
  id: string;
  name: string;
  nameEn?: string;
  oneLiner: string;
  more: string;
  exampleTrackIds: string[];
  relatedTermIds: string[];
};

export type CourseStep = {
  key: string;
  title: string;
  description: string;
  trackId: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes?: number;
  dayLabel?: string;
  steps: CourseStep[];
};
