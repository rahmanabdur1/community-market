"use client";

import { ReactNode, useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { session, user, isLoading } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session?.accessToken) {
      router.replace("/login");
    }
  }, [session, isLoading, router]);

  if (isLoading || !user) {
    return <div className="p-6">Checking authentication...</div>;
  }

  return <>{children}</>;
}
