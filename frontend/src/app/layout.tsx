import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arqit",
  description: "Generate detailed plans for your next AI project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased bg-neutral-900 text-neutral-200`}
      >
        <header className="px-20 h-24">
          <SiteHeader />
        </header>
        <main className="px-20 mt-24">{children}</main>
        <footer className="px-20 py-12">
          <SiteFooter />
        </footer>
      </body>
    </html>
  );
}
