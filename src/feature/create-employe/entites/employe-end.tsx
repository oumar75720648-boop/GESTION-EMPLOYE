export interface EmployeFormData {
  id?: number;
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string | null; 
  departementId: number | null;
  specialiteId: number | null;
  typeUtilisateurId: number | null;}
