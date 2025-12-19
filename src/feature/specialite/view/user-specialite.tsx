"use client";

import { useSearchParams } from "next/navigation";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "../hooks/use-special";

export default function SpecialiteUser() {
  const searchParams = useSearchParams();
  const deptId = searchParams.get("id");

  const { specialites } = useSpecialites();
  const { departements } = useDepartements();

  if (!deptId) {
    return <p className="text-center mt-10">Aucun département sélectionné.</p>;
  }

  const deptIdNumber = Number(deptId);

  const departement = departements.find(
    (d) => d.idDepartement === deptIdNumber
  );

  const specialitesDuDepartement = specialites.filter(
    (s) => s.departementId === deptIdNumber
  );

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c] text-center">
        Spécialités du département : {departement?.nomDepartement || "—"}
      </h1>

      {specialitesDuDepartement.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">
          Aucune spécialité enregistrée dans ce département.
        </p>
      ) : (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
            <thead className="bg-[#160b7c] text-white">
              <tr>
                <th className="px-4 py-2 text-left w-1/12">#</th>
                <th className="px-4 py-2 text-left w-11/12">
                  Nom de la spécialité
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {specialitesDuDepartement.map((s, index) => (
                <tr
                  key={s.idSpecialite}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/specialite-employes?id=${s.idSpecialite}`)
                  }
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{s.nomSpecialite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
