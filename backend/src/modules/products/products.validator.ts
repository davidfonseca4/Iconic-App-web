import { z } from "zod";

const booleanFromString = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

export const productListQuerySchema = z.object({
  category: z.string().min(1).optional(),
  era: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
  featured: booleanFromString.optional(),
  vault: booleanFromString.optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "featured"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

export const productSlugSchema = z.object({
  slug: z.string().min(1)
});
