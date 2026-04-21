import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "שם הקטגוריה נדרש"),
  display_order: z.number().int().nonnegative().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;
