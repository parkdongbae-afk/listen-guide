import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-3xl font-bold text-brass">404</p>
      <p className="font-semibold text-ink">찾으시는 페이지가 없습니다</p>
      <p className="max-w-md text-sm leading-relaxed text-subtle">
        주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 좋은 곡 한 개면 충분하니, 홈에서 첫 곡부터 시작해 보세요.
      </p>
      <div className="flex gap-2">
        <Link
          href="/"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
        >
          홈으로
        </Link>
        <Link
          href="/jazz/must-listen"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
        >
          필수곡 보기
        </Link>
      </div>
    </div>
  );
}
