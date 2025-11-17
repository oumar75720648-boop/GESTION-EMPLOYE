import apiClient from "@/lib/api/axios";
import { EmployeFormData } from "../entites/employe-end"; 

export async function createEmploye(data: EmployeFormData): Promise<EmployeFormData> {
  const response = await apiClient.post("/utilisateurs", data);
  return response.data as EmployeFormData;
}

export async function fetchEmployes(): Promise<EmployeFormData[]> {
  const response = await apiClient.get("/utilisateurs");
  return response.data as EmployeFormData[];
}

export const employeService = {
  createEmploye,
  fetchEmployes,
};
