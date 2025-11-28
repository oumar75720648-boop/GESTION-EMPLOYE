"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/feature/employe/header";
import { useDemande } from "../hooks/use-demande";
import { getUserInFo } from "@/feature/auth/services/login";

export default function ListeDemandes() {
  const { demandes, loading } = useDemande();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserInFo();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) return <div>Chargement utilisateur...</div>;

  // Filtrage simple des demandes selon le type d'utilisateur
  const filteredDemandes =
    user.typeUtilisateur === "EMPLOYE"
      ? demandes.filter((d) => d.utilisateur?.id === user.id)
      : demandes;

  if (loading) return <div>Chargement des demandes...</div>;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#160b7c] mb-6">
          Historique des Demandes
        </h2>

        <div className="w-full overflow-x-auto bg-white rounded-md p-4 shadow-md">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Nom
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Prénom
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Priorité
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredDemandes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    Aucune demande disponible
                  </td>
                </tr>
              ) : (
                filteredDemandes.map((d) => (
                  <tr key={d.idDemande} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.utilisateur?.nom || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.utilisateur?.prenom || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.utilisateur?.email || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.typeDemande || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.prioriteDemande || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {new Date(d.dateDemande).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
