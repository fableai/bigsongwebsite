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

// Static design work data for build time
const DESIGN_WORKS = [
  {
    id: 'ui-design-system',
    title: 'UI Design System',
    description: 'A comprehensive design system for web applications',
    content: 'Detailed content about the design system...',
    images: ['https://example.com/design1.jpg'],
    tags: ['ui', 'design-system'],
    date: '2024-01-01',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Project',
    description: 'Complete brand identity design for a tech startup',
    content: 'Detailed content about the brand identity project...',
    images: ['https://example.com/design2.jpg'],
    tags: ['branding', 'identity'],
    date: '2024-01-02',
  },
];

export async function generateStaticParams() {
  return DESIGN_WORKS.map((work) => ({
    id: work.id,
  }));
}

async function getDesignWorkById(id: string): Promise<DesignWork | null> {
  const work = DESIGN_WORKS.find(w => w.id === id);
  return work || null;
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
