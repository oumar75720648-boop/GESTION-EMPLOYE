import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  motDePasse: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export type AuthDto = z.infer<typeof authSchema>;
