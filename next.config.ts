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
  devIndicators: false,
};

export default nextConfig;
