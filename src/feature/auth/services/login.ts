import apiClients from "@/lib/api/axios";
import { AfterConnect, AuthRequest, User } from "../entities/auth-entities";
import { ChangePasswordData } from "../entities/change-pass";

export async function authenticationWithEmail(data: AuthRequest) {
  const response = await apiClients.post("/auth/login", data);
  return response.data as AfterConnect;
}

export async function getUserInFo() {
  const response = await apiClients.get(`/auth/me/`);
  return response.data as User;
}

export async function logout(data: AuthRequest) {
  try {
    const response = await apiClients.post("/auth/logout", data);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    return response.data;
  } catch (error) {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("authUser");
    throw error;
  }
}


export async function changePasswordService(data: ChangePasswordData) {
  const response = await apiClients.post("/auth/change-password", data);
  return response.data;
}



export const authService = {
  authenticationWithEmail,
  logout,
  getUserInFo,
  changePasswordService,
};
