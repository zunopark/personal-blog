import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogList() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="pt-12 pb-20">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight leading-tight">
        블로그
      </h1>
      <ul className="space-y-8">
        {allPostsData.map(({ slug, date, title, description }) => (
          <li key={slug} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link href={`/blog/${slug}`} className="block">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-snug hover:text-blue-600 transition-colors duration-300">
                {title}
              </h2>
              <p className="text-base text-gray-500 mb-4">{new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
