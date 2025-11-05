import { z } from "zod";

export const authSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  motDePasse: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type AuthDto = z.infer<typeof authSchema>;
