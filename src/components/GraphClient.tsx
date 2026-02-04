'use client';

import dynamic from 'next/dynamic';

const GraphView = dynamic(
  () => import('@/components/GraphView').then((mod) => mod.GraphView),
  { ssr: false }
);

export function GraphClient() {
  return (
    <div className="w-full h-full min-h-[50vh] max-w-full overflow-hidden">
      <GraphView />
    </div>
  );
}
