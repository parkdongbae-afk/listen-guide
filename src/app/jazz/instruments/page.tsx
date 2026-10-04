import type { Metadata } from "next";
import { instruments } from "@/data/instruments";
import { trackMap } from "@/data/track-utils";
import { TrackListItem } from "@/components/tracks/TrackListItem";
import { EmptyState } from "@/components/ui/index";

export const metadata: Metadata = {
  title: "악기별 대표 연주",
  description: "트럼펫, 색소폰, 피아노 등 악기별로 재즈의 대표적인 연주를 만나보세요.",
};

export default function InstrumentsPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">악기별 대표 연주</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          재즈는 악기의 목소리가 곧 연주자의 목소리입니다. 마음에 드는 소리를 찾았다면, 그 악기의 다른 연주도 찾아
          들어보세요.
        </p>
      </header>

      {instruments.map((instrument) => {
        const instrumentTracks = instrument.trackIds.length
          ? instrument.trackIds.map((id) => trackMap.get(id)).filter((t): t is NonNullable<typeof t> => Boolean(t))
          : [...trackMap.values()].filter((t) => t.instrumentIds.includes(instrument.id)).slice(0, 3);

        return (
          <section key={instrument.id} id={instrument.id} aria-labelledby={`instrument-${instrument.id}`} className="scroll-mt-20">
            <h2 id={`instrument-${instrument.id}`} className="mb-1 text-lg font-bold">
              {instrument.nameKo} <span className="font-display text-sm font-normal text-subtle">{instrument.name}</span>
            </h2>
            <p className="mb-3 text-sm text-subtle">{instrument.role}</p>
            {instrumentTracks.length > 0 ? (
              <ul className="space-y-2">
                {instrumentTracks.map((track) => (
                  <li key={track.id}>
                    <TrackListItem track={track} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="아직 수록된 연주가 없어요" description="다른 악기를 먼저 둘러보세요." />
            )}
          </section>
        );
      })}
    </div>
  );
}
