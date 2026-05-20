/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Screen, UserSession } from '../types';
import { User, Mail, Smartphone, Lock, RefreshCw, ArrowRight } from 'lucide-react';

interface RegisterViewProps {
  onScreenChange: (screen: Screen) => void;
  onRegisterSuccess: (session: UserSession) => void;
}

export default function RegisterView({ onScreenChange, onRegisterSuccess }: RegisterViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Mohon lengkapi seluruh kolom formulir.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Konfirmasi Password tidak cocok dengan Password baru Anda.');
      return;
    }

    if (password.length < 8) {
      alert('Password minimal memiliki panjang 8 karakter.');
      return;
    }

    const newUserSession: UserSession = {
      fullName,
      email,
      phone,
    };

    onRegisterSuccess(newUserSession);
    alert(`Pendaftaran Berhasil! Selamat bergabung di KFC Indonesia, ${fullName}.`);
    onScreenChange('HOME');
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 md:px-8 mt-24 md:mt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 bg-surface-container-lowest shadow-xl rounded-xl overflow-hidden border border-outline-variant"
      >
        {/* Left Side: Photo & Branding */}
        <div className="relative hidden md:block h-full min-h-[600px] bg-secondary-fixed">
          <img
            alt="KFC Fried Chicken"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByCLDK29uWXeOzQKmwZIO41udaWKX40Pz8DSo2ousEj0NlYW9qpYm9mlJRsi7koBuJH2mTbuBsyUX1dbAV_PXGSs6urot6xEH6UQWSHxdlY2xhqTC2aLXAjEMzqk-sSkf_tvBBy4KFWs7k9kS_cJl0xG9fL8gzbD57FH_tSynkBarc0tv9rYeTqXayeJUbLItUr5auD4C--gbv00Kqk0DsAheTwkFrUkFTHLq0yBwSOpJ2ob08I8NP2rBuSpqIkSqVihB0aaRLB7gS"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/80 to-transparent flex items-end p-12">
            <div className="text-on-primary">
              <h2 className="font-headline-lg text-headline-lg mb-2 text-white uppercase text-4xl leading-tight">
                CRISPY.
                <br />
                JUICY.
                <br />
                KFC.
              </h2>
              <p className="font-body-lg text-body-lg text-gray-200">Jagonya Ayam!</p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="mb-8 text-center md:text-left">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2 uppercase select-none">
              Daftar Akun Baru
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant text-gray-500">
              Bergabunglah dengan keluarga KFC dan nikmati berbagai promo menarik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2 uppercase cursor-pointer" htmlFor="nama">
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                  <User className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-on-secondary-fixed rounded-DEFAULT bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary font-body-md text-sm transition-colors"
                  id="nama"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2 uppercase cursor-pointer" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-on-secondary-fixed rounded-DEFAULT bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary font-body-md text-sm transition-colors"
                  id="email"
                  type="email"
                  required
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Nomor HP */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2 uppercase cursor-pointer" htmlFor="phone">
                Nomor HP
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                  <Smartphone className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-on-secondary-fixed rounded-DEFAULT bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary font-body-md text-sm transition-colors"
                  id="phone"
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2 uppercase cursor-pointer" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-on-secondary-fixed rounded-DEFAULT bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary font-body-md text-sm transition-colors"
                  id="password"
                  type="password"
                  required
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2 uppercase cursor-pointer" htmlFor="confirm_password">
                Konfirmasi Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                  <RefreshCw className="w-5 h-5" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-on-secondary-fixed rounded-DEFAULT bg-surface-container-lowest text-on-surface focus:ring-primary focus:border-primary font-body-md text-sm transition-colors"
                  id="confirm_password"
                  type="password"
                  required
                  placeholder="Ulangi password Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full bg-primary hover:bg-surface-tint text-on-primary font-label-bold text-label-bold uppercase py-4 px-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer font-bold"
                type="submit"
              >
                <span>Daftar</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="font-body-md text-xs text-on-surface-variant text-gray-500">
              Sudah punya akun?{' '}
              <button
                onClick={() => onScreenChange('LOGIN')}
                className="text-primary font-label-bold text-label-bold hover:underline ml-1 cursor-pointer bg-transparent border-none p-0 inline-block font-semibold"
              >
                Login di sini
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
