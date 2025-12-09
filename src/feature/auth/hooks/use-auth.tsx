"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authSchema, AuthDto } from "../validations/auth-validate";
import { authService } from "../services/login";
import { Routes } from "@/lib/routes";
import { useAuthStore } from "../store/auth";

export function useLoginForm() {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const {} = useAuthStore();

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

      const accessToken = response.token;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        router.push(Routes.home.dashboard.path);
        return;
      }
    } catch (err: any) {
      
      const msg = err?.response?.data?.error || "changer votre mot de passe ";
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
