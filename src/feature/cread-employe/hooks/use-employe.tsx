'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { authSchema } from '../validate/validate-employe';

export type LoginFormData = {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string;
  typeUtilisateurId?: string;
  departementId?: string;
  specialiteId?: string;
};

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(authSchema as any),
    defaultValues: {
      nom: '',
      prenom: '',
      contact: '',
      email: '',
      motDePasse: '',
      typeUtilisateurId: '',
      departementId: '',
      specialiteId: '',
    },
  });

  const handleSubmitForm = (data: LoginFormData) => {
    setPending(true);
    try {
      setError(null);

      console.log("Données du formulaire :", data);

      // Ici tu peux juste afficher les données ou les sauvegarder dans le store/session
      alert("Formulaire soumis avec succès !");
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue");
    } finally {
      setPending(false);
    }
  };

  return {
    ...form,
    handleSubmitForm,
    error,
    pending,
  };
}
