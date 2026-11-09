'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminCMS() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
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
    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#FAF8F5] p-8 text-stone-700">Loading Central Menu CMS...</div>;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase text-orange-700">Central CMS • Multi-Outlet Management</span>
            <h1 className="text-2xl font-black">Nizam&apos;s Operations & Pricing</h1>
          </div>
          <Link href="/" className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm">
            ← Back to Storefront
          </Link>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-4">
          <h2 className="text-lg font-bold">Active Outlets ({data?.outlets?.length || 0})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data?.outlets?.map((outlet: any) => (
              <div key={outlet.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <h3 className="font-bold text-base">{outlet.name}</h3>
                <p className="text-xs text-stone-600">Radius: {outlet.deliveryRadiusKm} km</p>
                <p className="text-xs text-stone-600 font-mono">FSSAI: {outlet.fssaiLicense}</p>
                <p className="text-xs font-semibold text-orange-700">Min Floor: {outlet.minPrepMinutes} mins</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}