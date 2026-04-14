import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Dossier, DossierStatus } from "@/types/dossier";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Dossier, "id" | "createdAt">) => void;
  initial?: Dossier;
}

export function DossierForm({ open, onOpenChange, onSubmit, initial }: Props) {
  const [form, setForm] = useState({
    email: initial?.email ?? "",
    password: initial?.password ?? "",
    fra: initial?.fra ?? "",
    fullName: initial?.fullName ?? "",
    phone: initial?.phone ?? "",
    appointmentDate: initial?.appointmentDate ?? "",
    depositDate: initial?.depositDate ?? "",
    status: (initial?.status ?? "pending") as DossierStatus,
    notes: initial?.notes ?? "",
  });

  const set = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Modifier le dossier" : "Nouveau dossier"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@gmail.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Mot de passe *</Label>
              <Input required value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="••••••" />
            </div>
            <div className="space-y-1.5">
              <Label>FRA</Label>
              <Input value={form.fra} onChange={(e) => set("fra", e.target.value)} placeholder="123@Mohamed" />
            </div>
            <div className="space-y-1.5">
              <Label>Nom complet *</Label>
              <Input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="NOM Prénom" />
            </div>
            <div className="space-y-1.5">
              <Label>Téléphone</Label>
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0600000000" />
            </div>
            <div className="space-y-1.5">
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="done">Fait</SelectItem>
                  <SelectItem value="not_done">Non fait</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Date RDV</Label>
              <Input type="date" value={form.appointmentDate} onChange={(e) => set("appointmentDate", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Date dépôt</Label>
              <Input type="date" value={form.depositDate} onChange={(e) => set("depositDate", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Remarques..." rows={2} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit">{initial ? "Enregistrer" : "Ajouter"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
