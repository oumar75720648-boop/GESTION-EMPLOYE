"use client";

import AppSidebarAdmin from "@/components/(guest)/app-sidebaradmin";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar reste fixe */}
      <AppSidebarAdmin />

      {/* Contenu principal qui change côté client */}
      <main className="flex-1 bg-white rounded-tl-3xl shadow-inner p-6 m-4">
        {children}
      </main>
    </div>
  );
}
