export type DossierStatus = "pending" | "done" | "not_done";
export type VisaType = "primo" | "vise";
export type VisaPurpose = "familiale" | "touristique";

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
  visaType: VisaType;
  visaPurpose: VisaPurpose;
  group?: string;
  notes?: string;
  createdAt: string;
}
