import apiClient from "@/lib/api/axios";
import { DemandePayload } from "@/feature/demande/entities/demande-entites";



export async function accepterDemande(id: number): Promise<DemandePayload> {
  const res = await apiClient.put(`/demandes/${id}/accepter`);
  return res.data.demande;
}

export async function refuserDemande(
  id: number,
  motif: string
): Promise<DemandePayload> {
  const response = await apiClient.put(
    `/demandes/${id}/refuser?motif=${motif}`
  );
  return response.data.demande;
}

