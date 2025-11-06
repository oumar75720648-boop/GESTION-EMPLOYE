'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "../hooks/use-auth";
import { useState } from "react";

export function Connexion() {
  const [visible, setVisible] = useState<boolean>(false);

  const { 
    handleSubmit,
    register,
    formState: { isSubmitted, errors },
    pending,
    action
  } = useLoginForm();


  const Error = (err:any) => {
    console.log("Erreur de connexion",err);
  }

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
          <form className="space-y-4" onSubmit={handleSubmit(action,Error)}>

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
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.motDePasse.message}</p>
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

              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
