"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  fetchDemandes,
  accepterDemande,
  refuserDemande,
} from "@/feature/demande/service/demande-service";
import { DemandePayload } from "@/feature/demande/entities/demande-entites";

export default function InfoDemandePage() {
  const params = useSearchParams();
  const router = useRouter();
  const idDemandeParam = params.get("idDemande");

  const [demande, setDemande] = useState<DemandePayload | null>(null);
  const [loading, setLoading] = useState(false);

  const loadDemande = async () => {
    if (!idDemandeParam) return;
    try {
      const allDemandes = await fetchDemandes();
      const d =
        allDemandes.find((item: { idDemande: number; }) => item.idDemande === Number(idDemandeParam)) ||
        null;
      setDemande(d);
    } catch (error) {
      console.error("Erreur lors du chargement de la demande :", error);
      setDemande(null);
    }
  };

  useEffect(() => {
    loadDemande();
  }, [idDemandeParam]);

  const handleAccepter = async () => {
    if (!demande || demande.statutDemande === "ACCEPTEE") return;
    setLoading(true);
    try {
      const updatedDemande = await accepterDemande(demande.idDemande!);
      setDemande(updatedDemande);
    } catch (error) {
      console.error("Erreur lors de l'acceptation :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefuser = async () => {
    if (!demande || demande.statutDemande === "REFUSEE") return;
    setLoading(true);
    try {
      const updatedDemande = await refuserDemande(demande.idDemande!);
      setDemande(updatedDemande);
    } catch (error) {
      console.error("Erreur lors du refus :", error);
    } finally {
      setLoading(false);
    }
  };

  if (!demande) return <p className="text-center mt-10">Demande introuvable</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Détails de la demande</h1>

      <div className="mt-6 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Détails de la demande</h2>

        <p>
          <strong>Nom :</strong> {(demande.utilisateur as any)?.nom || "-"}
        </p>
        <p>
          <strong>Prénom :</strong>{" "}
          {(demande.utilisateur as any)?.prenom || "-"}
        </p>
        <p>
          <strong>Email :</strong> {(demande.utilisateur as any)?.email || "-"}
        </p>
        <p>
          <strong>Type :</strong> {demande.typeDemande}
        </p>
        <p>
          <strong>Date :</strong>{" "}
          {new Date(demande.dateDemande).toLocaleDateString()}
        </p>
        <p>
          <strong>Description :</strong> {demande.description || "-"}
        </p>
        <p>
          <strong>Statut :</strong> {demande.statutDemande || "En attente"}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            disabled={loading || demande.statutDemande === "ACCEPTEE"}
            onClick={handleAccepter}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Accepter
          </button>
          <button
            disabled={loading || demande.statutDemande === "REFUSEE"}
            onClick={handleRefuser}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            Refuser
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
