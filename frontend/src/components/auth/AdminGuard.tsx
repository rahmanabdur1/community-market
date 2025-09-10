"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/useSessionStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useSessionStore();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      router.replace("/dashboard");
    } else {
      setChecking(false);
    }
  }, [user, router]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">Checking admin access...</div>
    );
  }

  return <>{children}</>;
}


