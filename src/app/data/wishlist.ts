/* ============================================================
 * Palit — wishlist (localStorage-backed)
 * ============================================================ */

import { Injectable, signal } from '@angular/core';
import { PRODUCTS, Product } from './products';

const WISH_KEY = 'palit_wishlist';
const DEFAULT_WISHLIST = ['p13', 'p6'];

/* ---------------- Read / Write ---------------- */
export function getWishlist(): string[] {
  try {
    return JSON.parse(
      localStorage.getItem(WISH_KEY) || JSON.stringify(DEFAULT_WISHLIST)
    );
  } catch {
    return [];
  }
}

export function saveWishlist(ids: string[]): void {
  localStorage.setItem(WISH_KEY, JSON.stringify(ids));
}

/* ---------------- Mutations ---------------- */
export function toggleWishlist(id: string): void {
  const list = getWishlist();
  const i = list.indexOf(id);
  if (i >= 0) list.splice(i, 1);
  else list.push(id);
  saveWishlist(list);
}

export function addToWishlist(id: string): void {
  const list = getWishlist();
  if (!list.includes(id)) {
    list.push(id);
    saveWishlist(list);
  }
}

export function removeFromWishlist(id: string): void {
  saveWishlist(getWishlist().filter((x) => x !== id));
}

export function clearWishlist(): void {
  localStorage.removeItem(WISH_KEY);
}

/* ---------------- Queries ---------------- */
export function isWished(id: string): boolean {
  return getWishlist().includes(id);
}

export function getWishlistCount(): number {
  return getWishlist().length;
}

/**
 * Full product objects for everything in the wishlist.
 * Skips any IDs whose products no longer exist.
 */
export function getWishlistDetailed(): Product[] {
  const ids = getWishlist();
  return PRODUCTS.filter((p) => ids.includes(p.id));
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly ids = signal<ReadonlySet<string>>(new Set(getWishlist()));

  has(id: string): boolean { return this.ids().has(id); }

  toggle(id: string): boolean {
    toggleWishlist(id);
    const next = new Set(getWishlist());
    this.ids.set(next);
    return next.has(id);
  }
}