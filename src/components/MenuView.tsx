/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';
import { Search, ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface MenuViewProps {
  onAddToCart: (item: MenuItem) => void;
}

type CategoryFilter = 'ALL' | 'CHICKEN' | 'BURGER' | 'SIDES' | 'DRINKS' | 'PROMO';

export default function MenuView({ onAddToCart }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'ALL', label: 'Tua Menu' },
    { id: 'CHICKEN', label: 'Ayam Goreng' },
    { id: 'BURGER', label: 'Burger' },
    { id: 'SIDES', label: 'Sampingan' },
    { id: 'DRINKS', label: 'Minuman' },
    { id: 'PROMO', label: 'Promo Spesial' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useGSAP(() => {
    // 1. Entrance animation (slow, smooth, staggered)
    gsap.fromTo('.menu-card', 
      { opacity: 0, y: 60, scale: 0.95 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power3.out",
        clearProps: "scale", // Clear scale for clean hovers later
      }
    );

    // 2. Parallax on Scroll (different speeds for cards)
    const parallaxWrappers = gsap.utils.toArray('.menu-parallax') as HTMLElement[];
    parallaxWrappers.forEach((wrapper, i) => {
      // Calculate a slight different speed for columns to give parallax feel
      // E.g., column 1 is normal, column 2 moves slightly faster
      const speedParam = (i % 3) * 0.12; 
      
      gsap.to(wrapper, {
        y: () => -120 * speedParam, // Move upwards extra amount
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom", // when the top of the card hits the bottom of the viewport
          end: "bottom top", // when the bottom of the card hits the top of the viewport
          scrub: 1, // smooth scrubbing
        }
      });
    });
  }, { scope: containerRef, dependencies: [filteredItems] });

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Menu Header with search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
        <div>
          <h1 className="font-display-xl text-4xl md:text-5xl text-on-secondary-fixed uppercase mb-2">
            Signature Menu Kami
          </h1>
          <p className="font-body-md text-body-md text-tertiary">
            Segar, gurih, dan lezat disiapkan langsung setiap harinya.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari makanan favoritmu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-on-secondary-fixed rounded-full py-3 pl-12 pr-4 text-sm font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        </div>
      </div>

      {/* Categories chips filter */}
      <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-gray-200">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 rounded-full text-label-bold text-sm uppercase transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white border-2 border-gray-100 hover:border-gray-300 text-on-secondary-fixed-variant'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Menu Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              })
                .format(item.price)
                .replace('Rp', 'Rp ');

              return (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="menu-parallax h-full"
                >
                  <div className="menu-card bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full opacity-0">
                    {/* Photo area */}
                    <div className="h-48 md:h-52 bg-gray-150 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    {item.isPopular && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <Flame className="w-3.5 h-3.5 fill-white text-white" />
                        Terlaris
                      </div>
                    )}
                    {item.isHemat && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        Hemat Pas
                      </div>
                    )}
                  </div>

                  {/* Body Copy */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md uppercase text-on-surface mb-2 leading-tight">
                        {item.name}
                      </h3>
                      <p className="font-body-md text-xs text-gray-500 line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center mt-auto">
                      <span className="font-headline-md text-lg text-primary">
                        {formattedPrice}
                      </span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="bg-primary hover:bg-primary-container text-white py-2 px-4 rounded-full text-xs font-label-bold uppercase flex items-center gap-1 transition-colors duration-200 active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Tambah
                      </button>
                    </div>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-body-md text-lg mb-2">
            Maaf, menu dengan kata kunci "<strong>{searchQuery}</strong>" tidak ditemukan.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('ALL');
            }}
            className="text-primary font-label-bold text-sm uppercase hover:underline mt-2"
          >
            Reset filter pencarian
          </button>
        </div>
      )}
    </div>
  );
}
