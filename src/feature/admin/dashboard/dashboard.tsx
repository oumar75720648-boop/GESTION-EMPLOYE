"use client";

import { IconUsers, IconClipboard, IconBuilding } from "@tabler/icons-react";
import { NavUser } from "@/components/dashboard/nav-users";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { employeService } from "@/feature/create-employe/service/create";
import { getUserInFo } from "@/feature/auth/services/login";
import { fetchDemandes } from "@/feature/demande/service/demande-service";

export default function DashboardPage() {
  const router = useRouter();
  const { departements } = useDepartements();

  const { data: employes = [], isLoading: loadingEmployes } = useQuery({
    queryKey: ["employes"],
    queryFn: () => employeService.getEmployes(),
  });


  const { data: demandes = [], isLoading: loadingDemandes } = useQuery({
    queryKey: ["demandes"],
    queryFn: fetchDemandes,
  });

  const demandesEnAttente = demandes.filter(
    (d: any) => d.statutDemande === "En attente"
  ).length;


  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInFo,
  });

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/auth");
  }

  const nombreDepartements = departements.length;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Titre */}
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

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {/* Employés */}
        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
          <IconUsers size={32} className="text-indigo-600" />
          <div>
            <p className="text-gray-500 text-sm">Nombre d’employés</p>
            <p className="text-xl font-semibold">
              {loadingEmployes ? "..." : employes.length}
            </p>
          </div>
        </div>

        {/* Demandes */}
        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
          <IconClipboard size={32} className="text-yellow-600" />
          <div>
            <p className="text-gray-500 text-sm">Demandes en attente</p>
            <p className="text-xl font-semibold">
              {loadingDemandes ? "..." : demandesEnAttente}
            </p>
          </div>
        </div>

        {/* Départements */}
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
