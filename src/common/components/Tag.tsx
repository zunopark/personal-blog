import Link from 'next/link';
import { Badge } from '@/common/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagProps {
  tag: string;
  clickable?: boolean;
}

export function Tag({ tag, clickable = false }: TagProps) {
  const badge = (
    <Badge
      variant="secondary"
      className={cn(
        'rounded-full font-medium text-gray-700 bg-gray-100 border-0 hover:bg-gray-200 transition-colors',
        clickable && 'cursor-pointer'
      )}
    >
      #{tag}
    </Badge>
  );

  if (clickable) {
    return (
      <Link href={`/blog/tag/${tag}`} className="inline-block" aria-label={`태그 ${tag} 글 목록`}>
        {badge}
      </Link>
    );
  }

  return badge;
}
