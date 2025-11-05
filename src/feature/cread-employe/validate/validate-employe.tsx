import { z } from "zod";
export type authDto = z.Infer<typeof authSchema>;
export const authSchema = z.object({
    id: z.number().nullable(),
    nom: z.string(),
    prenom :z.string(),
    constact :z.string().refine((val) => !val || /^[0-9+()\s-]{8,20}$/.test(val),{ message: "Le contact est invalide" }),
    email: z.string().min(1, { message: "Adresse email invalide" }),
    motDePasse: z.string().min(6, { message: "le mot de passe au moins 6 caractere" }),
    typeUtilisateurId: z.string().min(1, { message: "Le type d'utilisateur est requis" }).nullable(),
    departementId: z.string().nullable(),
    specialiteId: z.string().optional().nullable(),

});