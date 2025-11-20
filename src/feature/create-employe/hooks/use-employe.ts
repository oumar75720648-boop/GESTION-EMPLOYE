"use client";

import { useState } from "react";
import { CreateEmployePayload } from "../entites/employe-end";
import { createEmploye, getEmployes } from "../service/create";

export function useEmploye() {
  const [pending, setPending] = useState(false);
  const [employes, setEmployes] = useState<any[]>([]); // stocke la liste des employés

  // Création d'un employé (POST)
  async function action(data: any) {
    try {
      setPending(true);

      const payload: CreateEmployePayload = {
        nom: data.nom,
        prenom: data.prenom,
        contact: data.contact,
        email: data.email,
        motDePasse: data.motDePasse,
        departementId: Number(data.departementId) || 0,
        specialiteId: Number(data.specialiteId) || 0,
        typeUtilisateurId: Number(data.typeUtilisateurId),
      };

      const res = await createEmploye(payload);
      alert(`Employé ${res.nom} créé avec succès !`);

      // Mettre à jour la liste après création
      await loadEmployes();
    } catch (error) {
      console.error("Erreur création employé :", error);
      alert("Erreur lors de la création");
    } finally {
      setPending(false);
    }
  }

  // Récupérer tous les employés (GET)
  async function loadEmployes() {
    try {
      const data = await getEmployes();
      setEmployes(data);
    } catch (error) {
      console.error("Erreur récupération employés :", error);
    }
  }

  return { action, pending, employes, loadEmployes };
}
