import apiClients from "@/lib/api/axios";
import { AuthRequest, Token } from "../entities/auth-entities";

export async function authenticationWithEmail(email: string, motDePasse: string) {
  const body: AuthRequest = { email, motDePasse };
  const res = await apiClients.post("/auth/login", body);
  return res.data as Token;
}

export const authService = {
  authenticationWithEmail,
};
