import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogList() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">블로그</h1>
      <ul className="space-y-6">
        {allPostsData.map(({ slug, date, title, description }) => (
          <li key={slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link href={`/blog/${slug}`} className="block">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
                {title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{date}</p>
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
