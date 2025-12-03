export interface DemandePayload {
  observation: any;
  idDemande: Key | null | undefined;
  utilisateur: any;
  id?: number; // optionnel pour le POST
  typeDemande: string;
  description: string;
  statutDemande: string;
  prioriteDemande: string;
  dateDemande: string;
  utilisateurId: number;
}
