import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog'); // 경로 수정: src/ 제거

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
  content: any;
};

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(POSTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const { slug: _ignored, ...frontMatterWithoutSlug } = data as FrontMatter; // slug 제외

    return {
      slug,
      ...frontMatterWithoutSlug, // slug 제외된 frontMatter 스프레드
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

  // Use next-mdx-remote to serialize the content
  const mdxSource = await serialize(content, { scope: data });

  return {
    slug,
    frontMatter: data as FrontMatter,
    content: mdxSource,
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
