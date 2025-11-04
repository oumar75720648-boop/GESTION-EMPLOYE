"use client";

import Link from "next/link";
import { useState } from "react";
import { NavUser } from "./(protected)/nav-user"
import { DataTable } from "./data-table";
import { ChangePassword } from "@/feature/employe/motpasse/mot-passe";
import { Sidebar, SidebarHeader, SidebarContent } from "../ui/sidebar";
import {
  IconDashboard,
  IconListDetails,
  IconUserPlus,
  IconFolder,
  IconSettings,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";

export function AppSidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activePage, setActivePage] = useState("dashboard");

  
  const [employeesData, setEmployeesData] = useState<Array<any>>([]);

  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);
  const linkClasses =
    "flex items-center gap-2 text-sm text-black hover:bg-[#15662A] hover:text-white rounded-md px-3 py-2 transition-all";

  return (
    <div className="flex h-screen w-screen ">
      {/* SIDEBAR */}
      <Sidebar className="flex flex-col h-full w-64 bg-gray-100">
        <SidebarHeader className="border-b flex flex-col items-center py-4">
          <Link href="#" className="flex flex-col items-center space-y-2">
            <img src="/images (1).jpeg" alt="logo" className="w-20 h-20 object-cover rounded-full" />
            <span className="text-lg font-bold text-[#15662A]">SmartGec</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="flex-1 flex flex-col justify-between bg-auto"> 
          <div className="flex flex-col mt-4 space-y-4 px-3">
            {/* Dashboard */}
            <button
              onClick={() => setActivePage("dashboard")}
              className={`${linkClasses} ${activePage === "dashboard" ? "bg-[#15662A] text-white" : ""}`}
            >
              <IconDashboard size={20} /> Tableau de bord
            </button>

            {/* Employés */}
            <div>
              <button
                onClick={() => toggleMenu("employe")}
                className="flex items-center justify-between w-full text-base font-medium text-black hover:bg-[#15662A] hover:text-white rounded-md px-3 py-3 transition-all"
              >
                <div className="flex items-center gap-2">
                  <IconListDetails size={20} /> Employés
                </div>
                {openMenu === "employe" ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
              </button>
              {openMenu === "employe" && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  <button
                    onClick={() => setActivePage("liste")}
                    className={`${linkClasses} ${activePage === "liste" ? "bg-[#15662A] text-white" : ""}`}
                  >
                    <IconListDetails size={16} /> Liste des employés
                  </button>
                  <button
                    onClick={() => setActivePage("ajout")}
                    className={`${linkClasses} ${activePage === "ajout" ? "bg-[#15662A] text-white" : ""}`}
                  >
                    <IconUserPlus size={16} /> Ajouter un employé
                  </button>
                </div>
              )}
            </div>

            {/* Départements */}
            <button
              onClick={() => setActivePage("departement")}
              className={`${linkClasses} ${activePage === "departement" ? "bg-[#15662A] text-white" : ""}`}
            >
              <IconFolder size={20} /> Départements
            </button>

            {/* Paramètres */}
            <div>
              <button
                onClick={() => toggleMenu("parametres")}
                className="flex items-center justify-between w-full text-base font-medium text-black hover:bg-[#15662A] hover:text-white rounded-md px-3 py-3 transition-all"
              >
                <div className="flex items-center gap-2">
                  <IconSettings size={20} /> Paramètres
                </div>
                {openMenu === "parametres" ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
              </button>
              {openMenu === "parametres" && (
                <div className="ml-6 mt-1 flex flex-col gap-1">
                  <button
                    onClick={() => setActivePage("motdepasse")}
                    className={`${linkClasses} ${activePage === "motdepasse" ? "bg-[#15662A] text-white" : ""}`}
                  >
                    Mot de passe
                  </button>
                </div>
              )}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          {activePage === "dashboard" && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                  disabled
                />
              </div>
              <NavUser user={{ name: "Traore Oumar", email: "m@example.com", avatar: "/avatars/shadcn.jpg" }} />
            </div>
          )}
        </div>

        <p className="font-semibold text-2xl mb-6">
          {activePage === "dashboard"
            ? "Tableau de bord"
            : activePage === "liste"
            ? "Liste des employés"
            : activePage === "ajout"
            ? "Ajout d’un employé"
            : activePage === "departement"
            ? "Gestion des départements"
            : activePage === "motdepasse"
            ? "Paramètres - Mot de passe"
            : "Section"}
        </p>

        {/* DASHBOARD TABLE */}
        {activePage === "dashboard" && (
          <>
            <p className="text-lg font-semibold mb-4">Historique des employés</p>
            <DataTable data={employeesData} readonly />
          </>
        )}

        {/* AUTRES PAGES */}
        {activePage === "liste" && <DataTable data={employeesData} />}
        {activePage === "motdepasse" && <ChangePassword />}
      </main>
    </div>
  );
}
