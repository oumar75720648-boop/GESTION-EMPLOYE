'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authSchema } from '../validations/auth-validate';
import { authService } from '../services/login';
import { Routes } from '@/lib/routes';
import { useAuthStore } from "../store/auth";

export type LoginFormData = {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motDePasse: string;
};

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const router = useRouter();
  const { login } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(authSchema as any),
    defaultValues: {
      nom :'',
      prenom: '',
      contact:'',
      email: '',
      motDePasse: '',
    },
  });

  const action = async () => {
    try {
      setError(null);
      setFetching(true);
      const data = form.getValues();

      console.log("Données du formulaire:", data);
      const useData = { 
        nom: data.nom,
        prenom: data.prenom,
        contact: data.contact ,
        email: data.email,
        motDePasse: data.motDePasse
      }
      
      const response = await authService.authenticationWithEmail(useData);
      console.log("Données de la réponse:", response);
      const accessToken = response.token;

      if(accessToken) { 
        login(accessToken, useData);
        localStorage.setItem('accessToken', accessToken);
        router.push(Routes.home.dashboard.path);
      }

    } catch (err: any) {
      setError(err?.response?.data?.error?.message || "E-mail ou mot de passe incorrecte");
    } finally {
      setFetching(false);
    }
  };

  return { ...form, action, error, pending: fetching };
}
