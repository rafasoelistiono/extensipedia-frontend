import type { Metadata } from "next";
import { Inter, League_Spartan, Lilita_One } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-tagline",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Extensipedia",
  description: "Pusat Keunggulan Akademik Mahasiswa Ekstensi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${lilitaOne.variable} ${leagueSpartan.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}