  "use client";

  import Image from "next/image";
  import { useRouter, usePathname } from "next/navigation";
  import { useState } from "react";
  import { IconHome,IconUsers,IconBuilding,IconSettings, IconStar,IconMenu2, IconX, IconLogout, IconClipboard,} from "@tabler/icons-react";
  import { useQuery } from "@tanstack/react-query";
  import { getUserInFo } from "@/feature/auth/services/login";
  import { User } from "@/feature/auth/entities/auth-entities";
  import { useAuthStore } from "@/feature/auth/store/auth";

  export default function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const { data: userMe = {} as User } = useQuery({
      queryKey: ["userMe"],
      queryFn: () => getUserInFo(),
    });

    const role = userMe.role || "";
    const logout = useAuthStore((state) => state.logout);

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

          {role === "ADMIN" && (
            <>
              <button
                onClick={() => {
                  router.push("/");
                  setOpen(false);
                }}
                className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
                  pathname === "/" ? "bg-indigo-600" : "hover:bg-indigo-700"
                }`}
              >
                <IconHome size={20} /> Dashboard
              </button>

              <button
                onClick={() => {
                  router.push("/employe-list");
                  setOpen(false);
                }}
                className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-700 transition"
              >
                <IconUsers size={20} /> Employés
              </button>

              <button
                onClick={() => {
                  router.push("/demande-lists");
                  setOpen(false);
                }}
                className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-700 transition"
              >
                <IconClipboard size={20} /> Demandes
              </button>

              <button
                onClick={() => {
                  router.push("/department");
                  setOpen(false);
                }}
                className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-700 transition"
              >
                <IconBuilding size={20} /> Département
              </button>

              <button
                onClick={() => {
                  router.push("/speciality");
                  setOpen(false);
                }}
                className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-700 transition"
              >
                <IconStar size={20} /> Spécialité
              </button>
            </>
          )}

          {role === "EMPLOYE" && (
            <>
              <button
                onClick={() => {
                  router.push("/demande-list");
                  setOpen(false);
                }}
                className={`flex items-center gap-3 py-2 px-3 rounded-md transition ${
                  pathname === "/demande-list"
                    ? "bg-indigo-600"
                    : "hover:bg-indigo-700"
                }`}
              >
                <IconClipboard size={20} /> Mes demandes
              </button>

              <button
                onClick={() => {
                  router.push("/add-demande");
                  setOpen(false);
                }}
                className="flex items-center gap-3 py-2 px-3 mt-3 rounded-md hover:bg-indigo-700 transition"
              >
                <IconClipboard size={20} /> Faire une demande
              </button>
            </>
          )}

          <div className="flex flex-col mt-auto">
            <button
              onClick={() => {
                router.push("/account");
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 mb-2 rounded-md hover:bg-indigo-700 transition text-white"
            >
              <IconSettings size={20} /> Paramètres
            </button>

            <button
              onClick={() => {
                logout("/auth"); 
                setOpen(false);
              }}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-indigo-700 transition text-white"
            >
              <IconLogout size={20} /> Déconnexion
            </button>
          </div>
        </aside>
      </>
    );
  }
