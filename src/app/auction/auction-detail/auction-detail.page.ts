import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import {
  AUCTIONS,
  Auction,
  formatPrice,
  formatCountdown,
  minNextBid,
  getWishlist,
  toggleWishlist,
} from '../../data';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.page.html',
  styleUrls: ['./auction-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent],
})
export class AuctionDetailPage implements OnInit, OnDestroy {
  private readonly backNavigation = inject(BackNavigationService);
  auction!: Auction;
  bidDraft = 0;
  now = Date.now();

  formatPrice = formatPrice;
  formatCountdown = formatCountdown;

  private ticker: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.auction = AUCTIONS.find((a) => a.id === id) || AUCTIONS[0];
    this.bidDraft = minNextBid(this.auction);

    this.ticker = setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.ticker) clearInterval(this.ticker);
  }

  /* ---------- Derived ---------- */
  get minBid(): number { return minNextBid(this.auction); }
  get countdown(): string { return formatCountdown(this.auction.endTime - this.now); }
  get isEnded(): boolean { return this.auction.endTime - this.now <= 0; }
  get isWatched(): boolean { return getWishlist().includes(this.auction.id); }
  get hasReserve(): boolean { return this.auction.reserve > 0; }

  get reserveLabel(): string {
    return this.auction.reserveMet ? 'Reserve met' : 'Reserve not met';
  }
  get reserveClass(): string {
    return this.auction.reserveMet ? 'reserve-met' : 'reserve-not-met';
  }

  /* ---------- Actions ---------- */
  stepBid(delta: number): void {
    this.bidDraft = Math.max(this.minBid, (this.bidDraft || this.minBid) + delta);
  }

  placeBid(): void {
    if (this.isEnded) return;
    if (this.bidDraft < this.minBid) {
      this.bidDraft = this.minBid;
      return;
    }

    this.auction.bids.unshift({ bidder: 'You', amount: this.bidDraft, isYou: true });
    this.auction.currentBid = this.bidDraft;
    this.auction.bidCount = this.auction.bids.length;
    if (this.auction.reserve > 0 && this.bidDraft >= this.auction.reserve) {
      this.auction.reserveMet = true;
    }

    // Anti-sniping: extend by 2 min if bid placed under 2 min remaining
    if (this.auction.endTime - this.now < 2 * 60e3) {
      this.auction.endTime += 2 * 60e3;
    }

    this.bidDraft = this.minBid;
  }

  buyNow(): void {
    if (!this.auction.buyNow) return;
    this.auction.currentBid = this.auction.buyNow;
    this.auction.reserveMet = true;
    this.auction.endTime = this.now;
    this.router.navigateByUrl('/order-confirmation');
  }

  toggleWatch(): void {
    toggleWishlist(this.auction.id);
  }

  schedulePickup(): void {
    /* hook up native dialog later */
  }

  back(): void {
    this.backNavigation.back('/tabs/auction');
  }

  openCourierChat(): void {
    this.router.navigate(['/chat', 'courier']);
  }
}