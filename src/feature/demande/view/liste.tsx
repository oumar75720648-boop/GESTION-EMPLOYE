"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/feature/employe/header";
import { getUserInFo } from "@/feature/auth/services/login";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import { fetchObservations } from "@/feature/observation/service/obserr";

export default function ListeDemandes() {
  const [user, setUser] = useState<any>(null);
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Charge l'utilisateur et ses demandes
  useEffect(() => {
    const init = async () => {
      const u = await getUserInFo();
      setUser(u);

      if (!u) return;

      const allDemandes = await fetchDemandes();
      const userDemandes = allDemandes.filter(
        (d) => d.utilisateur?.id === u.id
      );

      const allObs = await fetchObservations();
      const demandesAvecObs = userDemandes.map((d) => ({
        ...d,
        lastObservation:
          allObs.filter((o) => o.demandeId === d.idDemande).pop() || null,
      }));

      setDemandes(demandesAvecObs);
      setLoading(false);
    };

    init();
  }, []);

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
                demandes.map((d) => {
                  const obs = d.lastObservation;
                  return (
                    <tr key={d.idDemande} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{d.typeDemande || "-"}</td>
                      <td className="px-4 py-2">{d.prioriteDemande || "-"}</td>
                      <td className="px-4 py-2 font-semibold">
                        {obs?.statut === "ACCEPTEE" ? (
                          <span className="text-green-600">Acceptée</span>
                        ) : obs?.statut === "REFUSEE" ? (
                          <span className="text-red-600">Refusée</span>
                        ) : (
                          <span className="text-gray-500">En attente</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {obs ? (
                          <span className="text-gray-600">
                            {obs.statut === "ACCEPTEE"
                              ? "Demande acceptée"
                              : "Demande refusée"}
                          </span>
                        ) : (
                          <span className="text-gray-500">En attente</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {d.dateDemande
                          ? new Date(d.dateDemande).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
