import { create } from "zustand";
import { EmployeFormData } from "@/feature/create-employe/hooks/use-employe";
import { authService } from "@/feature/auth/services/login";

interface EmployeState {
  employees: any[];
  addEmploye: (data: EmployeFormData) => Promise<void>;
  setEmployees: (employees: any[]) => void;
}

export const useEmployeStore = create<EmployeState>((set, get) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
  addEmploye: async (data: EmployeFormData) => {
    const newEmploye = await authService.createEmploye(data);
    set({ employees: [...get().employees, newEmploye] });
  },
}));
