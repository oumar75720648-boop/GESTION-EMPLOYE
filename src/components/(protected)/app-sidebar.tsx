"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { 
  IconClipboardList, 
  IconFilePlus, 
  IconMenu2, 
  IconX, 
  IconBell 
} from "@tabler/icons-react";

export function AppSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Liste des demandes", icon: IconClipboardList, path: "/protected/liste-demandes" },
    { name: "Nouvelle demande", icon: IconFilePlus, path: "/protected/formulairedmd" },
    { name: "Notifications", icon: IconBell, path: "/protected/notification" }, 
  ];

  return (
    <>  
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white backdrop-blur-md border border-gray-300 rounded-md shadow-md hover:bg-white/80 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="border-b border-gray-200 flex items-center justify-center py-4 px-2">
          <Image
            src="/LOGO-SIC-FOOTER-2-640x320-2 (2).png"
            alt="Logo Smart"
            width={120}
            height={60}
            className="rounded-lg bg-[#160b7c] p-1"
          />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {menuItems.map((item, idx) => {
            const active = pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => router.push(item.path)}
                className={`
                  flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg font-medium transition-all duration-200
                  ${active
                    ? "bg-[#160b7c] text-white shadow-sm"
                    : "text-gray-700 hover:bg-[#160b7c]/10 hover:text-[#160b7c]"}
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className={`${active ? "text-white" : "text-[#160b7c]"}`}
                />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
