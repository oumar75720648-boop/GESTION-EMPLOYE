"use client";

import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useEmploye } from "@/feature/create-employe/hooks/use-employe";
import { useState } from "react";

export default function ListeDepartements() {
  const { departements, form, handleSubmit, loading, handleDelete } =
    useDepartements();
  const { employes } = useEmploye();
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);

  const selectedDept = departements.find(
    (dept) => Number(dept.idDepartement) === Number(selectedDeptId)
  );

  const employesDuDept = selectedDeptId
    ? employes.filter(
        (emp) =>
          emp.idDepartement != null &&
          Number(emp.idDepartement) === Number(selectedDeptId)
      )
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      {/* Titre */}
      <h1 className="text-3xl font-bold text-[#160b7c]">
        Gestion des départements
      </h1>

      {/* Formulaire création */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <input
          type="text"
          placeholder="Saisir le nom du département"
          {...form.register("nomDepartement")}
          className="border px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-[#160b7c]"
        />
        <Button
          type="submit"
          className="px-4 py-2 rounded-lg bg-[#160b7c] hover:bg-[#0f0660] text-white"
          disabled={loading}
        >
          Ajouter
        </Button>
      </form>

      {/* Table des départements */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
          <thead className="bg-[#160b7c] text-white">
            <tr>
              <th className="px-4 py-2 text-left w-1/12">#</th>
              <th className="px-4 py-2 text-left w-7/12">Nom du département</th>
              <th className="px-4 py-2 text-left w-4/12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departements.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  Aucun département trouvé
                </td>
              </tr>
            ) : (
              departements.map((dept, index) => (
                <tr key={dept.idDepartement ?? index}>
                  <td className="px-4 py-2">{index + 1}</td>

                  {/* Nom cliquable pour sélectionner le département */}
                  <td
                    className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      setSelectedDeptId(dept.idDepartement ?? null)
                    }
                  >
                    {dept.nomDepartement}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2 flex gap-2 items-center">
                    {confirmId === dept.idDepartement ? (
                      <>
                        <span className="text-sm text-gray-700">
                          Confirmer la suppression ?
                        </span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            await handleDelete(dept.idDepartement);
                            setConfirmId(null);
                            if (selectedDeptId === dept.idDepartement) {
                              setSelectedDeptId(null);
                            }
                          }}
                          disabled={loading}
                        >
                          Confirmer
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setConfirmId(null)}
                        >
                          Annuler
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setConfirmId(dept.idDepartement)}
                        disabled={loading}
                      >
                        Supprimer
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedDeptId && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#160b7c]">
            Employés du département {selectedDept?.nomDepartement || ""}
          </h2>

          <div className="overflow-x-auto max-h-[400px] overflow-y-auto mt-2">
            <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
              <thead className="bg-[#160b7c] text-white">
                <tr>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Prénom</th>
                  <th className="px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employesDuDept.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">
                      Aucun employé dans ce département
                    </td>
                  </tr>
                ) : (
                  employesDuDept.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{emp.nom}</td>
                      <td className="px-4 py-2">{emp.prenom}</td>
                      <td className="px-4 py-2">{emp.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
