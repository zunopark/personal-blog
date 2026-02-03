import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

export type FrontMatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
};

export type BlogPost = {
  frontMatter: FrontMatter;
  slug: string;
  content: string;
};

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(POSTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      ...(data as Omit<FrontMatter, 'slug'>),
      slug,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // next-mdx-remote/rsc는 serialize 불필요 - 원본 content 문자열 반환
  return {
    slug: slug.replace(/\.mdx?$/, ''),
    frontMatter: data as FrontMatter,
    content, // 원본 문자열 그대로 반환
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx?$/, ''),
      },
    };
  });
}

// 연관 글 찾기 (같은 태그를 가진 글들)
export function getRelatedPosts(currentSlug: string, currentTags: string[], limit: number = 3) {
  const allPosts = getSortedPostsData();
  
  // 현재 글 제외
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
  
  // 공통 태그 개수를 기준으로 점수 계산
  const postsWithScore = otherPosts.map(post => {
    const commonTags = post.tags.filter(tag => currentTags.includes(tag));
    return {
      ...post,
      score: commonTags.length,
      commonTags,
    };
  });
  
  // 공통 태그가 많은 순으로 정렬
  const sortedPosts = postsWithScore
    .filter(post => post.score > 0) // 최소 1개 이상 태그가 일치해야 함
    .sort((a, b) => b.score - a.score);
  
  // 지정된 개수만큼 반환
  return sortedPosts.slice(0, limit);
}

// 모든 태그 목록 가져오기
export function getAllTags() {
  const allPosts = getSortedPostsData();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}
