"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Specialite } from "@/feature/specialite/enttities/special-ent";
import { specialiteService } from "@/feature/specialite/service/special-ser";

export interface SpecialiteDto {
  nomSpecialite: string;
  idDepartement: number;
}

export const useSpecialites = () => {
  const [specialites, setSpecialites] = useState<Specialite[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SpecialiteDto>({
    defaultValues: { nomSpecialite: "", idDepartement: 0 },
  });

  // Récupérer les spécialités depuis l'API
  const fetchSpecialites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await specialiteService.getSpecialites();
      setSpecialites(data);
    } catch {
      setError("Impossible de récupérer les spécialités");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialites();
  }, []);

  // Création ou modification d'une spécialité
  const handleSubmit = async (data: SpecialiteDto) => {
    setLoading(true);
    setError(null);
    try {
      if (editId !== null) {
        // Mise à jour locale (tu peux ajouter la mise à jour via API ici)
        setSpecialites((prev) =>
          prev.map((s) =>
            s.idSpecialite === editId
              ? {
                  ...s,
                  nomSpecialite: data.nomSpecialite,
                  idDepartement: data.idDepartement,
                }
              : s
          )
        );
        setEditId(null);
      } else {
        const newSpec = await specialiteService.createSpecialite(
          data.nomSpecialite,
          data.idDepartement
        );
        setSpecialites((prev) => [...prev, newSpec]);
      }
      form.reset();
    } catch {
      setError("Erreur lors de la création ou modification de la spécialité");
    } finally {
      setLoading(false);
    }
  };

  // Préparer le formulaire pour la modification
  const handleEdit = (spec: Specialite) => {
    form.setValue("nomSpecialite", spec.nomSpecialite);
    form.setValue("idDepartement", spec.idDepartement);
    setEditId(spec.idSpecialite);
  };

  return {
    specialites,
    form,
    handleSubmit,
    handleEdit,
    editId,
    loading,
    error,
  };
};
