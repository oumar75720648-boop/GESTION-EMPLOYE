import { useState, useEffect } from "react";
import { fetchObservations, createObservation } from "../service/obserr";
import { Observation, ObservationPayload } from "../entites/obser";

export function useObservations(demandeId?: number) {
  const [observations, setObservations] = useState<Observation[]>([]);

async function load() {
  try {
    const data = await fetchObservations(demandeId);
    setObservations(data || []);
  } catch {
  } finally {
  }
}

useEffect(() => {
  load();
}, [demandeId]);


  async function addObservation(payload: ObservationPayload) {
    try {
      await createObservation(payload);
      await load();
    } catch {
    } finally {
    }
  }

  return {
    observations,
    reload: load,
    addObservation,
  };
}
