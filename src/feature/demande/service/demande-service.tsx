import apiClient from "@/lib/api/axios";
import { DemandePayload } from "../entities/demande-entites";

export async function createDemande(data: DemandePayload) {
  const response = await apiClient.post("/demandes", data);
  return response.data;
}

export async function fetchDemandes() {
  const response = await apiClient.get("/demandes");
  return response.data;
}

export async function accepterDemande(idDemande: number) {
  const response = await apiClient.put(`/demandes/${idDemande}/accepter`);
  return response.data.demande;
}

export async function refuserDemande(idDemande: number) {
  const response = await apiClient.put(`/demandes/${idDemande}/refuser`);
  return response.data.demande;
}