import apiClient from "@/lib/api/axios";
import { EmployeFormData } from "../entites/employe-end";
import { AxiosResponse } from "axios";

export async function createEmploye(
  data: EmployeFormData
): Promise<AxiosResponse<EmployeFormData>> {
  return apiClient.post<EmployeFormData>("/utilisateurs", data);
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
