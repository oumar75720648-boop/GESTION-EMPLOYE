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
    setFetching(true);
    setError(null);

    try {
      const values = form.getValues();
      const response = await authService.authenticationWithEmail(values);
      const accessToken = response?.token;

      if (!accessToken) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      localStorage.setItem("accessToken", accessToken);

      const user = await getUserInFo();
      const role = user?.role?.toUpperCase();

      if (role === "ADMIN") {
        router.replace(Routes.home.dashboard.path);
      } else if (role === "EMPLOYE") {
        router.replace("/demande-list");
      }
    } catch {
      setError("Email ou mot de passe incorrect");
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
