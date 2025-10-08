"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { authApi } from "@/services/api"; // use your authApi
import type { Session, User, SessionState } from "../types/session.type";

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: true,
      error: null,
      lastActivity: Date.now(),

      initializeSession: async () => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (!accessToken || !refreshToken) {
          set({ isLoading: false });
          return;
        }

        set({
          session: { accessToken, refreshToken, expiresAt: Date.now() + 900000, tokenType: "Bearer" },
          user: null,
          isLoading: true,
        });

        try {
          const res = await authApi.get<User>("/users/me");
          set({ user: res.data, isLoading: false });
        } catch (err) {
          console.error("Failed to restore user:", err);
          set({ session: null, user: null, isLoading: false });
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      },

      setSession: (session: Session, user: User) => {
        Cookies.set("accessToken", session.accessToken, { sameSite: "strict" });
        Cookies.set("refreshToken", session.refreshToken, { sameSite: "strict" });
        set({ session, user, isLoading: false, lastActivity: Date.now() });
      },

      clearSession: () => {
        set({ session: null, user: null, isLoading: false });
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      },

      logout: async () => {
        get().clearSession();
      },

      setUser: (user: User) => set({ user, lastActivity: Date.now() }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      refreshSession: async () => {
        try {
          const refreshToken = get().session?.refreshToken;
          if (!refreshToken) throw new Error("No refresh token available");

          const res = await authApi.post("/auth/refresh-token", { refreshToken });
          const newSession: Session = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            expiresAt: Date.now() + res.data.expiresIn * 1000,
            tokenType: res.data.tokenType,
          };

          set({ session: newSession });
        } catch (err) {
          console.error("Failed to refresh session", err);
          get().clearSession();
        }
      },

      get isAuthenticated() {
        return !!get().session?.accessToken;
      },

      get requiresReauth() {
        const session = get().session;
        if (!session) return true;
        return Date.now() > session.expiresAt - 300000;
      },
    }),
    { name: "session-storage" }
  )
);
