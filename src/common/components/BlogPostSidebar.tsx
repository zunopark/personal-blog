import Link from 'next/link';
import { Separator } from '@/common/components/ui/separator';

export type SidebarCategory = { name: string; count: number };
export type SidebarPopularPost = { title: string; slug: string };

/** 목업: 카테고리 (태그와 별개) */
const MOCK_CATEGORIES = [
  { name: '기술', count: 12 },
  { name: '경제', count: 8 },
  { name: '문화', count: 5 },
  { name: '일상', count: 7 },
] as const;

/** 목업: 플랫폼 인기 글 (현재 블로그 글이 아님) */
const MOCK_POPULAR_POSTS = [
  { title: '2024년 세금 공제 완벽 가이드', slug: 'tax-deduction-gift-tax-guide' },
  { title: '내가 먹는 영양제 스케줄', slug: 'my-supplement-schedule' },
  { title: '필수 영양제 가이드', slug: 'essential-supplements-guide' },
  { title: '헬스케어 루틴 정리', slug: 'healthcare-routine' },
] as const;

export function BlogPostSidebar() {
  return (
    <aside className="lg:w-72 shrink-0 flex flex-col">
      {/* 상단: 카테고리 */}
      <section className="pb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          카테고리
        </h3>
        <ul className="space-y-2">
          {MOCK_CATEGORIES.map(({ name, count }) => (
            <li key={name}>
              <Link
                href={`/blog/category/${encodeURIComponent(name)}`}
                className="text-gray-700 hover:text-gray-900 font-medium flex justify-between items-center py-1"
              >
                <span>{name}</span>
                <span className="text-xs text-gray-400">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-2" />

      {/* 하단: 플랫폼 인기 글 */}
      <section className="pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          인기 글
        </h3>
        <ul className="space-y-3">
          {MOCK_POPULAR_POSTS.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm line-clamp-2 block py-0.5"
              >
                <span className="text-gray-400 mr-2">{i + 1}.</span>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
