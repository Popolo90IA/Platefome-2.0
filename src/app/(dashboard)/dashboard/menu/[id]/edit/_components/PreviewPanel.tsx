import type { FormState } from "../_lib/types";
import { MetaStats } from "./preview/MetaStats";
import { PhoneMockup } from "./preview/PhoneMockup";
import { PreviewLabel } from "./preview/PreviewLabel";

type PreviewPanelProps = {
  form: FormState;
  categoryName: string;
};

export function PreviewPanel({ form, categoryName }: PreviewPanelProps) {
  return (
    <div style={{ position: "sticky", top: 24 }}>
      <PreviewLabel />
      <PhoneMockup form={form} />
      <MetaStats form={form} categoryName={categoryName} />
    </div>
  );
}
