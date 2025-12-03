import apiClient from "@/lib/api/axios";
import { Observation, ObservationPayload } from "../entites/obser";

export async function createObservation(
  data: ObservationPayload
): Promise<Observation> {
  if (!data.demandeId)
    throw new Error("Le paramètre demandeId est obligatoire");
  const response = await apiClient.post<Observation>("/observations", data);
  return response.data;
}

export async function fetchObservations(
  demandeId: number
): Promise<Observation[]> {
  if (!demandeId) throw new Error("Le paramètre demandeId est obligatoire");
  const response = await apiClient.get<Observation[]>(
    `/observations?demandeId=${demandeId}`
  );
  return response.data;
}
