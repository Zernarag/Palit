/* ============================================================
 * Palit — formatting helpers
 * ============================================================ */

/**
 * Format a number as a Philippine peso string.
 *   1899    -> ₱1,899
 *   2450.6  -> ₱2,451
 */
export function formatPrice(n: number): string {
  return '₱' + Math.round(n).toLocaleString('en-PH');
}

export const peso = formatPrice;

/**
 * Return a 5-character string of filled/empty stars.
 *   4.8 -> ★★★★★
 *   3.4 -> ★★★☆☆
 */
export function starStr(r: number): string {
  const f = Math.round(r);
  return '★★★★★'.slice(0, f) + '☆☆☆☆☆'.slice(0, 5 - f);
}

/**
 * Format a millisecond duration for auction countdowns.
 *   > 1 day  -> "3d 04h"
 *   < 1 day  -> "02:14:37"
 *   <= 0     -> "Ended"
 */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Ended';

  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  if (d > 0) {
    return `${d}d ${String(h).padStart(2, '0')}h`;
  }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Compact number formatting — 2300 -> "2.3K", 1200000 -> "1.2M"
 */
export function compactNumber(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return (n / 1000).toFixed(n < 10_000 ? 1 : 0) + 'K';
  return (n / 1_000_000).toFixed(1) + 'M';
}