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

  const fetchSpecialites = async () => {
    setLoading(true);
    try {
      const data = await specialiteService.getSpecialites();
      setSpecialites(data);
    } catch (err) {
      setError("Impossible de récupérer les spécialités");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialites();
  }, []);

  const handleSubmit = async (data: SpecialiteDto) => {
    setLoading(true);
    try {
      if (editId !== null) {
        // ici tu peux ajouter la modification via API si nécessaire
        {/* chat gtp */}
        setSpecialites((prev) =>
          prev.map((s) =>
            s.id === editId
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
        setSpecialites([...specialites, newSpec]);
      }
      form.reset();
    } catch (err) {
      setError("Erreur lors de la création/modification de la spécialité");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (spec: Specialite) => {
    form.setValue("nomSpecialite", spec.nomSpecialite);
    form.setValue("idDepartement", spec.idDepartement);
    setEditId(spec.id);
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
