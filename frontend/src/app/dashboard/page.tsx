"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useSessionStore } from "@/store/useSessionStore";

export default function DashboardPage() {
  const { user, logout } = useSessionStore();

  return (
    <AuthGuard>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user?.name}</p>
        <div className="flex gap-3">
          {user?.role === "admin" && (
            <a href="/dashboard/admin" className="px-4 py-2 bg-blue-600 text-white rounded">Admin Panel</a>
          )}
          {user?.role === "vendor" && (
            <a href="/dashboard/vendor" className="px-4 py-2 bg-green-600 text-white rounded">Vendor Panel</a>
          )}
          {user?.role === "customer" && (
            <a href="/dashboard/customer" className="px-4 py-2 bg-indigo-600 text-white rounded">My Account</a>
          )}
          <button
            onClick={logout}
            className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
