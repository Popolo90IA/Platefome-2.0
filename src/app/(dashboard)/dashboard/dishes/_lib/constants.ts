import type { FormState } from "./types";

export const EMPTY_FORM: FormState = {
  name: "",
  name_en: "",
  name_fr: "",
  category_id: "",
  description: "",
  description_en: "",
  description_fr: "",
  price: "",
  image_url: null,
  video_url: null,
  model_3d_url: null,
  photos_360: null,
  ar_enabled: true,
  is_available: true,
  is_featured: false,
  is_new: false,
  is_signature: false,
};
