// src/feature/observation/service/observation-service.ts

import apiClient from "@/lib/api/axios";
import { Observation, ObservationPayload } from "../entites/obser";

/**
 * Crée une nouvelle observation pour une demande
 */
export async function createObservation(
  data: ObservationPayload
): Promise<Observation> {
  if (!data.demandeId)
    throw new Error("Le paramètre demandeId est obligatoire");

  const response = await apiClient.post(
    `/observations?demandeId=${data.demandeId}`,
    {
      statut: data.statut,
      conces: data.conces || null,
    }
  );

  return response.data;
}

/**
 * Récupère les observations (optionnel: filtrer par demandeId)
 */
export async function fetchObservations(
  demandeId?: number
): Promise<Observation[]> {
  const url = demandeId
    ? `/observations?demandeId=${demandeId}`
    : `/observations`;

  const response = await apiClient.get(url);

  // S'assurer que response.data est bien un tableau
  if (Array.isArray(response.data)) {
    return response.data;
  }

  // Retourne un tableau vide si le format n'est pas celui attendu
  return [];
}
