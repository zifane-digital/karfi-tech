import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "Karfi Holding",
    template: "%s | Karfi Holding",
  },
  description:
    "Karfi Holding — Produire, innover et construire. Un groupe engagé dans l'agriculture, la technologie, le mobilier, la formation et l'incubation.",
  keywords: [
    "Karfi Holding",
    "Karfi Agro",
    "Karfi Tech",
    "Karfi Mobilier",
    "Karfi Formation",
    "Karfi Incubation",
    "Niger",
    "innovation",
    "entrepreneuriat",
  ],
  authors: [{ name: "Karfi Holding" }],
  creator: "Karfi Holding",
  publisher: "Karfi Holding",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Karfi Holding",
    description:
      "Produire, innover et construire le développement de demain.",
    type: "website",
    locale: "fr_FR",
    siteName: "Karfi Holding",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <ThemeProvider>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}