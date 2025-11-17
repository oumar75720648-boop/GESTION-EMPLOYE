"use client";

import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";

export default function ListeDepartements() {
  const { departements, form, handleSubmit, loading, error } =
    useDepartements();

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c]">
        Liste des Départements
      </h1>

      {/* Formulaire de création */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <input
          type="text"
          placeholder="Nom du département"
          {...form.register("nomDepartement")}
          className="border px-3 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-[#160b7c]"
        />
        <Button
          type="submit"
          className="px-4 py-2 rounded-lg bg-[#160b7c] hover:bg-[#0f0660] text-white"
          disabled={loading}
        >
          Créer
        </Button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {/* Tableau des départements */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
          <thead className="bg-[#160b7c] text-white">
            <tr>
              <th className="px-4 py-2 text-left w-1/6">#</th>
              <th className="px-4 py-2 text-left w-5/6">Nom du Département</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departements.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-4 text-center text-gray-500">
                  Aucun département
                </td>
              </tr>
            ) : (
              departements.map((dept, index) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{dept.nomDepartement}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
