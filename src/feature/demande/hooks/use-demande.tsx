import { useState, useEffect } from "react";
import {
  createObservation,
  fetchObservations,
} from "@/feature/observation/service/obserr";
import {
  Observation,
  ObservationPayload,
} from "@/feature/observation/entites/obser";

export function useObservations(demandeId: number) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(false);

  const loadObservations = async (id: number) => {
    setLoading(true);
    try {
      const data = await fetchObservations(id);
      setObservations(data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const addObservation = async (obs: ObservationPayload) => {
    try {
      await createObservation(obs);
      await loadObservations(demandeId);
    } catch {
    }
  };

  useEffect(() => {
    if (demandeId) {
      loadObservations(demandeId);
    }
  }, [demandeId]);

  return { observations, addObservation, loading };
}
