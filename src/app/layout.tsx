import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google"; // Updated fonts
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ScrollProgress, CustomCursor, BackToTop, PageTransition } from "@/components/ui/premium-polish";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Wide range for hierarchy
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mako Divers Club | Scuba Diving & Liveaboards in Egypt",
  description: "Experience world-class scuba diving in Egypt's Red Sea with Mako Divers Club. Diving courses, liveaboard trips, and dive packages in Hurghada, Dahab, and Sharm El-Sheikh.",
  keywords: "scuba diving Egypt, Red Sea diving, liveaboard Egypt, diving courses, Mako Divers, Hurghada diving, diving packages",
  openGraph: {
    title: "Mako Divers Club | Your Ultimate Dive Plan",
    description: "Top-notch scuba diving experiences and liveaboard trips in the breathtaking Red Sea.",
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
      <body className={`${outfit.variable} ${inter.variable} antialiased selection:bg-primary/30`} suppressHydrationWarning>
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <main className="min-h-screen bg-brand-navy">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <BackToTop />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
