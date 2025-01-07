import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ossClient } from '@/lib/oss';

interface PhotoPageProps {
  params: {
    id: string;
  };
}

async function getPhoto(id: string) {
  try {
    const photo = await ossClient.get(`photos/${id}`);
    return JSON.parse(photo.content.toString());
  } catch (error) {
    return null;
  }
}

// Static photo data for build time
const STATIC_PHOTOS = [
  {
    id: 'sample-1',
    title: 'Sample Photo 1',
    description: 'A beautiful landscape photo',
    url: 'https://example.com/photo1.jpg',
    tags: ['landscape', 'nature'],
  },
  {
    id: 'sample-2',
    title: 'Sample Photo 2',
    description: 'Urban architecture',
    url: 'https://example.com/photo2.jpg',
    tags: ['urban', 'architecture'],
  },
];

export async function generateStaticParams() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const result = await ossClient.list({
        prefix: 'photos/',
        maxKeys: 1000,
      });
      return result.objects.map(obj => ({
        id: obj.name.replace('photos/', ''),
      }));
    } catch (error) {
      console.error('Error generating photo params:', error);
    }
  }
  // Fallback to static data for production build
  return STATIC_PHOTOS.map(photo => ({
    id: photo.id,
  }));
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const photo = await getPhoto(params.id);

  if (!photo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{photo.title}</h1>
          <p className="mt-4 text-gray-600">{photo.description}</p>

          {photo.metadata && (
            <div className="mt-6 space-y-2">
              <h2 className="text-xl font-semibold">Photo Details</h2>
              {photo.metadata.camera && (
                <p className="text-gray-600">Camera: {photo.metadata.camera}</p>
              )}
              {photo.metadata.lens && (
                <p className="text-gray-600">Lens: {photo.metadata.lens}</p>
              )}
              {photo.metadata.settings && (
                <p className="text-gray-600">Settings: {photo.metadata.settings}</p>
              )}
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {photo.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
