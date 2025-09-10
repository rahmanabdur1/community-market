"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getListing } from "@/services/listings.service";
import { createBooking } from "@/services/bookings.service";
import { confirmManualPayment } from "@/services/payments.service";
import { useSessionStore } from "@/store/useSessionStore";

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useSessionStore();
  const listingId = params.get("listingId");
  const date = params.get("date") || "";
  const [listing, setListing] = useState<any | null>(null);
  const [method, setMethod] = useState("cash");
  const [amount, setAmount] = useState<number | string>(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!listingId) return;
    (async () => { setListing(await getListing(listingId)); })();
  }, [listingId]);

  const onSubmit = async () => {
    if (!user) { router.push("/login"); return; }
    if (!listingId || !date) return;
    setSubmitting(true);
    try {
      const booking = await createBooking({ listingId, date });
      await confirmManualPayment({ bookingId: booking._id, amount: Number(amount) || 0, method });
      router.push("/dashboard/customer");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manual Payment</h1>
      {listing && (
        <div className="bg-slate-100 p-4 rounded">
          <div className="font-semibold">{listing.title}</div>
          <div className="text-sm text-slate-600">{listing.location}</div>
          <div className="text-sm">Date: {date}</div>
        </div>
      )}
      <div className="space-y-3">
        <div>
          <label className="text-sm block mb-1">Amount</label>
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} className="px-3 py-2 rounded border w-full" placeholder="0" />
        </div>
        <div>
          <label className="text-sm block mb-1">Payment Method</label>
          <select value={method} onChange={(e)=>setMethod(e.target.value)} className="px-3 py-2 rounded border w-full">
            <option value="cash">Cash</option>
            <option value="bank">Bank Transfer</option>
            <option value="mobile">Mobile Banking</option>
          </select>
        </div>
        <button onClick={onSubmit} disabled={submitting} className="px-3 py-2 rounded bg-emerald-600 text-white">{submitting ? "Submitting..." : "Submit Payment"}</button>
      </div>
    </div>
  );
}


