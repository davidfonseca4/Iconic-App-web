CREATE DATABASE IF NOT EXISTS iconic_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE iconic_store;

CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL,
  slug VARCHAR(180) NOT NULL,
  name VARCHAR(255) NOT NULL,
  person VARCHAR(180) NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100) NOT NULL,
  era VARCHAR(60) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  description TEXT NOT NULL,
  provenance VARCHAR(255) NOT NULL,
  certified TINYINT(1) NOT NULL DEFAULT 0,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  vault TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_category (category),
  KEY idx_products_era (era),
  KEY idx_products_featured (featured),
  KEY idx_products_vault (vault),
  KEY idx_products_year (year),
  KEY idx_products_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_images (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_product_images_product_id (product_id),
  CONSTRAINT fk_product_images_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
