import type { Metadata, Viewport } from "next";
import "./globals.css";
import { JazzProvider } from "@/context/JazzContext";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { MobileBottomNavigation } from "@/components/layout/MobileBottomNavigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Listen Guide — 재즈·클래식·교향곡·오디오 테스트 감상 가이드",
    template: "%s | Listen Guide",
  },
  description:
    "재즈, 클래식, 교향곡 입문 가이드와 오디오 테스트. 대표곡을 페이지 안에서 바로 듣고, 짧은 설명과 감상 포인트로 감상을 시작하세요.",
  keywords: ["재즈", "클래식", "교향곡", "오디오 테스트", "음악 감상", "입문 가이드"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Listen Guide",
    title: "Listen Guide — 음악 감상 가이드 모음",
    description: "재즈·클래식·교향곡 입문 가이드와 오디오 테스트. 명곡을 바로 듣고 감상 포인트까지 한 번에.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jazz Guide — 처음 만나는 재즈",
    description: "재즈 입문자를 위한 큐레이션. 명곡 재생, 감상 포인트, 입문 코스.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#111318",
  width: "device-width",
  initialScale: 1,
};

// 첫 페인트 전에 저장된 테마를 적용해 깜빡임을 막는다
const themeInitScript = `(function(){try{var t=localStorage.getItem('jazz:theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brass focus:px-4 focus:py-2 focus:text-bg"
        >
          본문으로 건너뛰기
        </a>
        <JazzProvider>
          <AppHeader />
          <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6">
            {children}
          </main>
          <AppFooter />
          <MobileBottomNavigation />
        </JazzProvider>
      </body>
    </html>
  );
}
