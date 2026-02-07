'use client';

import { useMemo, useState } from 'react';
import { GraphClient } from '@/common/components/GraphClient';
import { Button } from '@/common/components/ui/button';
import { filterGraphDataBySlugs } from '@/lib/graphUtils';
import type { GraphData } from '@/lib/graphTypes';

type HomeTagGraphProps = {
  graphData: GraphData;
  tags: { tag: string; count: number }[];
  tagSlugsMap: Record<string, string[]>;
};

export function HomeTagGraph({ graphData, tags, tagSlugsMap }: HomeTagGraphProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const displayGraphData = useMemo(() => {
    if (!selectedTag) return graphData;
    const slugs = tagSlugsMap[selectedTag];
    if (!slugs?.length) return graphData;
    return filterGraphDataBySlugs(graphData, slugs);
  }, [graphData, selectedTag, tagSlugsMap]);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 shrink-0 mb-4">
          {tags.map(({ tag, count }) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              className="rounded-full font-medium"
              onClick={() => handleTagClick(tag)}
            >
              #{tag} <span className={selectedTag === tag ? 'opacity-90 text-xs ml-0.5' : 'text-gray-500 font-normal text-xs ml-0.5'}>{count}</span>
            </Button>
          ))}
        </div>
      )}
      <div className="flex-1 w-full min-w-0 min-h-0 px-4 overflow-x-hidden box-border">
        <GraphClient initialGraphData={displayGraphData} />
      </div>
    </div>
  );
}
