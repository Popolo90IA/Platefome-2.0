import { z } from "zod";

export const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, "שם המסעדה חייב להכיל לפחות 2 תווים")
    .max(120, "שם המסעדה ארוך מדי"),
  slug: z
    .string()
    .min(2, "כתובת חייבת להכיל לפחות 2 תווים")
    .max(60, "כתובת ארוכה מדי")
    .regex(/^[a-z0-9-א-ת]+$/, "כתובת לא תקינה"),
  description: z.string().max(2000, "תיאור ארוך מדי").optional(),
  address: z.string().max(300).optional(),
  phone: z.string().max(40).optional(),
  email: z
    .string()
    .max(254)
    .email("אימייל לא תקין")
    .optional()
    .or(z.literal("")),
  logo_url: z.string().max(2048).optional().nullable(),
  banner_url: z.string().max(2048).optional().nullable(),
});

export type RestaurantInput = z.infer<typeof restaurantSchema>;
