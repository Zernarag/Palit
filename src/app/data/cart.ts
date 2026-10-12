/* ============================================================
 * Palit — cart (localStorage-backed)
 * ============================================================ */

import { Injectable, computed, signal } from '@angular/core';
import { COUPONS, Coupon } from './coupons';
import { PRODUCTS, Product } from './products';

export interface CartItem {
  id: string;
  qty: number;
  variant: string;
}

export type DetailedCartItem = CartItem & { product: Product };
export interface CartLine { index: number; item: CartItem; product: Product; lineTotal: number; }

const CART_KEY = 'palit_cart';

/* ---------------- Read / Write ---------------- */
export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------------- Mutations ---------------- */
export function addToCart(id: string, qty: number = 1, variant?: string): void {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;

  const v = variant || p.variants[0];
  const cart = getCart();
  const existing = cart.find((c) => c.id === id && c.variant === v);

  if (existing) existing.qty += qty;
  else cart.push({ id, qty, variant: v });

  saveCart(cart);
}

export function changeCartQty(index: number, delta: number): void {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  saveCart(cart);
}

export function removeCartItem(index: number): void {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

/* ---------------- Totals ---------------- */
export function getCartCount(): number {
  return getCart().reduce((s, c) => s + c.qty, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, c) => {
    const p = PRODUCTS.find((x) => x.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);
}

/**
 * Join cart items with full product objects.
 * Returns [] if any product was removed from the catalogue.
 */
export function getCartDetailed(): DetailedCartItem[] {
  return getCart()
    .map((c) => {
      const product = PRODUCTS.find((p) => p.id === c.id);
      return product ? { ...c, product } : null;
    })
    .filter((x): x is DetailedCartItem => x !== null);
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(getCart());
  readonly items = this._items.asReadonly();
  readonly lines = computed<CartLine[]>(() =>
    this._items().flatMap((item, index) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.id);
      return product ? [{ index, item, product, lineTotal: product.price * item.qty }] : [];
    })
  );
  readonly count = computed(() => this._items().reduce((sum, item) => sum + item.qty, 0));
  readonly subtotal = computed(() => this.lines().reduce((sum, line) => sum + line.lineTotal, 0));
  readonly couponCode = signal<string | null>(null);
  readonly activeCoupon = computed<Coupon | null>(() => {
    const coupon = COUPONS.find((candidate) => candidate.code === this.couponCode());
    return coupon && this.subtotal() >= coupon.minSpend ? coupon : null;
  });
  readonly discount = computed(() => this.activeCoupon()?.value ?? 0);

  add(id: string, qty = 1, variant = ''): void {
    addToCart(id, qty, variant);
    this.refresh();
  }

  changeQty(index: number, delta: number): void {
    changeCartQty(index, delta);
    this.refresh();
  }

  remove(index: number): void {
    removeCartItem(index);
    this.refresh();
  }

  clear(): void {
    clearCart();
    this.couponCode.set(null);
    this.refresh();
  }

  applyCoupon(raw: string): string | null {
    const code = raw.trim().toUpperCase();
    const coupon = COUPONS.find((candidate) => candidate.code === code);
    if (!coupon) return 'Invalid or expired code.';
    if (this.subtotal() < coupon.minSpend) {
      return `Spend at least ₱${coupon.minSpend.toLocaleString('en-PH')} to use ${coupon.code}.`;
    }
    this.couponCode.set(code);
    return null;
  }

  removeCoupon(): void { this.couponCode.set(null); }

  private refresh(): void { this._items.set(getCart()); }
}