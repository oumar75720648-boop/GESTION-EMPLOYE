import { useState, useEffect } from "react";
import { createObservation, fetchObservations } from "@/feature/observation/service/obserr";
import { Observation, ObservationPayload } from "@/feature/observation/entites/obser";

export function useObservations(demandeId: number) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(false);

  const loadObservations = async () => {
    setLoading(true);
    try {
      const data = await fetchObservations(demandeId);
      setObservations(data);
    } catch (err) {
      console.error("Erreur fetchObservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const addObservation = async (obs: ObservationPayload) => {
    await createObservation(obs);
    await loadObservations(); // recharger après ajout
  };

  useEffect(() => {
    if (demandeId) loadObservations();
  }, [demandeId]);

  return { observations, addObservation, loading };
}
