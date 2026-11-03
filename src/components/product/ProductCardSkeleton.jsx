

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-base-300 bg-base-100 p-3.5 sm:p-4" aria-hidden>
      <div className="flex items-start gap-3">
        <div className="skeleton size-11 sm:size-12 shrink-0 rounded-xl" />
        <div className="flex flex-1 flex-col gap-2 pt-1">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="flex items-end justify-between pt-1 border-t border-base-200/60">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

/** A grid of N skeleton cards, same columns as the real product grid. */
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}