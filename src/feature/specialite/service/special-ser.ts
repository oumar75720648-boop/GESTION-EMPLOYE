import apiClients from "@/lib/api/axios";
import { Specialite } from "@/feature/specialite/enttities/special-ent";

export async function getSpecialites() {
  const response = await apiClients.get("/specialites");
  return response.data as Specialite[];
}

export async function createSpecialite(
  nomSpecialite: string,
  idDepartement: number
) {
  const response = await apiClients.post("/specialites", {
    nomSpecialite,
    idDepartement,
  });
  return response.data as Specialite;
}

export const specialiteService = {
  getSpecialites,
  createSpecialite,
};
