import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Navbar2 from "@/app/components/Navbar2";
import Footer from "./components/Footer";
import { ToastProvider } from "./components/providers/ToastProvider";
import { ToastExample } from "./components/ToastExample";
import { WishlistProvider } from "./components/providers/WishlistProvider";
import { WishlistButton } from "./components/wishlist/WishlistButton";
import { WishlistDrawer } from "./components/wishlist/WishlistDrawer";
import { CartProvider } from "./components/providers/CartProvider";
import { CartButton } from "./components/cart/CartButton";
import { CartDrawer } from "./components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "Next.js E-Commerce Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        <CartProvider>
          <WishlistProvider>
            {/* Background Logo with Blur */}
            <div
              className="fixed inset-0 z-0 bg-[url('/assets/images/defaults/logo.png')] bg-center bg-no-repeat bg-contain opacity-30 blur-sm scale-110"
              aria-hidden="true"
            />

            {/* Main Content */}
            <div className="relative z-10 min-h-screen backdrop-blur-md">
              <div className="container mx-auto px-4">
                <Navbar />
                <Navbar2 />
                <ToastExample />
                {children}
                <Footer />
              </div>
            </div>

            {/* Wishlist and Cart Components */}
            <WishlistButton />
            <WishlistDrawer />
            <CartButton />
            <CartDrawer />
            <ToastProvider />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
