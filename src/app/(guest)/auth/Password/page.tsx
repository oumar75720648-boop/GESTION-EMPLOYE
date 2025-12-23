"use client";

import { ChangePassword } from "@/feature/auth/views/chang-pass";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const userId = Number(params.get("userId"));

  if (!userId) {
    return (
      <p></p>
    );
  }

  return <ChangePassword userId={userId} />;
}
