/* ============================================================
 * Palit — static content: notifications, FAQ, reviews,
 * onboarding slides, conversations, rewards, user profile
 * ============================================================ */

/* ---------------- Notifications ---------------- */
export interface Notification {
  icon: string;   // SVG symbol id
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export const NOTIFICATIONS: Notification[] = [
  { icon: 'icon-truck',        title: 'Your order is out for delivery', body: 'PLT-10234 will arrive today between 2–5PM.',              time: '10m ago', unread: true  },
  { icon: 'icon-bolt',         title: 'Flash Sale starts in 1 hour!',    body: 'Up to 50% off electronics & fashion finds.',              time: '1h ago',  unread: true  },
  { icon: 'icon-check-circle', title: 'Order delivered',                 body: 'PLT-10198 was delivered successfully. Rate your experience!', time: '2d ago', unread: false },
  { icon: 'icon-ticket',       title: 'New coupon for you',              body: 'Use PALIT100 for ₱100 off your next order.',              time: '3d ago',  unread: false },
  { icon: 'icon-chat',         title: 'Seller replied to your message',  body: 'Palit Official Store: "Yes, available in Sunset Orange!"',  time: '4d ago',  unread: false },
];

/* ---------------- FAQs ---------------- */
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  { q: 'How do I track my order?',           a: 'Go to Profile > My Orders, select your order, then tap "Track Order" to see live delivery status.' },
  { q: 'What payment methods are accepted?', a: 'We accept GCash, Maya, credit/debit cards, online banking, and Cash on Delivery.' },
  { q: 'How do I return or refund an item?', a: 'Open the order in My Orders and tap "Return / Refund" within 7 days of delivery.' },
  { q: 'How long does delivery take?',       a: 'Standard delivery takes 3–5 business days; Express takes 1–2 days depending on your location.' },
];

/* ---------------- Sample reviews ---------------- */
export interface SampleReview {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export const SAMPLE_REVIEWS: SampleReview[] = [
  { name: 'Maria S.', rating: 5, date: 'Aug 2, 2026',  text: 'Ang ganda ng quality! Mabilis din dumating, super satisfied talaga ako sa order.' },
  { name: 'Carlo P.', rating: 5, date: 'Jul 28, 2026', text: 'Worth it! Packaging was secure and the product matches the photos exactly.' },
  { name: 'Angel R.', rating: 4, date: 'Jul 20, 2026', text: 'Good quality overall, shipping took a bit longer than expected pero okay naman.' },
  { name: 'DJ M.',    rating: 5, date: 'Jul 15, 2026', text: 'Great seller, fast response, and the item works perfectly. Will order again.' },
];

/* ---------------- Onboarding slides ---------------- */
export interface OnboardingSlide {
  icon: string;   // SVG symbol id
  title: string;
  body: string;
}

export const OB_SLIDES: OnboardingSlide[] = [
  { icon: 'icon-shopping-bag', title: 'Discover Local Finds',   body: 'Thousands of products from trusted sellers near you, all in one app.' },
  { icon: 'icon-bolt',         title: 'Flash Deals Daily',      body: 'Grab limited-time discounts before they run out — new drops every day.' },
  { icon: 'icon-truck',        title: 'Fast, Tracked Delivery', body: 'Watch your order move from packed to your doorstep in real time.' },
];

/* ---------------- Conversations ---------------- */
export interface Conversation {
  id: string;
  name: string;
  /** SVG symbol id */
  avatar: string;
  status: string;
}

export const CONVERSATIONS: Conversation[] = [
  { id: 'store',   name: 'Palit Official Store',  avatar: 'icon-store',      status: 'Online · replies in mins' },
  { id: 'support', name: 'Palit Support',         avatar: 'icon-headphones', status: '24/7 customer care' },
  { id: 'courier', name: 'Mark R. — J&T Express', avatar: 'icon-bike',       status: 'On today\u2019s delivery route' },
];

/* ---------------- Reward items ---------------- */
export interface RewardItem {
  name: string;
  cost: number;
  icon: string;   // SVG symbol id
}

export const REWARD_ITEMS: RewardItem[] = [
  { name: '₱50 Off Voucher',       cost: 500,  icon: 'icon-ticket' },
  { name: 'Free Shipping Voucher', cost: 300,  icon: 'icon-truck'  },
  { name: '₱150 Off Voucher',      cost: 1200, icon: 'icon-gift'   },
];

/* ---------------- User profile (mock) ---------------- */
export interface UserProfile {
  name: string;
  email: string;
  points: number;
  tier: string;
  coupons: number;
}

const DEFAULT_USER: UserProfile = {
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@email.com',
  points: 2450,
  tier: 'Gold',
  coupons: 6,
};

const USER_KEY = 'palit_user';

function loadUser(): UserProfile {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? { ...DEFAULT_USER, ...JSON.parse(saved) } : { ...DEFAULT_USER };
  } catch {
    return { ...DEFAULT_USER };
  }
}

export const USER: UserProfile = loadUser();

export function saveUserProfile(profile: Pick<UserProfile, 'name' | 'email'>): void {
  USER.name = profile.name;
  USER.email = profile.email;
  localStorage.setItem(USER_KEY, JSON.stringify(USER));
}