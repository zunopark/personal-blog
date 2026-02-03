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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{frontMatter.title}</h1>
        <p className="text-lg text-gray-500 mb-8">{frontMatter.date}</p>
        <div className="markdown-body">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
