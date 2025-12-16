"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePasswordForm } from "../hooks/change-password";
import { Eye, EyeOff } from "lucide-react";

export function ChangePassword({ userId }: { userId: number }) {
  const router = useRouter();

  const [visibleCurrent, setVisibleCurrent] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const { changePassword, pending, error, message } = useChangePasswordForm();

  const onSubmit = async (data: any) => {
    if (!userId) return;

    if (data.newPassword !== data.confirmPassword) {
      alert(
        "Le mot de passe confirmé ne correspond pas au nouveau mot de passe."
      );
      return;
    }

    await changePassword({
      userId,
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (!error) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = {
            currentPassword: formData.get("currentPassword")?.toString() || "",
            newPassword: formData.get("newPassword")?.toString() || "",
            confirmPassword: formData.get("confirmPassword")?.toString() || "",
          };
          onSubmit(data);
        }}
        className="space-y-4 w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-center text-2xl font-semibold mb-4">
          Changer votre mot de passe
        </h2>

        <div className="relative">
          <Input
            name="currentPassword"
            type={visibleCurrent ? "text" : "password"}
            placeholder="Mot de passe actuel"
          />
          <button
            type="button"
            onClick={() => setVisibleCurrent(!visibleCurrent)}
            className="absolute inset-y-0 right-2 flex items-center p-1 bg-transparent text-gray-500"
          >
            {visibleCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <Input
            name="newPassword"
            type={visibleNew ? "text" : "password"}
            placeholder="Nouveau mot de passe"
          />
          <button
            type="button"
            onClick={() => setVisibleNew(!visibleNew)}
            className="absolute inset-y-0 right-2 flex items-center p-1 bg-transparent text-gray-500"
          >
            {visibleNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <Input
            name="confirmPassword"
            type={visibleConfirm ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
          />
          <button
            type="button"
            onClick={() => setVisibleConfirm(!visibleConfirm)}
            className="absolute inset-y-0 right-2 flex items-center p-1 bg-transparent text-gray-500"
          >
            {visibleConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-600 text-center">{message}</p>}

        <Button
          type="submit"
          disabled={pending}
          className="bg-[#160b7c] text-white w-full"
        >
          {pending ? "En cours..." : "Changer le mot de passe"}
        </Button>
      </form>
    </div>
  );
}
