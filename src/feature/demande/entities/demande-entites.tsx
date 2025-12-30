export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  contact: string;
  role: string | null;
}

export interface DemandePayload {
  idDemande: number;
  id: number;
  typeDemande: string;
  description: string;
  statutDemande: string;
  prioriteDemande: string;
  dateDemande: string;
  utilisateur: {
    id: number;
    nom: string;
    prenom: string;
    contact: string;
    role: string | null;
  };
  motifRefus?: string; 
}