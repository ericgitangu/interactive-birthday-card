import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Interactive Birthday Card',
  description: 'Create and share personalized interactive birthday cards with your loved ones.',
  openGraph: {
    title: 'Interactive Birthday Card',
    description: 'Create and share personalized interactive birthday cards with your loved ones.',
    images: ['https://eczksrl6qik25g4c.public.blob.vercel-storage.com/images/logo-WQ5tjUd0ZyOMEcX16qHHa2Rc6uFZ3i.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Birthday Card',
    description: 'Create and share personalized interactive birthday cards with your loved ones.',
    images: ['https://eczksrl6qik25g4c.public.blob.vercel-storage.com/images/logo-WQ5tjUd0ZyOMEcX16qHHa2Rc6uFZ3i.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
