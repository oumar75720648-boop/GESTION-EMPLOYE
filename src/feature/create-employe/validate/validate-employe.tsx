import { z } from "zod";

export const authSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis" }),
  prenom: z.string().min(1, { message: "Le prénom est requis" }),
  contact: z.string().min(1, { message: "Le contact est requis" }).regex(/^\d+$/, { message: "Uniquement des chiffres" }),
  email: z.string().email({ message: "L'email doit être valide" }),
  motDePasse: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  departementId: z.string().min(1, { message: "Le département est requis" }),
  specialiteId: z.string().min(1, { message: "La spécialité est requise" }),
  typeUtilisateurId: z
    .string()
    .min(1, { message: "Le type d'utilisateur est requis" }),
});
export type AuthDto = z.infer<typeof authSchema>;

