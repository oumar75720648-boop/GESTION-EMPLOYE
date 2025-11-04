"use client";

import { useEffect, useState } from "react";
import { auth, Employe } from "@/feature/service/service-process";

export default function ContenuEmployes() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [form, setForm] = useState<Employe>({
    nom: "",
    prenom: "",
    contact: "",
    email: "",
    motPasse: "",
    departement: "",
    specialite: ""
  });

  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
    const data = await auth.GetEmployes();
    setEmployes(data);
  };

  const handleAddEmploye = async () => {
    await auth.AddEmploye(form);
    setForm({ nom: "", prenom: "", contact: "", email: "", motPasse: "", departement: "", specialite: "" });
    fetchEmployes();
    setShowForm(false);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-[#160b7c]">Gestion des employés</h2>

      {/* Boutons au-dessus du tableau */}
      <div className="flex gap-4 mb-4">
        <button
          className="bg-[#160b7c] text-white px-4 py-2 rounded hover:bg-blue-900"
          onClick={() => setShowForm(false)}
        >
          Liste des employés
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowForm(true)}
        >
          Ajouter un employé
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
          disabled
        >
          Supprimer
        </button>
      </div>

      {/* Tableau des employés */}
      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">Nom</th>
              <th className="p-2 border-b">Prénom</th>
              <th className="p-2 border-b">Contact</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">MotPasse</th>
              <th className="p-2 border-b">Département</th>
              <th className="p-2 border-b">Spécialité</th>
            </tr>
          </thead>
          <tbody>
            {employes.map(emp => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{emp.nom}</td>
                <td className="p-2 border-b">{emp.prenom}</td>
                <td className="p-2 border-b">{emp.contact}</td>
                <td className="p-2 border-b">{emp.email}</td>
                <td className="p-2 border-b">{emp.motPasse}</td>
                <td className="p-2 border-b">{emp.departement}</td>
                <td className="p-2 border-b">{emp.specialite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire Ajouter un employé */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Ajouter un employé</h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddEmploye();
            }}
            className="flex flex-col gap-4"
          >
            <input
              placeholder="Nom"
              value={form.nom}
              onChange={e => setForm({ ...form, nom: e.target.value })}
              className="border rounded p-2"
            />
            <input
              placeholder="Prénom"
              value={form.prenom}
              onChange={e => setForm({ ...form, prenom: e.target.value })}
              className="border rounded p-2"
            />
            <input
              placeholder="Contact"
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
              className="border rounded p-2"
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="border rounded p-2"
            />
            <input
              placeholder="Mot de passe"
              value={form.motPasse}
              onChange={e => setForm({ ...form, motPasse: e.target.value })}
              className="border rounded p-2"
            />
            <input
              placeholder="Département"
              value={form.departement}
              onChange={e => setForm({ ...form, departement: e.target.value })}
              className="border rounded p-2"
            />
            <input
              placeholder="Spécialité"
              value={form.specialite}
              onChange={e => setForm({ ...form, specialite: e.target.value })}
              className="border rounded p-2"
            />
            <button type="submit" className="bg-[#160b7c] text-white px-4 py-2 rounded hover:bg-blue-900">
              Ajouter / Modifier
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
