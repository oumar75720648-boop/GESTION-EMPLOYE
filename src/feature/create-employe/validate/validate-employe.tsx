import { z } from "zod";

export const authSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis" }),
  prenom: z.string().min(1, { message: "Le prénom est requis" }),
  contact: z
    .string()
    .min(6, { message: "Contact requis" })
    .regex(/^\d+$/, {
      message: "Le contact doit contenir uniquement des chiffres",
    }),

  email: z.string().email({ message: "Email invalide" }),
  motDePasse: z.string().min(6, { message: "Au moins 6 caractères" }),

  departementId: z
    .string()
    .min(1, { message: "Département requis" })
    .transform((val) => Number(val)),

  specialiteId: z
    .string()
    .min(1, { message: "Spécialité requise" })
    .transform((val) => Number(val)),

  typeUtilisateurId: z
    .string()
    .min(1, { message: "Type utilisateur requis" })
    .transform((val) => Number(val)),
});
