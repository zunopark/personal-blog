import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostData, getAllPostSlugs, getRelatedPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/components/MDXComponents';
import { Tag } from '@/components/Tag';
import Link from 'next/link';

interface PostPageProps {
  params: { slug: string }; // params는 string이라고 가정
}

export function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage({ params }: PostPageProps) {
  // params가 Promise일 수 있다는 경고를 처리하기 위해 Promise.resolve 사용
  const resolvedParams = await Promise.resolve(params);

  if (!resolvedParams || typeof resolvedParams.slug !== 'string') {
    notFound();
  }

  const slug = resolvedParams.slug;
  const postData = await getPostData(slug).catch(() => {
    notFound();
  });

  const { frontMatter, content } = postData;
  
  // 연관 글 가져오기
  const relatedPosts = getRelatedPosts(slug, frontMatter.tags, 3);

  return (
    <div className="pt-12 pb-20 px-6 max-w-4xl mx-auto">
      <article className="text-gray-800">
        {/* 제목 */}
        <h1 className="text-5xl font-extrabold mb-4 leading-tight text-gray-900">
          {frontMatter.title}
        </h1>
        
        {/* 날짜 */}
        <p className="text-xl text-gray-500 mb-6">
          {new Date(frontMatter.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        {/* 태그 */}
        {frontMatter.tags && frontMatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {frontMatter.tags.map(tag => (
              <Tag key={tag} tag={tag} clickable={false} />
            ))}
          </div>
        )}
        
        {/* 본문 */}
        <div className="markdown-body leading-relaxed text-lg border-t border-gray-200 pt-10">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>
      
      {/* 연관 글 섹션 */}
      {relatedPosts.length > 0 && (
        <aside className="mt-16 pt-12 border-t-2 border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            📚 연관된 글
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map(post => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  
                  {/* 공통 태그 표시 */}
                  <div className="flex flex-wrap gap-2">
                    {post.commonTags?.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
