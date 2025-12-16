export interface AuthRequest {
  email: string;
  motDePasse: string;
}

export interface AfterConnect {
  role: string;
  message: string;
  token: string;
  user: User;
 
}

  

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  contact: string;          
  typeUtilisateur: string;
  role: string;
  departement: string;
  specialite: string;
  derniereConnexion: string;
  description : string ;
}
