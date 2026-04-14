import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DossierCard } from "@/components/DossierCard";
import { DossierForm } from "@/components/DossierForm";
import { useDossiers } from "@/hooks/useDossiers";
import { Plus, Search, FolderOpen } from "lucide-react";

const Index = () => {
  const { dossiers, addDossier, updateDossier, deleteDossier, search, setSearch } = useDossiers();
  const [formOpen, setFormOpen] = useState(false);

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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou FRA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {dossiers.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucun dossier</p>
            <p className="text-sm mt-1">Commencez par ajouter un nouveau dossier</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {dossiers.map((d) => (
              <DossierCard key={d.id} dossier={d} onUpdate={updateDossier} onDelete={deleteDossier} />
            ))}
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground pt-4">
          {dossiers.length} dossier{dossiers.length !== 1 ? "s" : ""}
        </div>
      </main>

      <DossierForm open={formOpen} onOpenChange={setFormOpen} onSubmit={addDossier} />
    </div>
  );
};

export default Index;
