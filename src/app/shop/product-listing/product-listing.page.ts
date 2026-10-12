import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { WishlistService } from '../../data/wishlist';
import { CATEGORIES, PRODUCTS, Product, formatPrice, starStr } from '../../data';
import { BackNavigationService } from '../../data/navigation';

type SortKey = 'popular' | 'new' | 'low' | 'high' | 'rating';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.page.html',
  styleUrls: ['./product-listing.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class ProductListingPage implements OnInit {
  private readonly backNavigation = inject(BackNavigationService);
  catId = 'electronics';
  title = 'Electronics';
  products: Product[] = [];
  sort: SortKey = 'popular';

  formatPrice = formatPrice;
  starStr = starStr;

  constructor(private route: ActivatedRoute, private router: Router, private wishlist: WishlistService) {}

  ngOnInit(): void {
    this.catId = this.route.snapshot.paramMap.get('categoryId') || 'electronics';
    const cat = CATEGORIES.find((c) => c.id === this.catId);
    this.title = cat ? cat.name : this.catId === 'all' ? 'All' : 'Category';
    this.applySort();
  }

  setSort(s: SortKey): void { this.sort = s; this.applySort(); }

  applySort(): void {
    let list = this.catId === 'all'
      ? [...PRODUCTS]
      : PRODUCTS.filter((p) => p.cat === this.catId);
    if (this.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    else if (this.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    else if (this.sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (this.sort === 'new') list = [...list].reverse();
    else list = [...list].sort((a, b) => b.sold - a.sold);
    this.products = list;
  }

  isWished(id: string): boolean { return this.wishlist.has(id); }
  onHeart(id: string, e: Event): void { e.stopPropagation(); this.wishlist.toggle(id); this.applySort(); }

  openProduct(id: string): void { this.router.navigate(['/product-detail', id]); }
  goTo(path: string): void { this.router.navigate([path]); }
  back(): void { this.backNavigation.back('/tabs/home'); }
}