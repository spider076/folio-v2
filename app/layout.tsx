import type { Metadata } from "next";

import { PHProvider } from "@/providers/PHProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saad",
  description: "Aesthetic, minimalistic, and responsive portfolio website.",
  openGraph: {
    title: "Saad",
    description: "not the only website ever",
    type: "website",
    url: "https://saadabban.vercel.app",
    images: "/azuki.png",
  },
  twitter: {
    images: "/azuki.png",
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
        </body>
      </html>
    </PHProvider>
  );
}
