import type { Metadata } from "next";
import { MyJazzView } from "./view";

export const metadata: Metadata = {
  title: "나의 재즈",
  description: "찜한 곡, 최근 들은 곡, 감상 완료 기록과 입문 코스 진도를 확인하세요.",
};

export default function MyJazzPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">나의 재즈</h1>
        <p className="mt-2 text-sm leading-relaxed text-subtle sm:text-base">
          내 감상 기록과 진도를 한곳에서 확인하세요. 로그인 없이 이 브라우저에 저장됩니다.
        </p>
      </header>
      <MyJazzView />
    </div>
  );
}
