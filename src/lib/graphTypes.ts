/**
 * 그래프 뷰용 타입 (Node/fs 의존 없음 — 클라이언트에서 안전하게 import)
 */

export type GraphNodeData = {
  id: string;
  title: string;
  slug: string;
  group: number;
};

export type GraphLinkData = {
  source: string;
  target: string;
  value?: number;
};

export type GraphData = {
  nodes: GraphNodeData[];
  links: GraphLinkData[];
};
