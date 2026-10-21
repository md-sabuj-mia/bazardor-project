"use client";

import { useMemo, useState } from "react";
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

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const dir = sort === "asc" ? 1 : -1;
    return [...products].sort((a, b) => (toNumber(a.today) - toNumber(b.today)) * dir);
  }, [products, sort]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-300 bg-base-100 p-4">
        <label htmlFor="sort" className="text-sm">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm w-auto rounded-lg text-xs"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-base-content/70">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}