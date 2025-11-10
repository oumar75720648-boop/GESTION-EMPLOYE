'use client';

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  IconHome,
  IconUsers,
  IconClipboard,
  IconBuilding,
  IconBell,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useAuthStore } from "@/feature/auth/store/auth"; // ton store

export default function AppSidebarAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // supprime token et user
    router.push("/auth"); // redirige vers la page de login
  };

  return (
    <aside className="w-[260px] bg-[#0a043c] text-white flex flex-col p-5 min-h-screen shadow-xl rounded-r-3xl">
      <div className="flex items-center justify-between mb-8">
        <Image
          src="/LOGO-SIC-FOOTER-2-640x320-2 (2).png"
          alt="Logo"
          width={120}
          height={60}
          className="rounded-lg"
        />
      </div>

      <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide text-gray-300">
        Menu
      </h2>

      {/* Dashboard */}
      <button
        onClick={() => router.push("/")}
        className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
          pathname === "/" ? "bg-indigo-600" : "hover:bg-indigo-600"
        }`}
      >
        <IconHome size={20} /> Dashboard
      </button>

      {/* Autres boutons */}
      <button
        onClick={() => router.push("/liste-employe")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconUsers size={20} /> Employés
      </button>

      <button
        onClick={() => router.push("/liste-demande")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconClipboard size={20} /> Demandes
      </button>

      <button
        onClick={() => router.push("/departement")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconBuilding size={20} /> Département
      </button>

      <button
        onClick={() => router.push("/notifications")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconBell size={20} /> Notifications
      </button>

      <button
        onClick={() => router.push("/parametre")}
        className="flex items-center gap-3 py-2 px-3 mt-auto rounded-md hover:bg-indigo-600 transition"
      >
        <IconSettings size={20} /> Paramètres
      </button>

      {/* Déconnexion */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconLogout size={20} /> Déconnexion
      </button>
    </aside>
  );
}
