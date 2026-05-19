import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@monolith/ui', '@monolith/config', '@monolith/types'],
};

export default nextConfig;
