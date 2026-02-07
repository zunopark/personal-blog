import { getGraphData, getAllTags, getPostsByTag } from '@/lib/posts';
import { HomeTagGraph } from '@/common/components/HomeTagGraph';
import { IntroToggle } from '@/common/components/IntroToggle';

export default function Home() {
  const graphData = getGraphData();
  const tags = getAllTags();
  const tagSlugsMap: Record<string, string[]> = {};
  tags.forEach(({ tag }) => {
    tagSlugsMap[tag] = getPostsByTag(tag).map((p) => p.slug);
  });

  return (
    <div className="flex flex-col min-h-screen w-full">
      <IntroToggle />
      <div className="flex-1 flex flex-col min-h-0 w-full">
        <HomeTagGraph graphData={graphData} tags={tags} tagSlugsMap={tagSlugsMap} />
      </div>
    </div>
  );
}
