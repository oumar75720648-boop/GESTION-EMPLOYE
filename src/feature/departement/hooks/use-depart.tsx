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
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<DepartementDto>({
    resolver: zodResolver(departementSchema),
    defaultValues: { nomDepartement: "" },
  });

  const fetchDepartements = useCallback(async () => {
    setLoading(true);
    try {
      const data = await departementService.getDepartements();
      setDepartements(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartements();
  }, [fetchDepartements]);

  const handleSubmit = async (data: DepartementDto) => {
    setLoading(true);
    try {
      await departementService.createDepartement(data.nomDepartement);
      form.reset();
      await fetchDepartements(); // recharge la liste après création
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await departementService.deleteDepartement(id);
      await fetchDepartements(); // recharge la liste après suppression
    } finally {
      setLoading(false);
    }
  };

  return {
    departements,
    form,
    loading,
    handleSubmit,
    handleDelete,
  };
};
