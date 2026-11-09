'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CustomerStorefront() {
  const [cartCount, setCartCount] = useState(1);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase text-orange-700">Company A • Hyderabad</span>
            <h1 className="text-2xl font-black">Nizam&apos;s Direct Ordering App</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/kds" className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm">
              Open KDS Screen →
            </Link>
            <Link href="/admin" className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-sm">
              Admin CMS
            </Link>
          </div>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Chicken Dum Biryani Family Pack</h2>
              <p className="text-sm text-stone-500">FSSAI Lic. No: 13621011000412 • Includes 5% GST</p>
            </div>
            <span className="text-xl font-black text-orange-700">₹880</span>
          </div>
          <p className="text-sm text-stone-600">
            Slow-cooked kachchi yakhni basmati biryani with 4 tender pieces, raita, and mirchi ka salan.
          </p>
          <button
            onClick={() => setCartCount(cartCount + 1)}
            className="px-6 py-3 bg-orange-700 text-white font-bold rounded-xl hover:bg-orange-800 transition"
          >
            Add to Cart ({cartCount})
          </button>
        </section>
      </div>
    </main>
  );
}