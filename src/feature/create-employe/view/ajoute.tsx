"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";
import { useEmploye } from "../hooks/use-employe";
import { EmployeFormData } from "../entites/employe-end";

export default function AjouterEmploye() {
  const { departements } = useDepartements();
  const { specialites } = useSpecialites();
  const { action, pending, error } = useEmploye();

  const { register, handleSubmit, reset } = useForm<EmployeFormData>({
    defaultValues: {
      nom: "",
      prenom: "",
      contact: "",
      email: "",
      motDePasse: "",
      departementId: null,
      specialiteId: null,
      typeUtilisateurId: null, // bien en number | null
    },
  });

  const onSubmit = async (data: EmployeFormData) => {
    await action(data);
    reset();
  };

  return (
    <div className="max-w-xl sm:max-w-2xl mx-auto mt-10 p-6 sm:p-8 bg-white rounded shadow">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-[#0a043c]">
        Créer un Employé
      </h1>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nom / Prénom */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Nom</label>
            <input
              type="text"
              placeholder="Nom"
              {...register("nom")}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium">Prénom</label>
            <input
              type="text"
              placeholder="Prénom"
              {...register("prenom")}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Contact</label>
          <input
            type="text"
            placeholder="Téléphone"
            {...register("contact")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            {...register("motDePasse")}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            minLength={6}
          />
        </div>

        {/* Département */}
        <div>
          <label className="block mb-1 font-medium">Département</label>
          <select
            {...register("departementId", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Sélectionnez un département --</option>
            {departements.map((dep) => (
              <option key={dep.idDepartement} value={dep.idDepartement}>
                {dep.nomDepartement}
              </option>
            ))}
          </select>
        </div>

        {/* Spécialité */}
        <div>
          <label className="block mb-1 font-medium">Spécialité</label>
          <select
            {...register("specialiteId", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Sélectionnez une spécialité --</option>
            {specialites.map((spec) => (
              <option key={spec.idSpecialite} value={spec.idSpecialite}>
                {spec.nomSpecialite}
              </option>
            ))}
          </select>
        </div>

        {/* Type utilisateur */}
        <div>
          <label className="block mb-1 font-medium">Type Utilisateur</label>
          <select
            {...register("typeUtilisateurId", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value={2}>Administrateur</option>
            <option value={3}>Employé</option>
          </select>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#0a043c] text-white font-bold py-2 px-4 rounded hover:bg-blue-900 transition"
          disabled={pending}
        >
          {pending ? "Création..." : "Ajouter"}
        </Button>
      </form>
    </div>
  );
}
