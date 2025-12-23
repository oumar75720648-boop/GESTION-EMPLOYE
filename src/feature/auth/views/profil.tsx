"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserInFo } from "../services/login";

export default function UserProfile() {
  const router = useRouter();

  const {
    data: userMe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userMe"],
    queryFn: getUserInFo,
  }); 

  if (isLoading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (error || !userMe) {
    return <p className="text-center mt-10">Utilisateur introuvable</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c] text-center">
        Profil Utilisateur
      </h1>

      <div className="grid grid-cols-2 grid-rows-4 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Nom</h2>
          <p className="text-gray-900">{userMe.nom}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Prénom</h2>
          <p className="text-gray-900">{userMe.prenom}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Email</h2>
          <p className="text-gray-900">{userMe.email}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Contact</h2>
          <p className="text-gray-900">{userMe.contact || "Non renseigné"}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Département</h2>
          <p className="text-gray-900">{userMe.departement || "Non assigné"}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Spécialité</h2>
          <p className="text-gray-900">{userMe.specialite || "Non assignée"}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold mb-2">Rôle</h2>
          <p className="text-gray-900">{userMe.role}</p>
        </div>

      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <Button
          onClick={() => router.push("/modification")}
          className="bg-[#160b7c] hover:bg-[#0f0660] text-white"
        >
          Modifier le profil
        </Button>

        <Button onClick={() => router.push("")} variant="outline">
          Retour au tableau de bord
        </Button>
      </div>
    </div>
  );
}
