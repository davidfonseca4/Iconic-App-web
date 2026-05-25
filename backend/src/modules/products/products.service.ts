import { createPaginationMeta, normalizePagination } from "../../utils/pagination";
import { Product, ProductListQuery } from "./products.types";
import { staticProducts } from "./products.data";

export const getProducts = async (query: ProductListQuery): Promise<{
  data: Product[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> => {
  const { page, limit, offset } = normalizePagination(query);
  let filtered = [...staticProducts];

  if (query.category) {
    filtered = filtered.filter(p => p.category === query.category);
  }

  if (query.era) {
    filtered = filtered.filter(p => p.era === query.era);
  }

  if (query.search) {
    const term = query.search.toLowerCase();
    filtered = filtered.filter(
      p => p.name.toLowerCase().includes(term) || p.person.toLowerCase().includes(term)
    );
  }

  if (typeof query.featured === "boolean") {
    filtered = filtered.filter(p => p.featured === query.featured);
  }

  if (typeof query.vault === "boolean") {
    filtered = filtered.filter(p => p.vault === query.vault);
  }

  // Sort
  const sort = query.sort ?? "newest";
  if (sort === "newest") {
    filtered.sort((a, b) => b.id - a.id);
  } else if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "featured") {
    filtered.sort((a, b) => {
      if (a.featured !== b.featured) {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return b.id - a.id;
    });
  }

  const total = filtered.length;
  const data = filtered.slice(offset, offset + limit);

  return {
    data,
    meta: createPaginationMeta(page, limit, total)
  };
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const product = staticProducts.find((p) => p.slug === slug);
  return product ?? null;
};

export const getProductFilters = async (): Promise<{ categories: string[]; eras: string[] }> => {
  const categories = Array.from(new Set(staticProducts.map((p) => p.category))).sort();
  const eras = Array.from(new Set(staticProducts.map((p) => p.era))).sort();

  return {
    categories,
    eras
  };
};
