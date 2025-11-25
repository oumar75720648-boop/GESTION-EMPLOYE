"use client";

import React from "react";
import PageHeader from "@/feature/employe/header";

interface ListeDemandesProps {
  demandes: any[];
}

export default function ListeDemandes({ demandes }: ListeDemandesProps) {
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
                  Type de Demande
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Statut
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {demandes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Aucune demande
                  </td>
                </tr>
              ) : (
                demandes.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-800">{d.nom}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.prenom}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.type}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.date}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {d.statut}
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
