"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEmploye } from "@/feature/create-employe/hooks/use-employe";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";

export default function ProfilUser() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 

  const { employes } = useEmploye();
  const { departements } = useDepartements();
  const { specialites } = useSpecialites();

  const user = employes.find((emp) => emp.id.toString() === id);

  if (!user) {
    return <p className="text-center mt-10 text-xl">Utilisateur non trouvé</p>;
  }

  const departementNom =
    departements.find((d) => d.idDepartement === user.departementId)
      ?.nomDepartement || "—";
  const specialiteNom =
    specialites.find((s) => s.idSpecialite === user.specialiteId)
      ?.nomSpecialite || "—";

  return (
    <div className="max-w-3xl mx-auto shadow-lg  rounded-lg p-5 mt-10">
      <div className="flex justify-center items-center mb-10 text-3xl font-bold">
        Les Informations de l'Utilisateur
      </div>

      <div className="text-2xl grid grid-cols-1 md:grid-cols-2  gap-11 mt-8">
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
