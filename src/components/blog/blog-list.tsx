import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="space-y-4">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold hover:text-gray-600">{post.title}</h2>
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?tag=${encodeURIComponent(tag)}`}
                  className="hover:text-gray-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-gray-600">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
