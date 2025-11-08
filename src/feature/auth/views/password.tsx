"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconLock, IconUser } from "@tabler/icons-react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Password() {
  const [actuelPassword, setActuelPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleActuel, setVisibleActuel] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
     <main className="flex flex-col items-center flex-1 w-full space-y-8">
       <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#160b7c]">
          <div className="flex justify-center mb-6">
            <div className="bg-[#160b7c] rounded-full p-4">
              <IconLock size={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#160b7c] mb-6 text-center">
            Changer le mot de passe
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
           
            <div className="relative">
              <label className="block mb-1 font-medium text-black">
                Mot de passe actuel
              </label>
              <Input
                type={visibleActuel ? "text" : "password"}
                value={actuelPassword}
                onChange={(e) => setActuelPassword(e.target.value)}
                placeholder="Mot de passe actuel"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setVisibleActuel(!visibleActuel)}
                className="absolute right-3 top-1/2 -translate-y-1/20 p-1 bg-transparent text-gray-500"
              >
                {visibleActuel ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            
            <div className="relative">
              <label className="block mb-1 font-medium text-black">
                Nouveau mot de passe
              </label>
              <Input
                type={visibleNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setVisibleNew(!visibleNew)}
                className="absolute right-3 top-1/2 -translate-y-1/20 p-1 bg-transparent text-gray-500"
              >
                {visibleNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-black">
                Confirmer le mot de passe
              </label>
              <Input
                type={visibleConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setVisibleConfirm(!visibleConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/20 p-1 bg-transparent text-gray-500"
              >
                {visibleConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button type="submit" className="bg-[#160b7c] hover:bg-[#0f0a66] text-white w-full transition">
              Changer le mot de passe
            </Button>

            {message && (
              <p className="mt-2 text-sm text-green-600 text-center">{message}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
