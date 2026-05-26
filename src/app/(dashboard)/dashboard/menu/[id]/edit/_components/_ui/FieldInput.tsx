type FieldInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  required?: boolean;
  type?: string;
};

export function FieldInput({
  value,
  onChange,
  placeholder,
  dir,
  required,
  type,
}: FieldInputProps) {
  return (
    <input
      type={type ?? "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      required={required}
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
        transition: "border-color .15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "hsl(var(--accent-bright))")}
      onBlur={(e) => (e.target.style.borderColor = "hsl(var(--line))")}
    />
  );
}
