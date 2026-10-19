import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CartService } from '../../data/cart';
import {
  AUCTIONS,
  AUCTION_CATEGORIES,
  Auction,
  AuctionCategory,
  formatPrice,
  formatCountdown,
  getWishlist,
  toggleWishlist,
} from '../../data';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.page.html',
  styleUrls: ['./auction-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class AuctionListPage implements OnInit, OnDestroy {
  categories = AUCTION_CATEGORIES;
  filterId = 'all';
  auctions: Auction[] = [];
  cartCount = 0;
  now = Date.now();
  private ticker: ReturnType<typeof setInterval> | undefined;

  formatPrice = formatPrice;
  formatCountdown = formatCountdown;

  constructor(
    private router: Router,
    private cart: CartService,
  ) {}

  ngOnInit(): void {
    this.applyFilter();
    this.ticker = setInterval(() => this.now = Date.now(), 1000);
  }

  ngOnDestroy(): void {
    if (this.ticker) clearInterval(this.ticker);
  }

  ionViewWillEnter(): void {
    this.cartCount = this.cart.count();
    this.applyFilter();
  }

  get filteredAuctions(): Auction[] {
    return this.auctions;
  }

  setFilter(id: string): void {
    this.filterId = id;
    this.applyFilter();
  }

  private applyFilter(): void {
    let list = [...AUCTIONS];

    if (this.filterId === 'ending') {
      const cutoff = Date.now() + 3 * 3600e3;
      list = list
        .filter((a) => a.endTime - Date.now() < 3 * 3600e3 && a.endTime - Date.now() > 0)
        .sort((a, b) => a.endTime - b.endTime);
    } else if (this.filterId !== 'all') {
      list = list.filter((a) => a.cat === this.filterId);
    }

    this.auctions = list;
  }

  isWatched(id: string): boolean {
    return getWishlist().includes(id);
  }

  onWatch(id: string, e: Event): void {
    e.stopPropagation();
    toggleWishlist(id);
    this.applyFilter();
  }

  isEnding(a: Auction): boolean {
    return a.endTime - Date.now() < 60 * 60e3;
  }

  openAuction(id: string): void {
    this.router.navigate(['/auction-detail', id]);
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}