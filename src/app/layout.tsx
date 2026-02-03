import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '준호의 개인 블로그',
  description: 'Next.js 기반의 깔끔하고 모던한 개인 블로그입니다.',
  openGraph: {
    title: '준호의 개인 블로그',
    description: 'Next.js 기반의 깔끔하고 모던한 개인 블로그입니다.',
    type: 'website',
    url: 'https://your-blog-url.com', // 실제 배포 URL로 변경 필요
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans text-gray-800 antialiased bg-gray-50"> {/* 여기에 font-sans 적용 */}
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
