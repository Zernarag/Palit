import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import {
  SwapRequest,
  SwapService,
  SwapStatus,
  CURRENT_USER,
  findSwapProduct,
} from '../../data/swaps';
import { formatPrice } from '../../data';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-swap-requests',
  templateUrl: './swap-requests.page.html',
  styleUrls: ['./swap-requests.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class SwapRequestsPage {
  formatPrice = formatPrice;
  readonly currentUser = CURRENT_USER;

  activeTab: 'incoming' | 'sent' | 'closed' = 'incoming';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swaps: SwapService,
    private backNavigation: BackNavigationService
  ) {}

  ionViewWillEnter(): void {
    this.swaps.refresh();
  }

  /** All swap requests visible to the user (offers they made or received). */
  get all(): SwapRequest[] {
    return this.swaps.all();
  }

  get incoming(): SwapRequest[] {
    return this.all.filter(
      (r) =>
        r.status === 'pending' &&
        r.offeredBy === this.currentUser &&
        r.requestedBy !== this.currentUser
    );
  }

  get sent(): SwapRequest[] {
    return this.all.filter((r) => r.requestedBy === this.currentUser);
  }

  get closed(): SwapRequest[] {
    return this.all.filter((r) => r.status !== 'pending');
  }

  get visible(): SwapRequest[] {
    if (this.activeTab === 'incoming') return this.incoming;
    if (this.activeTab === 'sent') return this.sent;
    return this.closed;
  }

  get currentCount(): number {
    return this.visible.length;
  }

  get swapEmptyTitle(): string {
    if (this.activeTab === 'incoming') return 'No incoming offers yet';
    if (this.activeTab === 'sent') return 'No sent offers yet';
    return 'No closed offers yet';
  }

  get swapEmptyBody(): string {
    if (this.activeTab === 'incoming') return 'Swap offers from other users will appear here.';
    if (this.activeTab === 'sent') return 'Offers you make will appear here.';
    return 'Accepted and declined offers will appear here.';
  }

  get pendingCount(): number {
    return this.all.filter((r) => r.status === 'pending').length;
  }

  setTab(tab: 'incoming' | 'sent' | 'closed'): void {
    this.activeTab = tab;
  }

  back(): void {
    const fallbackUrl = this.route.snapshot.routeConfig?.path === 'swaps/from-profile'
      ? '/tabs/profile'
      : '/tabs/home';
    this.backNavigation.back(fallbackUrl);
  }

  /* ==================== DISPLAY HELPERS ==================== */
  /** Name + price of the marketplace product the swap is asking for. */
  wantedLabel(req: SwapRequest): string {
    const product = findSwapProduct(req.requestedItemId);
    if (!product) return 'Item no longer listed';
    return `${product.name} — ${formatPrice(product.price)}`;
  }

  wantedImg(req: SwapRequest): string {
    return findSwapProduct(req.requestedItemId)?.img || '';
  }

  /** Cover photo of the item being offered. */
  coverPhoto(req: SwapRequest): string {
    return req.photos[0] || '';
  }

  statusLabel(status: SwapStatus): string {
    if (status === 'accepted') return 'Accepted';
    if (status === 'rejected') return 'Declined';
    return 'Pending';
  }

  statusClass(status: SwapStatus): string {
    return 'status-' + status;
  }

  timeAgo(ts: number): string {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  }

  /* ==================== ACTIONS ==================== */
  accept(id: string, e: Event): void {
    e.stopPropagation();
    this.swaps.accept(id);
  }

  decline(id: string, e: Event): void {
    e.stopPropagation();
    this.swaps.reject(id);
  }

  remove(id: string, e: Event): void {
    e.stopPropagation();
    this.swaps.remove(id);
  }

  openProduct(req: SwapRequest): void {
    if (findSwapProduct(req.requestedItemId)) {
      this.router.navigate(['/product', req.requestedItemId]);
    }
  }

  browse(): void {
    this.router.navigateByUrl('/tabs/home');
  }

  goUpload(): void {
    this.router.navigateByUrl('/tabs/upload');
  }
}
