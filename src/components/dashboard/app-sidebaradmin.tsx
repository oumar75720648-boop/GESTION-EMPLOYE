"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  IconHome,
  IconUsers,
  IconClipboard,
  IconBuilding,
  IconBell,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";
import { useAuthStore } from "@/feature/auth/store/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserInFo } from "@/feature/auth/services/login";
import { AfterConnect } from "@/feature/auth/entities/auth-entities";

export default function AppSidebarAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const { data: userMe = {} as AfterConnect } = useQuery<AfterConnect>({
    queryKey: ["userMe"],
    queryFn: () => getUserInFo(),
  });

  const handleLogout = () => {
    logout(); 
    router.push("/auth");
  };

  return (
    <aside className="w-[260px] bg-[#0a043c] text-white flex flex-col p-5 min-h-screen shadow-xl rounded-r-3xl">
      <div className="flex items-center justify-between mb-4">
        <Image
          src="/LOGO-SIC-FOOTER-2-640x320-2 (2).png"
          alt="Logo"
          width={120}
          height={60}
          className="rounded-lg"
        />
      </div>

      {/* Menu */}
      <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide text-gray-300">
        Menu
      </h2>

      <button
        onClick={() => router.push("/")}
        className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
          pathname === "/" ? "bg-indigo-600" : "hover:bg-indigo-600"
        }`}
      >
        <IconHome size={20} /> Dashboard
      </button>

      <button
        onClick={() => router.push("/employe-list")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconUsers size={20} /> Employés
      </button>

      <button
        onClick={() => router.push("/demande-list")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconClipboard size={20} /> Demandes
      </button>

      <button
        onClick={() => router.push("/department")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconBuilding size={20} /> Département
      </button>

      <button
        onClick={() => router.push("/speciality")}
        className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
      >
        <IconStar size={20} /> Specialite
      </button>

      <button
        onClick={() => router.push("/account")}
        className="flex items-center gap-3 py-2 px-3 mt-auto rounded-md hover:bg-indigo-600 transition"
      >
        <IconSettings size={20} /> Paramètres
      </button>

    </aside>
  );
}
