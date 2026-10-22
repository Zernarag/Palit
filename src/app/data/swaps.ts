/* ============================================================
 * Palit — swap / trade requests (localStorage-backed)
 * ============================================================ */

import { Injectable, signal } from '@angular/core';
import { PRODUCTS, Product } from './products';

export type SwapStatus = 'pending' | 'accepted' | 'rejected';

export interface SwapRequest {
  id: string;
  /** Id of the item the initiator is giving away. */
  offeredItemId: string;
  /** Id of the product the initiator wants in return (a real Product id). */
  requestedItemId: string;
  /** Data-URL photos of the offered item. */
  photos: string[];
  /** Title of the offered item. */
  title: string;
  description: string;
  /** Extra conditions typed by the initiator. */
  terms: string;
  status: SwapStatus;
  /** Display name of the person making the offer. */
  requestedBy: string;
  /** Display name of the person who owns the wanted item. */
  offeredBy: string;
  createdAt: number;
}

const SWAP_KEY = 'palit_swap_requests';

/** The signed-in user's display name (auth is simulated in this build). */
export const CURRENT_USER = 'You';

/** Seller shown for every marketplace listing (auth is simulated). */
export const LISTING_SELLER = 'Palit Seller';

/* ---------------- Demo seeds ----------------
 * Auth is simulated in this build, so we seed two offers that were "sent to
 * you" by other users. This makes the accept / decline flow visible on a
 * fresh install. Delete the `palit_swap_requests` key to re-seed.
 */
const SEEDS: SwapRequest[] = [
  {
    id: 's-seed-1',
    offeredItemId: 'swap-item-seed-1',
    requestedItemId: 'p13',
    photos: [],
    title: 'Vintage Film Camera',
    description:
      'Fully working Canon AE-1 with a 50mm lens, fresh light seals. Minor scuffs on the body, glass is clean.',
    terms: 'Local meetup in Quezon City preferred. Can add ₱500 on top.',
    status: 'pending',
    requestedBy: 'Miguel Santos',
    offeredBy: CURRENT_USER,
    createdAt: Date.now() - 1000 * 60 * 42,
  },
  {
    id: 's-seed-2',
    offeredItemId: 'swap-item-seed-2',
    requestedItemId: 'p6',
    photos: [],
    title: 'Nintendo Switch Lite',
    description:
      'Yellow Switch Lite, used for 8 months, no drift and no scratches. Comes with charger and a carrying case.',
    terms: 'Straight swap only, no cash. Meet at BGC.',
    status: 'pending',
    requestedBy: 'Bea Ramos',
    offeredBy: CURRENT_USER,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
];

/* ---------------- Read / Write ---------------- */
export function getSwapRequests(): SwapRequest[] {
  try {
    const raw = localStorage.getItem(SWAP_KEY);
    if (raw === null) {
      saveSwapRequests(SEEDS);
      return [...SEEDS];
    }
    return JSON.parse(raw) as SwapRequest[];
  } catch {
    return [];
  }
}

export function saveSwapRequests(list: SwapRequest[]): void {
  try {
    localStorage.setItem(SWAP_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — keep the in-memory copy only */
  }
}

/* ---------------- Mutations ---------------- */
export function addSwapRequest(
  request: Omit<SwapRequest, 'id' | 'status' | 'createdAt'>
): SwapRequest {
  const created: SwapRequest = {
    ...request,
    id: 's' + Date.now(),
    status: 'pending',
    createdAt: Date.now(),
  };
  saveSwapRequests([created, ...getSwapRequests()]);
  return created;
}

export function setSwapStatus(id: string, status: SwapStatus): void {
  saveSwapRequests(
    getSwapRequests().map((r) => (r.id === id ? { ...r, status } : r))
  );
}

export function acceptSwap(id: string): void {
  setSwapStatus(id, 'accepted');
}

export function rejectSwap(id: string): void {
  setSwapStatus(id, 'rejected');
}

export function removeSwapRequest(id: string): void {
  saveSwapRequests(getSwapRequests().filter((r) => r.id !== id));
}

export function clearSwapRequests(): void {
  try {
    localStorage.removeItem(SWAP_KEY);
  } catch {
    /* ignore */
  }
}

/* ---------------- Queries ---------------- */
export function getSwapRequest(id: string): SwapRequest | undefined {
  return getSwapRequests().find((r) => r.id === id);
}

export function getSwapsByStatus(status: SwapStatus): SwapRequest[] {
  return getSwapRequests().filter((r) => r.status === status);
}

/** Pending offers awaiting the current user's decision (they own the wanted item). */
export function getIncomingSwaps(): SwapRequest[] {
  return getSwapRequests().filter(
    (r) => r.status === 'pending' && r.offeredBy === CURRENT_USER
  );
}

export function getPendingSwapCount(): number {
  return getSwapRequests().filter((r) => r.status === 'pending').length;
}

/** Resolve the Product behind a swap's requestedItemId, if it still exists. */
export function findSwapProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/**
 * Reactive wrapper so pages update immediately after accept/reject.
 */
@Injectable({ providedIn: 'root' })
export class SwapService {
  private readonly list = signal<SwapRequest[]>(getSwapRequests());

  all(): SwapRequest[] { return this.list(); }

  incoming(): SwapRequest[] {
    return this.list().filter((r) => r.status === 'pending');
  }

  pendingCount(): number {
    return this.list().filter((r) => r.status === 'pending').length;
  }

  refresh(): void { this.list.set(getSwapRequests()); }

  accept(id: string): void {
    acceptSwap(id);
    this.refresh();
  }

  reject(id: string): void {
    rejectSwap(id);
    this.refresh();
  }

  remove(id: string): void {
    removeSwapRequest(id);
    this.refresh();
  }
}