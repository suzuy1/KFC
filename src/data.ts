/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from './types';

export const PROMO_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: 'Paket Keluarga',
    price: 110000,
    description: 'Nikmati kebersamaan dengan 5 potong ayam, 3 nasi, dan 2 minuman.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUXA6PJfu9XDQfRcbDLiL_hDtdM9eHcXnq__FXu41_JGtOazLDgx_xmQ_81_XRc7biGR2UedNhPLcDunCBT1XqOcUZG_q1KkQ-QIkZ7Pgq3adSq3WzSkQMX8TMf6_ye7rEe_tXJ4o7j0OwOzBxNgykoDCFhc_BlLfSRJ66AO78eWnNstiXNx-TTO-97DzfTKz75FoAifGyUZD4eoOAdC9qIECLU-9Xp44P_1Vlf_33Wgvq7ZlOelC0qRUkd9HfghUH_PzyPkqF6n_V',
    category: 'PROMO',
    isHemat: true,
  },
  {
    id: 'p2',
    name: 'Tuesday Deals',
    price: 40000,
    description: 'Spesial hari Selasa! 2 potong ayam dan 1 nasi dengan harga super hemat.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLb-ctVeH0PdikuPMjCyQKgrTj3K_3JfgZesaEGYWr71iC5rVe7W0WrhS884qAoOzO3MvZ7dkMqG1Kgtkohv9f36zWaCQKFPIqXi4Wfxp95SKPuP3v8XpWAk6Nf0hLfAFK0_jjdRyD7HeOhT3zKEQBzg8mjw6V8EQtWgVzh6qZgroqorQ0LYhwlJt5lkGDf77zZJAsDLytxFJu2IbzEmkxm2mLYyJ9ZqHkodP6OHl8XaqO7myp2HE3J9jps9wSm7Oz6djslgWvC18D',
    category: 'PROMO',
  }
];

export const MENU_ITEMS: MenuItem[] = [
  ...PROMO_ITEMS,
  {
    id: 'm1',
    name: '9 Pcs Bucket Ayam',
    price: 165000,
    description: 'Satu ember besar berisi 9 potong ayam goreng legendaris khas KFC. Rahasia 11 bumbu rahasia.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMQHZinXPuqLBSap4z9CcaloegO1F9lAI9GfsKqWNtCVlKvmqUhGuEWb9t8JmwJc9AQ8Z_oEZpEzm870zvyavmkRS40VHOnoCSuTE7p-4QMyUpeiSp_wePuOc0fY-hTgEfo_MMkJAOJSTWw1D1uQ_A2Erp5UZXphZcqxY6tZrd-DwkpfweiEn1XP68Xh11fqy9ZsvqgyxVfjPU_HtAkM-troX6c9Co_WKVcXbEUnQhnsHp9uqtA-zr0n1xlLe_j3nPIKhWqc2BRdiF',
    category: 'CHICKEN',
    isPopular: true,
  },
  {
    id: 'm2',
    name: 'Super Star 1',
    price: 45000,
    description: '1 Potong Ayam + 1 Nasi + 1 Coca-Cola Medium + CD KFC Super Star.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByCLDK29uWXeOzQKmwZIO41udaWKX40Pz8DSo2ousEj0NlYW9qpYm9mlJRsi7koBuJH2mTbuBsyUX1dbAV_PXGSs6urot6xEH6UQWSHxdlY2xhqTC2aLXAjEMzqk-sSkf_tvBBy4KFWs7k9kS_cJl0xG9fL8gzbD57FH_tSynkBarc0tv9rYeTqXayeJUbLItUr5auD4C--gbv00Kqk0DsAheTwkFrUkFTHLq0yBwSOpJ2ob08I8NP2rBuSpqIkSqVihB0aaRLB7gS',
    category: 'CHICKEN',
  },
  {
    id: 'm3',
    name: 'Zinger Burger',
    price: 36000,
    description: 'Burger dengan daging ayam renyah pedas kelas dunia, selada segar, dan mayones special.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByCLDK29uWXeOzQKmwZIO41udaWKX40Pz8DSo2ousEj0NlYW9qpYm9mlJRsi7koBuJH2mTbuBsyUX1dbAV_PXGSs6urot6xEH6UQWSHxdlY2xhqTC2aLXAjEMzqk-sSkf_tvBBy4KFWs7k9kS_cJl0xG9fL8gzbD57FH_tSynkBarc0tv9rYeTqXayeJUbLItUr5auD4C--gbv00Kqk0DsAheTwkFrUkFTHLq0yBwSOpJ2ob08I8NP2rBuSpqIkSqVihB0aaRLB7gS',
    category: 'BURGER',
    isPopular: true,
  },
  {
    id: 'm4',
    name: 'Colonel Burger',
    price: 28000,
    description: 'Burger klasik dengan daging ayam goreng cripsy lembut, saus spesial Colonel KFC.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByCLDK29uWXeOzQKmwZIO41udaWKX40Pz8DSo2ousEj0NlYW9qpYm9mlJRsi7koBuJH2mTbuBsyUX1dbAV_PXGSs6urot6xEH6UQWSHxdlY2xhqTC2aLXAjEMzqk-sSkf_tvBBy4KFWs7k9kS_cJl0xG9fL8gzbD57FH_tSynkBarc0tv9rYeTqXayeJUbLItUr5auD4C--gbv00Kqk0DsAheTwkFrUkFTHLq0yBwSOpJ2ob08I8NP2rBuSpqIkSqVihB0aaRLB7gS',
    category: 'BURGER',
  },
  {
    id: 'm5',
    name: 'French Fries Large',
    price: 22000,
    description: 'Kentang goreng KFC yang renyah di luar, empuk di dalam dengan taburan garam gurih.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLb-ctVeH0PdikuPMjCyQKgrTj3K_3JfgZesaEGYWr71iC5rVe7W0WrhS884qAoOzO3MvZ7dkMqG1Kgtkohv9f36zWaCQKFPIqXi4Wfxp95SKPuP3v8XpWAk6Nf0hLfAFK0_jjdRyD7HeOhT3zKEQBzg8mjw6V8EQtWgVzh6qZgroqorQ0LYhwlJt5lkGDf77zZJAsDLytxFJu2IbzEmkxm2mLYyJ9ZqHkodP6OHl8XaqO7myp2HE3J9jps9wSm7Oz6djslgWvC18D',
    category: 'SIDES',
  },
  {
    id: 'm6',
    name: 'KFC Cream Soup',
    price: 15000,
    description: 'Sup krim jagung hangat bertaburkan potongan ayam gurih nan lembut khas KFC.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByCLDK29uWXeOzQKmwZIO41udaWKX40Pz8DSo2ousEj0NlYW9qpYm9mlJRsi7koBuJH2mTbuBsyUX1dbAV_PXGSs6urot6xEH6UQWSHxdlY2xhqTC2aLXAjEMzqk-sSkf_tvBBy4KFWs7k9kS_cJl0xG9fL8gzbD57FH_tSynkBarc0tv9rYeTqXayeJUbLItUr5auD4C--gbv00Kqk0DsAheTwkFrUkFTHLq0yBwSOpJ2ob08I8NP2rBuSpqIkSqVihB0aaRLB7gS',
    category: 'SIDES',
  },
  {
    id: 'm7',
    name: 'Coca-Cola Float',
    price: 14000,
    description: 'Kesegaran Coca-Cola disajikan dengan float es krim vanilla manis di atasnya.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLb-ctVeH0PdikuPMjCyQKgrTj3K_3JfgZesaEGYWr71iC5rVe7W0WrhS884qAoOzO3MvZ7dkMqG1Kgtkohv9f36zWaCQKFPIqXi4Wfxp95SKPuP3v8XpWAk6Nf0hLfAFK0_jjdRyD7HeOhT3zKEQBzg8mjw6V8EQtWgVzh6qZgroqorQ0LYhwlJt5lkGDf77zZJAsDLytxFJu2IbzEmkxm2mLYyJ9ZqHkodP6OHl8XaqO7myp2HE3J9jps9wSm7Oz6djslgWvC18D',
    category: 'DRINKS',
    isPopular: true,
  },
  {
    id: 'm8',
    name: 'KFC Krusher Chocolate',
    price: 19000,
    description: 'Minuman blended chocolate premium khas KFC lengkap dengan cookie crumble renyah.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLb-ctVeH0PdikuPMjCyQKgrTj3K_3JfgZesaEGYWr71iC5rVe7W0WrhS884qAoOzO3MvZ7dkMqG1Kgtkohv9f36zWaCQKFPIqXi4Wfxp95SKPuP3v8XpWAk6Nf0hLfAFK0_jjdRyD7HeOhT3zKEQBzg8mjw6V8EQtWgVzh6qZgroqorQ0LYhwlJt5lkGDf77zZJAsDLytxFJu2IbzEmkxm2mLYyJ9ZqHkodP6OHl8XaqO7myp2HE3J9jps9wSm7Oz6djslgWvC18D',
    category: 'DRINKS',
  }
];

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: 'Jakarta' | 'Bandung' | 'Surabaya' | 'Medan' | 'Bali';
  phone: string;
  hours: string;
}

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'loc1',
    name: 'KFC Kemang',
    address: 'Jl. Kemang Raya No.14, Bangka, Mampang Prapatan',
    city: 'Jakarta',
    phone: '(021) 719-2819',
    hours: 'Setiap Hari, 24 Jam'
  },
  {
    id: 'loc2',
    name: 'KFC Dago',
    address: 'Jl. Ir. H. Juanda No. 79, Coblong',
    city: 'Bandung',
    phone: '(022) 250-1392',
    hours: 'Setiap Hari, 07:00 - 24:00'
  },
  {
    id: 'loc3',
    name: 'KFC Basuki Rahmat',
    address: 'Jl. Basuki Rahmat No. 104, Tegalsari',
    city: 'Surabaya',
    phone: '(031) 534-1120',
    hours: 'Setiap Hari, 24 Jam'
  },
  {
    id: 'loc4',
    name: 'KFC Kuta Beach',
    address: 'Jl. Pantai Kuta No.12, Kuta, Kabupaten Badung',
    city: 'Bali',
    phone: '(0361) 752-901',
    hours: 'Setiap Hari, 08:00 - 02:00'
  },
  {
    id: 'loc5',
    name: 'KFC Gajah Mada',
    address: 'Jl. Gajah Mada No. 44, Petojo Utara',
    city: 'Jakarta',
    phone: '(021) 638-5110',
    hours: 'Setiap Hari, 10:00 - 22:00'
  }
];
