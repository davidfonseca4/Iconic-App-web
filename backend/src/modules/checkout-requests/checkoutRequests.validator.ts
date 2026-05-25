import { z } from "zod";

const checkoutItemSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number().int().positive()
});

export const createCheckoutRequestSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  items: z.array(checkoutItemSchema).min(1),
  total: z.number().nonnegative()
});
