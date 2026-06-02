export type Step =
  | "intro"
  | "capturing"
  | "review"
  | "uploading"
  | "done"
  | "error";

export type Photo360Props = {
  onComplete: (urls: string[]) => void;
  onCancel: () => void;
  restaurantId: string;
};
