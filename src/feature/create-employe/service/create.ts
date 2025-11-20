import apiClient from "@/lib/api/axios";

export async function createEmploye(data: any) {
  const response = await apiClient.post("/utilisateurs", data);
  return response.data;
}

export async function getEmployes() {
  const response = await apiClient.get("/utilisateurs");
  return response.data; 
}

export const employeService = {
  createEmploye,
  getEmployes,
};
