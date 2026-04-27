/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required if you want to use the camera in some browser environments
  async headers() {
    return [
      {
        source: '/scan',
        headers: [
          { key: 'Permissions-Policy', value: 'camera=*' }
        ],
      },
    ];
  },
};

export default nextConfig;
