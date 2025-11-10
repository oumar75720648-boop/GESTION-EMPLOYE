import apiClients from "@/lib/api/axios";
import { AfterConnect, AuthRequest } from "../entities/auth-entities";

export async function authenticationWithEmail(data: AuthRequest) {
  const response = await apiClients.post("/auth/login", data);
  return response.data as AfterConnect;
}

export async function getUserInFo() {
  const response = await apiClients.get(`/auth/me/`);
  return response.data as AfterConnect;
}

export async function logout(data: AuthRequest) {
  const response = await apiClients.post("/auth/logout", data);
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("authUser");
  return response.data;
}


export const authService = {
  authenticationWithEmail,
  logout,
  getUserInFo
};
