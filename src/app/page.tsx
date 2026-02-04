import { GraphClient } from '@/components/GraphClient';
import Link from 'next/link';


export default function Home() {
  // 테스트 그래프 데이터
  const graphNodes = [
    { id: '1', label: 'hello-world', title: 'hello-world' },
    { id: '2', label: 'nextjs-seo-guide', title: 'nextjs-seo-guide' },
  ];
  const graphEdges = [
    { from: '1', to: '2' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-12">
      <div className="max-w-4xl">
        <h1 className="text-7xl md:text-8xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
          안녕하세요
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-medium">
          준호의 블로그입니다
        </p>
        <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
          기술, 일상, 경제/사회 문화 등 다양한 주제의 글을 기록합니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link 
            href="/blog" 
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            블로그 보기
          </Link>
          
          <Link 
            href="/blog" 
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full text-lg border-2 border-gray-200 hover:border-gray-400 transition-all duration-300"
          >
            최신 글 읽기
          </Link>
        </div>

        {/* 그래프 뷰 테스트 */}
        {/* <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 블로그 글 연결 맵</h2>
          <div className="flex justify-center">
            <GraphView nodes={graphNodes} edges={graphEdges} />
          </div>
        </div> */}
        <GraphClient />
      </div>
    </div>
  );
}
