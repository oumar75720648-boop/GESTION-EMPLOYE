"use client";

import { useSearchParams } from "next/navigation";
import { useEmploye } from "@/feature/create-employe/hooks/use-employe";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";

export default function ProfilUser() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { employes } = useEmploye();
  const { departements } = useDepartements();
  const { specialites } = useSpecialites();

  // Trouver l'utilisateur
  const user = employes.find((emp) => emp.id.toString() === id);

  if (!user) {
    return <p className="text-center mt-10 text-xl">Utilisateur non trouvé</p>;
  }

  // Affichage : convertir l'ID en nom
  const departementNom =
    departements.find((d) => d.idDepartement === user.departementId)
      ?.nomDepartement || "Non assigné";

  const specialiteNom =
    specialites.find((s) => s.idSpecialite === user.specialiteId)
      ?.nomSpecialite || "Non assigné";

  return (
    <div className="max-w-3xl mx-auto shadow-lg rounded-lg p-5 mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Informations de l&apos;Utilisateur
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
        <p>
          <span className="font-semibold">Nom :</span> {user.nom}
        </p>
        <p>
          <span className="font-semibold">Prénom :</span> {user.prenom}
        </p>
        <p>
          <span className="font-semibold">Contact :</span> {user.contact}
        </p>
        <p>
          <span className="font-semibold">Email :</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Département :</span> {departementNom}
        </p>
        <p>
          <span className="font-semibold">Spécialité :</span> {specialiteNom}
        </p>
      </div>
    </div>
  );
}
