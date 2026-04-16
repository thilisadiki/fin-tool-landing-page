/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'articles.quickmoneytool.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'i1.wp.com' },
      { protocol: 'https', hostname: 'i2.wp.com' },
    ],
  },
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/articles', destination: '/blog', permanent: true },
      { source: '/articles/:slug', destination: '/blog/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
