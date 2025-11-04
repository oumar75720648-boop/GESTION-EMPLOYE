// service-message.tsx
export type StatutMessage = {
  nom: string;
  prenom: string;
  email: string;
  typeDemande: string;
  statut: "accepté" | "refusé";
  date: string;
};

export async function getMessage(email: string): Promise<StatutMessage | null> {
  const responce = await fetch(`/api/statut-demandes?email=${encodeURIComponent(email)}`);
  if (!responce.ok) return null;

  const data: StatutMessage = await responce.json();
  return data;
}
