import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sadidx.me",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        "https://sadidx.me/sadid.webp",
        "https://sadidx.me/sadid.png",
      ],
    },
  ];
}
