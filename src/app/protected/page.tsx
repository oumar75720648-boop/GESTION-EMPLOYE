"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/protected/liste-demande");
  }, [router]);

  return null;
}
