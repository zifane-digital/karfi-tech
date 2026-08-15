import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KARFI HOLDING",
    template: "%s | KARFI HOLDING",
  },
  description:
    "KARFI HOLDING — Produire, innover et construire pour contribuer au développement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-base-100 text-base-content antialiased">

        <Navbar />

        <main className="min-h-screen pt-20">
          {children}
        </main>

        {/* <Footer /> */}

      </body>
    </html>
  );
}