"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/store/useSessionStore";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const initializeSession = useSessionStore((state) => state.initializeSession);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return <>{children}</>;
}
