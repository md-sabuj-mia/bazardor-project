


import { ARROW, CHANGE_TEXT, formatPct } from "@/lib/format";

export default function ChangeBadge({ dir, pct }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs ${CHANGE_TEXT[dir]}`}
    >
      <span aria-hidden className="text-xs sm:text-sm">{ARROW[dir]}</span>
      <span className="font-semibold">{formatPct(pct)}</span>
    </span>
  );
}