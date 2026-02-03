import Link from 'next/link';

interface TagProps {
  tag: string;
  clickable?: boolean;
}

export function Tag({ tag, clickable = false }: TagProps) {
  const tagElement = (
    <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
      #{tag}
    </span>
  );

  if (clickable) {
    return (
      <Link href={`/blog/tag/${tag}`} className="inline-block">
        {tagElement}
      </Link>
    );
  }

  return tagElement;
}
