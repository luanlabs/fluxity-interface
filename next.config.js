/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained build (.next/standalone) for small, fast Docker images.
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    // Type errors are enforced separately via `npm run typecheck` and in CI.
    // The build fails on type errors.
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint is enforced separately via `npm run lint` and in CI.
    // The build fails on lint errors.
    ignoreDuringBuilds: false,
  },
  images: {
    // Token logos are loaded from arbitrary issuer-hosted URLs, so the host
    // allow-list stays broad — but only over HTTPS (no plaintext fetches).
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // A wallet adapter bundled into Blux detects Node during prerendering and
      // selects a crypto path that its browser bundle does not include.
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.type': JSON.stringify('renderer'),
        }),
      );
    }

    return config;
  },
};

module.exports = nextConfig;
