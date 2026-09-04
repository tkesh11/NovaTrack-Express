/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'components']
  }
}

export default nextConfig;
