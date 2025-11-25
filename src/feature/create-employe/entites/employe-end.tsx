export interface EmployeFormData {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string;
  departementId: number | null;
  specialiteId: number | null;
  typeUtilisateurId: number | null;
}
