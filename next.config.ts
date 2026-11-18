import type { NextConfig } from 'next';

// GitHub Pages serves the site from /portfolio/, Vercel from the domain root.
// The Pages workflow sets GITHUB_PAGES=true so only that build gets the prefix.
const basePath = process.env.GITHUB_PAGES === 'true' ? '/portfolio' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  }
};

export default nextConfig;
