"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "@/feature/service/service-connexion";
import { cn } from "@/lib/utils";

export function Connexion({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [mot, setMot] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = await auth.Connexion(email, mot);

    if (data && data.token) {
      router.push("/protected/liste-demande");
    }

    setLoading(false);
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100", className)}
      {...props}
    >
    
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/LOGO-SIC-FOOTER-2-640x320-2 (2).png"
          alt="Logo Smart"
          width={140}
          height={140}
          className="object-cover rounded-full shadow-lg bg-[#160b7c]"
        />
        <h1 className="text-3xl font-bold mt-3 text-[#160b7c] tracking-wide drop-shadow-md">
          Smart Innovation Center
        </h1>
      </div>

 
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-black">Connexion à votre compte</CardTitle>
          <CardDescription className="text-center text-gray-700 text-lg">
            Entrez votre adresse e-mail et votre mot de passe pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FieldGroup>
             
              <Field>
                <FieldLabel htmlFor="email">Adresse e-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

          
              <Field className="relative">
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={mot}
                  onChange={(e) => setMot(e.target.value)}
                  className="pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className="absolute -right-90  top-1/2 translate-y-1/2 text-gray-500"
                >
                  {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </Field>

       
              <Field className="flex flex-col gap-3 pt-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#160b7c] text-white hover:bg-[#0f0660]"
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
