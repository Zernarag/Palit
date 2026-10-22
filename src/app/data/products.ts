/* ============================================================
 * Palit — categories & products
 * ============================================================ */

export interface Category {
  id: string;
  name: string;
  /** SVG symbol id — see app.component.html sprite */
  icon: string;
}

export interface ProductBadge {
  cls: 'badge-sale' | 'badge-new' | 'badge-best';
  txt: string;
}

export interface Product {
  id: string;
  name: string;
  cat: string;
  price: number;
  old?: number;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  badge?: ProductBadge;
  desc: string;
  /** Whether this product belongs to the Palit Mall program */
  mall: boolean;
  swapAvailable?: boolean;
  img: string;
  variants: string[];
}

/* ---------------- Categories ---------------- */
export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics',   icon: 'icon-device-mobile' },
  { id: 'fashion',     name: 'Fashion',       icon: 'icon-shirt' },
  { id: 'home',        name: 'Home & Living', icon: 'icon-house' },
  { id: 'beauty',      name: 'Beauty',        icon: 'icon-lipstick' },
  { id: 'grocery',     name: 'Grocery',       icon: 'icon-shopping-cart' },
  { id: 'sports',      name: 'Sports',        icon: 'icon-ball' },
  { id: 'toys',        name: 'Toys & Kids',   icon: 'icon-puzzle' },
  { id: 'books',       name: 'Books',         icon: 'icon-book' },
];

/* ---------------- Variants map ---------------- */
export const VARIANTS_BY_CAT: Record<string, string[]> = {
  electronics: ['Black', 'White', 'Sunset Orange'],
  fashion:     ['Small', 'Medium', 'Large'],
  home:        ['Standard', 'Large', 'Gift Set'],
  beauty:      ['30ml', '50ml', '100ml'],
  grocery:     ['1 Pack', '3 Pack', '6 Pack'],
  sports:      ['Small', 'Medium', 'Large'],
  toys:        ['Standard Edition', 'Deluxe Edition'],
  books:       ['Paperback', 'Hardbound'],
};

/* ---------------- Raw product data ---------------- */
interface RawProduct {
  id: string;
  name: string;
  cat: string;
  price: number;
  old?: number;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  badge?: ProductBadge;
  desc: string;
}

const RAW_PRODUCTS: RawProduct[] = [
  { id:'p1',  name:'Palm Buds Pro Wireless Earbuds',      cat:'electronics', price:1899, old:2499, rating:4.8, reviews:2312, sold:2300, stock:48,  badge:{cls:'badge-sale',txt:'-24%'},         desc:'Crisp sound, active noise cancellation, and up to 30 hours of battery life. Sweat-resistant and perfectly pocket-sized for everyday commutes.' },
  { id:'p2',  name:'Aurora Fast Charger 65W',             cat:'electronics', price:899,             rating:4.6, reviews:1104, sold:1100, stock:76,  badge:{cls:'badge-best',txt:'BEST SELLER'},   desc:'Charge your laptop and phone at the same time with dual-port fast charging. Compact GaN design fits easily in any bag.' },
  { id:'p3',  name:'Bantay Smartwatch Lite',              cat:'electronics', price:2450, old:2999, rating:4.5, reviews:760,  sold:760,  stock:22,  badge:{cls:'badge-sale',txt:'-18%'},         desc:'Track your steps, heart rate, and sleep. Water-resistant with a 10-day battery and customizable watch faces.' },
  { id:'p4',  name:'Tibay Portable Power Bank 20K',       cat:'electronics', price:1150,             rating:4.7, reviews:980,  sold:1900, stock:60,                                                desc:'20,000mAh capacity with fast charging for three devices at once. Built tough for daily travel.' },
  { id:'p5',  name:'Sunset Sun Crossbody Bag',             cat:'fashion',     price:1250,             rating:4.7, reviews:890,  sold:890,  stock:34,  badge:{cls:'badge-new',txt:'NEW'},            desc:'Vegan leather crossbody bag with adjustable strap and secure zip pockets. Fits your essentials without the bulk.' },
  { id:'p6',  name:'Abaca Weave Tote Bag',                cat:'fashion',     price:1680,             rating:4.9, reviews:430,  sold:430,  stock:18,                                                desc:'Handwoven abaca fiber tote by local artisans. Durable, lightweight, and a statement piece for everyday wear.' },
  { id:'p7',  name:'Puti Essential Cotton Tee',           cat:'fashion',     price:299,  old:399,  rating:4.4, reviews:1204, sold:1200, stock:120, badge:{cls:'badge-sale',txt:'-25%'},         desc:'100% breathable cotton tee with a relaxed fit. A wardrobe staple that pairs with everything.' },
  { id:'p8',  name:'Bughaw Denim Jacket',                 cat:'fashion',     price:1450,             rating:4.6, reviews:410,  sold:410,  stock:26,                                                desc:'Classic washed denim jacket with a modern relaxed cut. Layer-ready for cooler evenings.' },
  { id:'p9',  name:'Sariling Gawa Ceramic Mug Set',       cat:'home',        price:620,              rating:4.8, reviews:1430, sold:1400, stock:54,  badge:{cls:'badge-best',txt:'BEST SELLER'},   desc:'Set of 4 hand-glazed ceramic mugs, microwave and dishwasher safe. Made by local potters.' },
  { id:'p10', name:'Habi Linen Throw Pillow',             cat:'home',        price:480,  old:599,  rating:4.4, reviews:320,  sold:320,  stock:40,  badge:{cls:'badge-sale',txt:'-20%'},         desc:'Soft woven linen cover with hidden zipper. Adds texture and warmth to any couch or bed.' },
  { id:'p11', name:'Bahay Kubo Rattan Desk Lamp',         cat:'home',        price:890,              rating:4.3, reviews:210,  sold:210,  stock:15,                                                desc:'Warm ambient lighting with a natural rattan shade. USB-powered with 3 brightness settings.' },
  { id:'p12', name:'Diwa Scented Soy Candle',             cat:'home',        price:299,              rating:4.7, reviews:890,  sold:890,  stock:70,                                                desc:'Hand-poured soy candle in Sampaguita & Calamansi scent. 40-hour burn time in a reusable glass jar.' },
  { id:'p13', name:'Dalandan Glow Vitamin C Serum',       cat:'beauty',      price:399,  old:499,  rating:4.7, reviews:3120, sold:3100, stock:150, badge:{cls:'badge-sale',txt:'-20%'},         desc:'Brightening serum with 15% Vitamin C and calamansi extract. Lightweight, fast-absorbing, non-sticky finish.' },
  { id:'p14', name:'Kalamansi Fresh Lip Tint',            cat:'beauty',      price:249,              rating:4.5, reviews:2840, sold:2800, stock:200, badge:{cls:'badge-best',txt:'BEST SELLER'},   desc:'Long-wearing tint with a natural citrus flush. Infused with Vitamin E to keep lips hydrated.' },
  { id:'p15', name:'Tibay Steel Water Bottle',            cat:'sports',      price:350,              rating:4.6, reviews:980,  sold:980,  stock:88,                                                desc:'Double-walled insulated bottle that keeps drinks cold for 24 hours. Leak-proof and dent-resistant.' },
  { id:'p16', name:'Cloudstep Running Shoes',             cat:'sports',      price:2100, old:2650, rating:4.6, reviews:540,  sold:540,  stock:30,  badge:{cls:'badge-sale',txt:'-21%'},         desc:'Lightweight cushioned running shoes with breathable mesh upper. Built for daily training on any terrain.' },
  { id:'p17', name:'Bayanihan Wooden Board Game',         cat:'toys',        price:950,              rating:4.9, reviews:150,  sold:150,  stock:20,  badge:{cls:'badge-new',txt:'NEW'},            desc:'A strategy board game inspired by community spirit, for 2-6 players. Great for family game night.' },
  { id:'p18', name:'Kwento Bedtime Storybook Set',        cat:'books',       price:520,              rating:4.8, reviews:300,  sold:300,  stock:44,                                                desc:'A set of 5 illustrated Filipino folktales retold for young readers, ages 4 and up.' },
];

const MALL_IDS = new Set(['p1', 'p2', 'p3', 'p9', 'p13', 'p14', 'p16']);
const SWAP_AVAILABLE_IDS = new Set(['p4', 'p6', 'p13', 'p17']);

/* ---------------- Exported product list ---------------- */
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  mall: MALL_IDS.has(p.id),
  swapAvailable: SWAP_AVAILABLE_IDS.has(p.id),
  img: `assets/items/${p.id}.jpg`,
  variants: VARIANTS_BY_CAT[p.cat] || ['Standard'],
}));

/* ---------------- Lookups ---------------- */
export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function findCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}