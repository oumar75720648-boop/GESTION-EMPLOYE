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

  const form = useForm<SpecialiteDto>({
    defaultValues: { nomSpecialite: "", idDepartement: 0 },
  });

  const fetchSpecialites = async () => {
    setLoading(true);
    try {
      const data = await specialiteService.getSpecialites();
      setSpecialites(data);
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
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (spec: Specialite) => {
    form.setValue("nomSpecialite", spec.nomSpecialite);
    form.setValue("idDepartement", spec.idDepartement);
    setEditId(spec.idSpecialite);
  };

  // Suppression d'une spécialité
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette spécialité ?")) return;
    setLoading(true);
    try {
      await specialiteService.deleteSpecialite(id);
      await fetchSpecialites();
    } finally {
      setLoading(false);
    }
  };

  return {
    specialites,
    form,
    handleSubmit,
    handleEdit,
    handleDelete,
    editId,
    loading,
  };
};
