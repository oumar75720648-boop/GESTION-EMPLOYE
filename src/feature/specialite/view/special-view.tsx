"use client";

import { Button } from "@/components/ui/button";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";
import { useDepartements } from "@/feature/departement/hooks/use-depart";

export default function SpecialiteView() {
  const { departements } = useDepartements(); // Departements existants
  const {
    specialites,
    form,
    handleSubmit,
    handleEdit,
    editId,
    loading,
    error,
  } = useSpecialites();

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c]">
        Gestion des Spécialités
      </h1>

      {/* Formulaire Création / Modification */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Sélection du Département */}
        <div className="flex flex-col gap-1">
          <label htmlFor="departement" className="font-medium">
            Département
          </label>
          <select
            id="departement"
            {...form.register("idDepartement")}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#160b7c]"
          >
            <option value={0}>Choisir un département</option>
            {departements.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.nomDepartement}
              </option>
            ))}
          </select>
          {form.formState.errors.idDepartement && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.idDepartement?.message}
            </p>
          )}
        </div>

        {/* Nom de la spécialité */}
        <div className="flex flex-col gap-1">
          <label htmlFor="specialite" className="font-medium">
            Nom de la spécialité
          </label>
          <input
            id="specialite"
            type="text"
            placeholder="Nom de la spécialité"
            {...form.register("nomSpecialite")}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#160b7c]"
          />
          {form.formState.errors.nomSpecialite && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.nomSpecialite?.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className={`px-4 py-2 rounded-lg ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-[#160b7c] hover:bg-[#0f0660]"
          } text-white`}
          disabled={loading}
        >
          {editId ? "Modifier" : "Créer"}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-600">Chargement...</p>}
      </form>

      {/* Tableau des spécialités */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
          <thead className="bg-[#160b7c] text-white">
            <tr>
              <th className="px-4 py-2 text-left w-1/12">#</th>
              <th className="px-4 py-2 text-left w-3/12">Nom</th>
              <th className="px-4 py-2 text-left w-4/12">Département</th>
              <th className="px-4 py-2 text-left w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {specialites.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  Aucune spécialité enregistrée
                </td>
              </tr>
            ) : (
              specialites.map((spec, index) => {
                const dep = departements.find(
                  (d) => d.id === spec.idDepartement
                );
                return (
                  <tr key={spec.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{spec.nomSpecialite}</td>
                    <td className="px-4 py-2">
                      {dep?.nomDepartement || "Département inconnu"}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        onClick={() => handleEdit(spec)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Modifier
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
