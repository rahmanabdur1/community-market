"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getListing, checkAvailability } from "@/services/listings.service";
import { createBooking } from "@/services/bookings.service";
import { useSessionStore } from "@/store/useSessionStore";

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("listingId");
  const dateParam = params.get("date") || "";
  const { user } = useSessionStore();
  const [listing, setListing] = useState<any | null>(null);
  const [date, setDate] = useState(dateParam);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setListing(await getListing(id));
        if (dateParam) {
          const res = await checkAvailability(id, dateParam);
          setAvailable(res.available);
        }
      } finally { setLoading(false); }
    })();
  }, [id, dateParam]);

  const onNext = async () => {
    if (!id || !date) return;
    if (!user) { router.push("/login"); return; }
    // Proceed to payment step
    router.push(`/payment?listingId=${id}&date=${date}`);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!listing) return <div className="p-6">Listing not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Booking</h1>
      <div className="bg-slate-100 p-4 rounded">
        <div className="font-semibold">{listing.title}</div>
        <div className="text-sm text-slate-600">{listing.location}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="px-3 py-2 rounded border" />
        <button className="px-3 py-2 rounded bg-emerald-600 text-white" onClick={async ()=>{ if (!id || !date) return; const res = await checkAvailability(id, date); setAvailable(res.available); }}>Check Availability</button>
        <button className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50" disabled={!available} onClick={onNext}>Continue to Payment</button>
      </div>
      {available !== null && (
        <div className="text-sm">{available ? <span className="text-emerald-700">Available on {date}</span> : <span className="text-red-600">Not available on {date}</span>}</div>
      )}
    </div>
  );
}


