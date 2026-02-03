import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      <body className={`${bitter.variable} antialiased`}>
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
