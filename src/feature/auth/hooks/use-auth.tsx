'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from "@/feature/auth/validations/auth-validate";
import { authService } from "@/feature/auth/services/login";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Routes } from '@/lib/routes';

export type LoginFormData = {
  email: string;
  motDePasse: string;
};

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      motDePasse: '',
    },
  });

  const action = async (data: LoginFormData) => {
    try {
      setError(null);
      setFetching(true);

      const response = await authService.authenticationWithEmail(data.email, data.motDePasse);

      const accessToken = response.accessToken;
      if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
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
