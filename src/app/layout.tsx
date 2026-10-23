import { cn } from "@/lib/cn";
import { SmoothScroll } from "@/utils/smoothScroll";
import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400"],
});

const siteUrl = "https://sadidx.me";
const defaultTitle = "Sadid | Let's build something amazing together ⚡";
const defaultDescription =
  "Official portfolio of Sadid — Creative Full-Stack Web Developer and GSAP Animation Specialist. Building award-winning, interactive, high-performance web experiences with Next.js, React, Node.js, and GSAP.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Sadid",
  },
  description: defaultDescription,
  applicationName: "Sadid Portfolio",
  generator: "Next.js",
  keywords: [
    // Direct Identity & Brand
    "Sadid",
    "Sadid Hasan",
    "mr-sadid",
    "sadid56",
    "Dream Coder",
    "Sadid Portfolio",
    "Sadid Developer",
    "Sadid Web Developer",
    // Discoverability & Best Website Searches
    "best website",
    "best gsap website",
    "best developer portfolio",
    "best portfolio website",
    "award winning portfolio",
    "creative developer portfolio",
    "interactive developer portfolio",
    "best web design",
    "awwwards style portfolio",
    // Technologies & Specializations
    "GSAP Animation Specialist",
    "GreenSock Developer",
    "GSAP ScrollTrigger Portfolio",
    "Next.js Developer",
    "React Developer",
    "Full Stack Web Developer",
    "Creative Web Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "PostgreSQL",
    "GSAP ScrollSmoother",
    "Web Animation Expert",
    "Frontend Engineer",
    "Bangladesh Developer",
  ],
  authors: [{ name: "Sadid", url: siteUrl }],
  creator: "Sadid",
  publisher: "Sadid",
  category: "Technology & Creative Development",
  classification: "Portfolio, Web Development, Creative Engineering",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sadid | Portfolio",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/sadid.png",
        width: 500,
        height: 500,
        alt: "Sadid - Creative Full-Stack Developer & GSAP Specialist",
      },
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Sadid Portfolio Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/sadid.png"],
    creator: "@sadid56",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      "google-site-verification=AyiIcHGh9iPpeyrSX5XSbt1vLUZFjtYh_4tnC5Yl9TA",
  },
  other: {
    "ai-summary":
      "Official portfolio of Sadid, a creative full-stack web developer specializing in Next.js, GSAP animations, React, Node.js, and interactive digital experiences.",
    rating: "General",
    "revisit-after": "7 days",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Sadid Portfolio",
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Sadid",
          alternateName: ["Sadid Hasan", "mr-sadid", "sadid56"],
          url: siteUrl,
          image: {
            "@type": "ImageObject",
            url: `${siteUrl}/sadid.png`,
            caption: "Sadid - Creative Full-Stack Web Developer",
          },
          jobTitle: "Creative Full-Stack Web Developer & GSAP Specialist",
          description: defaultDescription,
          sameAs: [
            "https://github.com/sadid56",
            "https://www.linkedin.com/in/mr-sadid/",
            "https://www.facebook.com/sadidhasanx/",
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Sadid",
        alternateName: ["Sadid Portfolio", "Sadid Hasan"],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          montserrat.variable,
          poppins.variable,
          "antialiased bg-mainBgColor",
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
