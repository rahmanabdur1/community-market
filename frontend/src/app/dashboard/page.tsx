"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useSessionStore } from "@/store/useSessionStore";

export default function DashboardPage() {
  const { user, logout } = useSessionStore();

  return (
    <AuthGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user?.name}</p>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 cursor-pointer bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </AuthGuard>
  );
}
