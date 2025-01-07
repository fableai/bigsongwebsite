import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface DesignWork {
  id: string;
  title: string;
  description: string;
  content: string;
  images: string[];
  tags?: string[];
  date: string;
}

async function getDesignWorkById(id: string): Promise<DesignWork | null> {
  // Placeholder data - replace with actual data fetching
  const work = {
    id,
    title: 'Sample Design Work',
    description: 'A detailed description of the design work',
    content: 'Full content of the design work...',
    images: ['https://example.com/image1.jpg'],
    tags: ['ui', 'web'],
    date: '2024-01-01',
  };
  return work;
}

export default async function DesignWorkPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await getDesignWorkById(params.id);

  if (!work) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold">{work.title}</h1>
          <p className="text-xl text-gray-600">{work.description}</p>
          {work.tags && (
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="space-y-8">
          {work.images.map((image, index) => (
            <div key={index} className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`${work.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          <div className="prose prose-lg max-w-none">{work.content}</div>
        </div>
      </article>
    </div>
  );
}
