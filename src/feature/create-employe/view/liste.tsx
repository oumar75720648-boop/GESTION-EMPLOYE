"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";
import { useEmploye } from "@/feature/create-employe/hooks/use-employe";

export default function ListeEmployes() {
  const router = useRouter();
  const { employes, toggleActif, pending } = useEmploye();
  const { departements } = useDepartements();
  const { specialites } = useSpecialites();

  return (
    <div className="p-6 bg-gray-50 min-h-[70vh] flex flex-col items-center">
      <div className="flex w-full max-w-6xl justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#160b7c]">
          Liste des employés ({employes.length})
        </h2>
        <Button
          onClick={() => router.push("/add-employee")}
          className="bg-[#160b7c] hover:bg-[#0f0660] text-white px-4 py-2 rounded-lg shadow"
        >
          + Ajouter un employé
        </Button>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-md shadow-md p-4">
        <table className="w-full table-auto divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Prénom</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Département</th>
              <th className="px-4 py-2 text-left">Spécialité</th>
              <th className="px-4 py-2 text-center">Statut</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employes.map((emp) => {
              const departementNom =
                departements.find((d) => d.idDepartement === emp.departementId)
                  ?.nomDepartement || "—";
              const specialiteNom =
                specialites.find((s) => s.idSpecialite === emp.specialiteId)
                  ?.nomSpecialite || "—";

              return (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{emp.nom}</td>
                  <td className="px-4 py-2">{emp.prenom}</td>
                  <td className="px-4 py-2 break-words">{emp.email}</td>
                  <td className="px-4 py-2">{emp.contact}</td>
                  <td className="px-4 py-2">{departementNom}</td>
                  <td className="px-4 py-2">{specialiteNom}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={
                        emp.actif
                          ? "text-green-600 font-semibold"
                          : "text-gray-500 font-semibold"
                      }
                    >
                      {emp.actif ? "Actif" : "Désactivé"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      onClick={async () => {
                        const updated = await toggleActif(emp.id, emp.actif);
                        emp.actif = updated.actif;
                      }}
                      disabled={pending}
                      className={
                        emp.actif
                          ? "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          : "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      }
                    >
                      {emp.actif ? "Désactiver" : "Activer"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
