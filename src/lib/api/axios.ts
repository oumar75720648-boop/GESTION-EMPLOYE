import axios from 'axios';
import { Config } from './config';


const apiClients = axios.create({
  baseURL: Config.BaseUrl,
  headers: {
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
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