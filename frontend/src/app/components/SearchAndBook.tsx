"use client";

import { useState } from "react";
import { listListings, checkAvailability } from "@/services/listings.service";
import { createBooking } from "@/services/bookings.service";
import { confirmManualPayment } from "@/services/payments.service";
import { useSessionStore } from "@/store/useSessionStore";
import { useRouter } from "next/navigation";

export default function SearchAndBook() {
  const router = useRouter();
  const { user, session } = useSessionStore();
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

  const onSearch = async () => {
    setLoading(true);
    try {
      const data = await listListings({ q, location });
      setResults(data);
      setAvailability({});
    } finally {
      setLoading(false);
    }
  };

  const onCheck = async (id: string) => {
    if (!date) return;
    const { available } = await checkAvailability(id, date);
    setAvailability((prev) => ({ ...prev, [id]: available }));
  };

  const onBook = async (listingId: string) => {
    if (!user || !session) {
      router.push("/login");
      return;
    }
    if (!date) return;
    setBookingLoading(listingId);
    try {
      const booking = await createBooking({ listingId, date });
      // MVP: Immediately create a manual payment record
      await confirmManualPayment({ bookingId: booking._id, amount: 0, method: "cash" });
      alert("Booking created. Manual payment recorded (MVP). Admin will confirm.");
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-3">Find Listings and Book</h2>
        <div className="bg-slate-100 rounded-lg p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input value={q} onChange={(e)=>setQ(e.target.value)} className="px-3 py-2 rounded border" placeholder="Search keywords" />
            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="px-3 py-2 rounded border" placeholder="Location" />
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="px-3 py-2 rounded border" />
            <button onClick={onSearch} className="px-3 py-2 rounded bg-blue-600 text-white">{loading ? "Searching..." : "Search"}</button>
          </div>
          <div className="text-xs text-slate-500">Select a date, check availability, then book (manual payment in MVP).</div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((r)=> (
            <div key={r._id} className="border rounded p-4 bg-white shadow-sm">
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm text-slate-600">{r.location}</div>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-2 bg-emerald-600 text-white rounded" onClick={()=> onCheck(r._id)}>Check Availability</button>
                <button disabled={!availability[r._id]} className="px-3 py-2 bg-indigo-600 text-white rounded disabled:opacity-50" onClick={()=> onBook(r._id)}>
                  {bookingLoading === r._id ? "Booking..." : "Book"}
                </button>
              </div>
              {availability[r._id] !== undefined && (
                <div className="mt-2 text-sm">
                  {availability[r._id] ? (
                    <span className="text-emerald-700">Available on {date}</span>
                  ) : (
                    <span className="text-red-600">Not available on {date}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


