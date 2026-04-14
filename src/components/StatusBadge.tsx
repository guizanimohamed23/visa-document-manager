import { Badge } from "@/components/ui/badge";
import type { DossierStatus } from "@/types/dossier";

const config: Record<DossierStatus, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-warning/15 text-warning border-warning/30" },
  done: { label: "Fait", className: "bg-success/15 text-success border-success/30" },
  not_done: { label: "Non fait", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

export function StatusBadge({ status }: { status: DossierStatus }) {
  const { label, className } = config[status];
  return <Badge variant="outline" className={className}>{label}</Badge>;
}
