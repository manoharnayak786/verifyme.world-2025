/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['pdf-lib', 'qrcode', 'postgres'],
  experimental: {
    optimizePackageImports: ['pdf-lib', 'qrcode', 'lucide-react'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
