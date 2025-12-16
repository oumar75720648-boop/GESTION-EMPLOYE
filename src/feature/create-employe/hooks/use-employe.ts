import { useState, useEffect } from "react";
import { employeService } from "../service/create";
import { EmployeFormData } from "../entites/employe-end";

export const useEmploye = () => {
  const [employes, setEmployes] = useState<any[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        console.error(err);
      }
    };
    fetch();
  }, []);

  const action = async (data: EmployeFormData) => {
    setPending(true);
    setError(null);
    try {
      const nouveau = await employeService.createEmploye(data);
      setEmployes((prev) => [...prev, nouveau]);
      return nouveau;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la création");
      throw err;
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
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  return { employes, toggleActif, action, pending, error };
};
