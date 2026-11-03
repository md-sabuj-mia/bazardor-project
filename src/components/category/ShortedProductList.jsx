


"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { toBn } from "@/lib/format";

const OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

/** Bengali digits → number, so "১,৮৫০" sorts as 1850 (numeric), never as text. */
const BN = "০১২৩৪৫৬৭৮৯";
export function toNumber(value) {
  if (typeof value === "number") return value;
  const ascii = value.replace(/[০-৯]/g, (d) => String(BN.indexOf(d))).replace(/[^\d.-]/g, "");
  return Number(ascii);
}

export default function SortedProductList({ products }) {
  const [sort, setSort] = useState("default");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Bahire click korle dropdown bondho hoye jabe
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const dir = sort === "asc" ? 1 : -1;
    return [...products].sort((a, b) => (toNumber(a.today) - toNumber(b.today)) * dir);
  }, [products, sort]);

  const selectedOption = OPTIONS.find((o) => o.value === sort);

  return (
    <div className="space-y-4">
      {/* ফ্লেক্স বক্স ব্যবহার করে "সাজান" এবং ড্রপডাউনটি একই লাইনে (horizontal line) রাখা হয়েছে */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-4">
        <p className="text-xs sm:text-sm text-base-content/70">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium">সাজান</span>
          
          {/* Custom Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            {/* Clickable Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between gap-3 px-3 py-1.5 text-xs bg-base-100 border border-base-300 rounded-lg shadow-sm hover:border-primary focus:outline-none min-w-[140px] transition-colors"
            >
              <span>{selectedOption?.label}</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Options Box */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-base-100 border border-base-300 rounded-lg shadow-xl z-50 py-1 overflow-hidden">
                {OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      setSort(o.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                      sort === o.value ? "bg-primary/10 text-primary font-medium" : "text-base-content hover:bg-base-200"
                    }`}
                  >
                    <span>{o.label}</span>
                    {sort === o.value && <span className="text-primary">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}