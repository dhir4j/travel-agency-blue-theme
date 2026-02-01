/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint errors during build for deployment
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.postimg.cc'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
}

module.exports = nextConfig
