import apiClients from "@/lib/api/axios"; 
import { EmployeFormData } from "../hooks/use-employe";

export async function createEmploye(data: EmployeFormData) {
  try {
    const response = await apiClients.post("/auth/login", data);
    console.log("Réponse création employé :", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erreur création employé :", error);
    throw error;
  }
}

export const employeService = {
  createEmploye,
};
