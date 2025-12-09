"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/feature/admin/employe/header";
import { getUserInFo } from "@/feature/auth/services/login";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import { fetchObservations } from "@/feature/observation/service/obserr";
import { User } from "@/feature/auth/entities/auth-entities";
import { Observation } from "@/feature/observation/entites/obser";
import { DemandePayload } from "@/feature/demande/entities/demande-entites";

export default function ListeDemandes() {
  const [user, setUser] = useState<User | null>(null);
  const [demandes, setDemandes] = useState<DemandePayload[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDemande, setSelectedDemande] = useState<DemandePayload | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      const u = await getUserInFo();
      setUser(u);

      if (!u) return;

      const allDemandes = await fetchDemandes();
      const userDemandes = allDemandes.filter(
        (d: DemandePayload) => d.utilisateur?.id === u.id
      );

      const allObs = await fetchObservations();
      const demandesAvecObs = userDemandes.map((d: DemandePayload) => ({
        ...d,
        lastObservation:
          allObs
            .filter((o: Observation) => o.demandeId === d.idDemande)
            .pop() || null,
      }));

      setDemandes(demandesAvecObs);
      setLoading(false);
    };

    init();
  }, []);

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
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
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
                      <td className="px-4 py-2">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => setSelectedDemande(d)}
                        >
                          Voir details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {selectedDemande && (
          <div className="mt-6 p-4 bg-gray-200 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Détails de la demande</h2>
            <p>
              <strong>Type :</strong> {selectedDemande.typeDemande}
            </p>
            <p>
              <strong>Date :</strong>{" "}
              {new Date(selectedDemande.dateDemande).toLocaleDateString()}
            </p>
            <p>
              <strong>Description :</strong>{" "}
              {selectedDemande.description || "-"}
            </p>
            <button
              onClick={() => setSelectedDemande(null)}
              className="mt-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              Fermer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
