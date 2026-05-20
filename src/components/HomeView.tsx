/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MenuItem, Screen } from '../types';
import { PROMO_ITEMS } from '../data';
import { ArrowRight, Download, CheckCircle, Tag } from 'lucide-react';

interface HomeViewProps {
  onScreenChange: (screen: Screen) => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function HomeView({ onScreenChange, onAddToCart }: HomeViewProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1 className="font-display-xl text-5xl md:text-6xl text-on-secondary-fixed uppercase leading-tight tracking-tight">
            Nikmati Kelezatan Ayam Goreng KFC
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary">
            Rahasia 11 bumbu, renyah di luar, juicy di dalam.
          </p>
          <button
            id="hero-order-now-btn"
            onClick={() => onScreenChange('MENU')}
            className="bg-primary text-on-primary font-label-bold text-label-bold uppercase px-8 py-4 rounded-full hover:bg-primary-container transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer duration-200"
          >
            Pesan Sekarang
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative group"
        >
          {/* Card Backplate Sticker */}
          <div className="absolute inset-0 bg-secondary-fixed rounded-full transform -translate-x-4 translate-y-4 -z-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-300"></div>
          
          <img 
            className="w-full h-auto rounded-xl border-2 border-on-secondary-fixed shadow-md transform group-hover:scale-[1.01] transition-transform duration-300" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMQHZinXPuqLBSap4z9CcaloegO1F9lAI9GfsKqWNtCVlKvmqUhGuEWb9t8JmwJc9AQ8Z_oEZpEzm870zvyavmkRS40VHOnoCSuTE7p-4QMyUpeiSp_wePuOc0fY-hTgEfo_MMkJAOJSTWw1D1uQ_A2Erp5UZXphZcqxY6tZrd-DwkpfweiEn1XP68Xh11fqy9ZsvqgyxVfjPU_HtAkM-troX6c9Co_WKVcXbEUnQhnsHp9uqtA-zr0n1xlLe_j3nPIKhWqc2BRdiF" 
            alt="Crispy Fried Chicken Bucket"
          />
        </motion.div>
      </section>

      {/* Promo Section ("Spesial Untukmu") */}
      <section className="bg-secondary-fixed py-16 md:py-24 border-t-2 border-b-2 border-on-secondary-fixed">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-20px" }}
            className="font-headline-lg text-headline-lg uppercase text-on-secondary-fixed mb-12 text-center"
          >
            Spesial Untukmu
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {PROMO_ITEMS.map((promo, idx) => {
              const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
              }).format(promo.price).replace('Rp', 'Rp ');

              return (
                <motion.div
                  key={promo.id}
                  id={`promo-card-${promo.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface border-2 border-on-secondary-fixed rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(29,28,19,1)] hover:shadow-[6px_6px_0px_0px_rgba(29,28,19,1)]"
                >
                  <div className="h-56 md:h-64 bg-gray-200 relative overflow-hidden">
                    <img 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
                      src={promo.image} 
                      alt={promo.name}
                    />
                    {promo.isHemat && (
                      <div className="absolute top-4 right-4 bg-primary text-on-primary font-label-bold text-xs px-4 py-2 rounded-full uppercase flex items-center gap-1 shadow-md">
                        <Tag className="w-3.h-3" />
                        Hemat
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="font-headline-md text-headline-md uppercase text-on-secondary-fixed mb-2">
                      {promo.name}
                    </h3>
                    <p className="font-body-md text-body-md text-tertiary mb-6 min-h-[3rem]">
                      {promo.description}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-headline-md text-headline-md text-primary text-2xl">
                        {formattedPrice}
                      </span>
                      <button
                        onClick={() => onAddToCart(promo)}
                        className="border-2 border-on-secondary-fixed text-on-secondary-fixed font-label-bold text-label-bold px-6 py-2 rounded-full uppercase hover:bg-on-secondary-fixed hover:text-surface active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        Pesan
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pre-Footer Action Banner (App Promo) */}
      <section className="bg-on-secondary-fixed py-16 md:py-20 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-20px" }}
            className="font-display-xl text-4xl md:text-5xl uppercase text-surface leading-none"
          >
            ORDER ONLINE VIA APLIKASI
          </motion.h2>
          <p className="font-body-lg text-body-lg text-secondary-fixed-dim">
            Dapatkan promo eksklusif dan kemudahan pesan antar langsung dari smartphone Anda.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Aplikasi sedang diunduh! Terima kasih telah menggunakan KFC Mobile App.")}
            className="bg-primary text-on-primary font-headline-md text-headline-md uppercase px-10 py-4 rounded-full hover:bg-primary-container transition-colors active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5 animate-bounce" />
            Unduh Sekarang
          </motion.button>
        </div>
      </section>
    </div>
  );
}
