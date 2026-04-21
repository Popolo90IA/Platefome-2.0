export const STORAGE_BUCKET = "restaurant-images";
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (image)
export const MAX_VIDEO_SIZE = 25 * 1024 * 1024; // 25MB
export const MAX_MODEL_SIZE = 20 * 1024 * 1024; // 20MB

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
export const ALLOWED_MODEL_EXTS = [".glb", ".gltf"];

export const UPLOAD_FOLDERS = {
  LOGOS: "logos",
  BANNERS: "banners",
  DISHES: "dishes",
  VIDEOS: "videos",
  MODELS: "models",
  PHOTOS_360: "photos-360",
} as const;

// Nombre de photos pour une capture 360°
export const PHOTOS_360_COUNT = 24;
// Taille max d'une photo 360° (compressée côté client)
export const MAX_PHOTO_360_SIZE = 500 * 1024; // 500KB après compression

export type UploadFolder = (typeof UPLOAD_FOLDERS)[keyof typeof UPLOAD_FOLDERS];
