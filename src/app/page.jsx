import { Suspense } from "react";
import PriceTicker from "@/components/ticker/PriceTicker";
import AllProducts, { AllProductsSkeleton } from "@/components/home/AllProducts";
import Hero from "@/components/home/Hero";
import PriceMovers from "@/components/home/PriceMovers";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/products";

async function MoversSections() {
  const products = await getProducts();
  return (
    <>
      <PriceMovers direction="up" products={topRisers(products)} />
      <PriceMovers direction="down" products={topFallers(products)} />
    </>
  );
}

function MoversSkeleton() {
  return (
    <>
      {[0, 1].map((i) => (
        <div key={i} className="space-y-3">
          <div className="skeleton h-7 w-40" />
          <ProductGridSkeleton count={6} />
        </div>
      ))}
    </>
  );
}

async function AllProductsSection() {
  const products = await getProducts();
  return <AllProducts products={products} />;
}

export default function Home() {
  return (
    <div className="space-y-6 flex flex-col min-h-screen">
      {/* মুভেবল বা স্ক্রোলিং প্রাইস টেকার বার */}
      <PriceTicker />

      {/* মূল হোম পেজের কন্টেন্ট */}
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-6 flex-grow">
        <Hero />
        <Suspense fallback={<MoversSkeleton />}>
          <MoversSections />
        </Suspense>
        <Suspense fallback={<AllProductsSkeleton />}>
          <AllProductsSection />
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