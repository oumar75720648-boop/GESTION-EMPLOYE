"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Icône de flèche (lucide-react est dispo avec shadcn/ui)

export default function AjouterEmploye() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [departement, setDepartement] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [typeEmploye, setTypeEmploye] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      nom,
      prenom,
      contact,
      email,
      motDePasse,
      departement,
      specialite,
      typeEmploye,
    };

    console.log("Employé ajouté :", formData);
    alert("Employé ajouté avec succès !");

  
    setNom("");
    setPrenom("");
    setContact("");
    setEmail("");
    setMotDePasse("");
    setDepartement("");
    setSpecialite("");
    setTypeEmploye("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow relative">
      {/* Bouton retour */}
      <button
        onClick={() => router.push("/guest/liste-employe")}
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Le nom doit contenir uniquement des lettres"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Le prénom doit contenir uniquement des lettres"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            pattern="\d+"
            title="Le contact doit contenir uniquement des chiffres"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Département</label>
          <select
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Sélectionnez un département --</option>
            <option>Ressources Humaines</option>
            <option>Informatique</option>
            <option>Comptabilité</option>
            <option>Marketing</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Spécialité</label>
          <select
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Sélectionnez une spécialité --</option>
            <option value="Développement">Développement</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Type d'employé</label>
          <select
            value={typeEmploye}
            onChange={(e) => setTypeEmploye(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="Administrateur">Administrateur</option>
            <option value="Employé">Employé</option>
            <option value="Secrétaire">Secrétaire</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0a043c] text-white font-bold py-2 px-4 rounded hover:bg-blue-900 transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
