"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "../hooks/use-employe";

export default function AjouterEmploye() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    handleSubmitForm,
    pending,
    formState: { errors },
  } = useLoginForm();

  const onError = (err: any) => {
    console.log("Erreur formulaire :", err);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow relative">
      <button
        onClick={() => router.push("/liste-employe")}
        className="flex items-center gap-2 text-[#0a043c] hover:text-blue-800 absolute top-4 left-4"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Retour</span>
      </button>

      {/* Titre */}
      <h1 className="text-2xl font-bold mb-8 text-center text-[#0a043c]">
        Créer un Employé
      </h1>

      {/* Formulaire */}
      <form
        className="space-y-4"
        onSubmit={handleSubmit(handleSubmitForm, onError)}
      >
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
        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            {...register("motDePasse")}
            type="password"
            placeholder="Mot de passe"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
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
            <option value="RH">Ressources Humaines</option>
            <option value="Info">Informatique</option>
            <option value="Compta">Comptabilité</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Spécialité */}
        <div>
          <label className="block mb-1 font-medium">Spécialité</label>
          <select
            {...register("specialiteId")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Sélectionnez une spécialité --</option>
            <option value="Dev">Développement</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
          </select>
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
        </div>

        {/* Bouton Submit */}
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
