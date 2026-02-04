'use client';

import dynamic from 'next/dynamic';

const GraphView = dynamic(
  () => import('@/components/GraphView').then((mod) => mod.GraphView),
  { ssr: false }
);

export function GraphClient() {
  return <GraphView />;
}
