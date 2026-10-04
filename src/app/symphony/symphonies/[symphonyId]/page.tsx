import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getSymphony, symphonyList } from "@/lib/symphony";
import { symphonyVideos } from "@/data/symphonyVideos";
import { parseDuration } from "@/lib/utils";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";
import { GuideTimeline } from "@/components/player/GuideTimeline";
import { TimestampQuiz } from "@/components/player/TimestampQuiz";
import { NoteRecorder } from "@/components/guides/NoteRecorder";

type Params = Promise<{ symphonyId: string }>;

export function generateStaticParams() {
  return symphonyList.map((s) => ({ symphonyId: s.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { symphonyId } = await params;
  const symphony = getSymphony(symphonyId);
  if (!symphony) return { title: "교향곡을 찾을 수 없습니다" };
  return {
    title: `${symphony.draft.titleKo} — 악장 지도와 감상 가이드 | Symphony Guide`,
    description: `${symphony.draft.titleKo}의 악장 구조와 감상 포인트. 추천 시작 악장: ${symphony.draft.recommendedStart}`,
  };
}

export default async function SymphonyDetailPage({ params }: { params: Params }) {
  const { symphonyId } = await params;
  const symphony = getSymphony(symphonyId);
  if (!symphony) notFound();

  const { draft, verified } = symphony;
  const videoSelection = symphonyVideos[draft.symphonyId];
  const videoId = verified?.youtubeVideoId ?? videoSelection?.youtubeVideoId ?? null;
  const index = symphonyList.findIndex((s) => s.id === symphonyId);
  const nextInList = symphonyList[(index + 1) % symphonyList.length];

  const timelineItems = (verified?.items ?? []).map((item) => ({
    seconds: item.seconds,
    label: item.title,
    description: item.description,
  }));
  // 초안: 영상 길이를 N+1등분해 악장 시작 시간을 추정한다 (실제와 다를 수 있음)
  const draftQuizItems = (() => {
    const total = parseDuration(videoSelection?.length);
    const n = draft.events.length;
    return draft.events.map((event, i) => ({
      key: `m${event.order}`,
      label: `${event.order}악장`,
      description: event.description,
      hintSeconds: total ? Math.round(((total * (i + 1)) / (n + 1)) / 5) * 5 : null,
    }));
  })();

  return (
    <div className="space-y-12">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-4">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{draft.titleKo}</h1>
          {verified && (
            <p className="text-sm text-subtle">
              {verified.conductor} (지휘) · {verified.orchestra}
              {verified.performanceYear && ` · ${verified.performanceYear}년 녹음`}
            </p>
          )}
          <p className="text-sm leading-relaxed text-subtle">
            추천 시작 악장: <strong className="font-semibold text-ink">{draft.recommendedStart}</strong> — 처음이라면 이
            악장부터 들어보세요.
          </p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {verified ? (
              <span className="rounded-full bg-brass-soft px-2.5 py-1 font-medium text-brass">
                악장 시작점 검증 완료 ({verified.status === "FULLY_VERIFIED" ? "전체" : "시작점"})
              </span>
            ) : (
              <span className="rounded-full border border-line px-2.5 py-1 text-subtle">타임라인 검수 전</span>
            )}
            <span className="rounded-full border border-line px-2.5 py-1 text-subtle">교향곡</span>
          </div>
        </div>

        <div className="space-y-5">
          {videoId ? (
            <YouTubePlayer
              key={draft.symphonyId}
              videoId={videoId}
              title={draft.titleKo}
              artistName={verified?.orchestra ?? (videoSelection?.channel || "YouTube")}
              trackId={draft.symphonyId}
            >
              <section aria-labelledby="movements-heading" className="mt-5">
                <h2 id="movements-heading" className="mb-1 text-lg font-bold">
                  악장 지도
                </h2>
                {verified ? (
                  <>
                    <p className="mb-3 text-xs leading-relaxed text-subtle">
                      악장 시작점을 클릭하면 해당 순간으로 이동합니다. 한 악장만 들어도 충분합니다.
                    </p>
                    <GuideTimeline items={timelineItems} seekEnabled />
                  </>
                ) : (
                  <>
                    <p className="mb-3 text-xs leading-relaxed text-subtle">
                      각 악장이 시작되는 순간을 직접 찾아 입력해 보세요. 시작 시간은 영상 길이 기준{" "}
                      <strong className="font-semibold text-ink">추정치</strong>이며 실제와 다를 수 있습니다.
                    </p>
                    <TimestampQuiz storageKey={`symphony/${draft.symphonyId}`} items={draftQuizItems} />
                  </>
                )}
              </section>
            </YouTubePlayer>
          ) : (
            <div className="space-y-4">
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-card px-6 text-center">
                <p className="text-sm text-ink">이 교향곡의 대표 영상은 아직 선정 전입니다.</p>
                <a
                  href={draft.youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-brass hover:text-brass"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  YouTube에서 검색해서 듣기
                </a>
              </div>
              <section aria-labelledby="draft-timeline-heading">
                <h2 id="draft-timeline-heading" className="mb-1 text-lg font-bold">
                  악장 구조 (초안)
                </h2>
                <p className="mb-3 text-xs text-subtle">영상 확정 후 구간 이동이 가능해집니다.</p>
                <GuideTimeline items={timelineItems} seekEnabled={false} />
              </section>
            </div>
          )}
        </div>
      </header>

      <section aria-labelledby="modes-reminder" className="rounded-2xl border border-line bg-card p-5">
        <h2 id="modes-reminder" className="text-sm font-bold text-brass">
          이렇게 들어보세요
        </h2>
        <ul className="mt-2 grid gap-2 text-sm text-subtle sm:grid-cols-3">
          <li>
            <strong className="font-semibold text-ink">첫 5분</strong> — 재생 후 5분만 들어도 작품의 첫인상이 잡힙니다.
          </li>
          <li>
            <strong className="font-semibold text-ink">한 악장만</strong> — 추천 악장({draft.recommendedStart})만 골라
            들어도 작품의 성격을 알 수 있습니다.
          </li>
          <li>
            <strong className="font-semibold text-ink">전체 감상</strong> — 악장 지도를 따라 이어 들되, 중간에 멈춰도
            괜찮습니다.
          </li>
        </ul>
      </section>

      <NoteRecorder guideId="symphony" trackId={draft.symphonyId} />

      <div className="flex flex-wrap gap-4">
        <Link href="/symphony/symphonies" className="text-sm font-medium text-brass hover:underline">
          ← 전체 교향곡 목록
        </Link>
        <Link
          href={`/symphony/symphonies/${nextInList.id}`}
          className="text-sm font-medium text-subtle hover:text-brass"
        >
          다음 교향곡: {nextInList.titleKo} →
        </Link>
      </div>
    </div>
  );
}
