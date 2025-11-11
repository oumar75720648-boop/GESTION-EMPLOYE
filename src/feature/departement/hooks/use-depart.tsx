"use client";

import { useState, useEffect } from "react";
import { departementService } from "../service/departement-ser";
import { Departement } from "../entites/depart-ent";

export function useDepartements() {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les départements au montage
  useEffect(() => {
    setLoading(true);
    departementService
      .getDepartements()
      .then((data) => setDepartements(data))
      .catch(() => setError("Erreur lors du chargement des départements"))
      .finally(() => setLoading(false));
  }, []);

  // Ajouter un département
  const addDepartement = async (nomDepartement: string) => {
    if (!nomDepartement.trim()) return;
    try {
      const created = await departementService.createDepartement({
        nomDepartement,
      });
      setDepartements([...departements, created]);
    } catch {
      setError("Impossible de créer le département");
    }
  };

  // Supprimer un département
  const deleteDepartement = async (nomDepartement: string) => {
    try {
      await departementService.deleteDepartement(nomDepartement);
      setDepartements(
        departements.filter((d) => d.nomDepartement !== nomDepartement)
      );
    } catch {
      setError("Impossible de supprimer le département");
    }
  };

  return { departements, loading, error, addDepartement, deleteDepartement };
}
