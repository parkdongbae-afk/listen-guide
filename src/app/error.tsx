"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-2xl font-bold">앗, 연주 중 뜻밖의 임프로비제이션</p>
      <p className="max-w-md text-sm leading-relaxed text-subtle">
        페이지를 표시하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
