import { useState, useEffect } from "react";
import { fetchObservations, createObservation } from "../service/obserr";
import { Observation, ObservationPayload } from "../entites/obser";

export function useObservations(demandeId?: number) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    load();
  }, [demandeId]);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchObservations(demandeId);
      setObservations(data || []);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  async function addObservation(payload: ObservationPayload) {
    try {
      setLoading(true);
      await createObservation(payload);
      await load();
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return {
    observations,
    loading,
    reload: load,
    addObservation,
  };
}
