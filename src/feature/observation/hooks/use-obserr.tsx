import { useState, useEffect } from "react";
import { fetchObservations } from "../service/obserr";
import { Observation } from "../entites/obser";

export function useObservations(demandeId: number) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!demandeId) return;
    let isMounted = true;

    const loadObservations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchObservations(demandeId);
        if (isMounted) setObservations(data);
      } catch (err) {
        if (isMounted)
          setError(
            err instanceof Error
              ? err.message
              : "Erreur lors du chargement des observations"
          );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadObservations();
    return () => {
      isMounted = false;
    };
  }, [demandeId]);

  return { observations, loading, error };
}
