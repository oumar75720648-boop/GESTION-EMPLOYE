"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserInFo } from "../services/login";

export default function EditProfile() {
  const {
    data: userMe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userMe"],
    queryFn: getUserInFo,
  });

  const form = useForm({
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      contact: "",
      departement: "",
      specialite: "",
    },
  });

  const [succes, setSucces] = useState("");

  useEffect(() => {
    if (userMe) {
      form.reset({
        nom: userMe.nom || "",
        prenom: userMe.prenom || "",
        email: userMe.email || "",
        contact: userMe.contact || "",
        departement: userMe.departement || "",
        specialite: userMe.specialite || "",
      });
    }
  }, [userMe, form]);

  const onSubmit = (data: any) => {
    console.log("Données envoyées :", data);
    setSucces("Profil mis à jour avec succès");
  };

  if (isLoading) return <p className="text-center mt-10">Chargement...</p>;
  if (error)
    return <p className="text-center mt-10">Erreur lors du chargement</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#160b7c]">Modifier le profil</h1>

      {succes && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          {succes}
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
