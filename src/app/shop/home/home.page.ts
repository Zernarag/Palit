import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { CartService } from '../../data/cart';
import { WishlistService } from '../../data/wishlist';
import {
  CATEGORIES,
  PRODUCTS,
  Product,
  formatPrice,
  starStr,
} from '../../data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class HomePage implements OnInit {
  categories = CATEGORIES;
  flashProducts: Product[] = [];
  recommended: Product[] = [];

  cartCount = 0;

  /* Expose helpers to the template */
  formatPrice = formatPrice;
  starStr = starStr;

  constructor(
    private router: Router,
    private cart: CartService,
    private wishlist: WishlistService,
  ) {}

  ngOnInit(): void {
    this.flashProducts = PRODUCTS.filter((p) => p.old);
    this.recommended = [...PRODUCTS]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }

  /* Ionic lifecycle — re-reads cart each time the page enters */
  ionViewWillEnter(): void {
    this.cartCount = this.cart.count();
  }

  /* ---------- Navigation ---------- */
  openProduct(id: string): void {
    this.router.navigate(['/product-detail', id]);
  }

  openCategory(catId: string): void {
    this.router.navigate(['/product-listing', catId]);
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

  /* ---------- Wishlist ---------- */
  isWished(id: string): boolean {
    return this.wishlist.has(id);
  }

  onHeart(id: string, event: Event): void {
    event.stopPropagation();
    this.wishlist.toggle(id);
  }
}