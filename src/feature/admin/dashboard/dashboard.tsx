"use client";

import { useEffect } from "react";
import {
  IconUsers,
  IconClipboard,
  IconBuilding,
  IconCertificate,
} from "@tabler/icons-react";
import { NavUser } from "@/components/dashboard/nav-users";
import { useQuery } from "@tanstack/react-query";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { employeService } from "@/feature/create-employe/service/create";
import { getUserInFo } from "@/feature/auth/services/login";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import { getSpecialites } from "@/feature/specialite/service/special-ser"; 
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { departements } = useDepartements();

  const { data: user } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInFo,
  });

  const { data: employes = [] } = useQuery({
    queryKey: ["employes"],
    queryFn: () => employeService.getEmployes(),
  });

  const { data: demandes = [] } = useQuery({
    queryKey: ["demandes"],
    queryFn: fetchDemandes,
  });

  const { data: specialites = [] } = useQuery({
    queryKey: ["specialites"],
    queryFn: getSpecialites,
  });

  useEffect(() => {
    if (!user) return;
    const role = user.role?.toUpperCase();
    if (role === "EMPLOYE") {
      router.replace("/demande-list");
    }
  }, [user, router]);

  if (!user) return null;

 const demandesEnAttente = demandes.filter(
   (d: { statutDemande: string }) => d.statutDemande === "En attente"
 ).length;


  const nombreDepartements = departements.length;
  const nombreSpecialites = specialites.length;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12">
   
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-black mt-1">
            Bienvenue,{" "}
            <strong>
              {user.nom} {user.prenom} 
            </strong>
          </p>
        </div>

        <NavUser />
      </div>

      {/* Grid 4 cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {/* Nombre d’employés */}
        <div className="bg-green-700 text-white p-6 rounded-lg flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <IconUsers size={32} className="text-white" />
            <div>
              <p className="text-sm opacity-80">Nombre d’employés</p>
              <p className="text-2xl font-bold">{employes.length}</p>
            </div>
          </div>
          <p className="text-xs mt-2 opacity-80">
            Total d’employés enregistrés
          </p>
        </div>

        {/* Demandes en attente */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <IconClipboard size={32} className="text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-800">Demandes en attente</p>
              <p className="text-2xl font-bold">{demandesEnAttente}</p>
            </div>
          </div>
          <p className="text-xs mt-2 text-yellow-600">Demandes à traiter</p>
        </div>

        {/* Nombre de départements */}
        <div className="bg-blue-100 p-6 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <IconBuilding size={32} className="text-blue-600" />
            <div>
              <p className="text-sm text-blue-800">Nombre de départements</p>
              <p className="text-2xl font-bold">{nombreDepartements}</p>
            </div>
          </div>
          <p className="text-xs mt-2 text-blue-600">Départements actifs</p>
        </div>

        {/* Nombre de spécialités */}
        <div className="bg-indigo-100 p-6 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <IconCertificate size={32} className="text-indigo-600" />
            <div>
              <p className="text-sm text-indigo-800">Nombre de spécialités</p>
              <p className="text-2xl font-bold">{nombreSpecialites}</p>
            </div>
          </div>
          <p className="text-xs mt-2 text-indigo-600">
            Spécialités disponibles
          </p>
        </div>
      </div>
    </div>
  );
}
