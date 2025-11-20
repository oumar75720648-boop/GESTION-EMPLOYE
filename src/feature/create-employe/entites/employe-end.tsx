// feature/create-employe/entites/employe-end.ts

// Payload pour créer un employé (POST)
export interface CreateEmployePayload {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string;
  typeUtilisateurId: number; // 1 = Admin, 2 = Employé, 3 = Secrétaire
}

// Employé récupéré depuis le backend (GET)
export interface EmployeForm {
  id: number;
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  typeUtilisateurId?: number;
  motDePasse?: string;
}
