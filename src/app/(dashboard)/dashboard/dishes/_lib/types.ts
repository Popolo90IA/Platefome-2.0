export type FormState = {
  name: string;
  name_en: string;
  name_fr: string;
  category_id: string;
  description: string;
  description_en: string;
  description_fr: string;
  price: string;
  image_url: string | null;
  video_url: string | null;
  model_3d_url: string | null;
  photos_360: string[] | null;
  ar_enabled: boolean;
  is_available: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_signature: boolean;
};
