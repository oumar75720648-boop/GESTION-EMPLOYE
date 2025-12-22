import { z } from "zod";

export const departementSchema = z.object({
  nomDepartement: z
    .string()
    .min(2, "Le nom du département doit contenir au moins 2 caractères"),
});

export type DepartementDto = z.infer<typeof departementSchema>;
