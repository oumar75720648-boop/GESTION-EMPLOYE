import axios, { AxiosError, AxiosHeaders } from 'axios';
import { Config } from './config';


const apiClients = axios.create({
  baseURL: Config.BaseUrl,
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
});

/**
 * pour la config du token 
 * @returns {AxiosInstance} Configured Axios instance
 * @date 2025-03-11
 */
apiClients.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }
  return config;
});

/**
 * Response interceptor to handle errors globally
 * @date 2024-06-10
 * pour la config du proxy dans le fichier package.json
 */
// apiClients.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

export default apiClients;