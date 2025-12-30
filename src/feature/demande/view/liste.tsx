"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/feature/admin/employe/header";
import { getUserInFo } from "@/feature/auth/services/login";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import { fetchObservations } from "@/feature/observation/service/obserr";
import { Observation } from "@/feature/observation/entites/obser";
import { DemandePayload } from "@/feature/demande/entities/demande-entites";

type DemandeAvecObs = DemandePayload & {
  lastObservation?: Observation | null;
  motifRefus?: string;
};

export default function ListeDemandes() {
  const [demandes, setDemandes] = useState<DemandeAvecObs[]>([]);
  const [selectedDemande, setSelectedDemande] = useState<DemandeAvecObs | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      const user = await getUserInFo();
      if (!user) return;

      const allDemandes = await fetchDemandes();
      const userDemandes = allDemandes.filter(
        (d: DemandePayload) => d.utilisateur?.id === user.id
      );

      const allObs = await fetchObservations();

      const demandesAvecObs: DemandeAvecObs[] = userDemandes.map((d) => {
        const obs = allObs
          .filter((o: Observation) => o.demandeId === d.idDemande)
          .sort(
            (a, b) =>
              new Date(a.dateObservation).getTime() -
              new Date(b.dateObservation).getTime()
          )
          .pop();

        return {
          ...d,
          lastObservation: obs || null,
        };
      });

      setDemandes(demandesAvecObs);
    };

    init();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#160b7c] mb-6">
          Historique des demandes
        </h2>

        {/* TABLEAU — INCHANGÉ */}
        <div className="w-full overflow-x-auto bg-white rounded-md p-4 shadow-md">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Priorité</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-left">Observation</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {demandes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Aucune demande disponible
                  </td>
                </tr>
              ) : (
                demandes.map((d) => {
                  const statut = d.statutDemande;

                  return (
                    <tr key={d.idDemande} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{d.typeDemande || "-"}</td>
                      <td className="px-4 py-2">{d.prioriteDemande || "-"}</td>

                      <td className="px-4 py-2 font-semibold">
                        {statut === "ACCEPTEE" ? (
                          <span className="text-green-600">Acceptée</span>
                        ) : statut === "REFUSEE" ? (
                          <span className="text-red-600">Refusée</span>
                        ) : (
                          <span className="text-gray-500">En attente</span>
                        )}
                      </td>

                      <td className="px-4 py-2 text-gray-600">
                        {statut === "ACCEPTEE"
                          ? "Demande acceptée"
                          : statut === "REFUSEE"
                          ? "Demande refusée"
                          : "—"}
                      </td>

                      <td className="px-4 py-2">
                        {d.dateDemande
                          ? new Date(d.dateDemande).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-4 py-2">
                        <button
                          onClick={() => setSelectedDemande(d)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Voir détails
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* DETAILS — AVEC MOTIF SOUS STATUT */}
        {selectedDemande && (
          <div className="mt-6 bg-white p-4 rounded shadow-md max-w-lg">
            <h3 className="text-lg font-bold mb-2">Détails de la demande</h3>

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

            <p>
              <strong>Statut :</strong> {selectedDemande.statutDemande}
            </p>

            {selectedDemande.statutDemande === "REFUSEE" && (
              <p className="text-red-600 mt-1">
                <strong>Motif de refus :</strong>{" "}
                {selectedDemande.motifRefus || "-"}
              </p>
            )}

            <button
              onClick={() => setSelectedDemande(null)}
              className="mt-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Fermer
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
