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

interface RecentPostsProps {
  posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Recent Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {posts.slice(0, 10).map((post) => (
          <article key={post.slug} className="space-y-2">
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-lg font-semibold hover:text-gray-600">{post.title}</h3>
            </Link>
            <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
            <p className="text-gray-600">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?tag=${encodeURIComponent(tag)}`}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
