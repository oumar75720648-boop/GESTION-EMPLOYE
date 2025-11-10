"use client";

import { IconUsers, IconClipboard, IconBuilding } from "@tabler/icons-react";
import { NavUser } from "@/components/dashboard/nav-users";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { getUserInFo } from "@/feature/auth/services/login";
import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const nombreEmployes = 0;
  const demandesEnAttente = 0;
  const nombreDepartements = 0;

  /**
   * @Message Vérification de l'authentification de l'utilisateur
   * @description Cette fonction utilise useEffect pour vérifier si un jeton d'accès est présent dans le stockage local.
   * Si le jeton n'est pas trouvé, l'utilisateur est redirigé vers la page de connexion.
   * Ceci garantit que seules les utilisateurs authentifiés peuvent accéder au tableau de bord.
   * @author KONE HADOU
   * @date 08-11-2025 19:53
   */
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return redirect('/auth');
    }
  }, []);

  const { data : userMe = {} as any } = useQuery({
    queryKey:["userMe"],
    queryFn: () =>  getUserInFo()
  });

  console.log(userMe)  

  const adminUser = {
    name: "TRAORE OUMAR",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <div className="flex flex-col gap-6">
     
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Bienvenue, {adminUser.name}</p>
        </div>
        <NavUser user={adminUser} />
      </div>

      {/* Indicateurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
