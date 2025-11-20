"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmploye } from "../hooks/use-employe";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";

export default function AjouterEmploye() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const { departements } = useDepartements();
  const { specialites } = useSpecialites();
  const { action, pending } = useEmploye();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    contact: "",
    email: "",
    motDePasse: "",
    departementId: "",
    specialiteId: "",
    typeUtilisateurId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.motDePasse
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    action(formData);
  };

  return (
    <div className="max-w-xl sm:max-w-2xl mx-auto mt-10 p-6 sm:p-8 bg-white rounded shadow relative">
      <button
        onClick={() => router.push("/employe-list")}
        className="flex items-center gap-2 text-[#0a043c] hover:text-blue-800 absolute top-4 left-4"
      >
        {" "}
        <ArrowLeft size={20} /> <span className="font-medium">Retour</span>{" "}
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-[#0a043c]">
        Créer un Employé
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nom et Prénom en flex responsive */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="nom" className="block mb-1 font-medium">
              Nom
            </label>
            <input
              id="nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nom: e.target.value }))
              }
              type="text"
              placeholder="Nom"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="prenom" className="block mb-1 font-medium">
              Prénom
            </label>
            <input
              id="prenom"
              value={formData.prenom}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, prenom: e.target.value }))
              }
              type="text"
              placeholder="Prénom"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label htmlFor="contact" className="block mb-1 font-medium">
            Contact
          </label>
          <input
            id="contact"
            value={formData.contact}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contact: e.target.value }))
            }
            type="text"
            placeholder="Téléphone"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Mot de passe */}
        <div className="relative">
          <label htmlFor="motDePasse" className="block mb-1 font-medium">
            Mot de passe
          </label>
          <input
            id="motDePasse"
            value={formData.motDePasse}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, motDePasse: e.target.value }))
            }
            type={visible ? "text" : "password"}
            placeholder="Mot de passe"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute top-2 right-2 p-1 bg-transparent text-gray-500"
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Département et Spécialité en flex responsive */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="departementId" className="block mb-1 font-medium">
              Département
            </label>
            <select
              id="departementId"
              value={formData.departementId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  departementId: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Sélectionnez un département --</option>
              {departements.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nomDepartement}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="specialiteId" className="block mb-1 font-medium">
              Spécialité
            </label>
            <select
              id="specialiteId"
              value={formData.specialiteId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  specialiteId: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Sélectionnez une spécialité --</option>
              {specialites.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.nomSpecialite}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type Utilisateur */}
        <div>
          <label htmlFor="typeUtilisateurId" className="block mb-1 font-medium">
            Type Utilisateur
          </label>
          <select
            id="typeUtilisateurId"
            value={formData.typeUtilisateurId}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                typeUtilisateurId: e.target.value,
              }))
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="1">Administrateur</option>
            <option value="2">Employé</option>
            <option value="3">Secrétaire</option>
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
