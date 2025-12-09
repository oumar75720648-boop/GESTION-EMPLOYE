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

export async function deleteDepartement(idDepartement: number) {
  const response = await apiClients.delete(`/departements/${idDepartement}`);
  return response.data;
}


export const departementService = {
  createDepartement,
  getDepartements,
  deleteDepartement
};
