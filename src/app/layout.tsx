import './globals.css';
import { Metadata } from 'next';
import { ScrollToTop } from '@/common/components/ScrollToTop';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { Header } from '@/common/components/Header';
import { Footer } from '@/common/components/Footer';

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
        <Header />
        {/* Main Content */}
        <main className="min-h-screen bg-background">{children}</main>

        {/* Footer */}
        <Footer />

        {/* 플로팅: 맨 위로 스크롤 */}
        <ScrollToTop />
      </body>
    </html>
  );
}
