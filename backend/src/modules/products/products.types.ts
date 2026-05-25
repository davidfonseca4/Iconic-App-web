export interface Product {
  id: number;
  slug: string;
  name: string;
  person: string;
  category: string;
  subcategory: string;
  era: string;
  year: number;
  price: number;
  currency: string;
  description: string;
  provenance: string;
  images: string[];
  certified: boolean;
  featured: boolean;
  vault: boolean;
}

export interface ProductListQuery {
  category?: string;
  era?: string;
  search?: string;
  featured?: boolean;
  vault?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "featured";
  page?: number;
  limit?: number;
}
