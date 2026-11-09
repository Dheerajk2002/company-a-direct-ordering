'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function KitchenDisplaySystem() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchKdsData = async () => {
    try {
      const res = await fetch('/api/store');
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKdsData();
    const interval = setInterval(fetchKdsData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 p-8 text-stone-200">Loading KDS live feed...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-stone-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div>
            <span className="text-xs font-bold uppercase text-amber-400">2-Metre Legible KDS • Kitchen Operations</span>
            <h1 className="text-2xl font-black">Active Kitchen Tickets</h1>
          </div>
          <Link href="/" className="px-4 py-2 bg-orange-700 text-white rounded-xl font-bold text-sm">
            ← Back to Storefront
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.orders?.map((order: any) => (
            <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xl font-mono font-black text-amber-400">{order.id}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
                  {order.status}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-stone-300">{order.outletName}</p>
                <p className="text-lg font-bold">{order.itemsSummary}</p>
              </div>
              <div className="text-xs text-stone-400 pt-2 border-t border-slate-800 flex justify-between">
                <span>Placed: {order.placedAtDisplay}</span>
                <span>Promised: {order.promisedAtDisplay}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}