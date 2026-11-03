


import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";
import CategoryLinks from "./CategoryLinks";
import CategoryNav from "./CategoryNav";

// ক্যাটাগরি লোড করার জন্য আলাদা একটি ছোট অ্যাসিন্ড কম্পোনেন্ট
async function CategoriesContainer() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    // API unavailable — fallback array থাকবে
  }

  return (
    <Suspense fallback={<CategoryLinks categories={[]} activeHref={null} />}>
      <CategoryNav categories={categories} />
    </Suspense>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      {/* মূল কন্টেইনারে max-w-6xl এবং রেসপন্সিভ প্যাডিং নিশ্চিত করা হলো */}
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 min-w-0" aria-label="বাজার দর — হোম">
          <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-base sm:text-lg">
            🛒
          </span>
          <span className="flex flex-col leading-tight truncate">
            <span className="text-base sm:text-xl font-bold truncate">বাজার দর</span>
            <BanglaDate className="text-[10px] sm:text-xs text-base-content/70" />
          </span>
        </Link>

        {/* অথেন্টিকেশন বাটনগুলো যেন কোনো ব্লকিং ছাড়া ইনস্ট্যান্ট লোড হয় */}
        <div className="shrink-0">
          <AuthButtons />
        </div>
      </div>

      {/* ক্যাটাগরি নেভবার অংশটি আলাদা সাসপেন্সের ভেতর রাখা হলো */}
      <Suspense fallback={<div className="h-10 w-full bg-base-100/50" />}>
        <CategoriesContainer />
      </Suspense>
    </header>
  );
}