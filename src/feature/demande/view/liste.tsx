"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/feature/employe/header";
import { getUserInFo } from "@/feature/auth/services/login";
import { fetchDemandes } from "@/feature/demande/service/demande-service";

export default function ListeDemandes() {
  const [user, setUser] = useState<any>(null);
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInFo().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchDemandes().then((all) =>
      setDemandes(all.filter((d) => d.utilisateur?.id === user.id))
    );
  }, [user]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Chargement...</p>;

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
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Priorité</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-left">Dernière observation</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {demandes.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    Aucune demande disponible
                  </td>
                </tr>
              ) : (
                demandes.map((d) => (
                  <tr key={d.idDemande} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{d.typeDemande || "-"}</td>
                    <td className="px-4 py-2">{d.prioriteDemande || "-"}</td>
                    <td className="px-4 py-2">
                      {d.statutDemande || "En attente"}
                    </td>
                    <td className="px-4 py-2">
                      {d.observation?.conces || "-"}
                    </td>
                    <td className="px-4 py-2">
                      {d.dateDemande
                        ? new Date(d.dateDemande).toLocaleDateString()
                        : "-"}
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
