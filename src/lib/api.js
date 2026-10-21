import { cacheLife } from "next/cache";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // fallback
];

/** Fetch JSON from the main API, falling back to alternative URLs. */
async function fetchJson(path) {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) return null;
      if (res.ok) {
        const json = await res.json();
        return json?.data || json;
      }
    } catch {
      // try the next base URL
    }
  }
  throw new Error(`Failed to load ${path}`);
}

export async function getProducts() {
  "use cache";
  cacheLife("hours");
  return (await fetchJson("/products")) ?? [];
}

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  return (await fetchJson("/categories")) ?? [];
}

export async function getProductsByCategory(slug) {
  "use cache";
  cacheLife("hours");
  return (
    (await fetchJson(`/products?category=${encodeURIComponent(slug)}`)) ?? []
  );
}

export async function getCategory(slug) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug || c.id === slug) ?? null;
}

/** Product pages use the slug in the URL (/product/[slug]). */
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || p.id === slug) ?? null;
}