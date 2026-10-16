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
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sadid - Creative Full-Stack Developer & GSAP Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo.png"],
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
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Sadid - Creative Full-Stack Developer & GSAP Specialist",
        alternateName: [
          "Sadid",
          "Sadid Portfolio",
          "Best GSAP Website",
          "Sadid Hasan Website",
          "Sadid Web Developer",
        ],
        description:
          "The official portfolio of Sadid — Award-worthy creative full-stack web developer and GSAP animation specialist crafting ultra-smooth interactive web experiences.",
        inLanguage: "en-US",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Sadid | Portfolio & Creative Developer Profile",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
        description:
          "Explore the projects, skills, animations, and journey of Sadid, a top creative full-stack developer specializing in GSAP and Next.js.",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Sadid",
        alternateName: ["Sadid Hasan", "mr-sadid", "sadid56", "Dream Coder"],
        url: siteUrl,
        image: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#image`,
          url: `${siteUrl}/logo.png`,
          caption: "Sadid - Creative Full-Stack Developer",
        },
        jobTitle: "Creative Full-Stack Web Developer & GSAP Specialist",
        description:
          "Sadid is a creative full-stack web developer and GSAP animation specialist recognized for building award-worthy interactive websites, high-performance web applications with Next.js, React, Node.js, and silky-smooth GSAP animations.",
        gender: "Male",
        nationality: {
          "@type": "Country",
          name: "Bangladesh",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: "Creative Full-Stack Web Developer",
          occupationLocation: {
            "@type": "Country",
            name: "Bangladesh",
          },
          skills:
            "Next.js, React, TypeScript, GSAP (GreenSock), ScrollTrigger, ScrollSmoother, Node.js, Express, PostgreSQL, Tailwind CSS, Web Performance",
        },
        knowsAbout: [
          "GSAP (GreenSock Animation Platform)",
          "GSAP ScrollTrigger",
          "GSAP ScrollSmoother",
          "Creative Web Development",
          "Interactive Web Design",
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Smooth Scrolling",
          "Frontend Engineering",
          "Full Stack Web Development",
          "UI/UX Design",
          "Web Performance Optimization",
          "Award-Winning Web Experiences",
        ],
        sameAs: [
          "https://github.com/sadid56",
          "https://www.linkedin.com/in/mr-sadid/",
          "https://www.facebook.com/sadidhasanx/",
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${siteUrl}/#portfolio`,
        name: "Sadid Portfolio Website",
        headline: "Best GSAP Website & Interactive Developer Portfolio",
        description:
          "An interactive, award-winning style developer portfolio built with Next.js, TypeScript, and high-performance GSAP ScrollTrigger animations.",
        author: {
          "@id": `${siteUrl}/#person`,
        },
        creator: {
          "@id": `${siteUrl}/#person`,
        },
        genre: [
          "Creative Portfolio",
          "Interactive Web Design",
          "GSAP Showcase",
        ],
        keywords: [
          "best website",
          "best gsap website",
          "creative developer",
          "interactive web design",
          "award winning portfolio",
          "sadid",
          "sadid hasan",
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
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
