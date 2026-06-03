import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@monolith/ui', '@monolith/config', '@monolith/types'],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
