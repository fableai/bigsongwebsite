import React from 'react';
import Link from 'next/link';

interface Tag {
  name: string;
  count: number;
}

interface TagSidebarProps {
  tags: Tag[];
}

export function TagSidebar({ tags }: TagSidebarProps) {
  return (
    <aside className="w-full space-y-4 lg:w-64">
      <h2 className="text-xl font-semibold">Tags</h2>
      <div className="space-y-2">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/search?tag=${encodeURIComponent(tag.name)}`}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            <span className="text-gray-700">#{tag.name}</span>
            <span className="text-sm text-gray-500">({tag.count})</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
