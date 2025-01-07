import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Photo {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  metadata?: {
    camera?: string;
    lens?: string;
    settings?: string;
  };
}

interface MasonryGridProps {
  photos: Photo[];
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ photos }) => {
  return (
    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
      {photos.map((photo) => (
        <div key={photo.id} className="relative mb-4 break-inside-avoid">
          <Link href={`/photography/${photo.id}`}>
            <div className="group relative cursor-pointer overflow-hidden rounded-lg">
              <Image
                src={photo.url}
                alt={photo.title}
                width={800}
                height={600}
                className="w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-40" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">{photo.title}</h3>
                <p className="mt-2 text-sm text-white">{photo.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white bg-opacity-20 px-2 py-1 text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
