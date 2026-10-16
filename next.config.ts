const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sadidx.me",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 95, 100, 50],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "gsap", "@gsap/react"],
  },
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
