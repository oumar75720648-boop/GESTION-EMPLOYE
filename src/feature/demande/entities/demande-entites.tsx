export interface DemandePayload {
  id?: number; // optionnel pour le POST
  typeDemande: string;
  description: string;
  statutDemande: string;
  prioriteDemande: string;
  dateDemande: string;
  utilisateurId: number;
}
