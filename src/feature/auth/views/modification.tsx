"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInFo, updateUserProfile } from "@/feature/auth/services/login";
import { User } from "@/feature/auth/entities/auth-entities";

export default function EditProfile() {
  const queryClient = useQueryClient();

  const { data: userMe, isLoading } = useQuery<User>({
    queryKey: ["userMe"],
    queryFn: getUserInFo,
  });

  const form = useForm<User>({
    defaultValues: {
      id: 0,
      nom: "",
      prenom: "",
      email: "",
      contact: "",
      typeUtilisateur: "",
      role: "",
      departement: "",
      specialite: "",
      derniereConnexion: "",
      description: "",
    },
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userMe) form.reset(userMe);
  }, [userMe, form]);

  const onSubmit = async (data: User) => {
    if (!userMe) return;

    setMessage(""); 
    try {
      await updateUserProfile(userMe.id, data); 
      setMessage("Profil mis à jour avec succès !");
      queryClient.invalidateQueries(["userMe"]); 
    } catch (err: any) {
      setMessage(err?.message || "Erreur lors de la mise à jour");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#160b7c]">Modifier le profil</h1>

      {message && (
        <div
          className={`px-4 py-2 rounded ${
            message.includes("Erreur")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <input
          {...form.register("nom")}
          placeholder="Nom"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          {...form.register("prenom")}
          placeholder="Prénom"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          {...form.register("email")}
          placeholder="Email"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          {...form.register("contact")}
          placeholder="Contact"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          {...form.register("departement")}
          placeholder="Département"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          {...form.register("specialite")}
          placeholder="Spécialité"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          {...form.register("description")}
          placeholder="Description"
          className="border px-3 py-2 rounded"
        />

        <Button
          type="submit"
          className="bg-[#160b7c] text-white transition-none"
        >
          Sauvegarder
        </Button>
      </form>
    </div>
  );
}
