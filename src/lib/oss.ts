import OSS from 'ali-oss';

export const ossClient = new OSS({
  region: process.env.NEXT_PUBLIC_OSS_REGION!,
  accessKeyId: process.env.OSS_ACCESS_KEY!,
  accessKeySecret: process.env.OSS_ACCESS_SECRET!,
  bucket: process.env.NEXT_PUBLIC_OSS_BUCKET!,
  endpoint: process.env.NEXT_PUBLIC_OSS_ENDPOINT!,
});

export async function uploadToOSS(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  try {
    const result = await ossClient.put(fileName, file);
    return result.url;
  } catch (error) {
    console.error('Error uploading to OSS:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFromOSS(fileName: string): Promise<void> {
  try {
    await ossClient.delete(fileName);
  } catch (error) {
    console.error('Error deleting from OSS:', error);
    throw new Error('Failed to delete file');
  }
}

export async function listOSSFiles(prefix?: string): Promise<string[]> {
  try {
    const result = await ossClient.list({
      prefix,
      maxKeys: 1000,
    });
    return result.objects.map(obj => obj.url);
  } catch (error) {
    console.error('Error listing OSS files:', error);
    throw new Error('Failed to list files');
  }
}
