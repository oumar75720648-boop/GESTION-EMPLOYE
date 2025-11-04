export type Employe = {
  id?: number;
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  motPasse: string;
  departement: string;
  specialite: string;
};

// --- Récupérer tous les employés ---
export async function GetEmployes() {
  const res = await fetch("http://127.0.0.1:8080/employes", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Erreur lors de la récupération des employés");
  return res.json();
}

// --- Ajouter un employé ---
export async function AddEmploye(employe: Employe) {
  const res = await fetch("http://127.0.0.1:8080/employes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employe),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout de l'employé");
  return res.json();
}

export const auth = { GetEmployes, AddEmploye };
