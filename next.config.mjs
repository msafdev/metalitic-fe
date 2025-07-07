/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false
      },
      {
        source: '/dashboard',
        destination: '/dashboard/projects',
        permanent: false
      },
    ];
  },
};

export default nextConfig;
