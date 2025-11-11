"use client";

import { useState } from "react";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { Button } from "@/components/ui/button";

export default function DepartementView() {
  const { departements, loading, error, addDepartement, deleteDepartement } =
    useDepartements();
  const [newNom, setNewNom] = useState("");

  const handleAdd = () => {
    addDepartement(newNom);
    setNewNom("");
  };

  if (loading) return <p>Chargement des départements...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des Départements
      </h1>

      {/* Liste des départements */}
      <ul className="mb-6">
        {departements.map((dep) => (
          <li
            key={dep.nomDepartement}
            className="flex justify-between items-center py-2 border-b"
          >
            <span>{dep.nomDepartement}</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteDepartement(dep.nomDepartement)}
            >
              Supprimer
            </Button>
          </li>
        ))}
      </ul>

      {/* Ajouter un département */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nom du nouveau département"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <Button onClick={handleAdd} disabled={!newNom.trim()}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}
