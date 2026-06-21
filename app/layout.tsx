import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import CursorSystem from "@/components/CursorSystem";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Abheesht Roy",
  description:
    "Software engineer building at the intersection of reliable systems and applied AI.",
  openGraph: {
    title: "Abheesht Roy",
    description:
      "Software engineer building at the intersection of reliable systems and applied AI.",
    url: "https://abheeshtroy.dev",
    siteName: "Abheesht Roy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abheesht Roy",
    description:
      "Software engineer building at the intersection of reliable systems aed AI.",
  },
  metadataBase: new URL("https://abheeshtroy.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
          <CursorSystem />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}