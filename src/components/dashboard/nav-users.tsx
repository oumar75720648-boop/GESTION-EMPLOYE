"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getUserInFo } from "@/feature/auth/services/login";
import { User } from "@/feature/auth/entities/auth-entities";

export function NavUser() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["userMe"],
    queryFn: getUserInFo,
  });

  const userName = isLoading
    ? "..."
    : user
    ? `${user.nom} ${user.prenom}`
    : "Utilisateur";

  const goToProfile = () => router.push("/account");

  return (
    <button
      onClick={goToProfile}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>
      <span className="font-medium truncate">{userName}</span>
    </button>
  );
}
