'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthDto } from "@/feature/auth/validations/auth-validate";
import { authService } from "@/feature/auth/services/login";
import { Routes } from "@/lib/routes";

export function Connexion() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AuthDto>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", motDePasse: "" },
  });

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      router.push(Routes.home.dashboard.path); // Redirige automatiquement vers le dashboard
    }
  }, [router]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setError(null);
      const response = await authService.authenticationWithEmail(data.email, data.motDePasse);
      if (response.accessToken) {
        sessionStorage.setItem("accessToken", response.accessToken);
        router.push(Routes.home.dashboard.path); // Redirection après connexion
      }
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || "E-mail ou mot de passe incorrect");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-[#160b7c] p-6 rounded-full shadow-lg">
          <Image
            src="/LOGO-SIC-FOOTER-2-640x320-2 (2).png"
            alt="Logo Smart"
            width={140}
            height={140}
            className="object-cover rounded-full"
          />
        </div>
      </div>

      <Card className="w-full max-w-md bg-white shadow-2xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-black">
            Connexion à votre compte
          </CardTitle>
          <CardDescription className="text-center text-gray-700 text-lg">
            Entrez votre adresse e-mail et votre mot de passe pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Adresse e-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </Field>

              <Field className="relative">
                <FieldLabel htmlFor="motDePasse">Mot de passe</FieldLabel>
                <Input
                  id="motDePasse"
                  type={visible ? "text" : "password"}
                  placeholder="Mot de passe"
                  {...form.register("motDePasse")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {form.formState.errors.motDePasse && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.motDePasse.message}</p>
                )}
              </Field>

              <Field className="flex flex-col gap-3 pt-3">
                <Button type="submit" className="bg-[#160b7c] text-white hover:bg-[#0f0660]">
                  Se connecter
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
