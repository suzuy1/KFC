/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 'HOME' | 'MENU' | 'PROMO' | 'LOCATION' | 'LOGIN' | 'REGISTER';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'CHICKEN' | 'BURGER' | 'SIDES' | 'DRINKS' | 'PROMO';
  isPopular?: boolean;
  isHemat?: boolean;
}

export interface UserSession {
  fullName: string;
  email: string;
  phone: string;
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
}
