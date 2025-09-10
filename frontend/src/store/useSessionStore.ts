import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session, SessionState, User } from "@/types/session.type";

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isLoading: false,
      error: null,
      setSession: (session: Session, user: User) => set({ session, user }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearSession: () =>
        set({
          session: null,
          user: null,
          isLoading: false,
          error: null,
        }),
      logout: () =>
        set({
          session: null,
          user: null,
          isLoading: false,
          error: null,
        }),
    }),
    { name: "session-storage" }
  )
);
