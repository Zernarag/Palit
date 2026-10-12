import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { WishlistService } from '../../data/wishlist';
import { PRODUCTS, Product, formatPrice, starStr } from '../../data';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.page.html',
  styleUrls: ['./flash-sale.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class FlashSalePage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  products: Product[] = [];
  formatPrice = formatPrice;
  starStr = starStr;

  constructor(private router: Router, private wishlist: WishlistService) {}

  ngOnInit(): void {
    this.products = PRODUCTS.filter((p) => p.old);
  }

  isWished(id: string): boolean { return this.wishlist.has(id); }
  onHeart(id: string, e: Event): void { e.stopPropagation(); this.wishlist.toggle(id); }

  openProduct(id: string): void { this.router.navigate(['/product-detail', id]); }
  goTo(path: string): void { this.router.navigate([path]); }
  back(): void { this.backNavigation.back('/tabs/home'); }
}