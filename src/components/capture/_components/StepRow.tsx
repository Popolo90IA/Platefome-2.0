/**
 * StepRow — ligne instruction numérotée (bulle bronze + texte).
 */
export function StepRow({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-6 w-6 rounded-full bg-gold-gradient flex items-center justify-center text-xs font-bold flex-shrink-0">
        {num}
      </div>
      <p className="text-white/80">{text}</p>
    </div>
  );
}
