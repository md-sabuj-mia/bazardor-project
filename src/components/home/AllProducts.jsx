import ProductCard from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import { toBn } from "@/lib/format";

export const ALL_PRODUCTS_ID = "সব-পণ্য";

function SectionShell({ subtitle, children }) {
  return (
    // scroll-mt keeps the heading visible below the sticky navbar when the hero CTA jumps here
    <section id={ALL_PRODUCTS_ID} aria-labelledby="all-products-title" className="scroll-mt-36 space-y-3">
      <h2 id="all-products-title" className="text-xl font-bold">
        সব পণ্য
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-base-content/70">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}

export default function AllProducts({ products }) {
  return (
    <SectionShell subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </SectionShell>
  );
}

/** Same section with skeleton cards — shown while the products are loading. */
export function AllProductsSkeleton() {
  return (
    <SectionShell subtitle={<span className="skeleton inline-block h-4 w-40 align-middle" />}>
      <ProductGridSkeleton count={9} />
    </SectionShell>
  );
}