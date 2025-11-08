"use client";
import AppSidebarAdmin from "@/components/dashboard/app-sidebaradmin";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar toujours visible */}
      <AppSidebarAdmin />

      {/* Contenu principal */}
      <main className="flex-1 bg-white rounded-tl-3xl shadow-inner p-6 m-4">
        {children}
      </main>
    </div>
  );
}
