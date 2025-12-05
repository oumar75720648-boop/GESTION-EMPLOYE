
export type ObservationStatut = "ACCEPTEE" | "REFUSEE" | "EN_ATTENTE";

export interface ObservationPayload {
  conces?: string | null;
  statut: ObservationStatut;
  demandeId: number;
}

export interface Observation {
  idObservationDemande: number;
  conces: string | null;
  statut: ObservationStatut;
  dateObservation: string;
  demandeId: number;
}
