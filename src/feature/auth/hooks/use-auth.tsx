"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authSchema } from "../validations/auth-validate";
import { authService } from "../services/login";
import { Routes } from "@/lib/routes";
import { useAuthStore } from "../store/auth";

export type LoginFormData = {
  email: string;
  motDePasse: string;
};

export function useLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const router = useRouter();
  const {} = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(authSchema as any),
    defaultValues: {
      email: "",
      motDePasse: "",
    },
  });

  const action = async () => {
    try {
      setError(null);
      setFetching(true);
      const data = form.getValues();

      const login = {
        email: data.email,
        motDePasse: data.motDePasse,
      };

      const response = await authService.authenticationWithEmail(login);
      const accessToken = response.token;

      console.log("Utilisateur :", response.user);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        router.push(Routes.home.dashboard.path);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.error?.message ||
          "E-mail ou mot de passe incorrecte"
      );
    } finally {
      setFetching(false);
    }
  };

  return { ...form, action, error, pending: fetching };
}
