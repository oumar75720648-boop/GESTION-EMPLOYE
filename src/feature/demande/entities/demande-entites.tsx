export interface DemandePayload {
  observation: unknown;
  idDemande: number | null | undefined;
  utilisateur: unknown;
  id?: number;
  typeDemande: string;
  description: string;
  statutDemande: string;
  prioriteDemande: string;
  dateDemande: string;
  utilisateurId: number;
}
