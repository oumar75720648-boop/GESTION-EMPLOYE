// src/app/layout.tsx
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des Employes",
  description: "Premier appli",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="">
        {children} 
      </body>
    </html>
  );
}
