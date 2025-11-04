"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  IconChevronDown,
  IconUserCircle,
  IconNotification,
  IconLogout,
} from "@tabler/icons-react";

type UserProps = {
  user: { name: string; email: string; avatar: string };
};

export function NavUser({ user }: UserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-10 py-2 ">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>TO</AvatarFallback>
          </Avatar>
          <span className="font-medium truncate">{user.name}</span>
          <IconChevronDown className="" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white border shadow-md rounded-md mt-2">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>TO</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs ">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer">
            <Link href="/employe/compte" className="flex items-center gap-2 w-full">
              <IconUserCircle /> Compte
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="flex items-center gap-2">
          <Link href="/employe/connexion" className="flex items-center gap-2 w-full">
            <IconLogout /> Déconnexion
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
