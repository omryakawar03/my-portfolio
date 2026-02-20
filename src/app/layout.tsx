import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SideContactBar from "@/components/SideContactBar";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"], display: "swap" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Omkar Ryakawar – Full Stack & DevOps Engineer | Next.js, Nest.js, AWS, CI/CD Specialist",
  description:
    "Full-stack engineer with DevOps expertise. I design, build, deploy and maintain production-grade applications using Next.js, Node.js, MongoDB, Docker, Kubernetes, CI/CD, and AWS. End-to-end system ownership with real world reliability.",
  keywords:
    "Full Stack Developer, DevOps Engineer, Next.js Portfolio, AWS DevOps, CI/CD Engineer, Cloud Engineer, Production Ready Apps, SRE, Developer Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Omkar Ryakawar – Portfolio",
    title: "Full Stack & DevOps Engineer – Portfolio",
    description:
      "Read my DevOps case studies, CI/CD pipelines, cloud architecture designs, and full-stack applications.",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Omkar Ryakawar Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://your-domain.com",
  },

  twitter: {
    card: "summary_large_image",
    creator: "@omryakawar",
    title: "OMKAR RYAKAWAR |Full Stack & DevOps Engineer – Portfolio",
    description: "Full-stack & DevOps engineer building modern web systems.",
    images: ["https://your-domain.com/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}${inter} antialiased  bg-black text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Omkar Ryakawar",
              jobTitle: "Full Stack Developer & DevOps Engineer",
              url: "https://your-domain.com",
              sameAs: [
                "https://github.com/omryakawar03",
                "https://www.linkedin.com/in/omkar-ryakawar-18368b387/",
              ],
              worksFor: {
                name: "Freelance / Personal Projects",
              },
              knowsAbout: [
                "Next.js",
                "Nest.js",
                "Node.js",
                "Docker",
                "CI/CD",
                "Kubernetes",
                "AWS",
                "MongoDB",
                "DevOps",
                "System Design",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What technologies do you use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Next.js, Node.js, Docker, AWS, CI/CD, MongoDB.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects",
                  item: "/projects",
                },
              ],
            }),
          }}
        />

        <Navbar />
        <SideContactBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
