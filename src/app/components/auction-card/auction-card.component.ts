import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatPrice } from '../../data';
import { WishlistService } from '../../data/wishlist';

interface AuctionCardData {
  id: string;
  name: string;
  img: string;
  currentBid: number;
  bidCount: number;
  condition: string;
  endTime: number;
}

function formatCountdown(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AuctionCardComponent implements OnInit, OnDestroy {
  @Input() auction!: AuctionCardData;

  @Output() tap = new EventEmitter<string>();
  @Output() watch = new EventEmitter<string>();

  countdown = '';
  isEnding = false;
  isWatched = false;

  formatPrice = formatPrice;
  private readonly wishlist = inject(WishlistService);

  private ticker: any;

  ngOnInit(): void {
    this.refreshCountdown();
    this.isWatched = this.wishlist.has(this.auction.id);
    this.ticker = setInterval(() => this.refreshCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.ticker) clearInterval(this.ticker);
  }

  private refreshCountdown(): void {
    const ms = this.auction.endTime - Date.now();
    this.countdown = formatCountdown(ms);
    this.isEnding = ms < 60 * 60 * 1000;
  }

  onCardClick(): void {
    this.tap.emit(this.auction.id);
  }

  onWatch(e: Event): void {
    e.stopPropagation();
    this.isWatched = this.wishlist.toggle(this.auction.id);
    this.watch.emit(this.auction.id);
  }
}