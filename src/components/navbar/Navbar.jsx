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
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="বাজার দর — হোম">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg">
            🛒
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold sm:text-xl">বাজার দর</span>
            <BanglaDate className="text-[11px] sm:text-xs" />
          </span>
        </Link>

        {/* অথেন্টিকেশন বাটনগুলো যেন কোনো ব্লকিং ছাড়া ইনস্ট্যান্ট লোড হয় */}
        <AuthButtons />
      </div>

      {/* ক্যাটাগরি নেভবার অংশটি আলাদা সাসপেন্সের ভেতর রাখা হলো */}
      <Suspense fallback={<div className="h-10 w-full bg-base-100/50" />}>
        <CategoriesContainer />
      </Suspense>
    </header>
  );
}