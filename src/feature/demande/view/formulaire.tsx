"use client";

import React, { useState, useEffect } from "react";
import ListeDemandes from "@/feature/demande/view/liste";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { getUserInFo } from "@/feature/auth/services/login";

export default function GestionDemandes() {
  const today = new Date().toISOString().split("T")[0];
  const [type, setType] = useState("");
  const [date, setDate] = useState(today);
  const [departement, setDepartement] = useState("");
  const [priorite, setPriorite] = useState("");
  const [details, setDetails] = useState("");
  const [demandes, setDemandes] = useState<any[]>([]);
  const [user, setUser] = useState<any | null>(null);

  const { departements } = useDepartements();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserInFo();
        setUser(data);
      } catch (error) {
        console.error("Erreur récupération utilisateur:", error);
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !date || !departement || !priorite || !user) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const nouvelleDemande = {
      id: Date.now(),
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      type,
      date,
      departement,
      priorite,
      details,
      statut: "En attente",
    };

    setDemandes([nouvelleDemande, ...demandes]);

    setType("");
    setDate(today);
    setDepartement("");
    setPriorite("");
    setDetails("");
  };

  if (!user) return <div>Chargement de l'utilisateur...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-[#160b7c] mb-6">
          Créer une nouvelle demande
        </h2>

        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type de demande */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de demande
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
                required
              >
                <option value="">-- Sélectionnez un type --</option>
                <option>Demande de congé</option>
                <option>Demande d’autorisation d’absence</option>
                <option>Demande de matériel</option>
                <option>Demande de réparation / maintenance</option>
                <option>Demande de formation</option>
                <option>Demande de remboursement de frais</option>
                <option>Demande d’accès à un outil</option>
                <option>Autre demande administrative</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de la demande
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
                required
              />
            </div>

            {/* Département */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Département concerné
              </label>
              <select
                value={departement}
                onChange={(e) => setDepartement(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
                required
              >
                <option value="">-- Sélectionnez un département --</option>
                {departements.map((dep: any) => (
                  <option key={dep.id} value={dep.nomDepartement}>
                    {dep.nomDepartement}
                  </option>
                ))}
              </select>
            </div>

            {/* Priorité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priorité
              </label>
              <select
                value={priorite}
                onChange={(e) => setPriorite(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
                required
              >
                <option value="">-- Choisissez la priorité --</option>
                <option>Urgent</option>
                <option>Normal</option>
              </select>
            </div>

            {/* Détails */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plus de détails
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Expliquez votre demande en détail..."
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="bg-[#160b7c] text-white px-5 py-2 rounded-md w-full hover:bg-blue-900 transition-all"
            >
              Envoyer la demande
            </button>
          </form>
        </div>

        <ListeDemandes demandes={demandes} />
      </div>
    </div>
  );
}
