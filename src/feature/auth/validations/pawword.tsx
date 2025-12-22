// validations/change-pass-validate.ts
import { z } from "zod";

const passwordRules = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères.")
  .regex(/[a-z]/, "Le mot de passe doit contenir une lettre minuscule.")
  .regex(/[A-Z]/, "Le mot de passe doit contenir une lettre majuscule.")
  .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre.")
 ;

export const ChangePasswordDataSchema = z.object({
  oldPassword: z.string().min(6, "Mot de passe actuel obligatoire"),
  newPassword: passwordRules,
});

export type ChangePasswordDataValidated = z.infer<
  typeof ChangePasswordDataSchema
>;
