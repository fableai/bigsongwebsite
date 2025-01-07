declare module 'ali-oss' {
  interface OSSOptions {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    endpoint?: string;
    secure?: boolean;
  }

  interface PutObjectResult {
    name: string;
    url: string;
    res: {
      status: number;
      statusCode: number;
      headers: Record<string, string>;
    };
  }

  class OSS {
    constructor(options: OSSOptions);
    put(objectName: string, file: Buffer | Blob | string): Promise<PutObjectResult>;
    get(objectName: string): Promise<{ content: Buffer }>;
    delete(objectName: string): Promise<void>;
    list(query?: { prefix?: string; marker?: string; maxKeys?: number }): Promise<{
      objects: Array<{ name: string; url: string }>;
      prefixes: string[];
      nextMarker: string;
      isTruncated: boolean;
    }>;
  }

  export default OSS;
}
