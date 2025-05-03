import type { Metadata } from "next";

import { PHProvider } from "@/providers/PHProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Saad",
  description: "Aesthetic, minimalistic, and responsive portfolio website.",
  openGraph: {
    title: "Saad",
    description: "not the only website ever",
    type: "website",
    url: "https://saadabban.vercel.app",
    images: "/me.jpg",
  },
  twitter: {
    images: "/me.jpg",
    card: "summary",
  },
  themeColor: "#EED1C6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PHProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </PHProvider>
  );
}
