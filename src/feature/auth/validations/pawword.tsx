import { z } from "zod";

const passwordRules = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
  .regex(
    /[()@&#]/,
    "Le mot de passe doit contenir un caractère spécial parmi ()@&#"
  );

export const ChangePasswordSchema = z
  .object({
    CurrentPassword: z.string().min(6, "Mot de passe actuel obligatoire"),
    NewPassword: passwordRules,
    confirmPassword: passwordRules,
  })
  .refine((data) => data.NewPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Type TypeScript généré automatiquement
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
