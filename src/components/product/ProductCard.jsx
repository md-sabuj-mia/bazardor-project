


import Link from "next/link";
import { formatNumberBn, perUnitBn } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col justify-between gap-3 rounded-2xl border border-base-300 bg-base-100 p-3.5 sm:p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-start gap-3 min-w-0">
        <span className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-xl sm:text-2xl">
          <span aria-hidden>{product.image}</span>
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm sm:text-base font-semibold group-hover:text-primary">
            {product.nameBn}
          </span>
          <span className="text-xs text-base-content/70 truncate">{perUnitBn(product.unit)}</span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 pt-1 border-t border-base-200/60">
        <span className="flex flex-col min-w-0">
          <span className="text-[11px] sm:text-xs text-base-content/70">আজকের দাম</span>
          <span className="truncate">
            <span className="text-lg sm:text-xl font-bold">{formatNumberBn(product.today)}</span>{" "}
            <span className="text-xs sm:text-sm font-medium">টাকা</span>
          </span>
        </span>
        <div className="shrink-0">
          <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
        </div>
      </div>
    </Link>
  );
}