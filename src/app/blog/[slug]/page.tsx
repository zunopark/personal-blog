import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { slug: string };
}

// Generate static paths for SSG
export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function PostPage({ params }: PostPageProps) {
  const postData = await getPostData(params.slug).catch(() => {
    notFound();
  });

  const { frontMatter, content } = postData;

  return (
    <div className="pt-12 pb-20">
      <article className="prose dark:prose-invert lg:prose-xl mx-auto max-w-none text-gray-800">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight text-gray-900">
          {frontMatter.title}
        </h1>
        <p className="text-xl text-gray-500 mb-10">
          {new Date(frontMatter.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="markdown-body leading-relaxed text-lg text-gray-700">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
