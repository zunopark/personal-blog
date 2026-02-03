import './globals.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '준호의 개인 블로그',
  description: 'Next.js 기반의 깔끔하고 모던한 개인 블로그입니다.',
  openGraph: {
    title: '준호의 개인 블로그',
    description: 'Next.js 기반의 깔끔하고 모던한 개인 블로그입니다.',
    type: 'website',
    url: 'https://your-blog-url.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans text-gray-800 antialiased bg-white">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link 
              href="/" 
              className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors"
            >
              준호
            </Link>
            
            <div className="flex gap-8">
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                About
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen bg-white">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 준호의 블로그. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Built with Next.js 16 · React 19 · MDX
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
