import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Seyed Ali Jahani | Synthesizing AI & Enterprise Network Infrastructure",
  description: "Personal portfolio of Seyed Ali Jahani (Ali Jahani), Assistant IT Director and Hybrid Expert in petrochemical network security, Zabbix monitoring, AI quality control, and visual workflow builders (Rastar BPMS).",
  keywords: ["Seyed Ali Jahani", "Ali Jahani", "Network Engineer", "Damavand Energy", "Rastar BPMS", "AI Software Developer", "Petrochemical Infrastructure"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

