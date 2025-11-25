"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { specialiteService } from "@/feature/specialite/service/special-ser";
import { useForm } from "react-hook-form";

export interface Specialite {
  idSpecialite: number;
  nomSpecialite: string;
  idDepartement: number;
}

export default function SpecialiteView() {
  const { departements } = useDepartements();
  const [specialites, setSpecialites] = useState<Specialite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<{ nomSpecialite: string; idDepartement: string }>({
    defaultValues: { nomSpecialite: "", idDepartement: "0" },
  });

  // Charger les spécialités au montage
  useEffect(() => {
    async function loadSpecialites() {
      setLoading(true);
      try {
        const data = await specialiteService.getSpecialites();
        setSpecialites(data);
      } catch (err) {
        setError("Impossible de charger les spécialités");
      } finally {
        setLoading(false);
      }
    }
    loadSpecialites();
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (values: {
    nomSpecialite: string;
    idDepartement: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        nomSpecialite: values.nomSpecialite,
        idDepartement: Number(values.idDepartement),
      };

      const newSpec = await specialiteService.createSpecialite(
        payload.nomSpecialite,
        payload.idDepartement
      );

      setSpecialites((prev) => [...prev, newSpec]);
      form.reset({ nomSpecialite: "", idDepartement: "0" });
    } catch (err) {
      console.error(err);
      setError("Impossible de créer la spécialité");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-[#160b7c]">
        Gestion des Spécialités
      </h1>

      {/* Formulaire Création */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
            <option value="0">Choisir un département</option>
            {departements.map((dep) => (
              <option key={dep.idDepartement} value={dep.idDepartement}>
                {dep.nomDepartement}
              </option>
            ))}
          </select>
        </div>

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
          className="bg-[#160b7c] hover:bg-[#0f0660] text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Création..." : "Créer"}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
      </form>

      {/* Tableau des spécialités */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow rounded-md divide-y divide-gray-200">
          <thead className="bg-[#160b7c] text-white">
            <tr>
              <th className="px-4 py-2 text-left w-1/12">#</th>
              <th className="px-4 py-2 text-left w-3/12">Nom</th>
              <th className="px-4 py-2 text-left w-4/12">Département</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {specialites.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  Aucune spécialité enregistrée
                </td>
              </tr>
            ) : (
              specialites.map((spec, index) => {
                const dep = departements.find(
                  (d) => d.idDepartement === spec.idDepartement
                );
                return (
                  <tr key={spec.idSpecialite} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{spec.nomSpecialite}</td>
                    <td className="px-4 py-2">
                      {dep?.nomDepartement || "Département inconnu"}
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
