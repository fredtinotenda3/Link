import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Geist({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Opticians — Premium Eye Care & Precision Vision",
  description:
    "Same-day spectacles from our in-house lab. Book an eye exam online at Link Opticians. Quality eye care across Zimbabwe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#001F3F" />
        <meta property="og:site_name" content="Link Opticians" />
        <meta
          property="og:title"
          content="Link Opticians — Eye Care & Precision Vision"
        />
        <meta
          property="og:description"
          content="Same-day spectacles from our in-house lab. Book an eye exam online at Link Opticians."
        />
        <meta property="og:image" content="/assets/og-image.png" />
      </head>
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
