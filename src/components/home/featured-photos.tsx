import React from 'react';
import { MasonryGrid } from '@/components/photography/masonry-grid';

interface FeaturedPhotosProps {
  photos: Array<{
    id: string;
    title: string;
    description?: string;
    url: string;
    tags?: string[];
  }>;
}

export function FeaturedPhotos({ photos }: FeaturedPhotosProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Featured Photography</h2>
      <MasonryGrid photos={photos} />
    </section>
  );
}
