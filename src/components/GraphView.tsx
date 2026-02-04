'use client';

import ForceGraph2D from 'react-force-graph-2d';

export const GraphView = () => {
  const data = {
    nodes: [
      { id: '발표 스크립트', group: 1 },
      { id: '업무 아이디', group: 1 },
      { id: 'DOMContentLoaded', group: 2 },
      { id: 'Value type, Reference type', group: 2 },
    ],
    links: [
      { source: '발표 스크립트', target: 'DOMContentLoaded' },
      { source: '업무 아이디', target: 'DOMContentLoaded' },
    ]
  };

  return (
    <div className="w-full h-full max-w-full overflow-hidden">
      <ForceGraph2D
      graphData={data}
      nodeLabel="id"
      nodeAutoColorBy="group"
      nodeCanvasObject={(node, ctx, globalScale) => {
        // 커스텀 노드 스타일
        const label = node.id;
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.group === 1 ? '#999' : '#f97316';
        ctx.fillText(label, node.x || 0, node.y || 0);
      }}
      linkColor={() => '#999999'}
      backgroundColor="#1a1a1a"
      onNodeClick={node => console.log(node)}
      cooldownTicks={100}
      warmupTicks={100}
    />
    </div>
  );
};