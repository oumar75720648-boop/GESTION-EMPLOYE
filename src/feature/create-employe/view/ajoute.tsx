"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmployeForm } from "../hooks/use-employe";
import { useState } from "react";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";

export default function AjouterEmploye() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const { departements } = useDepartements();
  const { specialites } = useSpecialites();

  const {
    register,
    handleSubmit,
    action,
    pending,
    formState: { errors },
  } = useEmployeForm();

  const onError = (errors: any) => {
    console.log("Erreurs du formulaire :", errors);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow relative">
      <button
        onClick={() => router.push("/employe-list")}
        className="flex items-center gap-2 text-[#0a043c] hover:text-blue-800 absolute top-4 left-4"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Retour</span>
      </button>

      <h1 className="text-2xl font-bold mb-8 text-center text-[#0a043c]">
        Créer un Employé
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(action, onError)}>
        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            {...register("nom")}
            type="text"
            placeholder="Nom"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.nom && (
            <p className="text-red-500 text-sm">{errors.nom.message}</p>
          )}
        </div>

        {/* Prénom */}
        <div>
          <label className="block mb-1 font-medium">Prénom</label>
          <input
            {...register("prenom")}
            type="text"
            placeholder="Prénom"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm">{errors.prenom.message}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Contact</label>
          <input
            {...register("contact")}
            type="text"
            placeholder="Téléphone"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="relative">
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            {...register("motDePasse")}
            type={visible ? "text" : "password"}
            placeholder="Mot de passe"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute top-2 right-2 flex items-center p-1 bg-transparent text-gray-500"
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.motDePasse && (
            <p className="text-red-500 text-sm">{errors.motDePasse.message}</p>
          )}
        </div>

        {/* Département */}
        <div>
          <label className="block mb-1 font-medium">Département</label>
          <select
            {...register("departementId")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Sélectionnez un département --</option>
            {departements.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.nomDepartement}
              </option>
            ))}
          </select>
          {errors.departementId && (
            <p className="text-red-500 text-sm">
              {errors.departementId.message}
            </p>
          )}
        </div>

        {/* Spécialité */}
        <div>
          <label className="block mb-1 font-medium">Spécialité</label>
          <select
            {...register("specialiteId")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Sélectionnez une spécialité --</option>
            {specialites.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.nomSpecialite}
              </option>
            ))}
          </select>
          {errors.specialiteId && (
            <p className="text-red-500 text-sm">
              {errors.specialiteId.message}
            </p>
          )}
        </div>

        {/* Type Utilisateur */}
        <div>
          <label className="block mb-1 font-medium">Type Utilisateur</label>
          <select
            {...register("typeUtilisateurId")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="Admin">Administrateur</option>
            <option value="Employe">Employé</option>
            <option value="Secretaire">Secrétaire</option>
          </select>
          {errors.typeUtilisateurId && (
            <p className="text-red-500 text-sm">
              {errors.typeUtilisateurId.message}
            </p>
          )}
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
