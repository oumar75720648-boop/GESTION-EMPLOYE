export type ObservationStatus = "ACCEPTEE" | "REFUSEE";

export interface Observation {
  idOservationDemande: number;
  demandeId: number;
  conces: string;
  statut: ObservationStatus;
  dateObservation: string;
}

export interface ObservationPayload {
  demandeId: number;
  conces: string;
  statut: ObservationStatus;
}
