"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function DemandeListe() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen w-full">
      {/* Titre + recherche */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold text-[#160b7c]">Liste des demandes</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Rechercher une demande..."
            className="w-64 border-gray-300"
          />
          <Button className="bg-[#160b7c] hover:bg-[#0f0660] text-white px-4 py-2 rounded-lg">
            Rechercher
          </Button>
        </div>
      </div>

      {/* Tableau */}
      <div className="w-full max-w-6xl overflow-x-auto bg-white rounded-md p-4 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nom</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prénom</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type de demande</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Statut</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
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
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                    
                  >
                    Accepter
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                    
                  >
                    Refuser
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
