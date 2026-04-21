import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(2, "שם המסעדה חייב להכיל לפחות 2 תווים"),
  slug: z
    .string()
    .min(2, "כתובת חייבת להכיל לפחות 2 תווים")
    .regex(/^[a-z0-9-א-ת]+$/, "כתובת לא תקינה"),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("אימייל לא תקין").optional().or(z.literal("")),
  logo_url: z.string().optional().nullable(),
  banner_url: z.string().optional().nullable(),
});

export type RestaurantInput = z.infer<typeof restaurantSchema>;
