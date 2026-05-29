// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LoadingScreen from "@/app/components/LoadingScreen";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Night Club",
  description: "Have a good time",
  icons: {
    icon: "/assets/icon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={ubuntu.variable}>
      <body>
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}