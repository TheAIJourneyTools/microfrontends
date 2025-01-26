import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Only modify the webpack for the client side
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        dashboard: path.resolve(
          __dirname,
          '../../public-components/dist/Dashboard.js'
        ),
      };
    }

    return config;
  },
};

export default nextConfig;
