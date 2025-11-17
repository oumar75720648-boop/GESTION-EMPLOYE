import apiClients from "@/lib/api/axios";
import { Departement } from "@/feature/departement/entites/depart-ent";

export async function getDepartements() {
  const response = await apiClients.get("/departements");
  return response.data as Departement[];
}

export async function createDepartement(nomDepartement: string) {
  const response = await apiClients.post("/departements", { nomDepartement });
  return response.data as Departement;
}

export const departementService = {
  createDepartement,
  getDepartements,
};
