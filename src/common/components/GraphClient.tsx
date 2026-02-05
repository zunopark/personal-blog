'use client';

import dynamic from 'next/dynamic';
import type { GraphData } from '@/lib/posts';

const GraphView = dynamic(
  () => import('@/common/components/GraphView').then((mod) => mod.GraphView),
  { ssr: false }
);

type GraphClientProps = {
  initialGraphData: GraphData;
};

export function GraphClient({ initialGraphData }: GraphClientProps) {
  return (
    <div className="w-full min-w-0 h-full min-h-[50vh] overflow-hidden" style={{ width: '100%' }}>
      <GraphView initialGraphData={initialGraphData} />
    </div>
  );
}
