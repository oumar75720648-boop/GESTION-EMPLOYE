"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";
import { useEmploye } from "../hooks/use-employe";
import { EmployeFormData } from "../entites/employe-end";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AjouterEmploye() {
  const { departements } = useDepartements();
  const { specialites } = useSpecialites();
  const { action, pending } = useEmploye(); // plus error
  const [visible, setVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, reset } = useForm<EmployeFormData>({
    defaultValues: {
      nom: "",
      prenom: "",
      contact: "",
      email: "",
      motDePasse: "",
      departementId: null,
      specialiteId: null,
      typeUtilisateurId: null,
    },
  });

  const onSubmit = async (data: EmployeFormData) => {
    const result = await action(data);
    if (result) {
      setSuccessMessage("Utilisateur créé avec succès !");
      reset();
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-xl sm:max-w-2xl mx-auto mt-10 p-6 sm:p-8 bg-white rounded shadow">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-[#0a043c]">
        Créer un Employé
      </h1>

      {successMessage && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nom & Prénom */}
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
            type="number"
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
        <div className="relative w-full">
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type={visible ? "text" : "password"}
            placeholder="Mot de passe"
            {...register("motDePasse")}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute inset-y-11 right-2 flex items-center p-1 text-gray-500"
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
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

        {/* Type Utilisateur */}
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
