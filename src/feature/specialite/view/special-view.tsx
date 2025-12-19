"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";

export default function SpecialiteView() {
  const router = useRouter();

  const { departements } = useDepartements();
  const { specialites, form, handleSubmit, handleEdit, handleDelete, loading } =
    useSpecialites();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c]">
        Gestion des Spécialités
      </h1>

      {/* ✅ Message vert */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md">
          {successMessage}
        </div>
      )}

      {/* FORMULAIRE */}
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await handleSubmit(data);
          setSuccessMessage("Spécialité créée avec succès ✅");

          setTimeout(() => setSuccessMessage(null), 3000);
        })}
        className="flex flex-col gap-4"
      >
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
              <option key={dep.idDepartement} value={dep.idDepartement}>
                {dep.nomDepartement}
              </option>
            ))}
          </select>
        </div>

        {/* Nom spécialité */}
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
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-[#160b7c] hover:bg-[#0f0660] text-white"
        >
          {loading ? "Chargement..." : "Créer"}
        </Button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
          <thead className="bg-[#160b7c] text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Département</th>
              <th className="px-4 py-2">Actions</th>
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
                  (d) => d.idDepartement === spec.idDepartement
                );

                return (
                  <tr
                    key={spec.idSpecialite}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      router.push(`/specialite-user?id=${spec.idSpecialite}`)
                    }
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{spec.nomSpecialite}</td>
                    <td className="px-4 py-2">
                      {dep?.nomDepartement || "Département inconnu"}
                    </td>
                    <td
                      className="px-4 py-2 flex gap-2"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          await handleDelete(spec.idSpecialite);
                          setSuccessMessage(
                            "Spécialité supprimée avec succès ✅"
                          );
                          setTimeout(() => setSuccessMessage(null), 3000);
                        }}
                      >
                        Supprimer
                      </Button>

                      <Button size="sm" onClick={() => handleEdit(spec)}>
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
