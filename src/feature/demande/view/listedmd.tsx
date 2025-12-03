"use client";

import { useState, useEffect } from "react";
import { fetchDemandes } from "@/feature/demande/service/demande-service";

export default function DemandesList() {
  const [demandes, setDemandes] = useState<any[]>([]);

  useEffect(() => {
    fetchDemandes().then(setDemandes);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#160b7c] mb-4">
        Gestion des Demandes
      </h1>
      <table className="min-w-full bg-white rounded-md shadow-md divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prénom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {demandes.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
