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



export async function authenticationChangePassword(data: ChangePasswordSchema) {
  try {
    const response = await apiClients.post("/users/me/password/change", data);

    return response.data as { message: string; accessToken?: string };
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Erreur lors du changement de mot de passe"
    );
  }
}
  
export const authService = {
  authenticationWithEmail,
  logout,
  getUserInFo,
  authenticationChangePassword,
};
