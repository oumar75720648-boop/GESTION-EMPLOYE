"use client";

import { ChangePassword } from "@/feature/auth/views/password";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();

  const userId = Number(params.get("userId"));

  if (!userId) {
    return (
      <p className="text-red-500 text-center">Aucun userId trouvé dans l’URL</p>
    );
  }

  return <ChangePassword userId={userId} />;
}
