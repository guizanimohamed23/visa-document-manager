import { useState, useEffect } from "react";
import type { Dossier } from "@/types/dossier";

const STORAGE_KEY = "tls-dossiers";

function loadDossiers(): Dossier[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function useDossiers() {
  const [dossiers, setDossiers] = useState<Dossier[]>(loadDossiers);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dossiers));
  }, [dossiers]);

  const addDossier = (data: Omit<Dossier, "id" | "createdAt">) => {
    const newDossier: Dossier = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setDossiers((prev) => [newDossier, ...prev]);
  };

  const updateDossier = (id: string, data: Partial<Dossier>) => {
    setDossiers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...data } : d))
    );
  };

  const deleteDossier = (id: string) => {
    setDossiers((prev) => prev.filter((d) => d.id !== id));
  };

  const filtered = dossiers.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.email.toLowerCase().includes(q) ||
      d.fullName.toLowerCase().includes(q) ||
      d.fra.toLowerCase().includes(q)
    );
  });

  return { dossiers: filtered, addDossier, updateDossier, deleteDossier, search, setSearch };
}
