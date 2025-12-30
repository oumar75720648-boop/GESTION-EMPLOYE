export type ObservationStatut = "ACCEPTEE" | "REFUSEE";

export interface ObservationPayload {
  demandeId: number;
  statut: ObservationStatut;
  conces?: string | null;
}

export interface Observation {
  idObservationDemande: number;
  demandeId: number;
  statut: ObservationStatut;
  conces: string | null;
  dateObservation: string;
}
