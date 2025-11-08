import { z } from "zod";

export const authSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  contact: z.string()
    .min(1, { message: "Le contact est requis" })
    .refine((val) => /^[0-9+()\s-]{8,20}$/.test(val), { message: "Le contact est invalide" }),
  email: z.string().min(1, { message: "L'email est requis" }),
  motDePasse: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  typeUtilisateurId: z.string(),
  departementId: z.string(),
  specialiteId: z.string(),
});

export type AuthDto = z.infer<typeof authSchema>;
