"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IconChevronDown, IconUserCircle, IconLogout } from "@tabler/icons-react";

type UserProps = {
  user: { name: string; email: string; avatar?: string };
};

export function NavUser({ user }: UserProps) {
  const router = useRouter();

  const goToProfile = () => router.push("/employe/compte");
  const logout = () => router.push("/employe/connexion");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
          <Avatar className="w-8 h-8">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium truncate">{user.name}</span>
          <IconChevronDown size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 sm:w-64 mt-2">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={goToProfile}>
          <IconUserCircle size={18} /> Compte
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={logout}>
          <IconLogout size={18} /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
