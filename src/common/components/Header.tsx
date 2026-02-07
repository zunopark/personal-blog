import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Separator } from '@/common/components/ui/separator';
import { cn } from '@/lib/utils';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          {/* 플랫폼 브랜드: 전체 블로그 플랫폼 */}
          <Button variant="ghost" size="lg" className="text-2xl font-bold tracking-tight px-0 hover:bg-transparent text-foreground" asChild>
            <Link href="/">Terre</Link>
          </Button>
          <span className="text-muted-foreground/60 text-sm font-normal" aria-hidden>/</span>
          {/* 개인 블로그명: 이 블로그 이름 */}
          <Button variant="ghost" size="sm" className="text-base font-medium px-0 hover:bg-transparent text-muted-foreground hover:text-foreground" asChild>
            <Link href="/">루카의 블로그</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border-b-2 border-gray-400 bg-transparent">
              <input
                type="search"
                placeholder="Search..."
                aria-label="검색"
                className={cn(
                  'header-search-input h-9 w-48 bg-transparent py-2 text-sm',
                  'placeholder:text-gray-400',
                  'border-0 outline-none shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none focus-visible:ring-0'
                )}
              />
              <Search className="size-4 shrink-0 text-gray-400" aria-hidden />
            </div>
            <Button variant="ghost" size="sm" className="font-medium" asChild>
              <Link href="/blog">리스트로 보기</Link>
            </Button>
            <Button variant="ghost" size="sm" className="font-medium" asChild>
              <Link href="/about">루카 구독하기</Link>
            </Button>
        </div>
        </nav>
        <Separator />
    </header>
  );
};