"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ListeEmployes() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start min-h-[70vh] w-full p-6 bg-gray-50">
    
      <div className="flex w-full max-w-6xl justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#160b7c]">Gestion Employés</h1>

      
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Rechercher un employé..."
            className="w-64 border-gray-300 focus:ring-[#160b7c] focus:border-[#160b7c]"
          />
          <Button className="bg-[#160b7c] hover:bg-[#0f0660] text-white px-4 py-2 rounded-lg">
            Rechercher
          </Button>
        </div>
      </div>

      <div className="flex w-full max-w-6xl justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#160b7c]">
          Liste des employés
        </h2>

        <Button
          onClick={() => router.push("/ajoute-employe")}
          className="bg-[#160b7c] hover:bg-[#0f0660] text-white px-4 py-2 rounded-lg shadow"
        >
          + Ajouter un employé
        </Button>
      </div>

   
      <div className="w-full max-w-6xl overflow-x-auto bg-white rounded-md p-4 shadow-md">
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
                Contact
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Département
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Spécialité
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Actions
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
              <td className="px-4 py-2 text-center">
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          </tbody>
        </table>

       
      </div>
    </div>
  );
}
