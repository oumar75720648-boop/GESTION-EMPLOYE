"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchDemandes } from "@/feature/demande/service/demande-service";
import {
  accepterDemande,
  refuserDemande,
} from "@/feature/message/service/message-ser";

export default function InfoDemandePage() {
  const id = Number(useSearchParams().get("idDemande"));
  const router = useRouter();

  const [demande, setDemande] = useState<any>(null);
  const [showMotif, setShowMotif] = useState(false);
  const [motif, setMotif] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDemandes().then((all) => {
      setDemande(all.find((d: any) => d.idDemande === id) || null);
    });
  }, [id]);

  const accepter = async () => {
    if (!demande) return;
    const updated = await accepterDemande(demande.idDemande);
    setDemande(updated);
  };

  const refuser = async () => {
    if (!demande || !motif.trim()) return;
    const updated = await refuserDemande(demande.idDemande, motif);
    setDemande(updated);
    setShowMotif(false);
    setMotif("");
    setMessage("Motif envoyé");
  };

  if (!demande) return <p className="text-center mt-10">Demande introuvable</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Détails de la demande</h1>

      <p>
        <strong>Nom :</strong> {demande.utilisateur?.nom || "-"}
      </p>
      <p>
        <strong>Prénom :</strong> {demande.utilisateur?.prenom || "-"}
      </p>
      <p>
        <strong>Email :</strong> {demande.utilisateur?.email || "-"}
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
      {demande.motifRefus && (
        <p>
          <strong>Motif de refus :</strong> {demande.motifRefus}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={accepter}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Accepter
        </button>
        <button
          onClick={() => setShowMotif(true)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Refuser
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Fermer
        </button>
      </div>

      {showMotif && (
        <div className="mt-4">
          <textarea
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            rows={3}
            className="w-full border p-2 rounded"
            placeholder="Motif du refus"
          />
          <button
            disabled={!motif.trim()}
            onClick={refuser}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Envoyer
          </button>
        </div>
      )}

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
