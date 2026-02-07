/**
 * 그래프 필터 유틸 (클라이언트에서 사용 가능, fs 등 Node 전용 모듈 없음)
 */

export type FilterableGraphData = {
  nodes: { id: string }[];
  links: { source: string; target: string }[];
};

/** 특정 slug 집합에 해당하는 노드·링크만 남긴 그래프 (태그 필터 등에 사용) */
export function filterGraphDataBySlugs<T extends FilterableGraphData>(
  graphData: T,
  slugs: string[]
): T {
  const set = new Set(slugs);
  return {
    ...graphData,
    nodes: graphData.nodes.filter((n) => set.has(n.id)) as T['nodes'],
    links: graphData.links.filter(
      (l) => set.has(l.source) && set.has(l.target)
    ) as T['links'],
  };
}
