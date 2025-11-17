import { z } from "zod";

export const specialiteSchema = z.object({
  nomSpecialite: z
    .string()
    .min(2, "Le nom de la spécialité doit contenir au moins 2 caractères"),
  idDepartement: z.string().nonempty("Vous devez choisir un département"), // string pour le select
});

export type SpecialiteSchema = z.infer<typeof specialiteSchema>;
