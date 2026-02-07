'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData as GraphDataType } from '@/lib/graphTypes';

const DEFAULT_NODE_COLOR = '#333333';
const DEFAULT_LINK_COLOR = '#999999';
const DEFAULT_LINK_WIDTH = 1;
const THICK_LINK_WIDTH = 2.5;
const HIGHLIGHT_LINK_WIDTH = 3;
/** value가 이 값 이상이면 링크를 두껍게 그림 (초기 렌더) */
const THICK_LINK_VALUE_THRESHOLD = 2;
const HIGHLIGHT_NODE_COLOR = '#155dfc';
const HIGHLIGHT_LINK_COLOR = '#155dfc';
const GROUP2_COLOR = '#555555';
const LABEL_COLOR = 'rgba(0,0,0,0.85)';
const LABEL_HIGHLIGHT_COLOR = 'rgba(0,0,0,0.9)';
const NODE_STROKE_COLOR = 'rgba(0,0,0,0.12)';
const NODE_RADIUS_BASE = 8; // 화면 기준 원 반지름(픽셀) - globalScale로 나눠서 사용
const NODE_HOVER_SCALE = 1.35; // 호버 시 노드 원 크기 배율
const LABEL_GAP = 10; // 원과 타이틀 사이 간격 (노드에서 더 아래로)
const LABEL_FONT_SIZE = 14; // 노드 아래 타이틀 기본 크기
const LABEL_FONT_SIZE_HIGHLIGHT = 16; // 호버 시 타이틀 크기

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

  const isLinkHighlighted = (link: { source?: { id?: string } | string; target?: { id?: string } | string }) => {
    if (!hoveredNode) return false;
    const src = typeof link.source === 'object' ? link.source?.id : link.source;
    const tgt = typeof link.target === 'object' ? link.target?.id : link.target;
    return src === hoveredNode.id || tgt === hoveredNode.id;
  };

  const getLinkWidth = (link: GraphDataType['links'][0]) => {
    if (isLinkHighlighted(link)) return HIGHLIGHT_LINK_WIDTH;
    const value = (link as { value?: number }).value ?? 1;
    return value >= THICK_LINK_VALUE_THRESHOLD ? THICK_LINK_WIDTH : DEFAULT_LINK_WIDTH;
  };

  const getNodeCanvasObject = (node: GraphDataType['nodes'][0], ctx: CanvasRenderingContext2D, globalScale: number) => {
    const x = (node as { x?: number }).x ?? 0;
    const y = (node as { y?: number }).y ?? 0;
    const baseRadius = NODE_RADIUS_BASE / globalScale;
    const isHighlighted = hoveredNode !== null && String(node.id) === String(hoveredNode.id);
    const radius = isHighlighted ? baseRadius * NODE_HOVER_SCALE : baseRadius;
    const nodeColor = isHighlighted ? HIGHLIGHT_NODE_COLOR : (node.group === 1 ? DEFAULT_NODE_COLOR : GROUP2_COLOR);

    // 원(노드) 그리기 (호버 시 약간 확대)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = nodeColor;
    ctx.fill();
    ctx.strokeStyle = NODE_STROKE_COLOR;
    ctx.lineWidth = 1 / globalScale;
    ctx.stroke();

    // 원 아래 타이틀 (호버 시 폰트 크기 증가, 노드에서 더 아래로 배치)
    const label = (node as { title?: string }).title ?? node.id;
    const fontSize = (isHighlighted ? LABEL_FONT_SIZE_HIGHLIGHT : LABEL_FONT_SIZE) / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = isHighlighted ? LABEL_HIGHLIGHT_COLOR : LABEL_COLOR;
    const labelY = y + radius + LABEL_GAP / globalScale;
    ctx.fillText(label, x, labelY);
  };

  const getNodePointerAreaPaint = (node: GraphDataType['nodes'][0], paintColor: string, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const x = (node as { x?: number }).x ?? 0;
    const y = (node as { y?: number }).y ?? 0;
    const radius = (NODE_RADIUS_BASE / globalScale) * 2; // 클릭/호버 영역을 넉넉히
    ctx.fillStyle = paintColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleNodeClick = (node: GraphDataType['nodes'][0]) => {
    const slug = (node as GraphDataType['nodes'][0]).slug;
    if (slug) router.push(`/blog/${slug}`);
  };

  const handleNodeHover = (node: GraphDataType['nodes'][0], prev: GraphDataType['nodes'][0] | null) => {
    setHoveredNode(node as GraphDataType['nodes'][0] | null);
  };

  const handlePointerCursor = (obj: any) => {
    return !!(obj && (obj as GraphDataType['nodes'][0]).slug);
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
        nodeAutoColorBy="group"
        nodeCanvasObject={getNodeCanvasObject}
        nodePointerAreaPaint={(node, paintColor, ctx, globalScale) => {
          getNodePointerAreaPaint(node, paintColor, ctx, globalScale);
        }}
        linkColor={(link) => (isLinkHighlighted(link) ? HIGHLIGHT_LINK_COLOR : DEFAULT_LINK_COLOR)}
        linkWidth={(link) => getLinkWidth(link)}
        backgroundColor="#ffffff"
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover as any}
        showPointerCursor={handlePointerCursor}
        cooldownTicks={100}
        warmupTicks={100}
      />
    </div>
  );
};