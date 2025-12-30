import { useState, useEffect, useCallback } from "react";
import { fetchObservations, createObservation } from "../service/obserr";
import { Observation, ObservationPayload } from "../entites/obser";

export function useObservations(demandeId?: number) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!demandeId) {
      setObservations([]);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchObservations(demandeId);
      setObservations(data ?? []);
    } catch (error) {
      console.error("Erreur chargement observations", error);
    } finally {
      setLoading(false);
    }
  }, [demandeId]);

  useEffect(() => {
    load();
  }, [load]);

  async function addObservation(payload: ObservationPayload) {
    if (!payload.demandeId) return;

    try {
      await createObservation(payload);
      await load();
    } catch (error) {
      console.error("Erreur création observation", error);
    }
  }

  return {
    observations,
    loading,
    reload: load,
    addObservation,
  };
}
