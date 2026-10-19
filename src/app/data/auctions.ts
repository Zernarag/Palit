/* ============================================================
 * Palit — auctions
 * ============================================================ */

export interface AuctionCategory {
  id: string;
  name: string;
  /** SVG symbol id */
  icon?: string;
}

export interface Bid {
  bidder: string;
  amount: number;
  isYou?: boolean;
}

export interface Auction {
  id: string;
  name: string;
  cat: string;
  condition: string;
  store: string;
  startingBid: number;
  reserve: number;
  reserveMet: boolean;
  buyNow: number | null;
  endTime: number;         // epoch ms
  bids: Bid[];
  currentBid: number;
  bidCount: number;
  desc: string;
  img: string;
}

export const AUCTION_CATEGORIES: AuctionCategory[] = [
  { id: 'all',           name: 'All' },
  { id: 'ending',        name: 'Ending Soon',   icon: 'icon-clock' },
  { id: 'electronics',   name: 'Electronics',   icon: 'icon-device-mobile' },
  { id: 'collectibles',  name: 'Collectibles',  icon: 'icon-archive' },
  { id: 'home',          name: 'Home & Living', icon: 'icon-house' },
  { id: 'fashion',       name: 'Fashion',       icon: 'icon-shirt' },
];

interface RawAuction {
  id: string;
  name: string;
  cat: string;
  condition: string;
  store: string;
  startingBid: number;
  reserve: number;
  reserveMet: boolean;
  buyNow: number | null;
  durationMs: number;
  bids: Bid[];
  desc: string;
}

const RAW_AUCTIONS: RawAuction[] = [
  {
    id: 'a1', name: 'Vintage Canon AE-1 Film Camera', cat: 'electronics',
    condition: 'Used — Good', store: 'Palit Donation Center — Quezon City',
    startingBid: 150, reserve: 800, reserveMet: true, buyNow: 2200,
    durationMs: 2 * 3600e3,
    bids: [
      { bidder: 'R***o', amount: 650 },
      { bidder: 'M***a', amount: 720 },
      { bidder: 'You',   amount: 0, isYou: true },
    ],
    desc: 'Fully functional 35mm film SLR camera donated from an estate sale. Light wear on the body, lens glass is clear with no fungus. Includes original strap.',
  },
  {
    id: 'a2', name: 'Hand-Carved Narra Wood Jewelry Box', cat: 'collectibles',
    condition: 'Like New', store: 'Palit Donation Center — Cebu',
    startingBid: 80, reserve: 0, reserveMet: true, buyNow: null,
    durationMs: 5 * 3600e3,
    bids: [{ bidder: 'J***n', amount: 220 }],
    desc: 'Beautifully hand-carved solid Narra wood jewelry box with velvet lining. Minor surface scuff on the underside, otherwise excellent condition.',
  },
  {
    id: 'a3', name: 'Set of 4 Rattan Dining Chairs', cat: 'home',
    condition: 'Used — Fair', store: 'Palit Donation Center — Davao',
    startingBid: 300, reserve: 1500, reserveMet: false, buyNow: null,
    durationMs: 18 * 3600e3,
    bids: [
      { bidder: 'C***s', amount: 900 },
      { bidder: 'A***l', amount: 1050 },
    ],
    desc: 'Set of 4 rattan dining chairs, structurally sound. Some fraying on the weave of two chairs — priced accordingly. Local pickup recommended due to size.',
  },
  {
    id: 'a4', name: 'Seiko 5 Automatic Watch (Working)', cat: 'fashion',
    condition: 'Used — Good', store: 'Palit Donation Center — Pasig',
    startingBid: 500, reserve: 0, reserveMet: true, buyNow: 3500,
    durationMs: 40 * 60e3,
    bids: [
      { bidder: 'K***y', amount: 1450 },
      { bidder: 'D***v', amount: 1600 },
      { bidder: 'T***a', amount: 1750 },
    ],
    desc: 'Genuine Seiko 5 automatic movement, keeps time well. Stainless steel bracelet has light scratches. Water resistance not guaranteed — treat as splash-resistant only.',
  },
  {
    id: 'a5', name: 'Lot of Assorted Vinyl Records (12 pcs)', cat: 'collectibles',
    condition: 'Used — Good', store: 'Palit Donation Center — Quezon City',
    startingBid: 200, reserve: 0, reserveMet: true, buyNow: null,
    durationMs: 9 * 3600e3,
    bids: [],
    desc: 'Mixed lot of 12 vinyl records, mostly OPM and 80s pop. Sleeves show shelf wear; vinyl condition varies, most play cleanly. Sold as a lot, no individual selection.',
  },
  {
    id: 'a6', name: 'Apple iPad (6th Gen, 32GB) — Untested', cat: 'electronics',
    condition: 'For Parts / Not Working', store: 'Palit Donation Center — Pasig',
    startingBid: 400, reserve: 0, reserveMet: true, buyNow: null,
    durationMs: 3 * 3600e3,
    bids: [{ bidder: 'E***o', amount: 520 }],
    desc: 'Powers on but screen has a crack in the top-left corner and touch response is intermittent. Sold as-is, no warranty. Great for parts or repair project.',
  },
  {
    id: 'a7', name: 'Leather Sectional Sofa (3-Seater)', cat: 'home',
    condition: 'Used — Good', store: 'Palit Donation Center — Cebu',
    startingBid: 1200, reserve: 4000, reserveMet: false, buyNow: null,
    durationMs: 26 * 3600e3,
    bids: [{ bidder: 'P***n', amount: 2800 }],
    desc: 'Genuine leather sectional, minor creasing consistent with age. No tears or major stains. Buyer arranges freight shipping or local pickup.',
  },
  {
    id: 'a8', name: 'Designer Tote Bag (Authenticated)', cat: 'fashion',
    condition: 'Like New', store: 'Palit Donation Center — Davao',
    startingBid: 600, reserve: 0, reserveMet: true, buyNow: 5500,
    durationMs: 70 * 60e3,
    bids: [
      { bidder: 'S***h', amount: 2100 },
      { bidder: 'You',   amount: 0, isYou: true },
      { bidder: 'V***e', amount: 2450 },
    ],
    desc: 'Authenticated pre-owned designer tote, light corner wear on base. Comes with dust bag. Authentication certificate available on request.',
  },
];

/* ---------------- Exported auction list ---------------- */
const AUCTION_IMAGES: Record<string, string> = {
  a1: 'assets/items/a1.jpg',
  a2: 'assets/items/a2.jpg',
  a3: 'assets/items/a3.jpg',
  a4: 'assets/items/p3.jpg',
  a5: 'assets/items/a5.jpg',
  a6: 'assets/items/a6.jpg',
  a7: 'assets/items/a7.jpg',
  a8: 'assets/items/p5.jpg',
};

export const AUCTIONS: Auction[] = RAW_AUCTIONS.map((a) => {
  const realBids = a.bids.filter((b) => !b.isYou);
  const highest = realBids.length ? Math.max(...realBids.map((b) => b.amount)) : 0;

  return {
    ...a,
    img: AUCTION_IMAGES[a.id],
    currentBid: highest || a.startingBid,
    bidCount: realBids.length,
    bids: realBids,
    endTime: Date.now() + a.durationMs,
  };
});

/* ---------------- Helpers ---------------- */
export function findAuction(id: string): Auction | undefined {
  return AUCTIONS.find((a) => a.id === id);
}

/** Minimum acceptable next bid for a given auction. */
export function minNextBid(a: Auction): number {
  return a.currentBid + (a.bidCount > 0 ? 50 : 0);
}