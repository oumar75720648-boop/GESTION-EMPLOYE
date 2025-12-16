"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authSchema, AuthDto } from "../validations/auth-validate";
import { authService, getUserInFo } from "../services/login";
import { Routes } from "@/lib/routes";

export function useLoginForm() {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<AuthDto>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      motDePasse: "",
    },
  });

  const action = async () => {
    try {
      setFetching(true);
      setError(null);

      const values = form.getValues();
      const response = await authService.authenticationWithEmail(values);

      const accessToken = response?.token;

      if (!accessToken) return;

      // 🔐 Sauvegarde du token
      localStorage.setItem("accessToken", accessToken);

      // 👤 Récupération utilisateur connecté
      const user = await getUserInFo();
      const role = user?.role?.toUpperCase();

      // 🚦 Redirection selon le rôle
      if (role === "ADMIN") {
        router.replace(Routes.home.dashboard.path);
      } else if (role === "EMPLOYE") {
        router.replace("/demande-list");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Changer votre mot de passe";
      setError(msg);
    } finally {
      setFetching(false);
    }
  };

  return {
    ...form,
    action,
    pending: fetching,
    error,
  };
}
