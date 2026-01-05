"use client";

import React, { useState, useEffect } from "react";
import { getUserInFo } from "@/feature/auth/services/login";
import { createDemande } from "../service/demande-service";
import { DemandePayload } from "../entities/demande-entites";
import { User } from "@/feature/auth/entities/auth-entities";

export default function FormulaireDemandeSimple() {
  const today = new Date().toISOString().split("T")[0];
  const [type, setType] = useState("");
  const [priorite, setPriorite] = useState("Normale");
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserInFo();
      setUser(data);
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!type || !description || !user) {
      return; 
    }

    const payload: Omit<DemandePayload, "id"> = {
      typeDemande: type,
      description,
      statutDemande: "En attente",
      prioriteDemande: priorite,
      dateDemande: date + "T00:00:00",
      utilisateurId: user.id,
      observation: undefined,
      idDemande: undefined,
      utilisateur: undefined,
    };

    try {
      setPending(true);
      await createDemande(payload);
      setSuccessMessage("✅ Demande envoyée !");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col p-4 max-w-lg mx-auto bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-[#160b7c] text-center">
        Nouvelle demande
      </h2>

      {successMessage && (
        <div className="p-2 text-green-800 bg-green-100 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">Type de demande</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
            <option>Congé annuel</option>
            <option>Autorisation d’absence</option>
            <option>Matériel</option>
            <option>Réparation / maintenance</option>
            <option>Formation</option>
            <option>Remboursement frais</option>
            <option>Accès outil</option>
            <option>Autre</option>
            <option>Changement de poste</option>
            <option>Demande de télétravail</option>
            <option>Demande de véhicule de fonction</option>
            <option>Demande de badge / accès bâtiment</option>
            <option>Demande de prime ou bonus</option>
            <option>Demande d’hébergement ou voyage</option>
            <option>Demande de matériel informatique spécifique</option>
            <option>Demande de promotion interne</option>
            <option>Demande de formation externe</option>
            <option>Demande de congé exceptionnel</option>
            <option>Demande de remplacement temporaire</option>
            <option>Demande de remboursement transport</option>
            <option>Demande de remboursement repas</option>
            <option>Demande de matériel ergonomique</option>
            <option>Demande de support technique</option>
            <option>Demande de réunion / salle</option>
            <option>Demande de modification planning</option>
            <option>Demande de prime annuelle</option>
            <option>Demande de participation à un projet spécial</option>
            <option>Demande d’accès à un logiciel spécifique</option>
            <option>Demande de badge visiteur</option>
            <option>Demande de véhicule temporaire</option>
            <option>Autre demande administrative</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Priorité</label>
          <select
            value={priorite}
            onChange={(e) => setPriorite(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option>Normale</option>
            <option>Urgente</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full px-4 py-2 rounded-md text-white bg-[#160b7c] hover:bg-blue-900"
        >
          {pending ? "Envoi..." : "Envoyer la demande"}
        </button>
      </form>
    </div>
  );
}
