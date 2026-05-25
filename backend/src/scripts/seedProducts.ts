import fs from "fs/promises";
import path from "path";
import vm from "vm";
import { mysqlPool } from "../db/mysql";

type RawProduct = {
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
};

const loadProducts = async (): Promise<RawProduct[]> => {
  const productsFilePath = path.resolve(process.cwd(), "../iconic-store/data/products.js");
  const source = await fs.readFile(productsFilePath, "utf8");
  const cjsSource = source.replace(/^export\s+const\s+products\s*=\s*/, "module.exports = ");
  const sandbox: { module: { exports: RawProduct[] } } = {
    module: { exports: [] as RawProduct[] }
  };

  vm.runInNewContext(cjsSource, sandbox);
  return sandbox.module.exports;
};

const seed = async (): Promise<void> => {
  const products = await loadProducts();
  const connection = await mysqlPool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query("DELETE FROM product_images");
    await connection.query("DELETE FROM products");

    for (const product of products) {
      await connection.query(
        `INSERT INTO products (
          id, slug, name, person, category, subcategory, era, year, price, currency,
          description, provenance, certified, featured, vault
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.slug,
          product.name,
          product.person,
          product.category,
          product.subcategory,
          product.era,
          product.year,
          product.price,
          product.currency,
          product.description,
          product.provenance,
          product.certified ? 1 : 0,
          product.featured ? 1 : 0,
          product.vault ? 1 : 0
        ]
      );

      for (let i = 0; i < product.images.length; i += 1) {
        await connection.query(
          "INSERT INTO product_images (product_id, image_url, position) VALUES (?, ?, ?)",
          [product.id, product.images[i], i]
        );
      }
    }

    await connection.commit();
    console.log(`Seed completed: ${products.length} products inserted.`);
  } catch (error) {
    await connection.rollback();
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    connection.release();
    await mysqlPool.end();
  }
};

void seed();
