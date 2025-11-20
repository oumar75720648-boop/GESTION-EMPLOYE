"use client";

import React, { useState } from "react";
import PageHeader from "@/feature/employe/header";
import AppSidebarAdmin from "@/components/dashboard/app-sidebaradmin";

export default function ListeDemandes() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen bg-gray-50">
     

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <PageHeader />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Header + recherche */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-[#160b7c]">
              Historique des Demandes
            </h2>

            <div className="w-full sm:w-64 relative">
              <input
                type="text"
                placeholder="Rechercher une demande..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#160b7c]"
              />
             
            </div>
          </div>

          {/* Tableau */}
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
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">&nbsp;</td>
                  <td className="px-4 py-2 text-sm text-gray-800">&nbsp;</td>
                  <td className="px-4 py-2 text-sm text-gray-800">&nbsp;</td>
                  <td className="px-4 py-2 text-sm text-gray-800">&nbsp;</td>
                  <td className="px-4 py-2 text-sm text-gray-800">&nbsp;</td>
                  <td className="px-4 py-2 text-sm text-gray-800">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
