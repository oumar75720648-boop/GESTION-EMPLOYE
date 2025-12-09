export interface DemandePayload {
  observation: any;
  idDemande: null | undefined;
  utilisateur: any;
  id?: number; 
  typeDemande: string;
  description: string;
  statutDemande: string;
  prioriteDemande: string;
  dateDemande: string;
  utilisateurId: number;
}
