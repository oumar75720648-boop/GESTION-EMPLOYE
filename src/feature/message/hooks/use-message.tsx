import { useState, useEffect } from "react";
import {
  fetchDemandes,
 
} from "@/feature/demande/service/demande-service";
import { DemandePayload } from "@/feature/demande/entities/demande-entites";
import { accepterDemande, refuserDemande } from "../service/message-ser";

export function useDemande(id: number) {
  const [demande, setDemande] = useState<DemandePayload | null>(null);

  // Charger la demande
  useEffect(() => {
    fetchDemandes().then((all) => {
      const d = all.find((d: { idDemande: number; }) => d.idDemande === id) || null;
      setDemande(d);
    });
  }, [id]);

  // Accepter la demande
  const accepter = async () => {
    if (!demande) return;
    const updated = await accepterDemande(demande.idDemande!);
    setDemande(updated);
  };

  // Refuser la demande avec un motif
  const refuser = async (motif: string) => {
    if (!demande) return;
    const updated = await refuserDemande(demande.idDemande!, motif);
    setDemande(updated);
  };

  return { demande, accepter, refuser };
}
