import type { FormState } from "../../_lib/types";

/* ── MetaStats — key/value summary rows below the phone ── */
export function MetaStats({
  form,
  categoryName,
}: {
  form: FormState;
  categoryName: string;
}) {
  const rows = [
    { k: "מנה", v: categoryName || "—" },
    { k: "מחיר", v: form.price ? `₪${form.price}` : "—" },
    { k: "מצב", v: form.is_available ? "זמין" : "אזל" },
    { k: "מודל 3D", v: form.model_3d_url ? "✓ פעיל" : "—" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
      {rows.map(({ k, v }) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
          <span
            className="font-sans uppercase"
            style={{ fontSize: 10, letterSpacing: ".06em", color: "hsl(var(--dim))" }}
          >
            {k}
          </span>
          <span className="font-sans" style={{ color: "hsl(var(--fog))", fontWeight: 500 }}>
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}
