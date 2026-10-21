"use client";

import { usePathname } from "next/navigation";
import CategoryLinks from "./CategoryLinks";

/** Reads the URL to highlight the active category. Rendered inside <Suspense> (see Navbar). */
export default function CategoryNav({ categories }) {
  const pathname = usePathname();
  return <CategoryLinks categories={categories} activeHref={pathname} />;
}