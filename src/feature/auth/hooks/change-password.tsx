import { useState } from "react";
import { changePasswordService } from "../services/login";
import { ChangePasswordData } from "../entities/change-pass";

export function useChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const changePassword = async (data: ChangePasswordData) => {
    setPending(true);
    setError(null);
    setMessage(null);

    try {
      await changePasswordService(data);
      setMessage("Mot de passe changé avec succès !");
      return true; 
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Erreur lors du changement de mot de passe"
      );
      return false; 
    } finally {
      setPending(false);
    }
  };

  return {
    changePassword,
    pending,
    error,
    message,
    setError,
    setMessage,
  };
}
