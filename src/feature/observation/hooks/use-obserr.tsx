import { useState, useEffect } from "react";
import { fetchObservations, createObservation } from "../service/obserr";
import { Observation, ObservationPayload } from "../entites/obser";

export function useObservations(demandeId?: number) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charge automatiquement les observations à l'initial ou quand demandeId change
  useEffect(() => {
    load();
  }, [demandeId]);

  // Fonction pour charger les observations
  async function load() {
    try {
      setLoading(true);
      const data = await fetchObservations(demandeId);
      setObservations(data || []); // s'assure que c'est un tableau
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }

  // Fonction pour ajouter une observation et recharger automatiquement
  async function addObservation(payload: ObservationPayload) {
    try {
      setLoading(true);
      await createObservation(payload);
      await load(); // recharge après ajout
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  }

  return {
    observations,
    loading,
    error,
    reload: load,
    addObservation,
  };
}
