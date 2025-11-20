import { ChangePasswordSchema } from "@/feature/auth/validations/pawword";
import { useState } from "react";
import { authenticationChangePassword as apiChangePassword } from "@/feature/auth/services/login";

export function useChangePassword() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Fonction qui sera appelée depuis le composant
  const changePassword = async (data: {
    CurrentPassword: string;
    NewPassword: string;
    confirmPassword: string;
  }) => {
    try {
      // 1️⃣ Valider les données avec Zod
      ChangePasswordSchema.parse(data);

      // 2️⃣ Appeler l'API
      const res = await apiChangePassword({
        ancienMotDePasse: data.CurrentPassword,
        nouveauMotDePasse: data.NewPassword,
      });

      // 3️⃣ Gérer le retour
      setError(null);
    } catch (err: any) {
      // 4️⃣ Gestion des erreurs
      if (err.errors) {
        setError(err.errors.map((e: any) => e.message).join(", "));
      } else {
        setError(
          err?.response?.data?.message ||
            "Erreur lors du changement de mot de passe"
        );
      }
      setMessage(null);
    }
  };

  return { changePassword, error, message };
}
