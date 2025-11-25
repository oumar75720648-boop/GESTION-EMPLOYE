import axios from "axios";
import { Config } from "./config";

const apiClients = axios.create({
  baseURL: Config.BaseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Ajouter le token à chaque requête si présent
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
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized : token manquant ou invalide");

      if (typeof window !== "undefined") {
        // Supprimer le token si invalide
        localStorage.removeItem("accessToken");

        // Redirection vers la page de login
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClients;
