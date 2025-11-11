"use client";

import { create } from "zustand";
import { departementService } from "../service/departement-ser";
import { Departement } from "@/feature/departement/entites/depart-ent";


interface DepartementState {
  departements: Departement[];
  loading: boolean;
  error: string | null;
  fetchDepartements: () => Promise<void>;
  addDepartement: (nomDepartement: string) => Promise<void>;
  deleteDepartement: (nomDepartement: string) => Promise<void>;
}

export const useDepartementStore = create<DepartementState>((set, get) => ({
  departements: [],
  loading: false,
  error: null,

  fetchDepartements: async () => {
    set({ loading: true, error: null });
    try {
      const data = await departementService.getDepartements();
      set({ departements: data });
    } catch {
      set({ error: "Erreur lors du chargement des départements" });
    } finally {
      set({ loading: false });
    }
  },

  addDepartement: async (nomDepartement: string) => {
    if (!nomDepartement.trim()) return;
    try {
      const created = await departementService.createDepartement({
        nomDepartement,
      });
      set({ departements: [...get().departements, created] });
    } catch {
      set({ error: "Impossible de créer le département" });
    }
  },

  deleteDepartement: async (nomDepartement: string) => {
    try {
      await departementService.deleteDepartement(nomDepartement);
      set({
        departements: get().departements.filter(
          (d) => d.nomDepartement !== nomDepartement
        ),
      });
    } catch {
      set({ error: "Impossible de supprimer le département" });
    }
  },
}));
