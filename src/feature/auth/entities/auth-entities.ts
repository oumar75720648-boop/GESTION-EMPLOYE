export interface AuthRequest {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string;
}

export interface AfterConnect {
  token: string
}
