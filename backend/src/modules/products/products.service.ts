import { createPaginationMeta, normalizePagination } from "../../utils/pagination";
import { Product, ProductListQuery } from "./products.types";
import { staticProducts } from "./products.data";
import { mysqlPool, isMysqlAvailable } from "../../db/mysql";
import { RowDataPacket } from "mysql2";

interface ProductRow extends RowDataPacket {
  id: number;
  slug: string;
  name: string;
  person: string;
  category: string;
  subcategory: string;
  era: string;
  year: number;
  price: string;
  currency: string;
  description: string;
  provenance: string;
  certified: number;
  featured: number;
  vault: number;
}

interface ProductImageRow extends RowDataPacket {
  product_id: number;
  image_url: string;
}

const mapProduct = (product: ProductRow, images: string[]): Product => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  person: product.person,
  category: product.category,
  subcategory: product.subcategory,
  era: product.era,
  year: product.year,
  price: Number(product.price),
  currency: product.currency,
  description: product.description,
  provenance: product.provenance,
  images,
  certified: Boolean(product.certified),
  featured: Boolean(product.featured),
  vault: Boolean(product.vault)
});

const loadImagesByProductIds = async (productIds: number[]): Promise<Map<number, string[]>> => {
  if (productIds.length === 0) {
    return new Map();
  }

  const placeholders = productIds.map(() => "?").join(",");
  const [imageRows] = await mysqlPool.query<ProductImageRow[]>(
    `SELECT product_id, image_url FROM product_images WHERE product_id IN (${placeholders}) ORDER BY position ASC`,
    productIds
  );

  const imagesMap = new Map<number, string[]>();
  imageRows.forEach((row) => {
    const images = imagesMap.get(row.product_id) ?? [];
    images.push(row.image_url);
    imagesMap.set(row.product_id, images);
  });

  return imagesMap;
};

export const getProducts = async (query: ProductListQuery): Promise<{
  data: Product[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> => {
  const { page, limit, offset } = normalizePagination(query);

  if (isMysqlAvailable()) {
    try {
      const where: string[] = [];
      const values: Array<string | number> = [];

      if (query.category) {
        where.push("p.category = ?");
        values.push(query.category);
      }

      if (query.era) {
        where.push("p.era = ?");
        values.push(query.era);
      }

      if (query.search) {
        where.push("(p.name LIKE ? OR p.person LIKE ?)");
        const term = `%${query.search}%`;
        values.push(term, term);
      }

      if (typeof query.featured === "boolean") {
        where.push("p.featured = ?");
        values.push(query.featured ? 1 : 0);
      }

      if (typeof query.vault === "boolean") {
        where.push("p.vault = ?");
        values.push(query.vault ? 1 : 0);
      }

      const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
      const sortMap: Record<string, string> = {
        newest: "p.id DESC",
        price_asc: "p.price ASC",
        price_desc: "p.price DESC",
        featured: "p.featured DESC, p.id DESC"
      };
      const orderBySql = sortMap[query.sort ?? "newest"];

      const [countRows] = await mysqlPool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS total FROM products p ${whereSql}`,
        values
      );
      const total = Number(countRows[0]?.total ?? 0);

      const [productRows] = await mysqlPool.query<ProductRow[]>(
        `SELECT p.* FROM products p ${whereSql} ORDER BY ${orderBySql} LIMIT ? OFFSET ?`,
        [...values, limit, offset]
      );

      const imagesMap = await loadImagesByProductIds(productRows.map((row) => row.id));
      const data = productRows.map((row) => mapProduct(row, imagesMap.get(row.id) ?? []));

      return {
        data,
        meta: createPaginationMeta(page, limit, total)
      };
    } catch (dbError) {
      console.error("❌ Database query error, falling back to static products:", dbError);
    }
  }

  // Fallback static filtering logic
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
  if (isMysqlAvailable()) {
    try {
      const [rows] = await mysqlPool.query<ProductRow[]>("SELECT * FROM products WHERE slug = ? LIMIT 1", [slug]);
      const row = rows[0];

      if (row) {
        const imagesMap = await loadImagesByProductIds([row.id]);
        return mapProduct(row, imagesMap.get(row.id) ?? []);
      }
    } catch (dbError) {
      console.error("❌ Database getProductBySlug query error, falling back to static products:", dbError);
    }
  }

  const product = staticProducts.find((p) => p.slug === slug);
  return product ?? null;
};

export const getProductFilters = async (): Promise<{ categories: string[]; eras: string[] }> => {
  if (isMysqlAvailable()) {
    try {
      const [categoryRows] = await mysqlPool.query<RowDataPacket[]>(
        "SELECT DISTINCT category FROM products ORDER BY category ASC"
      );
      const [eraRows] = await mysqlPool.query<RowDataPacket[]>("SELECT DISTINCT era FROM products ORDER BY era ASC");

      return {
        categories: categoryRows.map((row) => String(row.category)),
        eras: eraRows.map((row) => String(row.era))
      };
    } catch (dbError) {
      console.error("❌ Database getProductFilters query error, falling back to static products:", dbError);
    }
  }

  const categories = Array.from(new Set(staticProducts.map((p) => p.category))).sort();
  const eras = Array.from(new Set(staticProducts.map((p) => p.era))).sort();

  return {
    categories,
    eras
  };
};
