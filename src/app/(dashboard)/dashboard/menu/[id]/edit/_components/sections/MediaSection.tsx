import { ImageUpload } from "@/components/upload/ImageUpload";
import { FileUpload } from "@/components/upload/FileUpload";
import {
  UPLOAD_FOLDERS,
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE,
} from "@/lib/constants";
import { SectionCard } from "../_ui/SectionCard";
import type { FormState, MediaTab } from "../../_lib/types";
import { MediaTabs } from "./_media/MediaTabs";
import { Model3DTab } from "./_media/Model3DTab";
import { Photo360Tab } from "./_media/Photo360Tab";

type MediaSectionProps = {
  form: FormState;
  activeMediaTab: MediaTab;
  onTabChange: (tab: MediaTab) => void;
  onChange: (patch: Partial<FormState>) => void;
  onOpen360Capture: () => void;
};

export function MediaSection({
  form,
  activeMediaTab,
  onTabChange,
  onChange,
  onOpen360Capture,
}: MediaSectionProps) {
  return (
    <SectionCard title="חזותי" badge="3D · 360 · AR">
      <MediaTabs
        form={form}
        activeMediaTab={activeMediaTab}
        onTabChange={onTabChange}
      />

      {activeMediaTab === "photo" && (
        <ImageUpload
          label=""
          folder={UPLOAD_FOLDERS.DISHES}
          currentImage={form.image_url}
          onUploadComplete={(url) => onChange({ image_url: url })}
          variant="banner"
          previewMeta={{ restaurantName: form.name }}
        />
      )}

      {activeMediaTab === "360" && (
        <Photo360Tab form={form} onOpen360Capture={onOpen360Capture} />
      )}

      {activeMediaTab === "3d" && <Model3DTab form={form} onChange={onChange} />}

      {activeMediaTab === "video" && (
        <FileUpload
          label=""
          folder={UPLOAD_FOLDERS.VIDEOS}
          currentUrl={form.video_url}
          onUploadComplete={(url) => onChange({ video_url: url })}
          accept="video/mp4,video/webm,video/quicktime"
          allowedTypes={ALLOWED_VIDEO_TYPES}
          maxSize={MAX_VIDEO_SIZE}
          preview="video"
          helperText="MP4 / WebM / MOV — עד 25MB"
        />
      )}
    </SectionCard>
  );
}
