// use-employe.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { authSchema } from '../validate/validate-employe';
import { employeService } from '../service/create';
import { useRouter } from 'next/navigation';

export type EmployeFormData = {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string;
  departementId: string;
  specialiteId: string;
  typeUtilisateurId: string;
};

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<EmployeFormData>({
    resolver: zodResolver(authSchema as any),
    defaultValues: {
      nom: '',
      prenom: '',
      contact: '',
      email: '',
      motDePasse: '',
      departementId: '',
      specialiteId: '',
      typeUtilisateurId: '',
    },
  });

  const action = async (data: EmployeFormData) => {
    try {
      setError(null);
      setFetching(true);

      console.log("Données du formulaire :", data);
      await employeService.createEmploye(data);

      
      router.push('/liste-employe');
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || "Erreur lors de la création de l'employé");
      console.error("Erreur création employé :", err);
    } finally {
      setFetching(false);
    }
  };

  return {
    ...form,
    action,
    error,
    pending: fetching,
  };
}
