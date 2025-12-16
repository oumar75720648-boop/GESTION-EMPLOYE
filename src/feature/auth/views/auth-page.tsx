"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "../hooks/use-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInFo } from "../services/login";

export function Connexion() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitted, errors },
    pending,
    action,
    error,
  } = useLoginForm();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken");
    if (!token) return; // pas connecté → rester sur login

    const fetchUserAndRedirect = async () => {
      try {
        const user = await getUserInFo();
        if (!user) return;

        const role = user.role?.toUpperCase();

        if (role === "ADMIN") {
          router.replace("/dashboard");
        } else if (role === "EMPLOYE") {
          router.replace("/demande-list");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      }
    };

    fetchUserAndRedirect();
  }, [router]);


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
            Entrez votre adresse e-mail et votre mot de passe pour vous
            connecter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(action)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Adresse e-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field className="relative w-full">
                <FieldLabel htmlFor="motDePasse">Mot de passe</FieldLabel>
                <div className="relative w-full">
                  <Input
                    id="motDePasse"
                    type={visible ? "text" : "password"}
                    placeholder="Mot de passe"
                    {...register("motDePasse")}
                    className="pr-10 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute inset-y-0 right-2 flex items-center p-1 bg-transparent text-gray-500"
                  >
                    {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.motDePasse && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.motDePasse.message}
                  </p>
                )}
              </Field>

              <Field className="flex flex-col gap-3 pt-3">
                <Button
                  type="submit"
                  disabled={pending}
                  className="bg-[#160b7c] text-white hover:bg-[#0f0660]"
                >
                  {pending || isSubmitted ? "Connexion..." : "Se connecter"}
                </Button>

                {error && (
                  <p className="text-red-500 text-center mt-2">{error}</p>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
