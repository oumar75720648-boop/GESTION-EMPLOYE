import { useState } from "react";
import { employeService } from "../service/create";
import { EmployeFormData } from "../entites/employe-end";
import type { AxiosError } from "axios";

export const useEmploye = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const action = async (data: EmployeFormData) => {
    setPending(true);
    setError(null);

    try {
      const response = await employeService.createEmploye(data);
      alert("Employé créé avec succès !");
      return response.data;
    } catch (err) {
      console.error(err);
      const axiosError = err as AxiosError<any>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Erreur lors de la création de l'employé";
      setError(message);
    } finally {
      setPending(false);
    }
  };

  return { action, pending, error };
};
