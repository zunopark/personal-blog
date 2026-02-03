import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Tag } from '@/components/Tag';

export default function BlogList() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="pt-16 pb-24 px-6 max-w-4xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Blog
        </h1>
        <p className="text-xl text-gray-500">
          생각과 경험을 기록합니다
        </p>
      </div>
      
      <div className="space-y-6">
        {allPostsData.map(({ slug, date, title, description, tags }) => (
          <Link 
            key={slug} 
            href={`/blog/${slug}`}
            className="block group"
          >
            <article className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl hover:border-gray-300 transition-all duration-300">
              <time className="text-sm text-gray-400 font-medium">
                {new Date(date).toLocaleDateString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
              
              <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-4 group-hover:text-blue-600 transition-colors">
                {title}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed line-clamp-2 mb-4">
                {description}
              </p>
              
              {/* 태그 */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map(tag => (
                    <Tag key={tag} tag={tag} clickable={false} />
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                <span>자세히 보기</span>
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
