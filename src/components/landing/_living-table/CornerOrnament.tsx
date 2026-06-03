type Position = "top-start" | "top-end" | "bottom-start" | "bottom-end";

const CLASSES: Record<Position, string> = {
  "top-start": "top-4 start-4",
  "top-end": "top-4 end-4",
  "bottom-start": "bottom-4 start-4",
  "bottom-end": "bottom-4 end-4",
};

const ROTATIONS: Record<Position, string> = {
  "top-start": "rotate(0deg)",
  "top-end": "rotate(90deg)",
  "bottom-start": "rotate(270deg)",
  "bottom-end": "rotate(180deg)",
};

/** Ornement doré d'angle — rappel d'un menu de restaurant classique */
export function CornerOrnament({ position }: { position: Position }) {
  return (
    <svg
      className={`absolute ${CLASSES[position]} w-10 h-10 text-[hsl(var(--gold))]/50 pointer-events-none`}
      style={{ transform: ROTATIONS[position] }}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 2 L14 2 M2 2 L2 14 M2 2 Q8 8 14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}
