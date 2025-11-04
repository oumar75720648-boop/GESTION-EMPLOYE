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
    <div className="max-w-2xl mx-auto bg-gray-100 shadow-md rounded-lg p-6 mt-28">
      <h2 className="text-2xl font-bold text-[#160b7c] mb-4">
        Profil de l’utilisateur
      </h2>

      <div className="flex items-center gap-6 mb-6">
        <img
          src=""
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-[#160b7c]"
        />
        <div>
          <h3 className="text-lg font-semibold">Traore Oumar</h3>
          <p className="text-gray-600">Email : m@example.com</p>
          <p className="text-gray-600">Poste : Employes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
        <div>
          <p className="font-medium">Téléphone :</p>
          <p>+225 07 00 00 00</p>
        </div>
        <div>
          <p className="font-medium">Adresse :</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Adresse"
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <p className="font-medium">Date d’inscription :</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <p className="font-medium">Statut :</p>
          <p>Actif</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button className="bg-green-600 text-white">
          Enregistrer les modifications
        </Button>
        <Button
          className="bg-[#160b7c] text-white"
          onClick={() => router.push("/employe/mot-passe")}
        >
          Modifie votre mot passe
        </Button>
      </div>
    </div>
  );
}
