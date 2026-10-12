/* ============================================================
 * Palit — data barrel export
 *
 * Import everything from a single path:
 *   import { PRODUCTS, addToCart, formatPrice } from '../data';
 * ============================================================ */

// Formatting helpers
export * from './format';

// Products & categories
export * from './products';

// Auctions
export * from './auctions';

// Coupons & vouchers
export * from './coupons';

// Checkout: delivery, payment, addresses, orders
export * from './checkout';

// Static content: notifications, FAQ, reviews, onboarding,
// conversations, rewards, user profile
export * from './content';

// Cart (localStorage)
export * from './cart';

// Wishlist (localStorage)
export * from './wishlist';