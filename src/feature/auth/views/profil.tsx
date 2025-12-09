"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import {
  getUserInFo,
  changePasswordService,
} from "@/feature/auth/services/login";
import { AfterConnect } from "@/feature/auth/entities/auth-entities";

export function Compte() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: user } = useQuery<AfterConnect>({
    queryKey: ["userMe"],
    queryFn: getUserInFo,
  });

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
    } catch (err: unknown) {
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

      <div className="flex flex-col gap-4 mb-4">
        {/* Mot de passe actuel */}
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            placeholder="Mot de passe actuel"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Nouveau mot de passe */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirmer nouveau mot de passe */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmer le nouveau mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
