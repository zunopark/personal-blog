'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData as GraphDataType } from '@/lib/posts';

const DEFAULT_NODE_COLOR = '#333333';
const DEFAULT_LINK_COLOR = '#999999';
const HIGHLIGHT_NODE_COLOR = '#000000';
const HIGHLIGHT_LINK_COLOR = '#000000';
const GROUP2_COLOR = '#555555';
const LABEL_COLOR = 'rgba(0,0,0,0.85)';
const LABEL_HIGHLIGHT_COLOR = '#000000';
const NODE_STROKE_COLOR = 'rgba(0,0,0,0.12)';
const NODE_RADIUS_BASE = 8; // 화면 기준 원 반지름(픽셀) - globalScale로 나눠서 사용
const LABEL_GAP = 4; // 원과 타이틀 사이 간격

type GraphViewProps = {
  initialGraphData: GraphDataType;
};

export const GraphView = ({ initialGraphData }: GraphViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<GraphDataType['nodes'][0] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const data = useMemo(() => initialGraphData, [initialGraphData]);

  const highlightedNodeIds = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const ids = new Set<string>([String(hoveredNode.id)]);
    data.links.forEach((link) => {
      const src = typeof link.source === 'object' ? (link.source as { id?: string }).id : link.source;
      const tgt = typeof link.target === 'object' ? (link.target as { id?: string }).id : link.target;
      if (src === hoveredNode.id || tgt === hoveredNode.id) {
        if (src) ids.add(String(src));
        if (tgt) ids.add(String(tgt));
      }
    });
    return ids;
  }, [hoveredNode, data.links]);

  const isLinkHighlighted = (link: { source?: { id?: string } | string; target?: { id?: string } | string }) => {
    if (!hoveredNode) return false;
    const src = typeof link.source === 'object' ? link.source?.id : link.source;
    const tgt = typeof link.target === 'object' ? link.target?.id : link.target;
    return src === hoveredNode.id || tgt === hoveredNode.id;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-w-0 overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="title"
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const x = node.x ?? 0;
          const y = node.y ?? 0;
          const radius = NODE_RADIUS_BASE / globalScale;
          const isHighlighted = hoveredNode && highlightedNodeIds.has(String(node.id));
          const nodeColor = isHighlighted ? HIGHLIGHT_NODE_COLOR : (node.group === 1 ? DEFAULT_NODE_COLOR : GROUP2_COLOR);

          // 원(노드) 그리기
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = nodeColor;
          ctx.fill();
          ctx.strokeStyle = NODE_STROKE_COLOR;
          ctx.lineWidth = 1 / globalScale;
          ctx.stroke();

          // 원 아래 타이틀
          const label = (node as { title?: string }).title ?? node.id;
          const fontSize = 11 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = isHighlighted ? LABEL_HIGHLIGHT_COLOR : LABEL_COLOR;
          const labelY = y + radius + LABEL_GAP / globalScale;
          ctx.fillText(label, x, labelY);
        }}
        nodePointerAreaPaint={(node, paintColor, ctx, globalScale) => {
          const x = node.x ?? 0;
          const y = node.y ?? 0;
          const radius = (NODE_RADIUS_BASE / globalScale) * 2; // 클릭/호버 영역을 넉넉히
          ctx.fillStyle = paintColor;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }}
        linkColor={(link) => (isLinkHighlighted(link) ? HIGHLIGHT_LINK_COLOR : DEFAULT_LINK_COLOR)}
        backgroundColor="#ffffff"
        onNodeClick={(node) => {
          const slug = (node as GraphDataType['nodes'][0]).slug;
          if (slug) router.push(`/blog/${slug}`);
        }}
        onNodeHover={(node, prev) => setHoveredNode(node as GraphDataType['nodes'][0] | null)}
        showPointerCursor={(obj) => !!(obj && (obj as GraphDataType['nodes'][0]).slug)}
        cooldownTicks={100}
        warmupTicks={100}
      />
    </div>
  );
};