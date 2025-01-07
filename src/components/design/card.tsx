import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DesignWork {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags?: string[];
}

interface DesignCardProps {
  work: DesignWork;
}

export function DesignCard({ work }: DesignCardProps) {
  return (
    <Link href={`/design/${work.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30" />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold group-hover:text-gray-600">{work.title}</h3>
        <p className="text-sm text-gray-600">{work.description}</p>
        {work.tags && (
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span key={tag} className="text-sm text-gray-500">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
