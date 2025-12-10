import axios from "axios";
import { Config } from "./config";

const apiClients = axios.create({
  baseURL: Config.BaseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

apiClients.interceptors.request.use((config: any) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
});

apiClients.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth")) {
        console.warn("401 Unauthorized : token manquant ou invalide");
        localStorage.removeItem("accessToken");
        window.location.href = "/auth";         
      }
    }

    if (
      status === 403 &&
      data?.message === "Vous devez changer votre mot de passe avant de continuer"
    ) {
      if (typeof window !== "undefined") {
        const userId = data.userId;
        window.location.href = `/auth/Password?userId=${userId}`;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClients;
