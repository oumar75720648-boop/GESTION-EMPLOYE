"use client";

import { useState } from "react";

export default function FormulaireDemande() {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [departement, setDepartement] = useState("");
  const [priorite, setPriorite] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !date || !departement || !priorite) return;

    alert("Demande envoyée avec succès !");
    setType("");
    setDate("");
    setDepartement("");
    setPriorite("");
    setDetails("");
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de demande</label>
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

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de la demande</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Département concerné</label>
          <select
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
            required
          >
            <option value="">-- Sélectionnez un département --</option>
            <option>Ressources Humaines</option>
            <option>Informatique</option>
            <option>Comptabilité / Finance</option>
            <option>Logistique</option>
            <option>Marketing</option>
          </select>
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
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

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plus de détails</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Expliquez votre demande en détail..."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#160b7c]"
            rows={4}
          ></textarea>
        </div>

      
        <button
          type="submit"
          className="bg-[#160b7c] text-white px-5 py-2 rounded-md w-full hover:bg-blue-900 transition-all"
        >
          Envoyer la demande
        </button>
      </form>
    </div>
  );
}
