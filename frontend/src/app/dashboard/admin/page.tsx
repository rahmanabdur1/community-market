"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import AdminGuard from "@/components/auth/AdminGuard";
import { useEffect, useState } from "react";
import { listUsers } from "@/services/users.service";
import { listVendors, updateVendorStatus } from "@/services/vendors.service";
import { listListings, approveListing, featureListing, updateListing } from "@/services/listings.service";
import { listItems, approveItem, featureItem, updateItem } from "@/services/marketplace.service";
import { listBookings } from "@/services/bookings.service";
import { listPayments, updatePaymentStatus } from "@/services/payments.service";
import { listPosts, approvePost, deletePost } from "@/services/posts.service";
import { listReviews, deleteReview } from "@/services/reviews.service";
import { listTickets, updateTicketStatus } from "@/services/support.service";
import { getAnalytics } from "@/services/analytics.service";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [u, v, l, m, b, p, po, r, t] = await Promise.all([
          listUsers(),
          listVendors(),
          listListings(),
          listItems(),
          listBookings(),
          listPayments(),
          listPosts(),
          listReviews(),
          listTickets(),
        ]);
        setUsers(u); setVendors(v); setListings(l); setItems(m); setBookings(b); setPayments(p); setPosts(po); setReviews(r); setTickets(t);
      } finally { setLoading(false); }
    })();
  }, []);

  const [analytics, setAnalytics] = useState<any[]>([]);
  useEffect(() => {
    (async ()=>{
      try { setAnalytics(await getAnalytics()); } catch {}
    })();
  }, []);

  return (
    <AuthGuard>
      <AdminGuard>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {loading ? (<div>Loading...</div>) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold">Analytics (Recent Events)</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Type</th><th className="text-left p-2">Action</th><th className="text-left p-2">When</th></tr></thead>
                  <tbody>
                    {analytics.slice(0, 10).map((a) => (
                      <tr key={a._id} className="border-b">
                        <td className="p-2">{a.type}</td>
                        <td className="p-2">{a.action}</td>
                        <td className="p-2">{new Date(a.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Users</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Name</th><th className="text-left p-2">Email</th><th className="text-left p-2">Role</th><th className="text-left p-2">Status</th></tr></thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b">
                        <td className="p-2">{u.name}</td>
                        <td className="p-2">{u.email}</td>
                        <td className="p-2">{u.role}</td>
                        <td className="p-2">Active</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Vendors</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Name</th><th className="text-left p-2">Type</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {vendors.map((v) => (
                      <tr key={v._id} className="border-b">
                        <td className="p-2">{v.name}</td>
                        <td className="p-2">{v.type}</td>
                        <td className="p-2">{v.status}</td>
                        <td className="p-2 space-x-2">
                          <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={async () => { await updateVendorStatus(v._id, "approved"); setVendors(await listVendors()); }}>Approve</button>
                          <button className="px-2 py-1 bg-yellow-600 text-white rounded" onClick={async () => { await updateVendorStatus(v._id, "rejected"); setVendors(await listVendors()); }}>Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Listings</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Title</th><th className="text-left p-2">Location</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {listings.map((l) => (
                      <tr key={l._id} className="border-b">
                        <td className="p-2">{l.title}</td>
                        <td className="p-2">{l.location}</td>
                        <td className="p-2">{l.status}</td>
                        <td className="p-2 space-x-2">
                          <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={async () => { await approveListing(l._id); setListings(await listListings()); }}>Approve</button>
                          <button className="px-2 py-1 bg-yellow-600 text-white rounded" onClick={async () => { await updateListing(l._id, { status: "rejected" }); setListings(await listListings()); }}>Reject</button>
                          <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={async () => { await featureListing(l._id); setListings(await listListings()); }}>Feature</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Marketplace Items</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Title</th><th className="text-left p-2">Price</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {items.map((i) => (
                      <tr key={i._id} className="border-b">
                        <td className="p-2">{i.title}</td>
                        <td className="p-2">{i.price}</td>
                        <td className="p-2">{i.status}</td>
                        <td className="p-2 space-x-2">
                          <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={async () => { await approveItem(i._id); setItems(await listItems()); }}>Approve</button>
                          <button className="px-2 py-1 bg-yellow-600 text-white rounded" onClick={async () => { await updateItem(i._id, { status: "rejected" }); setItems(await listItems()); }}>Reject</button>
                          <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={async () => { await featureItem(i._id); setItems(await listItems()); }}>Feature</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Bookings</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Listing</th><th className="text-left p-2">Date</th><th className="text-left p-2">Status</th></tr></thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id} className="border-b">
                        <td className="p-2">{b.listingId}</td>
                        <td className="p-2">{new Date(b.date).toLocaleString()}</td>
                        <td className="p-2">{b.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Payments</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Amount</th><th className="text-left p-2">Method</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p._id} className="border-b">
                        <td className="p-2">{p.amount}</td>
                        <td className="p-2">{p.method}</td>
                        <td className="p-2">{p.status}</td>
                        <td className="p-2 space-x-2">
                          <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={async () => { await updatePaymentStatus(p._id, "completed"); setPayments(await listPayments()); }}>Confirm</button>
                          <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={async () => { await updatePaymentStatus(p._id, "failed"); setPayments(await listPayments()); }}>Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Community Posts</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Content</th><th className="text-left p-2">Date</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {posts.map((po) => (
                      <tr key={po._id} className="border-b">
                        <td className="p-2">{po.content?.slice(0, 50)}</td>
                        <td className="p-2">{new Date(po.createdAt).toLocaleString()}</td>
                        <td className="p-2">{po.status || "pending"}</td>
                        <td className="p-2 space-x-2">
                          <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={async () => { await approvePost(po._id); setPosts(await listPosts()); }}>Approve</button>
                          <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={async () => { await deletePost(po._id); setPosts(await listPosts()); }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Rating</th><th className="text-left p-2">Comment</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {reviews.map((r) => (
                      <tr key={r._id} className="border-b">
                        <td className="p-2">{r.rating ?? "N/A"}</td>
                        <td className="p-2">{r.comment}</td>
                        <td className="p-2">
                          <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={async () => { await deleteReview(r._id); setReviews(await listReviews()); }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Support Tickets</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead><tr><th className="text-left p-2">Subject</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t._id} className="border-b">
                        <td className="p-2">{t.subject}</td>
                        <td className="p-2">{t.status}</td>
                        <td className="p-2 space-x-2">
                          <button className="px-2 py-1 bg-indigo-600 text-white rounded" onClick={async () => { await updateTicketStatus(t._id, "in_progress"); setTickets(await listTickets()); }}>In Progress</button>
                          <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={async () => { await updateTicketStatus(t._id, "closed"); setTickets(await listTickets()); }}>Resolve</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
      </AdminGuard>
    </AuthGuard>
  );
}


