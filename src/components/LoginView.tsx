/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Screen, UserSession } from '../types';
import { Lock, Mail, Smartphone, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onScreenChange: (screen: Screen) => void;
  onLoginSuccess: (session: UserSession) => void;
}

export default function LoginView({ onScreenChange, onLoginSuccess }: LoginViewProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      alert('Mohon lengkapi seluruh field yang tersedia.');
      return;
    }

    // Capture simulated login session
    const simulatedSession: UserSession = {
      fullName: identifier.includes('@') ? identifier.split('@')[0] : 'KFC Customer',
      email: identifier.includes('@') ? identifier : 'customer@kfc.co.id',
      phone: identifier.includes('@') ? '081234567890' : identifier,
    };

    onLoginSuccess(simulatedSession);
    alert(`Selamat Datang Kembali, ${simulatedSession.fullName}! Login berhasil.`);
    onScreenChange('HOME');
  };

  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    const simulatedSession: UserSession = {
      fullName: provider === 'Google' ? 'Google User' : 'Facebook User',
      email: `${provider.toLowerCase()}@kfc.co.id`,
      phone: '081288889999',
    };
    onLoginSuccess(simulatedSession);
    alert(`Berhasil masuk menggunakan akun ${provider}!`);
    onScreenChange('HOME');
  };

  return (
    <div className="relative min-h-screen flex-grow flex items-center justify-center py-20 px-4 md:px-8 mt-20 md:mt-0 relative overflow-hidden">
      {/* Background Imagery */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjaeZkIscXTBqxvoFGO0t2nCHWLZFifHUPDCTx5ZeXfT_j0cghumuoZqdg0CHJs1TWfkZlWga2-aPdowIZR4t2h5fNnX-3FoU75iHcwc8IAvUGWhhidYdpBCLs8h-B5XH-ZDqtKw9AFigjhd4WsX6VIXp4NWKOCwPoJORcB7KgvokS_gV2C7JVu0YfNg4HLeRcGLA2QWZSrahxO0xlE3AHZIhVYJZG2HzLO7ogyAnRh2FJXPTyPtOI0wAFyv6rBOo6hINgXyzBmTdd")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg border border-secondary-fixed rounded-xl p-8 md:p-12 z-10 relative"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <span className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-primary">
              <Lock className="w-8 h-8 stroke-[2.5]" />
            </span>
          </div>
          <h1 className="font-headline-lg text-4xl text-on-surface mb-2 font-bold uppercase leading-none">
            Selamat Datang Kembali
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant text-gray-500">
            Silakan masukkan detail akun Anda untuk melanjutkan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email/Nomor HP Field */}
          <div>
            <label className="block text-xs uppercase text-gray-700 font-bold mb-2 cursor-pointer" htmlFor="email-input">
              Email/Nomor HP
            </label>
            <input
              id="email-input"
              type="text"
              required
              placeholder="Masukkan Email atau Nomor HP"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-white border border-on-surface rounded px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs uppercase text-gray-700 font-bold mb-2 cursor-pointer" htmlFor="password-input">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              required
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-on-surface rounded px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-on-surface rounded cursor-pointer"
              />
              <label className="ml-2 block text-xs text-on-surface font-semibold cursor-pointer" htmlFor="remember-me">
                Ingat saya
              </label>
            </div>
            <div className="text-xs">
              <button
                type="button"
                onClick={() => alert('Fitur Lupa Password: Silakan masukkan Nomor HP terdaftar Anda, kode verifikasi OTP akan dikirim via SMS.')}
                className="font-label-bold text-label-bold text-primary hover:text-primary-container hover:underline transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                Lupa password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-headline-md text-base uppercase py-4 rounded-full hover:bg-primary-container hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-200 cursor-pointer text-center block font-bold"
          >
            MASUK
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-fixed"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-400 font-body-md">Atau masuk dengan</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border-2 border-on-surface rounded bg-white text-on-surface font-label-bold text-xs uppercase hover:bg-gray-50 transition-colors cursor-pointer"
              type="button"
            >
              <img
                alt="Google Logo"
                className="h-4 w-4 mr-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFeYQtKDAKPLf0cRLFknct5r2uqzRJCmP8YlylA6C9eX0RIeM8UTeNMJedA90--nLZBi8PiLHQrkVNlIWoanQh5CckgvLvPX18xti5F7GRU_hgZViODSDF35U12hbUXwOPQB0CupEaD0qZENJZSa8i6iC0wwHQ-K0q2Q7LcnJc7cOQ13vrGMXShjVLgSDLzBJLvgKXdyz-gUil43VzplfnPp7cQ9C7eTwFXSXfjnI2NQgYutrTXrjz1NHUHkAJ5u6erb9EnNwEDryL"
              />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border-2 border-on-surface rounded bg-white text-on-surface font-label-bold text-xs uppercase hover:bg-gray-50 transition-colors cursor-pointer"
              type="button"
            >
              <img
                alt="Facebook Logo"
                className="h-4 w-4 mr-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXu53OW56SmJn-DCi_ncvXADKs-Xo14PfV4P_UUlW8Jc1I--vkm_Iz5BBBnFtKMpSQY1voWsA6WpoT_8jYtf3g_il3jsf6KG1LbNUUAS7tEYb5Lik3glPpE4ukIAsi6LG9TkSNIVlcFYOFhgMWJOm27XrvC51u22NaupKNoxQ1XWCo3KCwQFN5kqhPgLfnUcUnl0kAKyEO-bYTa2N4PU-dpAJIOM-Pu1KxaK-yENoKTlRd8SXUjwMqbJXaVR4B-H2U7RvHC_cbci6wsr"
              />
              Facebook
            </button>
          </div>
        </div>

        <p className="mt-8 text-center font-body-md text-xs text-on-surface-variant text-gray-500">
          Belum punya akun?{' '}
          <button
            onClick={() => onScreenChange('REGISTER')}
            className="font-label-bold text-label-bold text-primary hover:text-primary-container hover:underline transition-colors ml-1 cursor-pointer bg-transparent border-none p-0"
          >
            Daftar Sekarang
          </button>
        </p>
      </motion.div>
    </div>
  );
}
