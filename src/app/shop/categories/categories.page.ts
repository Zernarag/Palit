import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { WishlistService } from '../../data/wishlist';
import { CATEGORIES, PRODUCTS, Product, formatPrice, starStr } from '../../data';
import { BackNavigationService } from '../../data/navigation';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class CategoriesPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  categories = CATEGORIES;
  selected: number | null = null;
  products: Product[] = [];
  formatPrice = formatPrice;
  starStr = starStr;

  constructor(private router: Router, private wishlist: WishlistService) {}

  ngOnInit(): void { this.load(); }

  select(i: number | null): void { this.selected = i; this.load(); }

  load(): void {
    this.products = this.selected === null
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === this.categories[this.selected!].id);
  }

  isWished(id: string): boolean { return this.wishlist.has(id); }
  onHeart(id: string, e: Event): void { e.stopPropagation(); this.wishlist.toggle(id); this.load(); }

  openProduct(id: string): void { this.router.navigate(['/product-detail', id]); }
  openListing(): void {
    const categoryId = this.selected === null ? 'all' : this.categories[this.selected].id;
    this.router.navigate(['/product-listing', categoryId]);
  }
  back(): void { this.backNavigation.back('/tabs/home'); }
  goTo(path: string): void { this.router.navigate([path]); }
}