import { useEffect, useState } from "react";
import { getUserInFo } from "@/feature/auth/services/login";
import { EmployeFormData } from "../entites/employe-end";
import { updateUserProfile } from "../service/info-user";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";

export const useUserProfile = () => {
  const [user, setUser] = useState<
    | (EmployeFormData & { departementNom?: string; specialiteNom?: string })
    | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { departements } = useDepartements();
  const { specialites } = useSpecialites();

  const enrichUser = (data: EmployeFormData) => {
    const departementNom =
      departements.find((d) => d.idDepartement === data.departementId)
        ?.nomDepartement || "—";
    const specialiteNom =
      specialites.find((s) => s.idSpecialite === data.specialiteId)
        ?.nomSpecialite || "—";
    return { ...data, departementNom, specialiteNom };
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInFo();
      setUser(enrichUser(data));
    };
    fetchUser();
  }, [departements, specialites]);

  // Mise à jour
  const updateProfile = async (payload: EmployeFormData) => {
    if (!user) return;

    setLoading(true);
    setSuccess(false);

    const updated = await updateUserProfile(user.id!, payload);
    setUser(enrichUser(updated));

    setSuccess(true);
    setLoading(false);
  };

  return { user, updateProfile, loading, success };
};
