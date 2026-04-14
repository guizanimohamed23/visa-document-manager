import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { CategoryBadges } from "./CategoryBadge";
import { DossierForm } from "./DossierForm";
import type { Dossier } from "@/types/dossier";
import { Copy, Pencil, Trash2, Eye, EyeOff, Mail, Phone, CalendarDays, Users } from "lucide-react";
import { toast } from "sonner";

interface Props {
  dossier: Dossier;
  onUpdate: (id: string, data: Partial<Dossier>) => void;
  onDelete: (id: string) => void;
  existingGroups?: string[];
}

const cardStyles: Record<string, string> = {
  "primo-familiale": "border-l-4 border-l-primo bg-primo/5",
  "primo-touristique": "border-l-4 border-l-touristique bg-touristique/5",
  "vise-familiale": "border-l-4 border-l-familiale bg-familiale/5",
  "vise-touristique": "border-l-4 border-l-vise bg-vise/5",
};

export function DossierCard({ dossier, onUpdate, onDelete, existingGroups }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [editing, setEditing] = useState(false);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copié`);
  };

  const catKey = `${dossier.visaType}-${dossier.visaPurpose}`;

  return (
    <>
      <Card className={`p-4 hover:shadow-md transition-shadow ${cardStyles[catKey] || ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground truncate">{dossier.fullName}</h3>
              <StatusBadge status={dossier.status} />
              <CategoryBadges visaType={dossier.visaType} visaPurpose={dossier.visaPurpose} />
            </div>

            {dossier.group && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span className="font-medium">{dossier.group}</span>
              </div>
            )}

            <div className="grid gap-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{dossier.email}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copy(dossier.email, "Email")}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">MDP</span>
                <span className="font-mono text-xs">{showPassword ? dossier.password : "••••••••"}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copy(dossier.password, "Mot de passe")}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>

              {dossier.fra && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-accent px-1.5 py-0.5 rounded text-accent-foreground">FRA</span>
                  <span className="font-mono text-xs">{dossier.fra}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copy(dossier.fra, "FRA")}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {dossier.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{dossier.phone}</span>
                </div>
              )}

              {(dossier.appointmentDate || dossier.depositDate) && (
                <div className="flex items-center gap-3 pt-1">
                  {dossier.appointmentDate && (
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>RDV: {new Date(dossier.appointmentDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                  )}
                  {dossier.depositDate && (
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>Dépôt: {new Date(dossier.depositDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                  )}
                </div>
              )}

              {dossier.notes && (
                <p className="text-xs italic pt-1 text-muted-foreground/70">{dossier.notes}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(true)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(dossier.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      <DossierForm
        open={editing}
        onOpenChange={setEditing}
        initial={dossier}
        onSubmit={(data) => onUpdate(dossier.id, data)}
        existingGroups={existingGroups}
      />
    </>
  );
}
