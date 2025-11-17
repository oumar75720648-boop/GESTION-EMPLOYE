"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  IconChevronDown,
  IconUserCircle,
  IconLogout,
} from "@tabler/icons-react";
import { useAuthStore } from "@/feature/auth/store/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserInFo } from "@/feature/auth/services/login";
import { AfterConnect } from "@/feature/auth/entities/auth-entities";

export function NavUser() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const { data: userMe = {} as AfterConnect } = useQuery<AfterConnect>({
    queryKey: ["userMe"],
    queryFn: () => getUserInFo(),
  });

  const handleLogout = () => {
    logout("/auth");
  };

  const goToProfile = () => router.push("/profil");

  // 🔹 Pas d'avatar disponible, juste fallback
  const userName = userMe.user?.nom ?? "Utilisateur";
  const userEmail = userMe.user?.email ?? "email@exemple.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium truncate">{userEmail}</span>
          <IconChevronDown size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 sm:w-64 mt-2">
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={goToProfile}
        >
          <IconUserCircle size={18} /> Compte
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogout}
        >
          <IconLogout size={18} /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
