import { z } from "zod";

export const createSubscriberSchema = z.object({
  email: z.string().email()
});
