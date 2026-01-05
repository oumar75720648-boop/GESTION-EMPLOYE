import { useState } from "react";
import { changePasswordService } from "../services/login";
import { ChangePasswordData } from "../entities/change-pass";

export function useChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const changePassword = async (data: ChangePasswordData) => {
    setPending(true);
    setMessage(null);

    try {
      await changePasswordService(data);
      setMessage("Mot de passe changé avec succès !");
      return true;
    } catch {
      return false;
    } finally {
      setPending(false);
    }
  };

  return {
    changePassword,
    pending,
    message,
    setMessage,
  };
}
