import Link from 'next/link';
import { getGraphData, getAllTags } from '@/lib/posts';
import { GraphClient } from '@/common/components/GraphClient';
import { Button } from '@/common/components/ui/button';

export default function Home() {
  const graphData = getGraphData();
  const tags = getAllTags();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col items-center text-center px-6 py-12 shrink-0 w-full">
        <div className="max-w-4xl">
          {/* <h1 className="text-5xl md:text-8xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
            루카의 블로그
          </h1> */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-medium">
            루카의 블로그
          </p>
          <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto">
            기술, 일상, 경제/사회 문화 등 다양한 주제의 글을 기록합니다.
          </p>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                asChild
                className="rounded-full font-medium"
              >
                <Link href={`/blog/tag/${encodeURIComponent(tag)}`}>
                  #{tag}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 w-full min-w-0 min-h-0 px-4 overflow-x-hidden box-border">
        <GraphClient initialGraphData={graphData} />
      </div>
    </div>
  );
}
