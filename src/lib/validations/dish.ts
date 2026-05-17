import { z } from "zod";

export const dishSchema = z.object({
  name: z.string().min(1, "שם המנה נדרש").max(160, "שם המנה ארוך מדי"),
  category_id: z.string().uuid("יש לבחור קטגוריה"),
  description: z.string().max(2000, "תיאור ארוך מדי").optional(),
  price: z
    .number()
    .positive("מחיר חייב להיות חיובי")
    .max(100000, "מחיר לא תקין"),
  image_url: z.string().max(2048).optional().nullable(),
});

export type DishInput = z.infer<typeof dishSchema>;
