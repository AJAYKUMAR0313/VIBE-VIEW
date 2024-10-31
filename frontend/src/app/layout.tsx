import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CommentsProvider } from './CommentsContext'; // Import CommentsProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vibe View - Sentiment Analysis",
  description: "Analyze YouTube video comments for sentiment insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CommentsProvider> {/* Wrap children in CommentsProvider */}
          {children}
        </CommentsProvider>
      </body>
    </html>
  );
}
