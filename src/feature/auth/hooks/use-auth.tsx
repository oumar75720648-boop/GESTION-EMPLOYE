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
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const router = useRouter();
  const {} = useAuthStore();

  const form = useForm<AuthDto>({
    resolver: zodResolver(authSchema), 
    defaultValues: {
      email: "",
      motDePasse: "",
    },
  });

const action = async (data: { email: string; motDePasse: string }) => {
  try {
    setError(null);
    setFetching(true);
    const values = form.getValues();

    const response = await authService.authenticationWithEmail(values);
    const accessToken = response.token;

    console.log("Utilisateur :", response.user);

    // --- LOGIN NORMAL ---
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      router.push(Routes.home.dashboard.path);
    }
  } catch (err: any) {

    if (err?.response?.status === 403 && err?.response?.data?.message) {
      const msg = err.response.data.message;
      if (msg === "Vous devez changer votre mot de passe avant de continuer") {
       
        const userId = err.response.data.userId;
        router.push(`/auth/Password?userId=${userId}`);
        return;
      }
    }

    
    if (err instanceof Error) {
      setError(err.message);
    } else if (err?.response?.data?.error?.message) {
      setError(err.response.data.error.message);
    } else {
      setError("E-mail ou mot de passe incorrect");
    }
  } finally {
    setFetching(false);
  }
};


  return { ...form, action, error, pending: fetching };
}
