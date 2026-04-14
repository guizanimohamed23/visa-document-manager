export type DossierStatus = "pending" | "done" | "not_done";

export interface Dossier {
  id: string;
  email: string;
  password: string;
  fra: string;
  fullName: string;
  phone?: string;
  appointmentDate?: string;
  depositDate?: string;
  status: DossierStatus;
  notes?: string;
  createdAt: string;
}
