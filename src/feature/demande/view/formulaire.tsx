"use client";

import React, { useState, useEffect } from "react";
import { getUserInFo } from "@/feature/auth/services/login";
import { createDemande } from "../service/demande-service";
import { DemandePayload } from "../entities/demande-entites";

export default function FormulaireDemandeSimple() {
  const today = new Date().toISOString().split("T")[0];
  const [type, setType] = useState("");
  const [priorite, setPriorite] = useState("Normale");
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<any | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserInFo();
      setUser(data);
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description || !user) {
      return alert("Veuillez remplir tous les champs.");
    }

    const payload: Omit<DemandePayload, "id"> = {
      typeDemande: type,
      description,
      statutDemande: "En attente",
      prioriteDemande: priorite,
      dateDemande: date + "T00:00:00",
      utilisateurId: user.id,
    };

    try {
      setPending(true);
      await createDemande(payload); // Appel direct au service
      alert("Demande envoyée avec succès !");
      // Reset du formulaire
      setType("");
      setPriorite("Normale");
      setDate(today);
      setDescription("");
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("Erreur lors de l'envoi de la demande.");
    } finally {
      setPending(false);
    }
  };

  if (!user) return <div>Chargement utilisateur...</div>;

  return (
    <div className="flex flex-col p-4 max-w-lg mx-auto bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-[#160b7c] text-center">
        Nouvelle demande
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">Type de demande</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">-- Sélectionnez un type --</option>
            <option>Congé annuel</option>
            <option>Autorisation d’absence</option>
            <option>Matériel</option>
            <option>Réparation / maintenance</option>
            <option>Formation</option>
            <option>Remboursement frais</option>
            <option>Accès outil</option>
            <option>Autre</option>
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
