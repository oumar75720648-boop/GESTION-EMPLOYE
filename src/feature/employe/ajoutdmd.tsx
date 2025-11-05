"use client";

import { useState, useEffect } from "react";

export function NouvelleDemande() {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [departement, setDepartement] = useState("");
  const [priorite, setPriorite] = useState("");
  const [details, setDetails] = useState("");

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !date || !departement || !priorite) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const nouvelleDemande = {
      id: Date.now(),
      type,
      date,
      departement,
      priorite,
      details,
    };

  }

  return (
    <div className="flex flex-col items-center mt-8">
      
      <h2 className="text-xl font-semibold mb-6 text-center text-blackd">NOUVELLE DEMANDES</h2>

      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
       
        <h3 className="text-lg font-medium mb-6 text-center text-black">Entrer votre demande</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Type de demande
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-700"
            >
              <option value="">-- Sélectionnez un type --</option>
              <option>Demande de congé</option>
              <option>Demande d’autorisation d’absence</option>
              <option>Demande de matériel</option>
              <option>Demande de formation</option>
            </select>
          </div>

     
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-700"
            />
          </div>

        
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Département concerné
            </label>
            <select
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-700"
            >
              <option value="">-- Sélectionnez un département --</option>
              <option>Ressources Humaines</option>
              <option>Informatique</option>
              <option>Comptabilité</option>
              <option>Marketing</option>
            </select>
          </div>

          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Priorité</label>
            <select
              value={priorite}
              onChange={(e) => setPriorite(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-700"
            >
              <option value="">-- Choisissez la priorité --</option>
              <option>Urgent</option>
              <option>Normal</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Plus de détails (facultatif)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ajoutez des précisions si nécessaire..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-700"
              rows={3}
            />
          </div>

       
          <button
            type="submit"
            className="bg-blue-700 text-white w-full py-2 rounded-md hover:bg-blue-800 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
