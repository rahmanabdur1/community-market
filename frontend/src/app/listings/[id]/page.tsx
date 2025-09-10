"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getListing, checkAvailability } from "@/services/listings.service";
import { createBooking } from "@/services/bookings.service";
import { confirmManualPayment } from "@/services/payments.service";
import { useSessionStore } from "@/store/useSessionStore";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, session } = useSessionStore();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any | null>(null);
  const [date, setDate] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getListing(id);
        setListing(data);
      } finally { setLoading(false); }
    })();
  }, [id]);

  const onCheck = async () => {
    if (!date || !id) return;
    const res = await checkAvailability(id, date);
    setAvailable(res.available);
  };

  const onBook = async () => {
    if (!user || !session) { router.push("/login"); return; }
    if (!date || !id || available === false) return;
    setBookingLoading(true);
    try {
      const booking = await createBooking({ listingId: id, date });
      await confirmManualPayment({ bookingId: booking._id, amount: 0, method: "cash" });
      alert("Booking created. Manual payment recorded (MVP). Admin will confirm.");
    } finally { setBookingLoading(false); }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!listing) return <div className="p-6">Listing not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{listing.title}</h1>
      <div className="text-slate-600">{listing.location}</div>
      <p className="text-slate-700">{listing.description}</p>

      <div className="bg-slate-100 rounded p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="px-3 py-2 rounded border" />
          <button onClick={onCheck} className="px-3 py-2 rounded bg-emerald-600 text-white">Check Availability</button>
          <button onClick={onBook} disabled={!available} className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">{bookingLoading ? "Booking..." : "Book"}</button>
        </div>
        {available !== null && (
          <div className="text-sm">{available ? <span className="text-emerald-700">Available on {date}</span> : <span className="text-red-600">Not available on {date}</span>}</div>
        )}
      </div>
    </div>
  );
}


