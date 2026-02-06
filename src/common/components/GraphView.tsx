'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData as GraphDataType } from '@/lib/posts';

const DEFAULT_NODE_COLOR = '#333333';
const DEFAULT_LINK_COLOR = '#999999';
const HIGHLIGHT_NODE_COLOR = '#7c3aed'; // purple – hovered & related nodes
const HIGHLIGHT_LINK_COLOR = '#7c3aed'; // purple – related links
const GROUP2_COLOR = '#555555';
const LABEL_COLOR = 'rgba(0,0,0,0.85)';
const LABEL_HIGHLIGHT_COLOR = '#000000';
const NODE_STROKE_COLOR = 'rgba(0,0,0,0.12)';
const NODE_RADIUS_BASE = 8;
const NODE_RADIUS_HOVER_SCALE = 1.3; // 호버 시 원 확대
const LABEL_FONT_HOVER_SCALE = 1.35; // 호버 시 라벨 확대
const LABEL_GAP = 4;
const DIM_OVERLAY_OPACITY = 0.05; // 배경 디밍 정도
const HOVER_TRANSITION_DURATION_MS = 180; // 호버 페이드 인/아웃 시간

/** 0~1 선형을 easeOutCubic으로 변환 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** hex 색상을 r,g,b 로 반환 */
function hexToRgb(hex: string): [number, number, number] {
  const n = hex.slice(1);
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}

/** 두 hex 색상을 progress(0~1)로 보간 */
function lerpHex(hexA: string, hexB: string, progress: number): string {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  const t = easeOutCubic(Math.max(0, Math.min(1, progress)));
  return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)})`;
}

type GraphViewProps = {
  initialGraphData: GraphDataType;
};

export const GraphView = ({ initialGraphData }: GraphViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<GraphDataType['nodes'][0] | null>(null);
  const [transitionProgress, setTransitionProgress] = useState(0); // 0 = no hover, 1 = full hover (페이드용)
  const progressRef = useRef(0);
  const router = useRouter();

  // 호버 시 transitionProgress 0↔1 애니메이션 (페이드 인/아웃)
  useEffect(() => {
    const target = hoveredNode ? 1 : 0;
    const startVal = progressRef.current;
    if (startVal === target) return;
    const duration = HOVER_TRANSITION_DURATION_MS;
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const newProgress = startVal + (target - startVal) * eased;
      progressRef.current = newProgress;
      setTransitionProgress(newProgress);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hoveredNode]);

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

  const getNodeCanvasObject = useCallback(
    (node: GraphDataType['nodes'][0], ctx: CanvasRenderingContext2D, globalScale: number) => {
      const x = (node as { x?: number }).x ?? 0;
      const y = (node as { y?: number }).y ?? 0;
      const baseRadius = NODE_RADIUS_BASE / globalScale;
      const isHighlighted = hoveredNode && highlightedNodeIds.has(String(node.id));
      const isHoveredNode = hoveredNode && String((node as { id?: string }).id) === String((hoveredNode as { id?: string }).id);
      const normalColor = node.group === 1 ? DEFAULT_NODE_COLOR : GROUP2_COLOR;
      const nodeColor = isHighlighted ? lerpHex(normalColor, HIGHLIGHT_NODE_COLOR, transitionProgress) : normalColor;
      const radiusScale = isHoveredNode ? 1 + (NODE_RADIUS_HOVER_SCALE - 1) * transitionProgress : 1;
      const radius = baseRadius * radiusScale;

      // 원(노드) 그리기 – 호버 시 페이드·확대
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = nodeColor;
      ctx.fill();
      ctx.strokeStyle = NODE_STROKE_COLOR;
      ctx.lineWidth = 1 / globalScale;
      ctx.stroke();

      // 원 아래 타이틀 – 호버 시 폰트 페이드·확대
      const label = (node as { title?: string }).title ?? node.id;
      const baseFontSize = 11 / globalScale;
      const fontScale = isHoveredNode ? 1 + (LABEL_FONT_HOVER_SCALE - 1) * transitionProgress : 1;
      const fontSize = baseFontSize * fontScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = isHighlighted ? LABEL_HIGHLIGHT_COLOR : LABEL_COLOR;
      const labelY = y + radius + LABEL_GAP / globalScale;
      ctx.fillText(label, x, labelY);
    },
    [hoveredNode, highlightedNodeIds, transitionProgress]
  );

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
      className="w-full h-full min-w-0 overflow-hidden relative"
      style={{ width: '100%', height: '100%' }}
    >
      {/* 호버 시 배경 디밍 – 페이드 인/아웃 */}
      {transitionProgress > 0 && (
        <div
          className="absolute inset-0 pointer-events-none transition-none"
          style={{
            background: `rgba(0,0,0,${DIM_OVERLAY_OPACITY * transitionProgress})`,
            zIndex: 0,
          }}
          aria-hidden
        />
      )}
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        <ForceGraph2D
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          // nodeLabel="title"
          nodeAutoColorBy="group"
          nodeCanvasObject={getNodeCanvasObject}
          nodePointerAreaPaint={(node, paintColor, ctx, globalScale) => {
            getNodePointerAreaPaint(node, paintColor, ctx, globalScale);
          }}
          linkColor={(link) =>
            isLinkHighlighted(link) ? lerpHex(DEFAULT_LINK_COLOR, HIGHLIGHT_LINK_COLOR, transitionProgress) : DEFAULT_LINK_COLOR
          }
          backgroundColor={transitionProgress > 0 ? 'transparent' : '#ffffff'}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover as any}
          showPointerCursor={handlePointerCursor}
          cooldownTicks={100}
          warmupTicks={100}
        />
      </div>
    </div>
  );
};