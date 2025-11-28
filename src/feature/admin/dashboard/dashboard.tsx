"use client";

import { IconUsers, IconClipboard, IconBuilding } from "@tabler/icons-react";
import { NavUser } from "@/components/dashboard/nav-users";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { employeService } from "@/feature/create-employe/service/create";
import { getUserInFo } from "@/feature/auth/services/login";
import { AfterConnect } from "@/feature/auth/entities/auth-entities";
import { fetchDemandes } from "@/feature/demande/service/demande-service"; // ton service de demandes

export default function DashboardPage() {
  const router = useRouter();
  const { departements } = useDepartements();

  const [nombreEmployes, setNombreEmployes] = useState(0);
  const [demandesEnAttente, setDemandesEnAttente] = useState(0);
  const [user, setUser] = useState<AfterConnect | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth");
      return;
    }

    async function loadEmployes() {
      try {
        const data = await employeService.getEmployes();
        setNombreEmployes(data.length);
      } catch (error) {
        console.error("Erreur chargement employés :", error);
      }
    }

    async function loadUser() {
      try {
        const data = await getUserInFo();
        setUser(data);
      } catch (error) {
        console.error("Erreur chargement utilisateur :", error);
      } finally {
        setLoadingUser(false);
      }
    }

    async function loadDemandes() {
      try {
        const allDemandes = await fetchDemandes();
        // filtrer uniquement celles "En attente"
        const enAttente = allDemandes.filter(
          (d: any) => d.statutDemande === "En attente"
        );
        setDemandesEnAttente(enAttente.length);
      } catch (error) {
        console.error("Erreur chargement demandes :", error);
      }
    }

    loadEmployes();
    loadUser();
    loadDemandes();
  }, [router]);

  const nombreDepartements = departements.length;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          {loadingUser ? (
            <p className="text-gray-600 mt-1">Chargement...</p>
          ) : user ? (
            <p className="text-black mt-1">
              Bienvenue,{" "}
              <strong>
                {user.nom} {user.prenom}
              </strong>
            </p>
          ) : (
            <p className="text-gray-600 mt-1">Utilisateur invité</p>
          )}
        </div>
        <NavUser />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
          <IconUsers size={32} className="text-indigo-600" />
          <div>
            <p className="text-gray-500 text-sm">Nombre d’employés</p>
            <p className="text-xl font-semibold">{nombreEmployes}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
          <IconClipboard size={32} className="text-yellow-600" />
          <div>
            <p className="text-gray-500 text-sm">Demandes en attente</p>
            <p className="text-xl font-semibold">{demandesEnAttente}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
          <IconBuilding size={32} className="text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Nombre de départements</p>
            <p className="text-xl font-semibold">{nombreDepartements}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
