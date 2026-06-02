import type { FormState, MediaTab } from "../../../_lib/types";

interface Props {
  form: FormState;
  activeMediaTab: MediaTab;
  onTabChange: (tab: MediaTab) => void;
}

export function MediaTabs({ form, activeMediaTab, onTabChange }: Props) {
  const tabs = [
    { key: "photo" as const, label: "תמונה", dot: !!form.image_url },
    {
      key: "360" as const,
      label: "360°",
      dot: !!(form.photos_360?.length),
    },
    { key: "3d" as const, label: "3D", dot: !!form.model_3d_url },
    { key: "video" as const, label: "וידאו", dot: !!form.video_url },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: 4,
        background: "hsl(var(--abyss))",
        borderRadius: 10,
        marginBottom: 18,
        width: "fit-content",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className="font-sans"
          style={{
            padding: "8px 18px",
            borderRadius: 7,
            fontSize: 13,
            fontWeight: 500,
            color:
              activeMediaTab === tab.key
                ? "hsl(var(--fog))"
                : "hsl(var(--subtle))",
            background:
              activeMediaTab === tab.key
                ? "hsl(var(--deep))"
                : "transparent",
            border: "none",
            cursor: "pointer",
            boxShadow:
              activeMediaTab === tab.key
                ? "0 1px 3px rgba(0,0,0,.06)"
                : "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "all .15s",
          }}
        >
          {tab.dot && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(var(--accent-bright))",
                boxShadow:
                  activeMediaTab === tab.key
                    ? "0 0 0 3px hsl(28,62%,42%,.18)"
                    : "none",
              }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
