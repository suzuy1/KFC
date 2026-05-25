/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserSession } from '../types';
import { LogIn, LogOut, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

interface TopNavBarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  userSession: UserSession | null;
  onLogout: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function TopNavBar({
  currentScreen,
  onScreenChange,
  userSession,
  onLogout,
  cartCount,
  onOpenCart,
}: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Suppress complete navbar in LOGIN or REGISTER states to conform to 'transactional intent'
  if (currentScreen === 'LOGIN' || currentScreen === 'REGISTER') {
    return (
      <header className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          <button 
            onClick={() => onScreenChange('HOME')}
            className="font-display-xl text-3xl font-bold text-primary uppercase tracking-tighter"
          >
            KFC Indonesia
          </button>
          
          <button
            onClick={() => onScreenChange('HOME')}
            className="text-label-bold uppercase text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
          >
            Kembali ke Beranda
          </button>
        </div>
      </header>
    );
  }

  const navLinks: { id: Screen; label: string }[] = [
    { id: 'HOME', label: 'Home' },
    { id: 'MENU', label: 'Menu' },
    { id: 'PROMO', label: 'Promo' },
    { id: 'LOCATION', label: 'Location' },
  ];

  return (
    <nav className="bg-surface fixed top-0 w-full z-50 border-b-2 border-secondary-fixed shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Brand Name / Logo */}
        <button
          id="brand-logo"
          onClick={() => onScreenChange('HOME')}
          className="font-display-xl font-bold text-primary uppercase tracking-tighter cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded text-2xl md:text-3xl lg:text-[32px]"
        >
          KFC Indonesia
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.id;
            return (
              <button
                key={link.id}
                id={`nav-${link.id.toLowerCase()}`}
                onClick={() => onScreenChange(link.id)}
                className={`font-label-bold text-label-bold uppercase active:scale-95 transition-all text-sm pb-1 relative cursor-pointer ${
                  isActive
                    ? 'text-primary border-b-4 border-primary'
                    : 'text-on-surface hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right Interactions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Cart Icon trigger */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            className="relative p-2 text-on-surface hover:text-primary transition-colors cursor-pointer rounded-full hover:bg-gray-100"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* User state */}
          {userSession ? (
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-sm font-semibold text-on-surface">
                Halo, {userSession.fullName.split(' ')[0]}!
              </span>
              <button
                id="logout-btn"
                onClick={onLogout}
                className="text-gray-500 hover:text-primary transition-colors font-label-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          ) : (
            <button
              id="login-btn-header"
              onClick={() => onScreenChange('LOGIN')}
              className="hidden md:block bg-primary text-on-primary font-label-bold text-label-bold uppercase px-6 py-3 rounded-full hover:bg-primary-container transition-all active:scale-95 shadow-sm hover:shadow cursor-pointer"
            >
              Login
            </button>
          )}

          {/* Mobile Menu trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface hover:text-primary transition-colors cursor-pointer rounded-full"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t-2 border-secondary-fixed bg-surface px-4 py-4 space-y-3 absolute top-20 left-0 w-full shadow-lg z-40 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map((link) => {
                const isActive = currentScreen === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onScreenChange(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-3 px-4 rounded font-label-bold text-label-bold uppercase text-center transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-white border border-gray-200 text-on-surface hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {userSession ? (
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface">
                  Masuk sebagai: {userSession.fullName}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-primary font-label-bold text-xs uppercase flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onScreenChange('LOGIN');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-white text-center py-3 rounded font-label-bold text-label-bold uppercase hover:bg-primary-container mt-4"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
