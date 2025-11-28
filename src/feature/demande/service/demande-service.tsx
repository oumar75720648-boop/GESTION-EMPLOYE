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
