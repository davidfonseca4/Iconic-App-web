import { z } from "zod";

export const createVaultInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  intent: z.string().min(5),
  item: z.string().min(2)
});
