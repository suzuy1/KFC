/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingCart, CheckCircle } from 'lucide-react';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export default function CartOverlay({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}: CartOverlayProps) {
  const [checkoutStep, setCheckoutStep] = useState<'CART' | 'PROCESSING' | 'SUCCESS'>('CART');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'DEBIT' | 'EWALLET'>('CASH');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% PPN
  const delivery = subtotal > 0 ? 15000 : 0;
  const total = subtotal + tax + delivery;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })
      .format(val)
      .replace('Rp', 'Rp ');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      alert('Mohon masukkan alamat pengiriman lengkap Anda.');
      return;
    }
    setCheckoutStep('PROCESSING');
    setTimeout(() => {
      setCheckoutStep('SUCCESS');
    }, 2000);
  };

  const handleCompleteSuccess = () => {
    onClearCart();
    setCheckoutStep('CART');
    setAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-surface">
              <div className="flex items-center gap-2 text-primary font-headline-md text-headline-md uppercase">
                <ShoppingCart className="w-5 h-5" />
                <span>Keranjang Belanja</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-grow overflow-y-auto p-6">
              {checkoutStep === 'CART' && (
                <>
                  {cartItems.length > 0 ? (
                    <div className="space-y-6">
                      {/* Cart Items list */}
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex gap-4 border-b border-gray-100 pb-4 items-center"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            />
                            <div className="flex-grow">
                              <h4 className="font-semibold text-on-surface text-sm line-clamp-1 uppercase">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-primary font-bold mt-0.5">
                                {formatPrice(item.product.price)}
                              </p>

                              {/* Quantity management */}
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-semibold w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Delete Action button */}
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 0)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Checkout / Address form trigger */}
                      <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="font-label-bold text-label-bold text-on-surface uppercase">
                          Informasi Pengiriman
                        </h4>

                        <div>
                          <label className="block text-xs uppercase text-gray-500 mb-1 font-semibold">
                            Alamat Lengkap Pengiriman *
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Tulis alamat rumah, lantai, no. rumah, patokan detail di sini..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-surface-container border border-gray-300 rounded px-3 py-2 text-xs font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold">
                            Metode Pembayaran
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {([
                              { id: 'CASH', label: 'Tunai (COD)' },
                              { id: 'DEBIT', label: 'Transfer Bank' },
                              { id: 'EWALLET', label: 'E-Wallet' },
                            ] as const).map((method) => {
                              const isActive = paymentMethod === method.id;
                              return (
                                <button
                                  key={method.id}
                                  type="button"
                                  onClick={() => setPaymentMethod(method.id)}
                                  className={`py-2 px-1 border text-[10px] uppercase font-bold text-center rounded transition-colors cursor-pointer ${
                                    isActive
                                      ? 'bg-primary border-primary text-white'
                                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {method.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Calculations card */}
                        <div className="bg-surface-container rounded-xl p-4 space-y-2 mt-4 text-xs font-body-md border border-gray-200">
                          <div className="flex justify-between text-gray-500">
                            <span>Subtotal:</span>
                            <span>{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Pajak Restoran (10%):</span>
                            <span>{formatPrice(tax)}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Biaya Layanan Antar:</span>
                            <span>{formatPrice(delivery)}</span>
                          </div>
                          <div className="flex justify-between font-headline-md text-sm text-primary pt-2 border-t border-gray-200">
                            <span>TOTAL HARGA:</span>
                            <span>{formatPrice(total)}</span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-primary text-white hover:bg-primary-container text-headline-md font-headline-md uppercase py-4 rounded-full shadow transition-transform duration-200 cursor-pointer active:scale-95 text-center block mt-4"
                        >
                          PROSES PEMESANAN
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mb-4 stroke-1" />
                      <p className="text-gray-500 font-body-md text-medium mb-1">
                        Keranjang belanjamu masih kosong.
                      </p>
                      <p className="text-gray-400 font-body-md text-xs">
                        Silakan pilih menu lezat di tab Menu untuk mulai memesan!
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 border-2 border-primary text-primary hover:bg-red-50 text-xs font-label-bold uppercase py-2.5 px-6 rounded-full cursor-pointer transition-colors"
                      >
                        Pilih Menu Sekarang
                      </button>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'PROCESSING' && (
                <div className="text-center py-20 flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-6"></div>
                  <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-2">
                    Menghubungi Outlet KFC...
                  </h3>
                  <p className="font-body-md text-xs text-gray-500 max-w-sm">
                    Mohon tunggu beberapa saat selagi kami memproses pesanan Anda dan menetapkan kurir pengantar.
                  </p>
                </div>
              )}

              {checkoutStep === 'SUCCESS' && (
                <div className="text-center py-16 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
                  </motion.div>
                  <h3 className="font-headline-md text-headline-md text-green-700 uppercase mb-2">
                    Pesanan Berhasil!
                  </h3>
                  <p className="font-body-lg text-body-lg font-bold text-on-surface mb-4">
                    Nomor Transaksi: KFC-ORD-{(Math.random() * 100000).toFixed(0)}
                  </p>
                  <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 text-xs font-body-md text-left text-gray-600 mb-6 w-full space-y-2">
                    <div>
                      <strong>Alamat Pengiriman:</strong>
                      <p className="text-on-surface mt-0.5">{address}</p>
                    </div>
                    <div>
                      <strong>Estimasi Waktu Tiba:</strong>
                      <p className="text-primary font-bold">25 - 35 Menit</p>
                    </div>
                    <div>
                      <strong>Metode Pembayaran:</strong>
                      <p className="text-on-surface">{paymentMethod === 'CASH' ? 'Tunai di tempat (COD)' : paymentMethod === 'DEBIT' ? 'Transfer Bank' : 'Dompet Digital'}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCompleteSuccess}
                    className="w-full bg-primary hover:bg-primary-container text-white font-label-bold text-label-bold uppercase py-3.5 rounded-full cursor-pointer transition-transform"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
