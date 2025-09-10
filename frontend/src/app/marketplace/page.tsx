"use client";

import { useEffect, useState } from "react";
import { listItems } from "@/services/marketplace.service";

export default function MarketplacePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setItems(await listItems()); } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      {loading ? (<div>Loading...</div>) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((i) => (
            <div key={i._id} className="border rounded p-4 bg-white shadow-sm">
              <div className="font-semibold">{i.title}</div>
              <div className="text-sm text-slate-600">${i.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


