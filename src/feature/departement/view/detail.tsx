"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEmploye } from "@/feature/create-employe/hooks/use-employe";

export default function DetailDepartement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deptId = searchParams.get("id");

  // Vérifie que deptId existe
  if (!deptId) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <p className="text-red-600 font-bold">Département invalide.</p>
        <Button onClick={() => router.push("/departements")}>
          Retour aux départements
        </Button>
      </div>
    );
  }

  const deptIdNumber = Number(deptId);
  const { employes } = useEmploye();

  // Filtrage sécurisé : conversion idDepartement en nombre
  const employesDuDept = employes.filter(
    (emp) =>
      emp.idDepartement != null && Number(emp.idDepartement) === deptIdNumber
  );

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c]">
        Employés du département #{deptIdNumber}
      </h1>

      <Button onClick={() => router.push("/departements")}>
        Retour aux départements
      </Button>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto mt-4">
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
  );
}
