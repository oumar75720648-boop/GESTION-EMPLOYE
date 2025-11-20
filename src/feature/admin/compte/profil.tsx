"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getUserInFo } from "@/feature/auth/services/login";
import { AfterConnect } from "@/feature/auth/entities/auth-entities";

export function Compte() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [user, setUser] = useState<AfterConnect | null>(null);
  const [date, setDate] = useState(today);

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



  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-24">
      <h2 className="text-3xl font-bold text-[#160b7c] mb-8 text-center">
        Profil de l’utilisateur
      </h2>
      <div className="flex items-center gap-8 mb-10 border-b pb-6">
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#160b7c] shadow-sm"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {user?.nom} {user?.prenom}
          </h3>
          <p className="text-gray-600 mt-1">Email : {user?.email}</p>
          <p className="text-gray-600 mt-1">Poste : {user?.typeUtilisateur}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 mb-10">
        <div>
          <p className="font-semibold mb-1">Téléphone :</p>
          <p className="text-gray-700">{user?.contact}</p>
        </div>

        <div>
          <p className="font-semibold mb-1">Date d’inscription :</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#160b7c] transition"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          className="bg-[#160b7c] hover:bg-[#0e0655] text-white px-6 py-2 rounded-lg transition"
          onClick={() => router.push("/change-password")}
        >
          Modifier votre mot de passe
        </Button>
      </div>
    </div>
  );
}
