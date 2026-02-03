import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 text-gray-800">
      <h1 className="text-7xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
        준호의 블로그
      </h1>
      <p className="text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
        Next.js와 MDX로 만든 모던하고 깔끔한 개인 블로그입니다.
        기술, 일상, 경제/사회 문화 등 다양한 주제의 글을 만나보세요.
      </p>
      <Link href="/blog" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
        블로그 글 읽으러 가기
      </Link>
    </div>
  );
}
