import { getGraphData } from '@/lib/posts';
import { GraphClient } from '@/components/GraphClient';

export default function Home() {
  const graphData = getGraphData();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col items-center text-center px-6 py-12 flex-shrink-0 w-full">
        <div className="max-w-4xl">
          {/* <h1 className="text-7xl md:text-8xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
            안녕하세요
          </h1> */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-medium">
            루카의 블로그
          </p>
          <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
            기술, 일상, 경제/사회 문화 등 다양한 주제의 글을 기록합니다.
          </p>
        </div>
      </div>
      <div className="flex-1 w-full min-w-0 min-h-0 px-4 overflow-x-hidden box-border rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.06),0_0_1px_rgba(0,0,0,0.04)]">
        <GraphClient initialGraphData={graphData} />
      </div>
    </div>
  );
}
