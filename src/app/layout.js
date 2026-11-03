import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        <Suspense fallback={<div className="h-16 bg-base-200 animate-pulse" />}>
          <Navbar />
        </Suspense>
        
        {/* টোস্ট পজিশন top-center */}
        <Toaster position="top-center" />
        
        {/* রেসপন্সিভ কন্টেইনার ও ম্যাক্স উইডথ max-w-6xl যুক্ত করা হলো */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </main>
      </body>
    </html>
  );
}