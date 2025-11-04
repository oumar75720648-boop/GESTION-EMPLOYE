"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/(protected)/app-sidebar";
import PageHeader from "@/feature/employe/demande/header";

export default function ListeDemandes() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-screen bg-white w-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Contenu principal */}
      <div className="flex-1 ml-0 md:ml-64 flex flex-col w-screen">
        <PageHeader />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* En-tête : Titre + Recherche */}
          <div className="flex items-center justify-between mb-6 -ml-6">
            <h2 className="text-2xl font-bold text-[#160b7c]">
              Historique des Demandes
            </h2>

            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une demande..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#160b7c]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                />
              </svg>
            </div>
          </div>

          {/* Tableau vide */}
          <div className="w-full overflow-x-auto bg-white rounded-md p-4 shadow-md -ml-6">
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
