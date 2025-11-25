import apiClient from "@/lib/api/axios";
import { EmployeFormData } from "../entites/employe-end";
import { AxiosResponse } from "axios";


export async function createEmploye(
  data: EmployeFormData
): Promise<AxiosResponse<any>> {
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

export const employeService = {
  createEmploye,
  getEmployes,
};
