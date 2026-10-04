import Link from "next/link";
import { Music4 } from "lucide-react";
import type { Difficulty } from "@/types";
import { cn, difficultyLabel } from "@/lib/utils";

const tones: Record<Difficulty, string> = {
  "very-easy": "border-brass/60 text-brass",
  easy: "border-brass/40 text-brass/90",
  medium: "border-line text-subtle",
  advanced: "border-burgundy/60 text-burgundy",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs", tones[difficulty])}>
      {difficultyLabel(difficulty)}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-card/50 px-6 py-14 text-center">
      <Music4 className="h-8 w-8 text-subtle" aria-hidden />
      <p className="font-semibold text-ink">{title}</p>
      {description && <p className="max-w-sm text-sm leading-relaxed text-subtle">{description}</p>}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-2 rounded-full bg-brass px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function ProgressRing({ value, total, size = 64 }: { value: number; total: number; size?: number }) {
  const pct = total > 0 ? Math.min(1, value / total) : 0;
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" role="img" aria-label={`진도율 ${Math.round(pct * 100)}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--brass)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="absolute text-xs font-bold text-ink tabular-nums">
        {value}/{total}
      </span>
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  moreHref,
  moreLabel,
}: {
  title: string;
  subtitle?: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-subtle">{subtitle}</p>}
      </div>
      {moreHref && moreLabel && (
        <Link href={moreHref} className="shrink-0 text-sm font-medium text-brass transition-opacity hover:opacity-80">
          {moreLabel} →
        </Link>
      )}
    </div>
  );
}
