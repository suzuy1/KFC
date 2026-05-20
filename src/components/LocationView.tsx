/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_LOCATIONS, StoreLocation } from '../data';
import { Search, MapPin, Phone, Clock, Compass, Filter } from 'lucide-react';

export default function LocationView() {
  const [selectedCity, setSelectedCity] = useState<'ALL' | 'Jakarta' | 'Bandung' | 'Surabaya' | 'Medan' | 'Bali'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(STORE_LOCATIONS[0]);

  const cities = ['ALL', 'Jakarta', 'Bandung', 'Surabaya', 'Bali'];

  const filteredStores = STORE_LOCATIONS.filter((store) => {
    const matchesCity = selectedCity === 'ALL' || store.city === selectedCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
        <div>
          <h1 className="font-display-xl text-4xl md:text-5xl text-on-secondary-fixed uppercase mb-2">
            Temukan Outlet KFC Terdekat
          </h1>
          <p className="font-body-md text-body-md text-tertiary">
            Kunjungi gerai kami langsung atau cari tahu cakupan area pesan antar terdekat.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari nama gerai atau jalan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-on-secondary-fixed rounded-full py-3 pl-12 pr-4 text-sm font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        </div>
      </div>

      {/* City filter chips */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {cities.map((city) => {
          const isSelected = selectedCity === city;
          return (
            <button
              key={city}
              onClick={() => setSelectedCity(city as any)}
              className={`px-5 py-2.5 rounded-full text-label-bold text-xs uppercase cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-250 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {city === 'ALL' ? 'Semua Kota' : city}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Outlets Listing */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <h2 className="font-label-bold text-label-bold uppercase text-gray-500 tracking-wider mb-2 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-primary" />
            Gerai Terdaftar ({filteredStores.length})
          </h2>

          {filteredStores.length > 0 ? (
            filteredStores.map((store, idx) => {
              const isActive = selectedStore?.id === store.id;
              return (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (idx % 10) * 0.05 }}
                  onClick={() => setSelectedStore(store)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    isActive
                      ? 'border-primary bg-red-50/50'
                      : 'border-gray-250 bg-white hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-headline-md text-base text-on-surface uppercase mb-2">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-body-md line-clamp-2 mb-4">
                    {store.address}
                  </p>
                  
                  <div className="space-y-1 text-[11px] text-gray-500 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{store.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      <span>{store.phone}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-400 text-sm font-semibold">Tidak ada outlet yang cocok.</p>
            </div>
          )}
        </div>

        {/* Selected Outlet Interactive detail card with simulated google map */}
        <div className="lg:col-span-2">
          {selectedStore ? (
            <div className="bg-white border-2 border-on-secondary-fixed rounded-2xl overflow-hidden shadow-sm flex flex-col h-full min-h-[450px]">
              {/* Simulated Map Container with neat animations */}
              <div className="h-72 bg-neutral-200 relative flex items-center justify-center p-4">
                {/* Visual grid representing coordinates map background */}
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1d1c13 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                
                <motion.div
                  key={selectedStore.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring' }}
                  className="z-10 bg-white shadow-xl rounded-xl p-5 border border-red-150 max-w-sm text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full mb-3 shadow">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="font-headline-md text-base text-primary uppercase mb-1">
                    {selectedStore.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {selectedStore.address}
                  </p>
                  <p className="text-[10px] text-primary font-bold uppercase mt-2 tracking-wide">
                    {selectedStore.city} Location Pin
                  </p>
                </motion.div>

                {/* Grid Overlay Coordinates UI markers */}
                <div className="absolute top-4 left-4 bg-black/60 text-white font-mono text-[9px] px-2.5 py-1 rounded-md leading-none select-none">
                  LAT: -6.{(Math.random() * 9).toFixed(0)}19 · LNG: 106.{(Math.random() * 9).toFixed(0)}82
                </div>
                <div className="absolute bottom-4 right-4 bg-white border border-gray-350 text-gray-500 p-2.5 rounded-lg flex gap-1.5 shadow">
                  <Compass className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Compass Mode</span>
                </div>
              </div>

              {/* Action and details bar */}
              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-50 text-primary border border-red-200 text-[10px] font-bold px-3 py-1 rounded-md uppercase">
                      {selectedStore.city} Outlet
                    </span>
                    <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-ping"></span>
                      Gerai Buka
                    </span>
                  </div>

                  <h3 className="font-display-xl text-3xl text-on-secondary-fixed uppercase mb-3">
                    {selectedStore.name}
                  </h3>
                  <p className="font-body-md text-sm text-tertiary">
                    {selectedStore.address}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-150">
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pukul Operasional</h4>
                        <p className="text-sm font-semibold text-on-surface">{selectedStore.hours}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Nomor Telepon</h4>
                        <p className="text-sm font-semibold text-on-surface">{selectedStore.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-start md:justify-end">
                    <button
                      onClick={() => alert(`Menghubungi Outlet ${selectedStore.name}... Hubungi hotline di ${selectedStore.phone}`)}
                      className="bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold uppercase py-3.5 px-8 rounded-full shadow cursor-pointer transition-colors duration-200"
                    >
                      Hubungi Gerai Ini
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[450px] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 bg-white">
              <MapPin className="w-16 h-16 text-gray-300 stroke-1 mb-4" />
              <p className="text-gray-500 font-semibold text-center">Silakan pilih outlet di samping untuk melihat peta dan informasi kontak lengkap.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
