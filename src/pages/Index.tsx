import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DossierCard } from "@/components/DossierCard";
import { DossierForm } from "@/components/DossierForm";
import { useDossiers } from "@/hooks/useDossiers";
import { Plus, Search, FolderOpen, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const { dossiers, addDossier, updateDossier, deleteDossier, search, setSearch } = useDossiers();
  const [formOpen, setFormOpen] = useState(false);
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const existingGroups = useMemo(() => {
    const groups = new Set<string>();
    dossiers.forEach((d) => { if (d.group) groups.add(d.group); });
    return Array.from(groups).sort();
  }, [dossiers]);

  const filtered = useMemo(() => {
    return dossiers.filter((d) => {
      if (groupFilter !== "all" && d.group !== groupFilter) return false;
      if (typeFilter !== "all" && d.visaType !== typeFilter) return false;
      return true;
    });
  }, [dossiers, groupFilter, typeFilter]);

  // Group dossiers by group name
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((d) => {
      const key = d.group || "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return map;
  }, [filtered]);

  const hasGroups = existingGroups.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Mes Dossiers TLS</h1>
          </div>
          <Button onClick={() => setFormOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nouveau
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou FRA..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="primo">Primo</SelectItem>
              <SelectItem value="vise">Visé</SelectItem>
            </SelectContent>
          </Select>
          {hasGroups && (
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Groupe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous groupes</SelectItem>
                {existingGroups.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucun dossier</p>
            <p className="text-sm mt-1">Commencez par ajouter un nouveau dossier</p>
          </div>
        ) : hasGroups ? (
          // Grouped view
          <div className="space-y-6">
            {Array.from(grouped.entries()).map(([groupName, items]) => (
              <div key={groupName || "__none"}>
                {groupName && (
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <Users className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold text-foreground">{groupName}</h2>
                    <span className="text-xs text-muted-foreground">({items.length})</span>
                  </div>
                )}
                {!groupName && grouped.size > 1 && (
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <h2 className="font-semibold text-muted-foreground">Sans groupe</h2>
                    <span className="text-xs text-muted-foreground">({items.length})</span>
                  </div>
                )}
                <div className="grid gap-3">
                  {items.map((d) => (
                    <DossierCard key={d.id} dossier={d} onUpdate={updateDossier} onDelete={deleteDossier} existingGroups={existingGroups} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((d) => (
              <DossierCard key={d.id} dossier={d} onUpdate={updateDossier} onDelete={deleteDossier} existingGroups={existingGroups} />
            ))}
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground pt-4">
          {filtered.length} dossier{filtered.length !== 1 ? "s" : ""}
        </div>
      </main>

      <DossierForm open={formOpen} onOpenChange={setFormOpen} onSubmit={addDossier} existingGroups={existingGroups} />
    </div>
  );
};

export default Index;
