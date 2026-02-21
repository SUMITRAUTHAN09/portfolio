import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumit Rauthan | Frontend & Mobile App Developer",
  description:
    "Portfolio of Sumit Rauthan - Frontend & Mobile App Developer specializing in React.js, Next.js, Tailwind CSS, and React Native. Explore projects, skills, and experience.",
  keywords: [
    "Sumit Rauthan",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Portfolio Website",
  ],
  authors: [{ name: "Sumit Rauthan" }],
  creator: "Sumit Rauthan",

  openGraph: {
    title: "Sumit Rauthan | Frontend & Mobile App Developer",
    description:
      "Frontend & Mobile App Developer skilled in React.js, Next.js, Tailwind CSS, and React Native.",
    url: "https://sumitrauthan.site",
    siteName: "Sumit Rauthan Portfolio",
    type: "website",
  },
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
      </body>
    </html>
  );
}
