const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sadidx.me",
      },
    ],
    qualities: [75, 85, 95, 100, 50],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "gsap", "@gsap/react"],
  },
  devIndicators: false,
};

export default nextConfig;
