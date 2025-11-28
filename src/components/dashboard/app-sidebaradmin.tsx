"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  IconHome,
  IconUsers,
  IconClipboard,
  IconBuilding,
  IconSettings,
  IconStar,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { getUserInFo } from "@/feature/auth/services/login";

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserInFo();
        setUser(data);
      } catch (error) {
        console.error("Erreur récupération utilisateur:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0a043c] text-white rounded-md shadow-lg"
        onClick={() => setOpen(true)}
      >
        <IconMenu2 size={24} />
      </button>

     
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      
      <aside
        className={`fixed top-0 left-0 bg-[#0a043c] text-white flex flex-col p-5 min-h-screen shadow-xl w-[260px] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex rounded-r-3xl`}
      >
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/LOGO-SIC-FOOTER-2-640x320-2 (2).png"
            alt="Logo"
            width={120}
            height={60}
            className="rounded-lg"
          />
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <IconX size={24} />
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-6 uppercase tracking-wide text-gray-300">
          Menu
        </h2>

        
        {user?.role === "ADMIN" && (
          <>
            <button
              onClick={() => {
                router.push("/");
                setOpen(false);
              }}
              className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
                pathname === "/" ? "bg-indigo-600" : "hover:bg-indigo-600"
              }`}
            >
              <IconHome size={20} /> Dashboard
            </button>

            <button
              onClick={() => {
                router.push("/employe-list");
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
            >
              <IconUsers size={20} /> Employés
            </button>

            <button
              onClick={() => {
                router.push("/demande-admin");
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
            >
              <IconClipboard size={20} /> Demandes
            </button>

            <button
              onClick={() => {
                router.push("/department");
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
            >
              <IconBuilding size={20} /> Département
            </button>

            <button
              onClick={() => {
                router.push("/speciality");
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
            >
              <IconStar size={20} /> Spécialité
            </button>
          </>
        )}

        {user?.role === "EMPLOYE" && (
          <>
            <button
              onClick={() => {
                router.push("/demande-list");
                setOpen(false);
              }}
              className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
                pathname === "/demande-list"
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600"
              }`}
            >
              <IconClipboard size={20} /> Mes demandes
            </button>

            <button
              onClick={() => {
                router.push("/add-demande");
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-600 transition"
            >
              <IconClipboard size={20} /> Faire une demande
            </button>
          </>
        )}

        <button
          onClick={() => {
            router.push("/account");
            setOpen(false);
          }}
          className="flex items-center gap-3 py-2 px-3 mt-auto rounded-md hover:bg-indigo-600 transition"
        >
          <IconSettings size={20} /> Paramètres
        </button>
      </aside>
    </>
  );
}
