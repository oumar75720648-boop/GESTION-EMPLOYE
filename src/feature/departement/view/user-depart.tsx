"use client";

import { useSearchParams } from "next/navigation";
import { useEmploye } from "@/feature/create-employe/hooks/use-employe";
import { useDepartements } from "@/feature/departement/hooks/use-depart";

export default function DepartmentUser() {
  const searchParams = useSearchParams();
  const deptId = searchParams.get("id");
  const { employes } = useEmploye();
  const { departements } = useDepartements();

  if (!deptId) {
    return <p className="text-center mt-10">Aucun département sélectionné.</p>;
  }

  const deptIdNumber = parseInt(deptId, 10);
  const departement = departements.find(
    (d) => d.idDepartement === deptIdNumber
  );

  const employesDuDepartement = employes.filter(
    (e) => e.departementId === deptIdNumber
  );

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c] text-center">
        Employés du département : {departement?.nomDepartement || "—"}
      </h1>

      {employesDuDepartement.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">
          Aucun employé enregistré dans ce département.
        </p>
      ) : (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
            <thead className="bg-[#160b7c] text-white">
              <tr>
                <th className="px-4 py-2 text-left w-1/12">#</th>
                <th className="px-4 py-2 text-left w-3/12">Nom</th>
                <th className="px-4 py-2 text-left w-3/12">Prénom</th>
                <th className="px-4 py-2 text-left w-5/12">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employesDuDepartement.map((e, index) => (
                <tr key={e.id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{e.nom}</td>
                  <td className="px-4 py-2">{e.prenom}</td>
                  <td className="px-4 py-2">{e.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
