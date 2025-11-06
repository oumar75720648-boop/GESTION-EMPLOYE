"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Compte() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today); 
  const [address, setAddress] = useState(""); 

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
      <h3 className="text-2xl font-semibold text-gray-900">Traore Oumar</h3>
      <p className="text-gray-600 mt-1">Email : m@example.com</p>
      <p className="text-gray-600 mt-1">Poste : Employés</p>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 mb-10">
    <div>
      <p className="font-semibold mb-1">Téléphone :</p>
      <p className="text-gray-700">+225 07 00 00 00</p>
    </div>

    <div>
      <p className="font-semibold mb-1">Adresse :</p>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Entrer votre adresse"
        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#160b7c] transition"
      />
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

    <div>
      <p className="font-semibold mb-1">Statut :</p>
      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
        Actif
      </span>
    </div>
  </div>

  <div className="flex flex-wrap gap-4 justify-center">
    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
      Enregistrer les modifications
    </Button>
    <Button
      className="bg-[#160b7c] hover:bg-[#0e0655] text-white px-6 py-2 rounded-lg transition"
      onClick={() => router.push("/mot-passe")}
    >
      Modifier votre mot de passe
    </Button>
  </div>
</div>

  );
}
