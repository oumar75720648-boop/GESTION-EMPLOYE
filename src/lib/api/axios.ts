import axios, { AxiosHeaders } from "axios";
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
      const tokenByBearer = "Bearer " + token; // espace après Bearer
      config.headers = {
        ...config.headers,
        Authorization: tokenByBearer,
      };
    }
  }
  return config;
});

apiClients.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      console.warn("quite ici");
    }
    return Promise.reject(error);
  }
);

export default apiClients;
