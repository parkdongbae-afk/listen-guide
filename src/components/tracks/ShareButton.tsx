"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  /** 공유할 URL. 없으면 현재 페이지 */
  path?: string;
};

export function ShareButton({ title, path }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = path ? `${window.location.origin}${path}` : window.location.href;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: `Jazz Guide — ${title}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 사용자가 공유를 취소한 경우 등 — 오류로 취급하지 않는다
    }
  };

  return (
    <button
      type="button"
      onClick={() => void share()}
      aria-label={`${title} 공유하기`}
      className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-subtle transition-colors hover:border-brass hover:text-brass"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      <span>{copied ? "복사됨" : "공유"}</span>
    </button>
  );
}
