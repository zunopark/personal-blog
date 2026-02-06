import './globals.css';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/common/components/ui/button';
import { Separator } from '@/common/components/ui/separator';
import { ScrollToTop } from '@/common/components/ScrollToTop';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: '사회/경제/문화/개발 등 다양한 주제의 글을 기록합니다.',
  openGraph: {
    title: SITE_NAME,
    description: '사회/경제/문화/개발 등 다양한 주제의 글을 기록합니다.',
    type: 'website',
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen font-sans text-foreground antialiased bg-background" suppressHydrationWarning>
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" size="lg" className="text-2xl font-bold px-0 hover:bg-transparent" asChild>
              <Link href="/">루카</Link>
            </Button>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="font-medium" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" size="sm" className="font-medium" asChild>
                <Link href="/about">About</Link>
              </Button>
            </div>
          </nav>
          <Separator />
        </header>

        {/* Main Content */}
        <main className="min-h-screen bg-background">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-muted/50">
          <Separator />
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <p className="text-muted-foreground text-sm">© 2026 루카 블로그. All rights reserved.</p>
            <p className="text-muted-foreground/80 text-xs mt-2">Built with Next.js 16 · React 19 · MDX</p>
          </div>
        </footer>

        {/* 플로팅: 맨 위로 스크롤 */}
        <ScrollToTop />
      </body>
    </html>
  );
}
