// auth-entities.ts
export interface AuthRequest {
  email: string;
  motDePasse: string;
}

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  contact: number;
  typeUtilisateur: string;
  role: string;
  departement: string;
  specialite: string;
  derniereConnexion: string;
}

export interface AfterConnect {
  token: string;
  users: User; 
}
