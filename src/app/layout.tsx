import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { ReactLenis } from "@/utils/lenis";
import { Montserrat, Poppins } from "next/font/google";
import { cn } from "@/lib/cn";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://sadidx.me";
const siteName = "Sadid Portfolio";
const defaultTitle = "Sadid | Full-Stack Web Developer";
const defaultDescription =
  "Full-stack web developer specializing in Next.js, React, Node.js, and PostgreSQL. Explore projects, experience, and contact information.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Sadid",
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "Sadid",
    "Full Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "PostgreSQL",
    "Portfolio",
    "Bangladesh Developer",
    "Dream Coder",
  ],
  authors: [{ name: "Sadid", url: siteUrl }],
  creator: "Sadid",
  publisher: "Sadid",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sadid Portfolio",
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
    google: "google-site-verification=AyiIcHGh9iPpeyrSX5XSbt1vLUZFjtYh_4tnC5Yl9TA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sadid",
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    jobTitle: "Full-Stack Web Developer",
    sameAs: ["https://github.com/sadid56/", "https://www.linkedin.com/in/mr-sadid/", "https://www.facebook.com/sadidhasanx/"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    inLanguage: "en",
  };

  return (
    <html lang='en' suppressHydrationWarning>
      <ReactLenis
        options={{
          duration: 1.1,
          lerp: 0.1,
          wheelMultiplier: 1.5,
          touchMultiplier: 2,
        }}
        root
      >
        <body className={cn(montserrat.variable, poppins.variable, "antialiased")}>
          <Script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
          <Script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
