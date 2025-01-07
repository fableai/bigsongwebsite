import OSS from 'ali-oss';

let ossClient: OSS | null = null;

export function getOSSClient() {
  if (process.env.NODE_ENV === 'development' && !ossClient) {
    ossClient = new OSS({
      region: process.env.NEXT_PUBLIC_OSS_REGION!,
      accessKeyId: process.env.OSS_ACCESS_KEY!,
      accessKeySecret: process.env.OSS_ACCESS_SECRET!,
      bucket: process.env.NEXT_PUBLIC_OSS_BUCKET!,
      endpoint: process.env.NEXT_PUBLIC_OSS_ENDPOINT?.replace(/^https?:\/\//, ''),
      secure: true,
    });
  }
  return ossClient;
}

export async function uploadToOSS(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  try {
    const client = getOSSClient();
    if (client) {
      const result = await client.put(fileName, file);
      return result.url;
    }
    throw new Error('OSS client not initialized');
  } catch (error) {
    console.error('Error uploading to OSS:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFromOSS(fileName: string): Promise<void> {
  try {
    const client = getOSSClient();
    if (client) {
      await client.delete(fileName);
    } else {
      throw new Error('OSS client not initialized');
    }
  } catch (error) {
    console.error('Error deleting from OSS:', error);
    throw new Error('Failed to delete file');
  }
}

export async function listOSSFiles(prefix?: string): Promise<string[]> {
  try {
    const client = getOSSClient();
    if (client) {
      const result = await client.list({
        prefix,
        maxKeys: 1000,
      });
      return result.objects.map(obj => obj.url);
    }
    throw new Error('OSS client not initialized');
  } catch (error) {
    console.error('Error listing OSS files:', error);
    throw new Error('Failed to list files');
  }
}
