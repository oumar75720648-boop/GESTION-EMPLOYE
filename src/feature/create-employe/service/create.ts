import apiClient from "@/lib/api/axios";
import { EmployeFormData } from "../entites/employe-end";
import { AxiosResponse } from "axios";


export async function createEmploye(
  data: EmployeFormData
): Promise<AxiosResponse<unknown>> {
  try {
    const response = await apiClient.post("/utilisateurs", data);
    return response;
  } catch (err) {
    console.error("Erreur API createEmploye:", err);
    throw err;
  }
}


export async function getEmployes() {
  const response = await apiClient.get("/utilisateurs");
  return response.data;
}

export async function desactiverEmploye(id: number) {
  const response = await apiClient.put(`/utilisateurs/${id}/disable`);
  return { actif: false, message: response.data.message };
}

export async function activerEmploye(id: number) {
  const response = await apiClient.put(`/utilisateurs/${id}/reactivate`);
  return { actif: true, message: response.data.message };
}



export const employeService = {
  createEmploye,
  getEmployes,
  desactiverEmploye,
  activerEmploye,
};
