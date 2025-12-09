"use client";

import { useState, useEffect } from "react";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import { createObservation } from "@/feature/observation/service/obserr";

export default function DemandesList() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchDemandes();
    setDemandes(data);
  };

  const handleAction = async (
    demandeId: number,
    statut: "ACCEPTEE" | "REFUSEE"
  ) => {
    setLoading(true);
    try {
      await createObservation({ demandeId, statut, conces: "" });
      await load();
      setSelectedDemande(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#160b7c] mb-6">
        Gestion des Demandes
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-md divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Prénom</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          {/* chat*/}
          <tbody className="divide-y divide-gray-200">
            {demandes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  Aucune demande disponible
                </td>
              </tr>
            ) : (
              demandes.map((d) => (
                <tr key={d.idDemande} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{d.utilisateur?.nom || "-"}</td>
                  <td className="px-4 py-2">{d.utilisateur?.prenom || "-"}</td>
                  <td className="px-4 py-2">{d.utilisateur?.email || "-"}</td>
                  <td className="px-4 py-2">{d.typeDemande || "-"}</td>
                  <td className="px-4 py-2">
                    {d.dateDemande
                      ? new Date(d.dateDemande).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-4 py-2 flex items-center justify-center gap-2">
                    <button
                      disabled={loading}
                      onClick={() => handleAction(d.idDemande, "ACCEPTEE")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      Accepter
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => handleAction(d.idDemande, "REFUSEE")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Refuser
                    </button>

                    <button
                      onClick={() => setSelectedDemande(d)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedDemande && (
        <div className="mt-6 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Détails de la demande</h2>
          <p>
            <strong>Nom :</strong> {selectedDemande.utilisateur?.nom}
          </p>
          <p>
            <strong>Prénom :</strong> {selectedDemande.utilisateur?.prenom}
          </p>
          <p>
            <strong>Email :</strong> {selectedDemande.utilisateur?.email}
          </p>
          <p>
            <strong>Type :</strong> {selectedDemande.typeDemande}
          </p>
          <p>
            <strong>Date :</strong>{" "}
            {new Date(selectedDemande.dateDemande).toLocaleDateString()}
          </p>
          <p>
            <strong>Description :</strong> {selectedDemande.description || "-"}
          </p>
          <button
            onClick={() => setSelectedDemande(null)}
            className="mt-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
