/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:all*(png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/public/sitemap.xml',
      },
    ]
  },
}
