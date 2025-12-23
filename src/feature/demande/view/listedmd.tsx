"use client";

import { useState, useEffect } from "react";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import { useRouter } from "next/navigation";

export default function DemandesList() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadDemandes();
  }, []);

  const loadDemandes = async () => {
    setLoading(true);
    try {
      const data = await fetchDemandes();
      setDemandes(data);
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
                  <td className="px-4 py-2 break-words">
                    {d.utilisateur?.email || "-"}
                  </td>
                  <td className="px-4 py-2">{d.typeDemande || "-"}</td>
                  <td className="px-4 py-2">
                    {d.dateDemande
                      ? new Date(d.dateDemande).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        router.push(`/info-dmmd?idDemande=${d.idDemande}`)
                      }
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
    </div>
  );
}
