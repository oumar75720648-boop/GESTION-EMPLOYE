import apiClients from "@/lib/api/axios";
import { Departement } from "@/feature/departement/entites/depart-ent";

export async function getDepartements(): Promise<Departement[]> {
  const response = await apiClients.get("/departements");
  return response.data as Departement[];
}

export async function createDepartement(data: {
  nomDepartement: string;
}): Promise<Departement> {
  const response = await apiClients.post("/departements", data);
  return response.data as Departement;
}

export async function deleteDepartement(nomDepartement: string): Promise<void> {
  await apiClients.delete(`/departements/${nomDepartement}`);
}

export const departementService = {
  getDepartements,
  createDepartement,
  deleteDepartement,
};
