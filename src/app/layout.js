import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর",
  description: "বাজেট এবং বাজার দর সম্পর্কিত প্রজেক্ট",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div className="h-16 bg-emerald-900 animate-pulse" />}>
          <Navbar />
        </Suspense>
        
        <Toaster richColors position="top-right" />
        
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}


