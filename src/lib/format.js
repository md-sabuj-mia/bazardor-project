const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** 1850 -> "১৮৫০" (works on any string containing ASCII digits) */
export function toBn(value) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** 1850 -> "১,৮৫০" */
export function formatNumberBn(n) {
  return toBn(n.toLocaleString("en-US", { maximumFractionDigits: 2 }));
}

/** 1850 -> "১,৮৫০ টাকা" */
export function formatTaka(n) {
  return `${formatNumberBn(n)} টাকা`;
}

/** -2.9 -> "২.৯%" (sign is shown by the ▲/▼ arrow) */
export function formatPct(pct) {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
}

export const ARROW = { up: "▲", down: "▼", flat: "—" };

const UNIT_BN = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

/** "kg" -> "কেজি" */
export function unitBn(unit) {
  return UNIT_BN[unit] ?? unit;
}

/** "kg" -> "প্রতি কেজি" */
export function perUnitBn(unit) {
  return `প্রতি ${unitBn(unit)}`;
}

/** Date -> "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" */
export function formatBnDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value ?? "";
  return toBn(`${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`);
}

/**
 * Text colour for a price change.
 * README: green = up, red = down, gray = flat.
 * (The Figma uses the opposite: swap "text-success"/"text-error" here to match it.)
 */
export const CHANGE_TEXT = {
  up: "text-success",
  down: "text-error",
  flat: "text-base-content/60",
};

/** "▲ ২.১%" / "▼ ২.৯%" / "— ০.০%" */
export function formatChange(dir, pct) {
  return `${ARROW[dir]} ${formatPct(pct)}`;
}