import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apna College",
  description: "A modern profile & identity platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
       
        <style
  dangerouslySetInnerHTML={{
    __html: `
      html, body {
        transition:
          background-color 450ms ease,
          color 450ms ease;
      }

      /* Keep cards in sync with background */
      .card {
        transition:
          background-color 450ms ease,
          border-color 450ms ease,
          color 450ms ease,
          box-shadow 450ms ease;
      }
    `,
  }}
/>

      </head>

      <body suppressHydrationWarning className="min-h-screen">
        <Providers>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
