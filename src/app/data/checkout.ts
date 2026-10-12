/* ============================================================
 * Palit — checkout data: delivery, payment, addresses, orders
 * ============================================================ */

import { Injectable, computed, signal } from '@angular/core';
import { CartService } from './cart';
import { findCoupon, isCouponEligible } from './coupons';

/* ---------------- Delivery options ---------------- */
export interface DeliveryOption {
  id: string;
  name: string;
  eta: string;
  price: number;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'standard', name: 'Standard Delivery', eta: '3-5 business days',            price: 49  },
  { id: 'express',  name: 'Express Delivery',  eta: '1-2 business days',            price: 129 },
  { id: 'sameday',  name: 'Same-Day Delivery', eta: 'Arrives today (select areas)', price: 199 },
];

/* ---------------- Payment methods ---------------- */
export interface PaymentMethod {
  id: string;
  name: string;
  /** SVG symbol id — see app.component.html sprite */
  icon: 'phone' | 'wallet' | 'card' | 'cash' | 'bank';
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'gcash', name: 'GCash',               icon: 'phone' },
  { id: 'maya',  name: 'Maya',                icon: 'wallet' },
  { id: 'card',  name: 'Credit / Debit Card', icon: 'card' },
  { id: 'cod',   name: 'Cash on Delivery',    icon: 'cash' },
  { id: 'bank',  name: 'Online Banking',      icon: 'bank' },
];

/* ---------------- Addresses ---------------- */
export interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  line: string;
}

export const ADDRESSES: Address[] = [
  {
    id: 1,
    label: 'Home',
    name: 'Juan Dela Cruz',
    phone: '0917 123 4567',
    line: '123 Rizal St., Brgy. San Isidro, Villasis, Pangasinan',
  },
  {
    id: 2,
    label: 'Work',
    name: 'Juan Dela Cruz',
    phone: '0917 123 4567',
    line: '45 Mabini Ave., 4th Flr Unit B, Makati City',
  },
];

/* ---------------- Fee constants ---------------- */
export const SHIPPING_FEE = 49;
export const GIFT_WRAP_FEE = 49;

/* ---------------- Order model ---------------- */
export interface OrderLine {
  id: string;
  qty: number;
  variant: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'To Pay' | 'To Ship' | 'To Receive' | 'Delivered' | 'Cancelled';
  items: OrderLine[];
  total: number;
  payment: string;
  address?: Address;
}

/** Seed data — show a couple of past orders in Order History. */
export const SEED_ORDERS: Order[] = [
  {
    id: 'PLT-10234',
    date: 'Aug 2, 2026',
    status: 'Delivered',
    items: [
      { id: 'p1', qty: 1, variant: 'Black' },
      { id: 'p9', qty: 1, variant: 'Standard' },
    ],
    total: 2569,
    payment: 'GCash',
    address: {
      id: 1,
      label: 'Home',
      name: 'Juan Dela Cruz',
      phone: '0917 123 4567',
      line: '123 Rizal St., Villasis, Pangasinan',
    },
  },
  {
    id: 'PLT-10198',
    date: 'Jul 21, 2026',
    status: 'Delivered',
    items: [{ id: 'p13', qty: 2, variant: '30ml' }],
    total: 847,
    payment: 'Maya',
    address: {
      id: 1,
      label: 'Home',
      name: 'Juan Dela Cruz',
      phone: '0917 123 4567',
      line: '123 Rizal St., Villasis, Pangasinan',
    },
  },
];

/* ---------------- Helpers ---------------- */
export function findDelivery(id: string): DeliveryOption | undefined {
  return DELIVERY_OPTIONS.find((d) => d.id === id);
}

export function findPayment(id: string): PaymentMethod | undefined {
  return PAYMENT_METHODS.find((p) => p.id === id);
}

export function findAddress(id: number): Address | undefined {
  return ADDRESSES.find((a) => a.id === id);
}

export function generateOrderId(): string {
  return 'PLT-' + Math.floor(10000 + Math.random() * 89999);
}


/* ---------------- Orders (localStorage-backed) ---------------- */
const ORDERS_KEY = 'palit_orders';

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* fall through to seed */ }
  localStorage.setItem(ORDERS_KEY, JSON.stringify(SEED_ORDERS));
  return SEED_ORDERS;
}

export function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function findOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  readonly selectedAddress = signal(ADDRESSES[0].id);
  readonly selectedDelivery = signal(DELIVERY_OPTIONS[0].id);
  readonly selectedPayment = signal(PAYMENT_METHODS[0].id);
  readonly giftWrap = signal(false);
  readonly cardNumber = signal('');
  readonly cardExpiry = signal('');
  readonly cardCvv = signal('');
  readonly couponError = signal<string | null>(null);
  readonly order = signal<Order | null>(null);

  constructor(private readonly cart: CartService) {}

  address(): Address { return findAddress(this.selectedAddress()) ?? ADDRESSES[0]; }
  delivery(): DeliveryOption { return findDelivery(this.selectedDelivery()) ?? DELIVERY_OPTIONS[0]; }
  payment(): PaymentMethod { return findPayment(this.selectedPayment()) ?? PAYMENT_METHODS[0]; }
  shipping(): number { return this.delivery().price; }
  giftFee(): number { return this.giftWrap() ? GIFT_WRAP_FEE : 0; }
  total(): number {
    return Math.max(0, this.cart.subtotal() + this.shipping() + this.giftFee() - this.cart.discount());
  }

  onCardNumber(value: string): void { this.cardNumber.set(value.replace(/\D/g, '').slice(0, 19)); }
  onCardExpiry(value: string): void { this.cardExpiry.set(value.slice(0, 5)); }
  onCardCvv(value: string): void { this.cardCvv.set(value.replace(/\D/g, '').slice(0, 4)); }
  cardValid(): boolean {
    return this.cardNumber().replace(/\s/g, '').length >= 12
      && /^\d{2}\/\d{2}$/.test(this.cardExpiry())
      && /^\d{3,4}$/.test(this.cardCvv());
  }

  applyCoupon(code: string): void {
    const coupon = findCoupon(code.trim());
    if (!coupon) {
      this.couponError.set('Invalid or expired code.');
      return;
    }
    if (!isCouponEligible(coupon, this.cart.subtotal())) {
      this.couponError.set(`Spend at least ₱${coupon.minSpend.toLocaleString('en-PH')} to use ${coupon.code}.`);
      return;
    }
    const error = this.cart.applyCoupon(coupon.code);
    this.couponError.set(error);
  }

  clearCouponError(): void { this.couponError.set(null); }

  canContinue(): boolean {
    return this.cart.lines().length > 0
      && !!findAddress(this.selectedAddress())
      && !!findDelivery(this.selectedDelivery())
      && !!findPayment(this.selectedPayment())
      && (this.selectedPayment() !== 'card' || this.cardValid());
  }

  confirmPayment(): Order | null {
    if (!this.canContinue()) return null;
    const order: Order = {
      id: generateOrderId(),
      date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'To Ship',
      items: this.cart.items().map(({ id, qty, variant }) => ({ id, qty, variant })),
      total: this.total(),
      payment: this.payment().name,
      address: this.address(),
    };
    addOrder(order);
    this.order.set(order);
    this.cart.clear();
    return order;
  }

  reset(): void {
    this.selectedAddress.set(ADDRESSES[0].id);
    this.selectedDelivery.set(DELIVERY_OPTIONS[0].id);
    this.selectedPayment.set(PAYMENT_METHODS[0].id);
    this.giftWrap.set(false);
    this.cardNumber.set('');
    this.cardExpiry.set('');
    this.cardCvv.set('');
    this.couponError.set(null);
    this.order.set(null);
    this.cart.removeCoupon();
  }
}