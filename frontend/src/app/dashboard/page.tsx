 "use client";

 import { useEffect, useState } from "react";
 import { useSessionStore } from "@/store/useSessionStore";
 import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
 import { getUsers } from "@/services/auth.service";

export default function Dashboard() {
  const { user, logout } = useSessionStore();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
   const fetchUsers = async () => {
     try {
       const data = await getUsers(); // ✅ now authenticated
       setUsers(data);
     } catch (err: any) {
       setError(err.message || "Failed to fetch users");
     } finally {
       setLoading(false);
     }
   };
   fetchUsers();
 }, []);


  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Welcome, {user?.displayName}</h1>
      <Button onClick={handleLogout} variant="destructive" className="mb-6">
        Logout
      </Button>

      <h2 className="text-lg font-semibold mb-2">User List</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u._id} className="border p-2 rounded">
              <p>
                <strong>Name:</strong> {u.displayName}
              </p>
              <p>
                <strong>Email:</strong> {u.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

