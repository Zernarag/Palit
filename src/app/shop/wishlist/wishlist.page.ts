import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { WishlistService } from '../../data/wishlist';
import { PRODUCTS, Product, formatPrice, starStr } from '../../data';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class WishlistPage {
  items: Product[] = [];
  formatPrice = formatPrice;
  starStr = starStr;

  constructor(private router: Router, private wishlist: WishlistService) { this.load(); }

  ionViewWillEnter(): void { this.load(); }

  load(): void {
    this.items = PRODUCTS.filter((p) => this.wishlist.has(p.id));
  }

  isWished(id: string): boolean { return this.wishlist.has(id); }

  onHeart(id: string, e: Event): void {
    e.stopPropagation();
    this.wishlist.toggle(id);
    this.load();
  }

  openProduct(id: string): void { this.router.navigate(['/product-detail', id]); }
  goHome(): void { this.router.navigateByUrl('/home'); }
} 