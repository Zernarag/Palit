/* ============================================================
 * Palit — legacy re-export
 *
 * This file exists only for backward compatibility while
 * pages are migrated to the split data/ modules.
 *
 * New code should import directly from `../data` (the barrel)
 * or from a specific module like `../data/products`.
 *
 * Safe to delete once no page imports from here.
 * ============================================================ */

export * from './format';
export * from './products';
export * from './auctions';
export * from './coupons';
export * from './checkout';
export * from './content';
export * from './cart';
export * from './wishlist';