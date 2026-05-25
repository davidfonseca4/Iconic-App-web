import type { Metadata } from "next";
import { Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import dynamic from 'next/dynamic';
import PageTransition from "@/components/PageTransition";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

const dmMono = DM_Mono({ 
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: '--font-dm-mono'
});

export const metadata: Metadata = {
  title: "ICONIC | Authenticated Objects of Legend",
  description: "A store that sells authenticated objects used by famous people throughout history.",
};

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const LenisProvider = dynamic(() => import('@/components/LenisProvider'), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col md:cursor-none">
        <LenisProvider>
          <CustomCursor />
          <Nav />
          <CartSidebar />
          <PageTransition>
            <main className="flex-grow flex flex-col min-h-screen">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
