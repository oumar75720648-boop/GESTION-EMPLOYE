import apiClients from "@/lib/api/axios";
import { AfterConnect, AuthRequest } from "../entities/auth-entities";

export async function authenticationWithEmail(data: AuthRequest) {
  const res = await apiClients.post("/auth/login", data);
  console.log("Response from authenticationWithEmail:", res);
  return res.data as AfterConnect;
}

export const authService = {
  authenticationWithEmail,
};
