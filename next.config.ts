/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swiper'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
