"use client";

import { useState } from "react";
import { NavUser } from "@/components/dashboard/nav-users";
import { IconSearch } from "@tabler/icons-react";

type PageHeaderProps = {
  user?: { name: string; email: string; avatar: string };
};

export default function PageHeader({ user }: PageHeaderProps) {
  const [search, setSearch] = useState("");

  const defaultUser = user || {
    name: "Oumar Traoré",
    email: "oumar@example.com",
    avatar: "/avatar.png",
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-4 ">
    
      <h1 className="text-2xl font-bold text-gray-800 -ml ">Espace Employés</h1>

      
      <div className="flex items-center gap-4">
       
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#160b7c]"
          />
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <NavUser user={defaultUser} />
      </div>
    </header>
  );
}
