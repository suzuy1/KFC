/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROMO_ITEMS } from '../data';
import { MenuItem } from '../types';
import { Ticket, Gift, Check, Clock, ShieldCheck, Tag } from 'lucide-react';

interface PromoViewProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function PromoView({ onAddToCart }: PromoViewProps) {
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const coupons = [
    { code: 'JFCRISPY11', discount: 'Diskon 11%', desc: 'Berlaku untuk seluruh menu bucket ayam dengan minimal order Rp 100K.', expiry: '31 Des 2026' },
    { code: 'SUPERMAN', discount: 'Potongan Rp 15.000', desc: 'Diskon spesial menu Combo Super Star hanya lewat pesanan aplikasi.', expiry: '15 Jan 2027' },
    { code: 'FREEKOC', discount: 'Gratis Coca-Cola Float', desc: 'Tambahan minuman dingin tiap pembelian 2 paket Zinger Burger.', expiry: '30 Nov 2026' }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => {
      setCopiedCoupon(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-display-xl text-4xl md:text-5xl text-on-secondary-fixed uppercase mb-3">
          Promo Terkini KFC
        </h1>
        <p className="font-body-md text-body-md text-tertiary">
          Dapatkan untung melimpah dan harga paling hemat menggunakan kupon digital serta promo menu khusus di bawah ini.
        </p>
      </div>

      {/* Exquisite Digital Coupons section */}
      <div className="mb-16">
        <h2 className="font-headline-md text-headline-md uppercase text-on-surface mb-8 flex items-center gap-2">
          <Ticket className="w-6 h-6 text-primary" />
          Kupon Eksklusif Aplikasi
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon, idx) => {
            const isCopied = copiedCoupon === coupon.code;
            return (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border-2 border-dashed border-red-300 rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden shadow-sm"
              >
                {/* Visual side holes to mimic coupon tickets */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-surface border-r-2 border-dashed border-red-350 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-surface border-l-2 border-dashed border-red-350 transform -translate-y-1/2"></div>

                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-red-50 text-primary text-xs font-bold px-3 py-1 rounded-md uppercase">
                      Code
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold">
                      <Clock className="w-3.h-3" />
                      Hingga {coupon.expiry}
                    </span>
                  </div>

                  <h3 className="font-headline-md text-xl text-primary uppercase mb-2">
                    {coupon.discount}
                  </h3>
                  <p className="text-xs text-gray-500 font-body-md leading-relaxed mb-6">
                    {coupon.desc}
                  </p>
                </div>

                <div className="flex gap-2 w-full pt-4 border-t border-dashed border-gray-100">
                  <span className="bg-gray-100 border border-gray-200 text-on-surface font-mono font-bold text-sm h-11 px-4 flex items-center rounded-lg flex-grow tracking-wider">
                    {coupon.code}
                  </span>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className={`h-11 px-5 rounded-lg text-xs font-label-bold uppercase flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-primary text-white hover:bg-primary-container'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Promo Foods section */}
      <div>
        <h2 className="font-headline-md text-headline-md uppercase text-on-surface mb-8 flex items-center gap-2">
          <Gift className="w-6 h-6 text-primary" />
          Menu Promo Spesial Saat Ini
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {PROMO_ITEMS.map((item) => {
            const formattedPrice = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(item.price).replace('Rp', 'Rp ');

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
              >
                <div className="md:w-1/2 h-56 md:h-auto bg-gray-100 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.isHemat && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow">
                      <Tag className="w-3 h-3" />
                      Hemat
                    </div>
                  )}
                </div>

                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-headline-md uppercase text-on-surface mb-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs font-body-md text-gray-500 mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-150">
                    <span className="font-headline-md text-xl text-primary">
                      {formattedPrice}
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="bg-primary hover:bg-primary-container text-white py-2 px-6 rounded-full text-xs font-label-bold uppercase transition-colors"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
