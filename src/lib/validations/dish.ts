import { z } from "zod";

export const dishSchema = z.object({
  name: z.string().min(1, "שם המנה נדרש"),
  category_id: z.string().uuid("יש לבחור קטגוריה"),
  description: z.string().optional(),
  price: z.number().positive("מחיר חייב להיות חיובי"),
  image_url: z.string().optional().nullable(),
});

export type DishInput = z.infer<typeof dishSchema>;
