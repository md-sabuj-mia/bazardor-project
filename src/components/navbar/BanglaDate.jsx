"use client";

import { useSyncExternalStore } from "react";
import { formatBnDate } from "@/lib/format";

const subscribe = () => () => {};

/** Today's date in Bangla. Rendered on the client so it is always the visitor's "today". */
export default function BanglaDate({ className }) {
  const date = useSyncExternalStore(
    subscribe,
    () => formatBnDate(),
    () => "" // server render: empty, filled in after hydration
  );
  return (
    <span className={className} suppressHydrationWarning>
      {date || " "}
    </span>
  );
}