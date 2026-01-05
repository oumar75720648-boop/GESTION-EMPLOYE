import { useState, useEffect } from "react";
import { employeService } from "../service/create";
import { EmployeFormData } from "../entites/employe-end";

export const useEmploye = () => {
  const [employes, setEmployes] = useState<EmployeFormData[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await employeService.getEmployes();
        const initialized = data.map((e: any) => ({
          ...e,
          actif: e.actif !== undefined ? e.actif : true,
        }));
        setEmployes(initialized);
      } catch (err) {
        // rien ici
      }
    };
    fetch();
  }, []);

  const action = async (data: EmployeFormData) => {
    setPending(true);
    try {
      const response = await employeService.createEmploye(data);
      setEmployes((prev) => [...prev, response.data]);
      return response.data;
    } finally {
      setPending(false);
    }
  };

  const toggleActif = async (id: number, actif: boolean) => {
    setPending(true);
    try {
      const updated = actif
        ? await employeService.desactiverEmploye(id)
        : await employeService.activerEmploye(id);

      setEmployes((prev) =>
        prev.map((e) => (e.id === id ? { ...e, actif: updated.actif } : e))
      );

      return updated;
    } finally {
      setPending(false);
    }
  };

  return { employes, toggleActif, action, pending };
};
