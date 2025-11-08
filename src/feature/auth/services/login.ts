import apiClients from "@/lib/api/axios";
import { AfterConnect, AuthRequest } from "../entities/auth-entities";

export async function authenticationWithEmail(data: AuthRequest) {
  const response = await apiClients.post("/auth/login", data);
  console.log("Response from authenticationWithEmail:", response);
  return response.data as AfterConnect;
}

export const authService = {
  authenticationWithEmail,
};
  