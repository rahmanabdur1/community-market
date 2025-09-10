"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useEffect, useState } from "react";
import { listListings, createListing, updateListing } from "@/services/listings.service";
import { listItems, createItem, updateItem } from "@/services/marketplace.service";
import { listBookings } from "@/services/bookings.service";

export default function VendorDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [l, m, b] = await Promise.all([
          listListings(),
          listItems(),
          listBookings(),
        ]);
        setListings(l); setItems(m); setBookings(b);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <AuthGuard>
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        {loading ? (<div>Loading...</div>) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold">My Listings</h2>
              <button className="px-3 py-2 bg-blue-600 text-white rounded mb-2" onClick={async ()=>{ await createListing({ title: "New Listing" }); setListings(await listListings()); }}>Add Listing</button>
              <div className="overflow-auto">
                <table className="min-w-full text-sm"><thead><tr><th className="text-left p-2">Title</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {listings.map((l)=> (
                      <tr key={l._id} className="border-b">
                        <td className="p-2">{l.title}</td>
                        <td className="p-2">{l.status}</td>
                        <td className="p-2"><button className="px-2 py-1 bg-gray-700 text-white rounded" onClick={async ()=>{ await updateListing(l._id, { title: l.title }); setListings(await listListings()); }}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Marketplace Items</h2>
              <button className="px-3 py-2 bg-blue-600 text-white rounded mb-2" onClick={async ()=>{ await createItem({ title: "New Item", price: 0 }); setItems(await listItems()); }}>Add Item</button>
              <div className="overflow-auto">
                <table className="min-w-full text-sm"><thead><tr><th className="text-left p-2">Name</th><th className="text-left p-2">Price</th><th className="text-left p-2">Status</th><th className="text-left p-2">Actions</th></tr></thead>
                  <tbody>
                    {items.map((i)=> (
                      <tr key={i._id} className="border-b">
                        <td className="p-2">{i.title}</td>
                        <td className="p-2">{i.price}</td>
                        <td className="p-2">{i.status}</td>
                        <td className="p-2"><button className="px-2 py-1 bg-gray-700 text-white rounded" onClick={async ()=>{ await updateItem(i._id, { title: i.title }); setItems(await listItems()); }}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Bookings</h2>
              <div className="overflow-auto">
                <table className="min-w-full text-sm"><thead><tr><th className="text-left p-2">Listing</th><th className="text-left p-2">Date</th><th className="text-left p-2">Status</th></tr></thead>
                  <tbody>
                    {bookings.map((b)=> (
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
          </div>
        )}
      </div>
    </AuthGuard>
  );
}


