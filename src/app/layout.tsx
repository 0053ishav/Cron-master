import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cron Master | Generate Cron Expressions in Seconds",
  description: "Free cron expression generator for developers. Stop guessing and generate precise schedules instantly.",
  keywords: ["cron", "cron job", "cron expression", "schedule", "developer tools", "automation"],
  metadataBase: new URL("https://cronmaster.ishav.space"),
  openGraph: {
    title: "Cron Master | Generate Cron Expressions in Seconds",
    description: "Free cron expression generator for developers. Stop guessing and generate precise schedules instantly.",
    url: "https://cronmaster.ishav.space",
    siteName: "Cron Master",
    images: [
      {
        url: "/cron/cronLogo.png",
        width: 1200,
        height: 630,
        alt: "Cron Master - Cron Expression Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Master | Generate Cron Expressions in Seconds",
    description: "Free cron expression generator for developers. Stop guessing and generate precise schedules instantly.",
    images: ["/cron/cronLogo.png"], // Replace with your actual OG image path
  },
  icons: {
    icon: [
      { url: "/cron/favicon.ico", sizes: "any" },
      { url: "/cron/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/cron/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/cron/apple-touch-icon.png", sizes: "180x180" }, // For iOS devices
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg", // For Safari pinned tab
        color: "#2563EB", // Your brand color
      },
    ],
  },
  manifest: "/cron/site.webmanifest", // Web app manifest (optional)
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
