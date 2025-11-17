"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DepartementDto,
  departementSchema,
} from "@/feature/departement/validate/depart-validate";
import { Departement } from "@/feature/departement/entites/depart-ent";
import { departementService } from "@/feature/departement/service/departement-ser";

export const useDepartements = () => {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<DepartementDto>({
    resolver: zodResolver(departementSchema),
    defaultValues: { nomDepartement: "" },
  });

  // Charger les départements depuis l'API
  const fetchDepartements = useCallback(async () => {
    setLoading(true);
    try {
      const data = await departementService.getDepartements();
      setDepartements(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Impossible de charger les départements.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartements();
  }, [fetchDepartements]);

  // Création uniquement
  const handleSubmit = async (data: DepartementDto) => {
    setLoading(true);
    const now = new Date().toISOString();

    try {
      const newDept = await departementService.createDepartement(
        data.nomDepartement
      );

      // On ajoute le département à la liste
      setDepartements((prev) => [...prev, newDept]);

      form.reset();
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Erreur lors de l'enregistrement du département.");
    } finally {
      setLoading(false);
    }
  };

  return {
    departements,
    form,
    loading,
    error,
    handleSubmit,
    fetchDepartements,
  };
};
