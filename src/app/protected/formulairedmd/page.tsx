"use client";

import React from "react";
import { AppSidebar } from "@/components/(protected)/app-sidebar";
import ListeDemandes from "@/feature/employe/liste";
import FormulaireDemande from "@/feature/employe/formulaire";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white">
     
      <AppSidebar />

 
      <main className="flex-1 p-6 flex flex-col items-center">
             <h1 className="text-2xl font-bold text-[#160b7c] mb-6">
              Liste Des Demandes
             </h1>
             <FormulaireDemande />
      </main>
    </div>
  );
}
