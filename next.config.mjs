/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: ['example.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_OSS_ENDPOINT?.replace(/^https?:\/\//, ''),
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'export',
  distDir: 'dist'
}
