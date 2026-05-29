/**
 * SectionIcon — tuile bronze 7x7 utilisée comme préfixe d'icône
 * dans tous les CardTitle de la page settings.
 */
export function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-7 w-7 rounded-md flex items-center justify-center text-white flex-shrink-0"
      style={{ background: "var(--grad-bronze)" }}
    >
      {children}
    </div>
  );
}
