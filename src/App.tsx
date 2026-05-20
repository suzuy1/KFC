/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Screen, MenuItem, CartItem, UserSession } from './types';
import TopNavBar from './components/TopNavBar';
import HomeView from './components/HomeView';

gsap.registerPlugin(ScrollTrigger);
import MenuView from './components/MenuView';
import PromoView from './components/PromoView';
import LocationView from './components/LocationView';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import CartOverlay from './components/CartOverlay';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('HOME');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Restore cart and login session from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('kfc_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedSession = localStorage.getItem('kfc_session');
      if (storedSession) {
        setUserSession(JSON.parse(storedSession));
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Save cart changes to localStorage
  const saveCartToLocal = (newCart: CartItem[]) => {
    setCartItems(newCart);
    try {
      localStorage.setItem('kfc_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (product: MenuItem) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [];

    if (existing) {
      updatedCart = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { product, quantity: 1 }];
    }

    saveCartToLocal(updatedCart);
    setCartOpen(true); // Slid open the cart on addition for great instant UX feedback!
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    let updatedCart: CartItem[] = [];
    if (quantity <= 0) {
      updatedCart = cartItems.filter((item) => item.product.id !== productId);
    } else {
      updatedCart = cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }
    saveCartToLocal(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToLocal([]);
  };

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    try {
      localStorage.setItem('kfc_session', JSON.stringify(session));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    try {
      localStorage.removeItem('kfc_session');
    } catch (e) {
      console.error(e);
    }
    alert('Anda telah berhasil keluar dari akun.');
    setActiveScreen('HOME');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll to top on tab transition to keep viewport anchored neatly
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Refresh ScrollTrigger after a short delay to account for exit/entrance animations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, [activeScreen]);

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-20">
      {/* Dynamic Header navbar */}
      <TopNavBar
        currentScreen={activeScreen}
        onScreenChange={setActiveScreen}
        userSession={userSession}
        onLogout={handleLogout}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main interactive screen workspace with smooth fade transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            {activeScreen === 'HOME' && (
              <HomeView
                onScreenChange={setActiveScreen}
                onAddToCart={handleAddToCart}
              />
            )}
            {activeScreen === 'MENU' && (
              <MenuView onAddToCart={handleAddToCart} />
            )}
            {activeScreen === 'PROMO' && (
              <PromoView onAddToCart={handleAddToCart} />
            )}
            {activeScreen === 'LOCATION' && <LocationView />}
            {activeScreen === 'LOGIN' && (
              <LoginView
                onScreenChange={setActiveScreen}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
            {activeScreen === 'REGISTER' && (
              <RegisterView
                onScreenChange={setActiveScreen}
                onRegisterSuccess={handleLoginSuccess}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Cart Slider Panel */}
      <CartOverlay
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Footer component matching Screen parameters exactly */}
      <footer className="bg-secondary-fixed w-full py-12 border-t-2 border-on-secondary-fixed">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <button
            onClick={() => setActiveScreen('HOME')}
            className="font-headline-md text-headline-md text-on-secondary-fixed uppercase text-2xl hover:text-primary transition-colors cursor-pointer"
          >
            KFC Indonesia
          </button>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => alert('Kebijakan Privasi: KFC Indonesia menjaga informasi akun Anda dengan aman.')}
              className="text-on-secondary-fixed-variant font-label-bold text-label-bold uppercase text-xs hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => alert('Syarat & Ketentuan: Penggunaan portal pemesanan diatur sesuai ketentuan hukum Republik Indonesia.')}
              className="text-on-secondary-fixed-variant font-label-bold text-label-bold uppercase text-xs hover:text-primary transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => alert('Hubungi Kami: Hubungi Costumer Service KFC Indonesia di hotline 14022.')}
              className="text-on-secondary-fixed-variant font-label-bold text-label-bold uppercase text-xs hover:text-primary transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveScreen('LOCATION')}
              className="text-on-secondary-fixed-variant font-label-bold text-label-bold uppercase text-xs hover:text-primary transition-colors cursor-pointer"
            >
              Store Locator
            </button>
          </div>

          <div className="font-body-md text-xs text-on-secondary-fixed-variant text-center md:text-right">
            © 2024 KFC Indonesia. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
