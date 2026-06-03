import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/* ── AdminWarning — super-admin promotion caution notice ── */
export function AdminWarning() {
  return (
    <Card className="border-[hsl(var(--gold))]/30 bg-gradient-to-br from-[hsl(var(--gold))]/5 to-transparent shadow-premium">
      <CardContent className="p-4 flex items-start gap-3">
        <Shield className="h-5 w-5 text-[hsl(var(--gold-dark))] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground">
          <strong className="text-foreground">שים לב:</strong> קידום משתמש ל-Super
          Admin נותן לו גישה מלאה לפלטפורמה - הוא יוכל לראות, לערוך ולמחוק כל
          מסעדה. השתמש בזהירות.
        </div>
      </CardContent>
    </Card>
  );
}
