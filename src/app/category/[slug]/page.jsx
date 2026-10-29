
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryHeader from "@/components/category/CategoryHeader";
import SortedProductList from "@/components/category/ShortedProductList";
import PriceTicker from "@/components/ticker/PriceTicker";
import NotFoundState from "@/components/NotFoundState";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

/** Pre-build the 8 known categories; reloading /category/chal on Vercel works without a 404. */
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const category = await getCategory(decodeURIComponent(slug));
  if (!category) notFound(); // invalid slug → 404 page with "হোম পেজে ফিরে যান"

  const products = await getProductsByCategory(category.slug);

  return (
    <>
      <CategoryHeader
        icon={category.icon}
        title={category.nameBn}
        subtitle={`${toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
      />
      {products.length === 0 ? (
        <NotFoundState
          icon={category.icon}
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="এই মুহূর্তে এই ক্যাটাগরির কোনো পণ্যের দাম পাওয়া যায়নি।"
        />
      ) : (
        <SortedProductList products={products} />
      )}
    </>
  );
}

function CategorySkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton size-10 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="skeleton h-16 w-full rounded-2xl" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}

export default function CategoryPage({ params }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* মুভেবল প্রাইস টেকার বার */}
      <PriceTicker />

      {/* মূল ক্যাটাগরি পেজের কন্টেন্ট */}
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 flex-grow w-full">
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryContent params={params} />
        </Suspense>
      </div>

      {/* প্রফেশনাল ফুটার */}
      <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto py-6 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          
          {/* বাম পাশের টেক্সট */}
          <div>
            <p className="font-medium text-gray-700">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে</p>
          </div>
          
          {/* ডান পাশের টেক্সট */}
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
          </div>

        </div>
      </footer>
    </div>
  );
}