type FieldTextareaProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  rows?: number;
};

export function FieldTextarea({
  value,
  onChange,
  placeholder,
  dir,
  rows,
}: FieldTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      rows={rows ?? 3}
      className="font-sans"
      style={{
        width: "100%",
        boxSizing: "border-box",
        fontSize: 14,
        padding: "11px 14px",
        background: "hsl(var(--void))",
        border: "1px solid hsl(var(--line))",
        borderRadius: 8,
        color: "hsl(var(--fog))",
        outline: "none",
        resize: "vertical",
        lineHeight: 1.5,
        transition: "border-color .15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "hsl(var(--accent-bright))")}
      onBlur={(e) => (e.target.style.borderColor = "hsl(var(--line))")}
    />
  );
}
