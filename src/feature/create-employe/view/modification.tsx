"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useDepartements } from "@/feature/departement/hooks/use-depart";
import { useSpecialites } from "@/feature/specialite/hooks/use-special";
import { EmployeFormData } from "../entites/employe-end";
import { useEffect } from "react";
import { useUserProfile } from "../hooks/use-info";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const { user, updateProfile, loading, success } = useUserProfile();
  const { departements } = useDepartements();
  const { specialites } = useSpecialites();
  const router = useRouter();

  const form = useForm<EmployeFormData>({
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      contact: "",
      motDePasse: "",
      departementId: null,
      specialiteId: null,
      typeUtilisateurId: null,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        contact: user.contact,
        motDePasse: user.motDePasse || "",
        departementId: user.departementId || undefined,
        specialiteId: user.specialiteId || undefined,
        typeUtilisateurId: user.typeUtilisateurId || undefined,
      });
    }
  }, [user, form]);

  // Redirection après succès
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push("/profil"), 1500);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const onSubmit = async (data: EmployeFormData) => {
    await updateProfile(data);
  };

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-[#160b7c]">Modifier le profil</h1>

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          ✅ Profil mis à jour avec succès
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...form.register("nom")}
          placeholder="Nom"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          {...form.register("prenom")}
          placeholder="Prénom"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          {...form.register("email")}
          placeholder="Email"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          {...form.register("contact")}
          placeholder="Contact"
          className="border px-3 py-2 rounded w-full"
        />

        <select
          {...form.register("departementId", { valueAsNumber: true })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- Département --</option>
          {departements.map((dep) => (
            <option key={dep.idDepartement} value={dep.idDepartement}>
              {dep.nomDepartement}
            </option>
          ))}
        </select>

        <select
          {...form.register("specialiteId", { valueAsNumber: true })}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- Spécialité --</option>
          {specialites.map((spec) => (
            <option key={spec.idSpecialite} value={spec.idSpecialite}>
              {spec.nomSpecialite}
            </option>
          ))}
        </select>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#160b7c] text-white"
        >
          {loading ? "Envoi..." : "Sauvegarder"}
        </Button>
      </form>
    </div>
  );
}
