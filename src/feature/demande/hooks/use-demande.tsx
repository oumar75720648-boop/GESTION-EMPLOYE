import { useState, useEffect } from "react";
import { fetchDemandes, createDemande } from "../service/demande-service";
import { DemandePayload } from "../entities/demande-entites";

export function useDemande() {
  const [demandes, setDemandes] = useState<DemandePayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    setLoading(true);
    try {
      const data = await fetchDemandes();
      setDemandes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const action = async (demande: Omit<DemandePayload, "id">) => {
    setPending(true);
    try {
      const newDemande = await createDemande(demande);
      setDemandes([newDemande, ...demandes]);
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  return { demandes, loading, pending, action };
}
