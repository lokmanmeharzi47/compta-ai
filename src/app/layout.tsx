import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, Geist } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-hanken-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Compta AI | Future of Finance",
  description: "Experience the future of finance with intelligent analytics, automated bookkeeping, and real-time insights powered by advanced neural models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${geist.variable} scroll-smooth`}
    >
      <body className="bg-background text-on-background font-body-md overflow-x-hidden bg-mesh min-h-screen flex flex-col">
        {/* Global SVG Gradients for Modern Icons */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0050cb" />
              <stop offset="100%" stopColor="#4b41e1" />
            </linearGradient>
            <linearGradient id="secondary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4b41e1" />
              <stop offset="100%" stopColor="#007d92" />
            </linearGradient>
            <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7b00" />
              <stop offset="100%" stopColor="#ffae00" />
            </linearGradient>
            <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
            <linearGradient id="success-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
