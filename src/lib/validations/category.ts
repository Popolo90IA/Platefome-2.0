import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "שם הקטגוריה נדרש").max(120, "שם ארוך מדי"),
  display_order: z.number().int().nonnegative().max(10000).default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;
