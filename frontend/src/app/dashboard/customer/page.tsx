"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useEffect, useState } from "react";
import { listBookings, cancelBooking } from "@/services/bookings.service";
import { listPosts } from "@/services/posts.service";
import { createTicket, listTickets } from "@/services/support.service";

export default function CustomerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [b, p, t] = await Promise.all([
          listBookings(),
          listPosts(),
          listTickets(),
        ]);
        setBookings(b); setPosts(p); setTickets(t);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <AuthGuard>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">My Account</h1>
        {loading ? (<div>Loading...</div>) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold">My Bookings</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm"><thead><tr><th className="text-left p-2">Listing</th><th className="text-left p-2">Date</th><th className="text-left p-2">Payment</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {bookings.map((b)=> (
                      <tr key={b._id} className="border-b">
                        <td className="p-2">{b.listingId}</td>
                        <td className="p-2">{new Date(b.date).toLocaleString()}</td>
                        <td className="p-2">{b.paymentStatus ?? "pending"}</td>
                        <td className="p-2">{b.status}</td>
                        <td className="p-2">
                          {b.status === "pending" && (
                            <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={async ()=>{ await cancelBooking(b._id); setBookings(await listBookings()); }}>Cancel</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">My Posts</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm"><thead><tr><th className="text-left p-2">Content</th><th className="text-left p-2">Status</th></tr></thead>
                  <tbody>
                    {posts.map((p)=> (
                      <tr key={p._id} className="border-b">
                        <td className="p-2">{p.content?.slice(0, 60)}</td>
                        <td className="p-2">{p.status || "pending"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Support</h2>
              <button className="px-3 py-2 bg-blue-600 text-white rounded mb-2" onClick={async ()=>{ await createTicket({ subject: "Need help", message: "Please assist." }); setTickets(await listTickets()); }}>Create Ticket</button>
              <div className="overflow-auto">
                <table className="min-w-full text-sm"><thead><tr><th className="text-left p-2">Subject</th><th className="text-left p-2">Status</th></tr></thead>
                  <tbody>
                    {tickets.map((t)=> (
                      <tr key={t._id} className="border-b">
                        <td className="p-2">{t.subject}</td>
                        <td className="p-2">{t.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}


