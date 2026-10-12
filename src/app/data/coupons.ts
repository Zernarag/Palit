/* ============================================================
 * Palit — coupons & vouchers
 * ============================================================ */

export interface Coupon {
  code: string;
  desc: string;
  value: number;
  minSpend: number;
}

export const COUPONS: Coupon[] = [
  { code: 'WELCOME50', desc: '₱50 off orders over ₱500',         value: 50,  minSpend: 500  },
  { code: 'FREESHIP',  desc: 'Free shipping voucher (up to ₱49)', value: 49,  minSpend: 0    },
  { code: 'PALIT100',  desc: '₱100 off orders over ₱1,500',       value: 100, minSpend: 1500 },
];

/* ---------------- Lookup ---------------- */
export function findCoupon(code: string): Coupon | undefined {
  return COUPONS.find((c) => c.code === code.toUpperCase());
}

/** Is this coupon usable for the given subtotal? */
export function isCouponEligible(coupon: Coupon, subtotal: number): boolean {
  return subtotal >= coupon.minSpend;
}