"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../validate/validate-employe";
import { employeService } from "../service/create";
import { EmployeFormData } from "../entites/employe-end";

export type EmployeFormData = EmployeFormData ;

export function useEmployeForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<EmployeFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      id: null,
      nom: "",
      prenom: "",
      contact: "",
      email: "",
      motDePasse: "",
      departementId: "",
      specialiteId: "",
      typeUtilisateurId: "",
    },
  });

  const action = async (data: EmployeFormData) => {
    try {
      setPending(true);

      const payload = {
        ...data,
        departementId: data.departementId ? Number(data.departementId) : null,
        specialiteId: data.specialiteId ? Number(data.specialiteId) : null,
      };

      await employeService.createEmploye(payload);

      // Reset du formulaire après création
      form.reset();
    } catch (error) {
      console.error("Erreur création employé :", error);
      // Ici tu peux gérer l'erreur avec un composant visuel ou un state d'erreur
    } finally {
      setPending(false);
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    form,
    action,
    pending,
    formState: form.formState,
  };
}
