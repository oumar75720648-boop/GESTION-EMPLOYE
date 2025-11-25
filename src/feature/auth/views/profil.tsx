"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getUserInFo } from "@/feature/auth/services/login";
import { AfterConnect } from "@/feature/auth/entities/auth-entities";
import { changePasswordService } from "@/feature/auth/services/login";

export function Compte() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [user, setUser] = useState<AfterConnect | null>(null);
  const [date, setDate] = useState(today);

  // Champs mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserInFo();
        setUser(data);
      } catch (error) {
        console.error("Erreur chargement utilisateur :", error);
      }
    }
    loadUser();
  }, []);

  const handleChangePassword = async () => {
    if (!user) return;
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError(
        "Le nouveau mot de passe et la confirmation ne correspondent pas."
      );
      return;
    }

    setPending(true);
    try {
      await changePasswordService({
        userId: user.id,
        oldPassword,
        newPassword,
      });
      setMessage("Mot de passe changé avec succès !");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Erreur lors du changement de mot de passe");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Profil utilisateur
      </h2>
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {user?.nom} {user?.prenom}
          </h3>
          <p className="text-gray-500 mt-1 text-sm">Email : {user?.email}</p>
         
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6">
        <div>
          <p className="font-medium text-sm mb-1">Téléphone :</p>
          <p className="text-gray-600">{user?.contact}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-medium text-sm">Date du jour:</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1"
          />
        </div>
      </div>

      {/* Champs mot de passe */}
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <Button
        className="bg-[#160b7c] hover:bg-[#0e0655] text-white w-full py-2 rounded-lg"
        onClick={handleChangePassword}
        disabled={pending}
      >
        {pending ? "En cours..." : "Changer le mot de passe"}
      </Button>
    </div>
  );
}
