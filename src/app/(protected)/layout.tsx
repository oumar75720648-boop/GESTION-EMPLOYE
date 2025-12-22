import Layout from "@/components/layouts/layout";
import Provider from "@/components/providers/provider";

import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des Employes",
  description: "Premier appli",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="">
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
